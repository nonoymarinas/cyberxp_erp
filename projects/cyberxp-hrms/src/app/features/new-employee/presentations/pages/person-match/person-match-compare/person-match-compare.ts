import { Component, ChangeDetectionStrategy, computed, inject, signal } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import { CxpButton, CxpClassificationBadge } from 'cyberxp-ui';

// ========================================
// Models
// ========================================

import { PersonMatch } from '../../../../models/personal-info/person-match.model';

// ========================================
// Wizard State
// ========================================

import { NewEmployeeStateService } from '../../../../state/new-employee-state.service';

// ========================================
// Types
// ========================================

type ComparisonResult = 'match' | 'different' | 'missing';

interface ComparisonRow {
  label: string;
  newValue: string;
  existingValue: string;
  result: ComparisonResult;
}

type MatchDecision = 'CONFIRMED' | 'DISMISSED' | 'ESCALATED';

interface PendingDecision {
  type: MatchDecision;
  title: string;
  description: string;
}

// ========================================
// Component
// ========================================

@Component({
  selector: 'cxp-person-match-compare',
  standalone: true,

  imports: [CxpButton, CxpClassificationBadge],

  templateUrl: './person-match-compare.html',
  styleUrl: './person-match-compare.css',

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonMatchCompareComponent {
  // ========================================
  // Dependencies
  // ========================================

  private readonly route = inject(ActivatedRoute);

  private readonly router = inject(Router);

  private readonly wizardState = inject(NewEmployeeStateService);

  // ========================================
  // Selected Person GUID
  // ========================================

  readonly personGuid = this.route.snapshot.paramMap.get('personGuid');

  // ========================================
  // Existing Person
  // ========================================

  readonly existingPerson = computed<PersonMatch | null>(() => {
    if (!this.personGuid) {
      return null;
    }

    // Read the reactive match list so the
    // computed value updates if screening
    // results are replaced or cleared.
    const matches = this.wizardState.personMatches();

    return matches.find((person) => person.personGuid === this.personGuid) ?? null;
  });

  // ========================================
  // New Employee Draft
  // ========================================

  readonly newPerson = this.wizardState.personalDraft;

  // ========================================
  // Full Names
  // ========================================

  readonly newFullName = computed(() => {
    const person = this.newPerson();

    if (!person) {
      return '';
    }

    return [person.firstName, person.middleName, person.lastName]
      .map((value) => value?.trim())
      .filter(Boolean)
      .join(' ');
  });

  readonly existingFullName = computed(() => {
    const person = this.existingPerson();

    if (!person) {
      return '';
    }

    return [person.firstName, person.middleName, person.lastName]
      .map((value) => value?.trim())
      .filter(Boolean)
      .join(' ');
  });

  // ========================================
  // Field-by-Field Comparison
  // ========================================

  readonly comparisonRows = computed<ComparisonRow[]>(() => {
    const newPerson = this.newPerson();

    const existingPerson = this.existingPerson();

    if (!newPerson || !existingPerson) {
      return [];
    }

    return [
      this.createComparisonRow('First Name', newPerson.firstName, existingPerson.firstName),

      this.createComparisonRow('Middle Name', newPerson.middleName, existingPerson.middleName),

      this.createComparisonRow('Last Name', newPerson.lastName, existingPerson.lastName),

      this.createComparisonRow('Date of Birth', newPerson.dateOfBirth, existingPerson.dateOfBirth),
    ];
  });

  // ========================================
  // Comparison Helper
  // ========================================

  private createComparisonRow(
    label: string,
    newValue: string | null | undefined,
    existingValue: string | null | undefined,
  ): ComparisonRow {
    const newText = String(newValue ?? '').trim();

    const existingText = String(existingValue ?? '').trim();

    let result: ComparisonResult;

    if (!newText || !existingText) {
      result = 'missing';
    } else if (newText.toLowerCase() === existingText.toLowerCase()) {
      result = 'match';
    } else {
      result = 'different';
    }

    return {
      label,
      newValue: newText || '—',
      existingValue: existingText || '—',
      result,
    };
  }

  // ========================================
  // Decision State
  // ========================================

  readonly pendingDecision = signal<PendingDecision | null>(null);

  readonly decisionReason = signal('');

  readonly decisionError = signal('');

  readonly decision = signal<MatchDecision | null>(null);

  readonly decisionMessage = signal('');

  // ========================================
  // Confirm Match
  // ========================================

  confirmMatch(): void {
    this.openDecision(
      'CONFIRMED',
      'Confirm Match',
      'Confirm that the new employee and the existing person are the same individual. Employee creation must remain blocked.',
    );
  }

  // ========================================
  // Dismiss Match
  // ========================================

  dismissMatch(): void {
    this.openDecision(
      'DISMISSED',
      'Dismiss Match',
      'Confirm that these records represent different individuals. Other possible matches must still be reviewed.',
    );
  }

  // ========================================
  // Escalate Match
  // ========================================

  escalateMatch(): void {
    this.openDecision(
      'ESCALATED',
      'Escalate for Review',
      'Refer this possible match to an authorized reviewer. Employee creation must remain on hold.',
    );
  }

  // ========================================
  // Open Decision Form
  // ========================================

  private openDecision(type: MatchDecision, title: string, description: string): void {
    if (!this.existingPerson() || !this.newPerson() || this.decision()) {
      return;
    }

    this.decisionReason.set('');
    this.decisionError.set('');

    this.pendingDecision.set({
      type,
      title,
      description,
    });
  }

  // ========================================
  // Update Decision Reason
  // ========================================

  updateDecisionReason(value: string): void {
    this.decisionReason.set(value);
    this.decisionError.set('');
  }

  // ========================================
  // Cancel Decision
  // ========================================

  cancelDecision(): void {
    this.pendingDecision.set(null);
    this.decisionReason.set('');
    this.decisionError.set('');
  }

  // ========================================
  // Submit Decision
  // ========================================

  submitDecision(): void {
    const pending = this.pendingDecision();

    const existing = this.existingPerson();

    const draft = this.newPerson();

    if (!pending || !existing || !draft || this.decision()) {
      return;
    }

    // ======================================
    // Validate Decision Reason
    // ======================================

    const reason = this.decisionReason().trim();

    if (reason.length < 10) {
      this.decisionError.set('Verification reason must contain at least 10 characters.');

      return;
    }

    // ======================================
    // Prototype Decision
    // ======================================
    //
    // This decision is local to this
    // component and is NOT an authorized
    // screening resolution.
    //
    // Future implementation:
    // - Submit screening decision to API
    // - Validate reviewer permissions
    // - Persist decision and reason
    // - Record reviewer and timestamp
    // - Recalculate screening clearance
    //
    // Do not mark personal-info verified
    // or unlock employee creation here.
    // ======================================

    this.decision.set(pending.type);

    this.decisionMessage.set(
      'Decision recorded locally for demonstration. ' + 'No server verification has occurred.',
    );

    // ======================================
    // Reset Decision Form
    // ======================================

    this.pendingDecision.set(null);
    this.decisionReason.set('');
    this.decisionError.set('');
  }

  // ========================================
  // Back to Matches
  // ========================================

  backToMatches(): void {
    void this.router.navigate(['/app', 'new-employee', 'screening']);
  }

  // ========================================
  // Back to Personal Information
  // ========================================

  backToPersonalInfo(): void {
    void this.router.navigate(['/app', 'new-employee', 'personal-info']);
  }
}

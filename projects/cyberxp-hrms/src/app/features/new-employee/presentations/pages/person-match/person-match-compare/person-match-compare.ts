
import {
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';

import {
  ActivatedRoute,
  Router,
} from '@angular/router';

import {
  CxpButton,
  CxpClassificationBadge,
} from 'cyberxp-ui';

// ========================================
// Models
// ========================================

import {
  PersonMatch,
} from '../../../../models/personal-info/personal-match.model';

// ========================================
// Business Service
// ========================================

import {
  PersonMatchService,
} from "../../../../business/sevices/person-match.services";

// ========================================
// Wizard State
// ========================================

import {
  NewEmployeeStateService,
} from '../../../../../new-employee/state/new-employee-state.service';


// ========================================
// Types
// ========================================

type ComparisonResult =
  | 'match'
  | 'different'
  | 'missing';

interface ComparisonRow {
  label: string;
  newValue: string;
  existingValue: string;
  result: ComparisonResult;
}

type MatchDecision =
  | 'CONFIRMED'
  | 'DISMISSED'
  | 'ESCALATED';

interface PendingDecision {
  type: MatchDecision;
  title: string;
  description: string;
}


@Component({
  selector: 'cxp-person-match-compare',
  standalone: true,

  imports: [
    CxpButton,
    CxpClassificationBadge,
  ],

  templateUrl: './person-match-compare.html',
  styleUrl: './person-match-compare.css',
})
export class PersonMatchCompareComponent {

  // ========================================
  // Dependency Injection
  // ========================================

  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  private readonly matchService =
    inject(PersonMatchService);

  private readonly wizardState =
    inject(NewEmployeeStateService);


  // ========================================
  // Selected Person GUID
  // ========================================

  readonly personGuid =
    this.route.snapshot.paramMap.get('personGuid');


  // ========================================
  // Existing Person
  // ========================================

  readonly existingPerson = computed<PersonMatch | null>(() => {

    if (!this.personGuid) {
      return null;
    }

    return this.matchService.getMatchByGuid(
      this.personGuid
    );

  });


  // ========================================
  // New Employee Draft
  // ========================================

  readonly newPerson =
    this.wizardState.personalDraft;


  // ========================================
  // Full Names
  // ========================================

  readonly newFullName = computed(() => {

    const person = this.newPerson();

    if (!person) {
      return '';
    }

    return [
      person.firstName,
      person.middleName,
      person.lastName,
    ]
      .filter(Boolean)
      .join(' ');

  });


  readonly existingFullName = computed(() => {

    const person = this.existingPerson();

    if (!person) {
      return '';
    }

    return [
      person.firstName,
      person.middleName,
      person.lastName,
    ]
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
      this.createComparisonRow(
        'First Name',
        newPerson.firstName,
        existingPerson.firstName
      ),

      this.createComparisonRow(
        'Middle Name',
        newPerson.middleName,
        existingPerson.middleName
      ),

      this.createComparisonRow(
        'Last Name',
        newPerson.lastName,
        existingPerson.lastName
      ),

      this.createComparisonRow(
        'Date of Birth',
        newPerson.dateOfBirth,
        existingPerson.dateOfBirth
      ),
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

    } else if (
      newText.toLocaleLowerCase() ===
      existingText.toLocaleLowerCase()
    ) {

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
  // Verification State
  // ========================================

  readonly pendingDecision =
    signal<PendingDecision | null>(null);

  readonly decisionReason = signal('');

  readonly decisionError = signal('');

  readonly decision =
    signal<MatchDecision | null>(null);

  readonly decisionMessage = signal('');


  // ========================================
  // Confirm Match
  // ========================================

  confirmMatch(): void {

    this.openDecision(
      'CONFIRMED',
      'Confirm Match',
      'Confirm that the new employee and the existing person are the same individual. Employee creation must remain blocked.'
    );

  }


  // ========================================
  // Dismiss Match
  // ========================================

  dismissMatch(): void {

    this.openDecision(
      'DISMISSED',
      'Dismiss Match',
      'Confirm that these records represent different individuals. Other possible matches must still be reviewed.'
    );

  }


  // ========================================
  // Escalate Match
  // ========================================

  escalateMatch(): void {

    this.openDecision(
      'ESCALATED',
      'Escalate for Review',
      'Refer this possible match to an authorized reviewer. Employee creation must remain on hold.'
    );

  }


  // ========================================
  // Open Verification Form
  // ========================================

  private openDecision(
    type: MatchDecision,
    title: string,
    description: string,
  ): void {

    if (
      !this.existingPerson() ||
      !this.newPerson() ||
      this.decision()
    ) {
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
  // Update Verification Reason
  // ========================================

  updateDecisionReason(value: string): void {

    this.decisionReason.set(value);
    this.decisionError.set('');

  }


  // ========================================
  // Cancel Verification
  // ========================================

  cancelDecision(): void {

    this.pendingDecision.set(null);
    this.decisionReason.set('');
    this.decisionError.set('');

  }


  // ========================================
  // Submit Verification Decision
  // ========================================

  submitDecision(): void {

    const pending = this.pendingDecision();
    const existing = this.existingPerson();
    const draft = this.newPerson();

    if (
      !pending ||
      !existing ||
      !draft ||
      this.decision()
    ) {
      return;
    }

    const reason = this.decisionReason().trim();

    if (reason.length < 10) {

      this.decisionError.set(
        'Verification reason must contain at least 10 characters.'
      );

      return;
    }

    // ========================================
    // UI Prototype Only
    //
    // Future:
    // Submit decision to ASP.NET Core API.
    // Store screening ID, person GUID,
    // decision, reason and audit history.
    //
    // Never unlock employee creation
    // from the frontend alone.
    // ========================================

    this.decision.set(pending.type);

    this.decisionMessage.set(
      'Decision recorded locally for demonstration. ' +
      'No server verification has occurred.'
    );

    this.pendingDecision.set(null);
    this.decisionReason.set('');
    this.decisionError.set('');

  }


  // ========================================
  // Navigation
  // ========================================

  backToMatches(): void {

    void this.router.navigate([
      '/app',
      'new-employee',
      'screening',
    ]);

  }


  backToPersonalInfo(): void {

    void this.router.navigate([
      '/app',
      'new-employee',
      'personal-info',
    ]);

  }

}

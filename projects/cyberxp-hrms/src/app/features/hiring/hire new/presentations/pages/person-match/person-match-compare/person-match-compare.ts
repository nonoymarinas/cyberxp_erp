
import {
  Component,
  ChangeDetectionStrategy,
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
} from '../../../../models/personal-info/person-match.model';

// ========================================
// Wizard State
// ========================================

import {
  NewEmployeeStateService,
} from '../../../../state/new-employee-state.service';

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

// ========================================
// Component
// ========================================

@Component({
  selector: 'cxp-person-match-compare',
  standalone: true,

  imports: [
    CxpButton,
    CxpClassificationBadge,
  ],

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

    const matches =
      this.wizardState.personMatches();

    return matches.find(
      person => person.personGuid === this.personGuid
    ) ?? null;
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
      .map(value => value?.trim())
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
      .map(value => value?.trim())
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

    const newText =
      String(newValue ?? '').trim();

    const existingText =
      String(existingValue ?? '').trim();

    let result: ComparisonResult;

    if (!newText || !existingText) {
      result = 'missing';

    } else if (
      newText.toLowerCase() ===
      existingText.toLowerCase()
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
  // Screening UI State
  // ========================================

  readonly isEscalated = signal(false);

  readonly screeningMessage = signal('');

  // ========================================
  // Confirm Match
  // ========================================

  confirmMatch(): void {

    const person = this.existingPerson();
    const draft = this.newPerson();

    if (!person || !draft) {
      return;
    }

    // ======================================
    // Navigate to Resolution
    // ======================================
    // No submission or database mutation.
    // The selected person is reviewed
    // before preparing an employment proposal.

    void this.router.navigate([
      '/app',
      'new-employee',
      'screening',
      'resolution',
      person.personGuid,
    ]);
  }

  // ========================================
  // Dismiss Match
  // ========================================

  dismissMatch(): void {

    // ======================================
    // Return to Match List
    // ======================================
    // No decision is submitted.
    // Other possible matches remain visible.

    void this.router.navigate([
      '/app',
      'new-employee',
      'screening',
    ]);
  }

  // ========================================
  // Escalate for Review
  // ========================================

  escalateMatch(): void {

    const person = this.existingPerson();

    if (!person || !this.newPerson()) {
      return;
    }

    // ======================================
    // Local Screening Flag
    // ======================================
    // This is temporary UI state.
    // EmploymentProposal integration must
    // preserve the escalation for approval.

    this.isEscalated.set(true);

    this.screeningMessage.set(
      'This potential match requires administrator review. ' +
      'The issue must be included in the employment proposal.'
    );
  }

  // ========================================
  // Back to Matches
  // ========================================

  backToMatches(): void {

    void this.router.navigate([
      '/app',
      'new-employee',
      'screening',
    ]);
  }

  // ========================================
  // Back to Personal Information
  // ========================================

  backToPersonalInfo(): void {

    void this.router.navigate([
      '/app',
      'new-employee',
      'personal-info',
    ]);
  }
}

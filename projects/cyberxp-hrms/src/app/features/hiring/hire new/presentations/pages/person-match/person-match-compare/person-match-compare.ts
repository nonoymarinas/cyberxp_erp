
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
  toSignal,
} from '@angular/core/rxjs-interop';

import {
  map,
} from 'rxjs';

import {
  CxpButton,
  CxpClassificationBadge,
} from 'cyberxp-ui';

import type {
  CxpClassificationLevel,
} from 'cyberxp-ui';

// ========================================
// Models
// ========================================

import {
  PersonMatch,
} from '../../../../domain/models/shared/person-match/person-match.model';

// ========================================
// Wizard State
// ========================================

import {
  NewEmployeeStateService,
} from '../../../../application/state/new-employee-state.service';

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

  private readonly route =
    inject(ActivatedRoute);

  private readonly router =
    inject(Router);

  private readonly wizardState =
    inject(NewEmployeeStateService);

  // ========================================
  // Selected Person GUID
  // ========================================

  readonly personGuid = toSignal(
    this.route.paramMap.pipe(
      map(params => params.get('personGuid'))
    ),
    {
      initialValue:
        this.route.snapshot.paramMap.get(
          'personGuid'
        ),
    }
  );

  // ========================================
  // Existing Person
  // ========================================

  readonly existingPerson =
    computed<PersonMatch | null>(() => {

      const guid = this.personGuid();

      if (!guid) {
        return null;
      }

      return this.wizardState
        .getPersonMatchByGuid(guid);
    });

  // ========================================
  // New Employee Draft
  // ========================================

  readonly newPerson =
    this.wizardState.personalDraft;

  // ========================================
  // Matching Workflow Status
  // ========================================

  readonly matchStatus =
    this.wizardState.personMatchStatus;

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
  // Match Score
  // ========================================

  readonly matchScore = computed(
    () => this.existingPerson()?.matchScore ?? 0
  );

  // ========================================
  // Match Type
  // ========================================

  readonly matchType = computed(
    () => this.existingPerson()?.matchType ?? ''
  );

  // ========================================
  // Match Classification ID
  // ========================================

  readonly matchClassificationId = computed(
    () =>
      this.existingPerson()
        ?.matchClassificationId ?? null
  );

  // ========================================
  // Classification Badge
  // ========================================
  //
  // Classification references must be
  // loaded through the application layer.
  //
  // Do not infer the classification from
  // the numeric ID or similarity score.
  // ========================================

  readonly badgeClassification =
    signal<CxpClassificationLevel>('neutral');

  // ========================================
  // Field-by-Field Comparison
  // ========================================

  readonly comparisonRows =
    computed<ComparisonRow[]>(() => {

      const newPerson = this.newPerson();

      const existingPerson =
        this.existingPerson();

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
  // Comparison Summary
  // ========================================

  readonly matchingFields = computed(
    () =>
      this.comparisonRows().filter(
        row => row.result === 'match'
      ).length
  );

  readonly differentFields = computed(
    () =>
      this.comparisonRows().filter(
        row => row.result === 'different'
      ).length
  );

  readonly missingFields = computed(
    () =>
      this.comparisonRows().filter(
        row => row.result === 'missing'
      ).length
  );

  // ========================================
  // Screening UI State
  // ========================================

  readonly isEscalated =
    signal(false);

  readonly screeningMessage =
    signal('');

  // ========================================
  // Confirm Match
  // ========================================

  confirmMatch(): void {

    const person =
      this.existingPerson();

    const draft =
      this.newPerson();

    if (!person || !draft) {
      return;
    }

    // ======================================
    // Navigate to Resolution
    // ======================================
    //
    // This does not change the workflow
    // status or create an employee.
    //
    // The resolution page determines
    // whether the person is eligible
    // for an appropriate employment action.
    // ======================================

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
    //
    // No screening decision is stored.
    // Other possible matches remain visible.
    // ======================================

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

    const person =
      this.existingPerson();

    if (!person || !this.newPerson()) {
      return;
    }

    // ======================================
    // Temporary UI State
    // ======================================
    //
    // This is not persisted to the backend.
    // The screening status remains
    // REVIEW or HOLD.
    // ======================================

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


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

// ========================================
// UI Components
// ========================================

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

import type {
  PersonMatch,
} from '../../../../domain/models/person-match/person-match.model';

// ========================================
// Wizard State
// ========================================

import {
  NewEmployeeStateService,
} from '../../../../application/state/new-employee-state.service';

// ========================================
// Reference State
// ========================================

import {
  NewEmployeeRefStateService,
} from '../../../../../../../core/application/states/new-employee-ref-state.service';

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

  private readonly refState =
    inject(NewEmployeeRefStateService);

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

      const guid =
        this.personGuid();

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
  // Screening Session
  // ========================================

  readonly screeningId =
    this.wizardState.screeningId;

  readonly screeningStatusCode =
    this.wizardState.screeningStatusCode;

  // ========================================
  // Decision References
  // ========================================

  readonly matchDecisionTypes =
    this.refState.matchDecisionTypes;

  // ========================================
  // Decision State
  // ========================================

  readonly isDecisionSubmitting =
    this.wizardState.isDecisionSubmitting;

  readonly decisionError =
    this.wizardState.decisionError;

  readonly savedDecision = computed(() => {

    const screeningId =
      this.screeningId();

    const personGuid =
      this.personGuid();

    if (!screeningId || !personGuid) {
      return null;
    }

    // Track decision changes reactively.

    this.wizardState.personMatchDecisions();

    return this.wizardState
      .getPersonMatchDecision(
        screeningId,
        personGuid
      );
  });

  readonly hasSavedDecision = computed(
    () => this.savedDecision() !== null
  );

  // ========================================
  // Full Names
  // ========================================

  readonly newFullName = computed(() => {

    const person =
      this.newPerson();

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

    const person =
      this.existingPerson();

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
    () => this.existingPerson()?.personMatchScore ?? 0
  );

  // ========================================
  // Match Level
  // ========================================

  readonly matchLevel = computed(
    () => this.existingPerson()?.personMatchLevel ?? ''
  );

  readonly matchLevelLabel = computed(() => {

    const level =
      this.matchLevel().trim().toUpperCase();

    switch (level) {

      case 'HIGH':
        return 'High Match';

      case 'MEDIUM':
        return 'Medium Match';

      case 'LOW':
        return 'Low Match';

      case 'NEUTRAL':
        return 'Neutral';

      default:
        return level || 'Unknown Level';
    }
  });

  // ========================================
  // Match Method
  // ========================================

  readonly matchMethod = computed(
    () => this.existingPerson()?.personMatchMethod ?? ''
  );

  // ========================================
  // Classification Badge
  // ========================================

  readonly badgeClassification =
    computed<CxpClassificationLevel | null>(() => {

      const level =
        this.matchLevel().trim().toLowerCase();

      switch (level) {

        case 'high':
          return 'high';

        case 'medium':
          return 'medium';

        case 'low':
          return 'low';

        case 'neutral':
          return 'neutral';

        default:
          return null;
      }
    });

  // ========================================
  // Field-by-Field Comparison
  // ========================================

  readonly comparisonRows =
    computed<ComparisonRow[]>(() => {

      const newPerson =
        this.newPerson();

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
      newText.normalize('NFKC').toLowerCase() ===
      existingText.normalize('NFKC').toLowerCase()
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
  // Review UI State
  // ========================================

  readonly isEscalated = computed(
    () =>
      this.savedDecision()?.decisionCode ===
      'ESCALATE'
  );

  readonly screeningMessage =
    signal('');

  // ========================================
  // Navigation Validation
  // ========================================

  private canNavigateToDecision(): boolean {

    if (this.isDecisionSubmitting()) {

      this.screeningMessage.set(
        'Please wait until the current decision submission is complete.'
      );

      return false;
    }

    if (!this.personGuid() || !this.existingPerson()) {

      this.screeningMessage.set(
        'The selected matching candidate is unavailable.'
      );

      return false;
    }

    if (!this.newPerson()) {

      this.screeningMessage.set(
        'New applicant information is unavailable.'
      );

      return false;
    }

    if (this.hasSavedDecision()) {

      this.screeningMessage.set(
        'A decision has already been recorded for this candidate.'
      );

      return false;
    }

    this.screeningMessage.set('');

    return true;
  }

  // ========================================
  // Navigate To Decision Workflow
  // ========================================

  private navigateToDecision(
    decisionPath:
      | 'same-person'
      | 'different-person'
      | 'escalate'
  ): void {

    if (!this.canNavigateToDecision()) {
      return;
    }

    const personGuid =
      this.personGuid();

    if (!personGuid) {
      return;
    }

    void this.router.navigate([
      '/app',
      'hire-new',
      'screening',
      'compare',
      personGuid,
      decisionPath,
    ]);
  }

  // ========================================
  // Same Person
  // ========================================

  confirmMatch(): void {

    this.navigateToDecision(
      'same-person'
    );
  }

  // ========================================
  // Different Person
  // ========================================

  dismissMatch(): void {

    this.navigateToDecision(
      'different-person'
    );
  }

  // ========================================
  // Escalate For Review
  // ========================================

  escalateMatch(): void {

    this.navigateToDecision(
      'escalate'
    );
  }

  // ========================================
  // Back To Matches
  // ========================================

  backToMatches(): void {

    if (this.isDecisionSubmitting()) {
      return;
    }

    void this.router.navigate([
      '/app',
      'hire-new',
      'screening',
    ]);
  }

  // ========================================
  // Back To Personal Information
  // ========================================

  backToPersonalInfo(): void {

    if (this.isDecisionSubmitting()) {
      return;
    }

    void this.router.navigate([
      '/app',
      'hire-new',
      'personal-info',
    ]);
  }
}


import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';

import {
  ActivatedRoute,
  Router,
} from '@angular/router';

import {
  takeUntilDestroyed,
} from '@angular/core/rxjs-interop';

import {
  distinctUntilChanged,
  finalize,
  map,
} from 'rxjs';

// ========================================
// Models
// ========================================

import type {
  PersonMatch,
} from '../../../../../domain/models/person-match/person-match.model';

import type {
  SamePersonDetails,
} from '../../../../../domain/models/same-person/same-person-details.model';

// ========================================
// State
// ========================================

import {
  NewEmployeeStateService,
} from '../../../../../application/state/new-employee-state.service';

// ========================================
// Application Service
// ========================================

import {
  SamePersonService,
} from '../../../../../application/services/same-person.service';

// ========================================
// Same Person Component
// ========================================

@Component({
  selector: 'cxp-person-match-same-person',
  standalone: true,

  imports: [],

  templateUrl: './same-person.html',
  styleUrl: './same-person.css',

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SamePersonComponent {

  // ========================================
  // Dependencies
  // ========================================

  private readonly router =
    inject(Router);

  private readonly route =
    inject(ActivatedRoute);

  private readonly destroyRef =
    inject(DestroyRef);

  private readonly samePersonService =
    inject(SamePersonService);

  readonly newEmployeeState =
    inject(NewEmployeeStateService);

  // ========================================
  // Route Parameters
  // ========================================

  readonly personGuid = signal<string>(
    this.route.snapshot.paramMap.get('personGuid') ?? ''
  );

  // ========================================
  // Same Person Request State
  // ========================================

  readonly isDetailsLoading =
    signal(false);

  readonly detailsError =
    signal<string | null>(null);

  private requestVersion = 0;

  // ========================================
  // Same Person Details
  // ========================================

  readonly samePersonDetails = computed<
    SamePersonDetails | null
  >(() => {

    const details =
      this.newEmployeeState.samePersonDetails();

    const personGuid =
      this.personGuid();

    if (!details || !personGuid) {
      return null;
    }

    if (
      details.personGuid.trim().toLowerCase() !==
      personGuid.trim().toLowerCase()
    ) {
      return null;
    }

    return details;
  });

  readonly hasSamePersonDetails = computed(
    () => this.samePersonDetails() !== null
  );

  // ========================================
  // Selected Existing Person
  // ========================================

  readonly selectedPerson = computed<
    PersonMatch | null
  >(() => {

    const personGuid =
      this.personGuid();

    if (!personGuid) {
      return null;
    }

    return this.newEmployeeState
      .getPersonMatchByGuid(personGuid) ?? null;
  });

  // ========================================
  // Applicant Information
  // ========================================

  readonly applicant =
    this.newEmployeeState.personalDraft;

  readonly applicantFullName = computed(() => {

    const applicant =
      this.applicant();

    if (!applicant) {
      return '';
    }

    return [
      applicant.firstName,
      applicant.middleName,
      applicant.lastName,
    ]
      .map(value => value?.trim())
      .filter(Boolean)
      .join(' ');
  });

  // ========================================
  // Existing Person Information
  // ========================================

  readonly existingPersonFullName = computed(() => {

    const details =
      this.samePersonDetails();

    const person =
      details ?? this.selectedPerson();

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
  // Match Information
  // ========================================

  readonly matchScore = computed(
    () => this.selectedPerson()?.personMatchScore ?? 0
  );

  readonly matchLevel = computed(
    () => this.selectedPerson()?.personMatchLevel ?? ''
  );

  readonly matchMethod = computed(
    () => this.selectedPerson()?.personMatchMethod ?? ''
  );

  // ========================================
  // Employment Information
  // ========================================

  readonly employmentStatusCode = computed(
    () =>
      this.samePersonDetails()
        ?.employmentStatusCode ?? null
  );

  readonly employmentStatusName = computed(
    () =>
      this.samePersonDetails()
        ?.employmentStatusName ?? 'Unavailable'
  );

  // ========================================
  // Rehire Eligibility
  // ========================================

  readonly rehireEligibilityStatusCode = computed(
    () =>
      this.samePersonDetails()
        ?.rehireEligibilityStatusCode ?? null
  );

  readonly rehireEligibilityStatusName = computed(
    () =>
      this.samePersonDetails()
        ?.rehireEligibilityStatusName ?? 'Unavailable'
  );

  // ========================================
  // Person Restrictions
  // ========================================

  readonly personRestrictionStatusCode = computed(
    () =>
      this.samePersonDetails()
        ?.personRestrictionStatusCode ?? null
  );

  readonly personRestrictionStatusName = computed(
    () =>
      this.samePersonDetails()
        ?.personRestrictionStatusName ?? 'Unavailable'
  );

  readonly hasActiveRestriction = computed(
    () =>
      this.personRestrictionStatusCode() === 'ACTIVE'
  );

  // ========================================
  // Available Actions
  // ========================================

  readonly availableActions = computed(
    () =>
      this.samePersonDetails()
        ?.availableActions ?? []
  );

  readonly hasAvailableAction = computed(
    () => this.availableActions().length > 0
  );

  // ========================================
  // Screening State
  // ========================================

  readonly screeningId =
    this.newEmployeeState.screeningId;

  readonly isChecking =
    this.newEmployeeState.isPersonMatchChecking;

  readonly isDecisionSubmitting =
    this.newEmployeeState.isDecisionSubmitting;

  readonly decisionError =
    this.newEmployeeState.decisionError;

  // ========================================
  // Same Person Decision State
  // ========================================

  readonly decisionCode =
    signal<string>('SAME_PERSON');

  // ========================================
  // Existing Candidate Decision
  // ========================================

  readonly existingDecision = computed(() => {

    const screeningId =
      this.screeningId();

    const personGuid =
      this.personGuid();

    if (!screeningId || !personGuid) {
      return null;
    }

    // Track saved decisions reactively.
    this.newEmployeeState.personMatchDecisions();

    return this.newEmployeeState
      .getPersonMatchDecision(
        screeningId,
        personGuid
      ) ?? null;
  });

  readonly hasExistingDecision = computed(
    () => this.existingDecision() !== null
  );

  // ========================================
  // Decision Readiness
  // ========================================

  readonly isReadyToSubmit = computed(() => {

    return (
      this.selectedPerson() !== null &&
      this.hasSamePersonDetails() &&
      !!this.screeningId() &&
      !this.isChecking() &&
      !this.isDetailsLoading() &&
      !this.isDecisionSubmitting() &&
      !this.hasExistingDecision() &&
      this.detailsError() === null
    );
  });

  // ========================================
  // Constructor
  // ========================================

  constructor() {

    // ======================================
    // Listen To Route Parameter Changes
    // ======================================

    this.route.paramMap
      .pipe(
        map(params =>
          params.get('personGuid') ?? ''
        ),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(personGuid => {

        this.personGuid.set(personGuid);

        this.loadSamePersonDetails(
          personGuid
        );
      });

    // ======================================
    // Invalidate Pending Requests On Destroy
    // ======================================

    this.destroyRef.onDestroy(() => {
      ++this.requestVersion;
    });
  }

  // ========================================
  // Load Same Person Details
  // ========================================

  loadSamePersonDetails(
    personGuid: string = this.personGuid()
  ): void {

    const requestVersion =
      ++this.requestVersion;

    // ======================================
    // Reset Local Request State
    // ======================================

    this.isDetailsLoading.set(false);
    this.detailsError.set(null);

    this.samePersonService.clearDetails();

    // ======================================
    // Validate Person GUID
    // ======================================

    const normalizedGuid =
      personGuid.trim();

    if (!normalizedGuid) {

      this.detailsError.set(
        'Person GUID is required.'
      );

      return;
    }

    // ======================================
    // Validate Selected Candidate
    // ======================================

    const candidate =
      this.newEmployeeState
        .getPersonMatchByGuid(normalizedGuid);

    if (!candidate) {

      this.detailsError.set(
        'The selected person does not belong to the current screening results.'
      );

      return;
    }

    // ======================================
    // Begin Loading
    // ======================================

    this.isDetailsLoading.set(true);

    // ======================================
    // Retrieve Same Person Details
    // ======================================

    this.samePersonService
      .getDetails({
        personGuid: normalizedGuid,
      })
      .pipe(
        finalize(() => {

          if (
            requestVersion === this.requestVersion
          ) {
            this.isDetailsLoading.set(false);
          }

        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({

        // ==================================
        // Success
        // ==================================

        next: details => {

          if (
            requestVersion !== this.requestVersion
          ) {
            return;
          }

          if (
            details.personGuid.trim().toLowerCase() !==
            normalizedGuid.toLowerCase()
          ) {

            this.detailsError.set(
              'The returned person does not match the requested candidate.'
            );

            return;
          }

          this.detailsError.set(null);
        },

        // ==================================
        // Error
        // ==================================

        error: error => {

          if (
            requestVersion !== this.requestVersion
          ) {
            return;
          }

          const message =
            error instanceof Error
              ? error.message
              : 'Unable to retrieve Same Person details.';

          this.detailsError.set(message);
        },

      });
  }

  // ========================================
  // Retry Loading Details
  // ========================================

  retryLoadDetails(): void {

    if (this.isDetailsLoading()) {
      return;
    }

    this.loadSamePersonDetails();
  }

  // ========================================
  // Back To Compare
  // ========================================

  async back(): Promise<void> {

    if (this.isDecisionSubmitting()) {
      return;
    }

    await this.router.navigate(
      ['../'],
      {
        relativeTo: this.route,
      }
    );
  }

  // ========================================
  // Confirm Same Person
  // ========================================

  confirmSamePerson(): void {

    if (!this.isReadyToSubmit()) {
      return;
    }

    // ======================================
    // Next Integration:
    // PersonMatchDecisionService
    // ======================================
    //
    // Submit:
    //   screeningId
    //   personGuid
    //   decisionCode: SAME_PERSON
    //
    // On successful backend response:
    //   1. Update NewEmployeeStateService.
    //   2. Load identity resolution information.
    //   3. Navigate to the authorized next workflow.
    //
    // Do not submit or navigate until the
    // backend decision contract is connected.

    console.info(
      '[SamePerson] Decision ready for submission:',
      {
        screeningId: this.screeningId(),
        personGuid: this.personGuid(),
        decisionCode: this.decisionCode(),
      }
    );
  }
}

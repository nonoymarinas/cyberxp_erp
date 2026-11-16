
import {
  Injectable,
  signal,
  computed,
} from '@angular/core';

// ========================================
// Models
// ========================================

import {
  NewEmployeeStep,
} from '../../domain/models/shared/complete-steps/new-employee-step.model';

import {
  PersonalInfo,
} from '../../domain/models/personal-info/personal-info.model';

import {
  PersonMatch,
} from '../../domain/models/shared/person-match/person-match.model';

import {
  PersonMatchResult,
} from '../../domain/models/shared/person-match/person-match-result.model';

// ========================================
// New Employee State Service
// ========================================

@Injectable()
export class NewEmployeeStateService {

  // ========================================
  // Step Validation State
  // ========================================

  private readonly _validSteps =
    signal<ReadonlySet<NewEmployeeStep>>(
      new Set<NewEmployeeStep>()
    );

  readonly validSteps =
    this._validSteps.asReadonly();

  // ========================================
  // Step Verification State
  // ========================================

  private readonly _verifiedSteps =
    signal<ReadonlySet<NewEmployeeStep>>(
      new Set<NewEmployeeStep>()
    );

  readonly verifiedSteps =
    this._verifiedSteps.asReadonly();

  // ========================================
  // Personal Information Draft
  // ========================================

  private readonly _personalDraft =
    signal<PersonalInfo | null>(null);

  readonly personalDraft =
    this._personalDraft.asReadonly();

  // ========================================
  // Person Match Result State
  // ========================================

  private readonly _personMatchResult =
    signal<PersonMatchResult | null>(null);

  readonly personMatchResult =
    this._personMatchResult.asReadonly();

  // ========================================
  // Person Match Checking State
  // ========================================

  private readonly _isPersonMatchChecking =
    signal<boolean>(false);

  readonly isPersonMatchChecking =
    this._isPersonMatchChecking.asReadonly();

  // ========================================
  // Computed Matching Status
  // ========================================

  readonly personMatchStatus = computed(
    () =>
      this._personMatchResult()
        ?.workflowStatusCode ?? null
  );

  readonly personMatchWorkflowStatus = computed(
    () =>
      this._personMatchResult()
        ?.workflowStatus ?? null
  );

  // ========================================
  // Computed Matching Results
  // ========================================

  readonly personMatches = computed(
    () =>
      this._personMatchResult()
        ?.matches ?? []
  );

  readonly hasPossibleMatch = computed(
    () =>
      this._personMatchResult()
        ?.hasPossibleMatch ?? false
  );

  readonly hasBlocklistMatch = computed(
    () =>
      this._personMatchResult()
        ?.hasBlocklistMatch ?? false
  );

  readonly totalMatches = computed(
    () =>
      this._personMatchResult()
        ?.totalMatches ?? 0
  );

  // ========================================
  // Computed Workflow Decisions
  // ========================================

  readonly isPersonMatchClear = computed(
    () =>
      this.personMatchStatus() === 'CLEAR'
  );

  readonly requiresPersonMatchReview = computed(
    () =>
      this.personMatchStatus() === 'REVIEW'
  );

  readonly isPersonMatchOnHold = computed(
    () =>
      this.personMatchStatus() === 'HOLD'
  );

  readonly canProceedAfterMatching = computed(
    () =>
      this.isPersonMatchClear() &&
      this.isValid('personal-info') &&
      this.isVerified('personal-info')
  );

  // ========================================
  // Set Step Validation
  // ========================================

  setValid(
    step: NewEmployeeStep,
    valid: boolean
  ): void {

    this._validSteps.update(current => {
      const updated = new Set(current);

      if (valid) {
        updated.add(step);
      } else {
        updated.delete(step);
      }

      return updated;
    });

    // Form validity does not automatically
    // clear an existing screening result.
    //
    // Identity changes are handled by
    // setPersonalDraft().
  }

  // ========================================
  // Check Step Validation
  // ========================================

  isValid(
    step: NewEmployeeStep
  ): boolean {

    return this._validSteps().has(step);
  }

  // ========================================
  // Set Step Verification
  // ========================================

  setVerified(
    step: NewEmployeeStep,
    verified: boolean
  ): void {

    this._verifiedSteps.update(current => {
      const updated = new Set(current);

      if (verified) {
        updated.add(step);
      } else {
        updated.delete(step);
      }

      return updated;
    });
  }

  // ========================================
  // Check Step Verification
  // ========================================

  isVerified(
    step: NewEmployeeStep
  ): boolean {

    return this._verifiedSteps().has(step);
  }

  // ========================================
  // Set Personal Draft
  // ========================================

  setPersonalDraft(
    draft: PersonalInfo | null
  ): void {

    const previous = this._personalDraft();

    // ======================================
    // Compare Identity Fields
    // ======================================

    const identityChanged =
      previous?.firstName?.trim() !==
        draft?.firstName?.trim() ||

      (previous?.middleName?.trim() || null) !==
        (draft?.middleName?.trim() || null) ||

      previous?.lastName?.trim() !==
        draft?.lastName?.trim() ||

      previous?.dateOfBirth !==
        draft?.dateOfBirth;

    // ======================================
    // Store Complete Personal Draft
    // ======================================

    this._personalDraft.set(
      draft ? { ...draft } : null
    );

    // ======================================
    // Invalidate Matching When Identity
    // Changes
    // ======================================

    if (identityChanged) {
      this.invalidatePersonMatch();
    }
  }

  // ========================================
  // Set Person Match Checking
  // ========================================

  setPersonMatchChecking(
    checking: boolean
  ): void {

    this._isPersonMatchChecking.set(checking);
  }

  // ========================================
  // Store Person Match Result
  // ========================================

  setPersonMatchResponse(
    result: PersonMatchResult
  ): void {

    this._personMatchResult.set({
      ...result,
      matches: result.matches.map(
        match => ({ ...match })
      ),
    });
  }

  // ========================================
  // Find Person Match By GUID
  // ========================================

  getPersonMatchByGuid(
    personGuid: string
  ): PersonMatch | null {

    return this.personMatches().find(
      match =>
        match.personGuid === personGuid
    ) ?? null;
  }

  // ========================================
  // Clear Person Match
  // ========================================

  clearPersonMatch(): void {

    this._personMatchResult.set(null);
  }

  // ========================================
  // Invalidate Person Match Verification
  // ========================================

  invalidatePersonMatch(): void {

    this.clearPersonMatch();

    this.setVerified(
      'personal-info',
      false
    );
  }

  // ========================================
  // Reset Wizard State
  // ========================================

  reset(): void {

    this._validSteps.set(
      new Set<NewEmployeeStep>()
    );

    this._verifiedSteps.set(
      new Set<NewEmployeeStep>()
    );

    this._personalDraft.set(null);

    this._personMatchResult.set(null);

    this._isPersonMatchChecking.set(false);
  }
}

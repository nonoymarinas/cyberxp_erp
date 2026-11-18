
import {
  Injectable,
  signal,
  computed,
} from '@angular/core';

// ========================================
// Models
// ========================================

import type {
  NewEmployeeStep,
} from '../../domain/models/shared/complete-steps/new-employee-step.model';

import type {
  PersonalInfo,
} from '../../domain/models/personal-info/personal-info.model';

import type {
  PersonMatch,
  PersonMatchApiResponse,
} from '../../domain/models/shared/person-match/person-match.model';

import type {
  PersonMatchDecision,
} from '../../domain/models/shared/person-match-decision/person-match-decision.model';

import type {
  PersonMatchResolution,
} from '../../domain/models/shared/person-match-resolution/person-match-resolution.model';

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
  // Person Match Response
  // ========================================

  private readonly _personMatchResponse =
    signal<PersonMatchApiResponse | null>(null);

  readonly personMatchResponse =
    this._personMatchResponse.asReadonly();

  // ========================================
  // Person Match Checking State
  // ========================================

  private readonly _isPersonMatchChecking =
    signal(false);

  readonly isPersonMatchChecking =
    this._isPersonMatchChecking.asReadonly();

  // ========================================
  // Person Match Error State
  // ========================================

  private readonly _personMatchError =
    signal<string | null>(null);

  readonly personMatchError =
    this._personMatchError.asReadonly();

  // ========================================
  // Selected Person Match
  // ========================================

  private readonly _selectedPersonMatchGuid =
    signal<string | null>(null);

  readonly selectedPersonMatchGuid =
    this._selectedPersonMatchGuid.asReadonly();

  // ========================================
  // Person Match Request Version
  // ========================================

  private _personMatchRequestVersion = 0;

  // ========================================
  // Screening Session
  // ========================================

  private readonly _screeningId =
    signal<string | null>(null);

  readonly screeningId =
    this._screeningId.asReadonly();

  // ========================================
  // Screening Workflow Status
  // ========================================

  private readonly _screeningStatusCode =
    signal<string | null>(null);

  readonly screeningStatusCode =
    this._screeningStatusCode.asReadonly();

  // ========================================
  // Person Match Decisions
  // ========================================

  private readonly _personMatchDecisions =
    signal<PersonMatchDecision[]>([]);

  readonly personMatchDecisions =
    this._personMatchDecisions.asReadonly();

  // ========================================
  // Decision Submission State
  // ========================================

  private readonly _isDecisionSubmitting =
    signal(false);

  readonly isDecisionSubmitting =
    this._isDecisionSubmitting.asReadonly();

  // ========================================
  // Decision Error State
  // ========================================

  private readonly _decisionError =
    signal<string | null>(null);

  readonly decisionError =
    this._decisionError.asReadonly();

  // ========================================
  // Person Match Resolution State
  // ========================================

  private readonly _personMatchResolution =
    signal<PersonMatchResolution | null>(null);

  readonly personMatchResolution =
    this._personMatchResolution.asReadonly();

  // ========================================
  // Resolution Loading State
  // ========================================

  private readonly _isResolutionLoading =
    signal(false);

  readonly isResolutionLoading =
    this._isResolutionLoading.asReadonly();

  // ========================================
  // Resolution Error State
  // ========================================

  private readonly _resolutionError =
    signal<string | null>(null);

  readonly resolutionError =
    this._resolutionError.asReadonly();

  // ========================================
  // Resolution Request Version
  // ========================================

  private _resolutionRequestVersion = 0;

  // ========================================
  // Computed Matching Results
  // ========================================

  readonly personMatches = computed(
    () => this._personMatchResponse()?.data ?? []
  );

  readonly totalMatches = computed(
    () => this.personMatches().length
  );

  readonly hasPossibleMatch = computed(
    () => this.personMatches().length > 0
  );

  readonly hasPersonMatchResponse = computed(
    () => this._personMatchResponse() !== null
  );

  readonly hasNoMatchCandidates = computed(
    () =>
      this.hasPersonMatchResponse() &&
      this.personMatches().length === 0
  );

  readonly selectedPersonMatch = computed(
    () =>
      this.personMatches().find(
        match =>
          match.personGuid ===
          this._selectedPersonMatchGuid()
      ) ?? null
  );

  // ========================================
  // Computed Screening Status
  // ========================================

  readonly isScreeningClear = computed(
    () => this._screeningStatusCode() === 'CLEAR'
  );

  readonly isScreeningReview = computed(
    () => this._screeningStatusCode() === 'REVIEW'
  );

  readonly isScreeningOnHold = computed(
    () => this._screeningStatusCode() === 'HOLD'
  );

  // ========================================
  // Computed Decision State
  // ========================================

  readonly totalDecisions = computed(
    () => this._personMatchDecisions().length
  );

  readonly hasConfirmedMatch = computed(
    () =>
      this._personMatchDecisions().some(
        decision =>
          decision.screeningId ===
            this._screeningId() &&
          decision.decisionCode === 'SAME_PERSON'
      )
  );

  readonly hasEscalatedDecision = computed(
    () =>
      this._personMatchDecisions().some(
        decision =>
          decision.screeningId ===
            this._screeningId() &&
          decision.decisionCode === 'ESCALATE'
      )
  );

  readonly hasPendingMatchDecisions = computed(() => {

    const screeningId =
      this._screeningId();

    if (!screeningId) {
      return false;
    }

    return this.personMatches().some(
      person =>
        !this._personMatchDecisions().some(
          decision =>
            decision.screeningId === screeningId &&
            decision.personGuid === person.personGuid
        )
    );
  });

  // ========================================
  // Computed Resolution State
  // ========================================

  readonly hasPersonMatchResolution = computed(
    () => this._personMatchResolution() !== null
  );

  readonly resolutionEmploymentStatus = computed(
    () =>
      this._personMatchResolution()
        ?.employmentStatus ?? null
  );

  readonly resolutionIsBlocklisted = computed(
    () =>
      this._personMatchResolution()
        ?.isBlocklisted ?? false
  );

  readonly resolutionAllowedActions = computed(
    () =>
      this._personMatchResolution()
        ?.allowedActions ?? []
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

    const previous =
      this._personalDraft();

    const identityChanged =
      previous?.firstName?.trim() !==
        draft?.firstName?.trim() ||
      (previous?.middleName?.trim() || null) !==
        (draft?.middleName?.trim() || null) ||
      previous?.lastName?.trim() !==
        draft?.lastName?.trim() ||
      previous?.dateOfBirth !==
        draft?.dateOfBirth;

    this._personalDraft.set(
      draft ? { ...draft } : null
    );

    if (identityChanged) {
      this.invalidatePersonMatch();
    }
  }

  // ========================================
  // Begin Person Match Request
  // ========================================

  beginPersonMatchRequest(): number {

    const requestVersion =
      ++this._personMatchRequestVersion;

    // Invalidate previous resolution.
    this.invalidateResolutionRequest();

    this._personMatchResponse.set(null);
    this._selectedPersonMatchGuid.set(null);
    this._personMatchError.set(null);
    this._isPersonMatchChecking.set(true);

    // Do not reuse previous clearance.
    this._screeningStatusCode.set(null);

    this.setVerified('personal-info', false);

    return requestVersion;
  }

  // ========================================
  // Check Person Match Request Version
  // ========================================

  isCurrentPersonMatchRequest(
    requestVersion: number
  ): boolean {

    return requestVersion ===
      this._personMatchRequestVersion;
  }

  // ========================================
  // Store Person Match Response
  // ========================================

  setPersonMatchResponse(
    response: PersonMatchApiResponse,
    requestVersion: number
  ): void {

    if (
      !this.isCurrentPersonMatchRequest(
        requestVersion
      )
    ) {
      return;
    }

    this._personMatchResponse.set({
      ...response,
      data: response.data.map(
        match => ({ ...match })
      ),
    });

    this._isPersonMatchChecking.set(false);
    this._personMatchError.set(null);
    this._selectedPersonMatchGuid.set(null);

    // Do not infer screening clearance
    // from an empty match result.
  }

  // ========================================
  // Store Person Match Error
  // ========================================

  setPersonMatchError(
    message: string,
    requestVersion: number
  ): void {

    if (
      !this.isCurrentPersonMatchRequest(
        requestVersion
      )
    ) {
      return;
    }

    this._personMatchResponse.set(null);
    this._personMatchError.set(message);
    this._isPersonMatchChecking.set(false);
  }

  // ========================================
  // Select Person Match
  // ========================================

  selectPersonMatch(
    personGuid: string | null
  ): void {

    if (
      personGuid !== null &&
      !this.personMatches().some(
        match =>
          match.personGuid === personGuid
      )
    ) {
      throw new Error(
        'Selected person does not exist in the match results.'
      );
    }

    this._selectedPersonMatchGuid.set(
      personGuid
    );
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
  // Set Screening Session
  // ========================================

  setScreeningSession(
    screeningId: string,
    statusCode: string | null
  ): void {

    const normalizedId =
      screeningId.trim();

    if (!normalizedId) {
      throw new Error(
        'Screening ID is required.'
      );
    }

    // Validate before modifying state.
    if (statusCode !== null) {

      const code =
        statusCode.trim().toUpperCase();

      if (
        code !== 'CLEAR' &&
        code !== 'REVIEW' &&
        code !== 'HOLD'
      ) {
        throw new Error(
          `Unsupported screening status: ${statusCode}`
        );
      }
    }

    const previousId =
      this._screeningId();

    if (previousId !== normalizedId) {

      // Prevent previous screening decisions
      // and resolution from being reused.

      this._personMatchDecisions.set([]);
      this._selectedPersonMatchGuid.set(null);
      this._decisionError.set(null);

      this.invalidateResolutionRequest();
    }

    this._screeningId.set(normalizedId);

    this.setScreeningStatus(statusCode);
  }

  // ========================================
  // Set Screening Status
  // ========================================

  setScreeningStatus(
    statusCode: string | null
  ): void {

    if (statusCode === null) {

      this._screeningStatusCode.set(null);
      this.setVerified('personal-info', false);

      return;
    }

    const normalizedCode =
      statusCode.trim().toUpperCase();

    if (
      normalizedCode !== 'CLEAR' &&
      normalizedCode !== 'REVIEW' &&
      normalizedCode !== 'HOLD'
    ) {
      throw new Error(
        `Unsupported screening status: ${statusCode}`
      );
    }

    if (!this._screeningId()) {
      throw new Error(
        'A screening session is required before setting its status.'
      );
    }

    this._screeningStatusCode.set(
      normalizedCode
    );

    this.setVerified(
      'personal-info',
      normalizedCode === 'CLEAR'
    );
  }

  // ========================================
  // Add Saved Person Match Decision
  // ========================================

  addPersonMatchDecision(
    decision: PersonMatchDecision
  ): void {

    const screeningId =
      this._screeningId();

    if (
      !screeningId ||
      decision.screeningId !== screeningId
    ) {
      throw new Error(
        'Decision does not belong to the current screening session.'
      );
    }

    if (
      !this.personMatches().some(
        person =>
          person.personGuid ===
          decision.personGuid
      )
    ) {
      throw new Error(
        'Decision person does not belong to the current match results.'
      );
    }

    this._personMatchDecisions.update(
      decisions => {

        const exists =
          decisions.some(
            item =>
              item.screeningId ===
                decision.screeningId &&
              item.personGuid ===
                decision.personGuid
          );

        if (exists) {
          throw new Error(
            'A decision already exists for this candidate.'
          );
        }

        return [
          ...decisions,
          { ...decision },
        ];
      }
    );

    // A new decision may affect the
    // currently loaded resolution.
    this.invalidateResolutionRequest();
  }

  // ========================================
  // Find Saved Decision
  // ========================================

  getPersonMatchDecision(
    screeningId: string,
    personGuid: string
  ): PersonMatchDecision | null {

    return this._personMatchDecisions().find(
      decision =>
        decision.screeningId === screeningId &&
        decision.personGuid === personGuid
    ) ?? null;
  }

  // ========================================
  // Set Decision Submission State
  // ========================================

  setDecisionSubmitting(
    submitting: boolean
  ): void {

    this._isDecisionSubmitting.set(
      submitting
    );
  }

  // ========================================
  // Set Decision Error
  // ========================================

  setDecisionError(
    message: string | null
  ): void {

    this._decisionError.set(message);
  }

  // ========================================
  // Clear Local Decision Cache
  // ========================================

  clearPersonMatchDecisions(): void {

    this._personMatchDecisions.set([]);
    this._decisionError.set(null);

    this.invalidateResolutionRequest();

    // Does not delete backend decisions.
  }

  // ========================================
  // Begin Resolution Request
  // ========================================

  beginResolutionRequest(): number {

    const requestVersion =
      ++this._resolutionRequestVersion;

    this._personMatchResolution.set(null);
    this._resolutionError.set(null);
    this._isResolutionLoading.set(true);

    return requestVersion;
  }

  // ========================================
  // Check Resolution Request Version
  // ========================================

  isCurrentResolutionRequest(
    requestVersion: number
  ): boolean {

    return requestVersion ===
      this._resolutionRequestVersion;
  }

  // ========================================
  // Finish Resolution Request
  // ========================================

  finishResolutionRequest(
    requestVersion: number
  ): void {

    if (
      !this.isCurrentResolutionRequest(
        requestVersion
      )
    ) {
      return;
    }

    this._isResolutionLoading.set(false);
  }

  // ========================================
  // Invalidate Resolution Request
  // ========================================

  invalidateResolutionRequest(): void {

    ++this._resolutionRequestVersion;

    this._personMatchResolution.set(null);
    this._isResolutionLoading.set(false);
    this._resolutionError.set(null);
  }

  // ========================================
  // Store Person Match Resolution
  // ========================================

  setPersonMatchResolution(
    resolution: PersonMatchResolution,
    requestVersion?: number
  ): void {

    if (
      requestVersion !== undefined &&
      !this.isCurrentResolutionRequest(
        requestVersion
      )
    ) {
      throw new Error(
        'Resolution request is no longer current.'
      );
    }

    const screeningId =
      this._screeningId();

    if (
      !screeningId ||
      resolution.screeningId !== screeningId
    ) {
      throw new Error(
        'Resolution does not belong to the current screening session.'
      );
    }

    const person =
      this.getPersonMatchByGuid(
        resolution.personGuid
      );

    if (!person) {
      throw new Error(
        'Resolution person does not belong to the current screening.'
      );
    }

    const decision =
      this.getPersonMatchDecision(
        screeningId,
        resolution.personGuid
      );

    if (
      decision?.decisionCode !== 'SAME_PERSON'
    ) {
      throw new Error(
        'Resolution requires a confirmed Same Person decision.'
      );
    }

    this._personMatchResolution.set({
      ...resolution,
      allowedActions: [
        ...resolution.allowedActions,
      ],
    });

    this._resolutionError.set(null);
  }

  // ========================================
  // Set Resolution Loading
  // ========================================

  setResolutionLoading(
    loading: boolean
  ): void {

    this._isResolutionLoading.set(
      loading
    );
  }

  // ========================================
  // Set Resolution Error
  // ========================================

  setResolutionError(
    message: string | null,
    requestVersion?: number
  ): void {

    if (
      requestVersion !== undefined &&
      !this.isCurrentResolutionRequest(
        requestVersion
      )
    ) {
      return;
    }

    this._resolutionError.set(message);
  }

  // ========================================
  // Clear Resolution
  // ========================================

  clearPersonMatchResolution(): void {

    this.invalidateResolutionRequest();
  }

  // ========================================
  // Clear Person Match
  // ========================================

  clearPersonMatch(): void {

    ++this._personMatchRequestVersion;

    this._personMatchResponse.set(null);
    this._selectedPersonMatchGuid.set(null);
    this._personMatchError.set(null);
    this._isPersonMatchChecking.set(false);

    this._screeningStatusCode.set(null);

    this.invalidateResolutionRequest();

    // Preserve screeningId and saved
    // decisions until explicitly replaced
    // or the wizard is reset.
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

    ++this._personMatchRequestVersion;

    this.invalidateResolutionRequest();

    this._validSteps.set(
      new Set<NewEmployeeStep>()
    );

    this._verifiedSteps.set(
      new Set<NewEmployeeStep>()
    );

    this._personalDraft.set(null);

    this._personMatchResponse.set(null);
    this._isPersonMatchChecking.set(false);
    this._personMatchError.set(null);
    this._selectedPersonMatchGuid.set(null);

    this._screeningId.set(null);
    this._screeningStatusCode.set(null);

    this._personMatchDecisions.set([]);
    this._isDecisionSubmitting.set(false);
    this._decisionError.set(null);
  }
}

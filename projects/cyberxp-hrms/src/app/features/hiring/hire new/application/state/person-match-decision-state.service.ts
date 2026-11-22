
import {
  Injectable,
  computed,
  signal,
} from '@angular/core';

// ========================================
// Models
// ========================================

import type {
  SamePersonDetails,
} from '../../domain/models/same-person/same-person-details.model';

// ========================================
// Decision Draft Model
// ========================================

export interface PersonMatchDecisionDraft {

  screeningId: string;

  personGuid: string;

  decisionCode: string;

  remarks: string | null;
}

// ========================================
// Person Match Decision State Service
// ========================================

@Injectable()
export class PersonMatchDecisionStateService {

  // ========================================
  // Current Decision Draft
  // ========================================

  private readonly _decisionDraft =
    signal<PersonMatchDecisionDraft | null>(null);

  readonly decisionDraft =
    this._decisionDraft.asReadonly();

  // ========================================
  // Existing Person Details
  // ========================================

  private readonly _samePersonDetails =
    signal<SamePersonDetails | null>(null);

  readonly samePersonDetails =
    this._samePersonDetails.asReadonly();

  // ========================================
  // Details Loading State
  // ========================================

  private readonly _isDetailsLoading =
    signal(false);

  readonly isDetailsLoading =
    this._isDetailsLoading.asReadonly();

  // ========================================
  // Details Error State
  // ========================================

  private readonly _detailsError =
    signal<string | null>(null);

  readonly detailsError =
    this._detailsError.asReadonly();

  // ========================================
  // Decision Draft Error
  // ========================================

  private readonly _draftError =
    signal<string | null>(null);

  readonly draftError =
    this._draftError.asReadonly();

  // ========================================
  // Details Request Version
  // ========================================

  private _detailsRequestVersion = 0;

  // ========================================
  // Computed Decision State
  // ========================================

  readonly hasDecisionDraft = computed(
    () => this._decisionDraft() !== null
  );

  readonly decisionCode = computed(
    () => this._decisionDraft()?.decisionCode ?? null
  );

  readonly selectedPersonGuid = computed(
    () => this._decisionDraft()?.personGuid ?? null
  );

  readonly selectedScreeningId = computed(
    () => this._decisionDraft()?.screeningId ?? null
  );

  // ========================================
  // Computed Decision Types
  // ========================================

  readonly isSamePerson = computed(
    () => this.decisionCode() === 'SAME_PERSON'
  );

  readonly isDifferentPerson = computed(
    () => this.decisionCode() === 'DIFFERENT_PERSON'
  );

  readonly isEscalated = computed(
    () => this.decisionCode() === 'ESCALATE'
  );

  // ========================================
  // Computed Same Person Details
  // ========================================

  readonly hasSamePersonDetails = computed(
    () => this._samePersonDetails() !== null
  );

  readonly employmentStatusCode = computed(
    () =>
      this._samePersonDetails()
        ?.employmentStatusCode ?? null
  );

  readonly rehireEligibilityStatusCode = computed(
    () =>
      this._samePersonDetails()
        ?.rehireEligibilityStatusCode ?? null
  );

  readonly personRestrictionStatusCode = computed(
    () =>
      this._samePersonDetails()
        ?.personRestrictionStatusCode ?? null
  );

  readonly availableActions = computed(
    () =>
      this._samePersonDetails()
        ?.availableActions ?? []
  );

  // ========================================
  // Decision Draft Readiness
  // ========================================

  readonly isDraftReady = computed(() => {

    const draft =
      this._decisionDraft();

    if (!draft) {
      return false;
    }

    if (
      !draft.screeningId.trim() ||
      !draft.personGuid.trim()
    ) {
      return false;
    }

    if (
      draft.decisionCode !== 'SAME_PERSON' &&
      draft.decisionCode !== 'DIFFERENT_PERSON' &&
      draft.decisionCode !== 'ESCALATE'
    ) {
      return false;
    }

    if (
      draft.decisionCode === 'SAME_PERSON' &&
      (
        this._isDetailsLoading() ||
        this._detailsError() !== null ||
        this._samePersonDetails()?.personGuid !==
          draft.personGuid
      )
    ) {
      return false;
    }

    return this._draftError() === null;
  });

  // ========================================
  // Begin Decision Workflow
  // ========================================

  beginDecision(
    screeningId: string,
    personGuid: string,
    decisionCode: string
  ): void {

    // ======================================
    // Validate Decision Context
    // ======================================

    const normalizedScreeningId =
      screeningId.trim();

    const normalizedPersonGuid =
      personGuid.trim();

    const normalizedDecisionCode =
      decisionCode.trim().toUpperCase();

    if (
      !normalizedScreeningId ||
      !normalizedPersonGuid
    ) {
      throw new Error(
        'Screening ID and Person GUID are required.'
      );
    }

    if (
      normalizedDecisionCode !== 'SAME_PERSON' &&
      normalizedDecisionCode !== 'DIFFERENT_PERSON' &&
      normalizedDecisionCode !== 'ESCALATE'
    ) {
      throw new Error(
        `Unsupported person match decision: ${decisionCode}`
      );
    }

    // ======================================
    // Invalidate Previous Details Request
    // ======================================

    ++this._detailsRequestVersion;

    // ======================================
    // Clear Previous Workflow State
    // ======================================

    this._samePersonDetails.set(null);

    this._isDetailsLoading.set(false);

    this._detailsError.set(null);

    this._draftError.set(null);

    // ======================================
    // Store Decision Draft
    // ======================================

    this._decisionDraft.set({
      screeningId: normalizedScreeningId,
      personGuid: normalizedPersonGuid,
      decisionCode: normalizedDecisionCode,
      remarks: null,
    });
  }

  // ========================================
  // Update Decision Remarks
  // ========================================

  setRemarks(
    remarks: string | null
  ): void {

    const draft =
      this._decisionDraft();

    if (!draft) {
      throw new Error(
        'A decision workflow must be started before updating remarks.'
      );
    }

    this._decisionDraft.set({
      ...draft,
      remarks: remarks?.trim() || null,
    });

    this._draftError.set(null);
  }

  // ========================================
  // Set Decision Draft Error
  // ========================================

  setDraftError(
    message: string | null
  ): void {

    this._draftError.set(message);
  }

  // ========================================
  // Begin Same Person Details Request
  // ========================================

  beginDetailsRequest(): number {

    const draft =
      this._decisionDraft();

    if (
      !draft ||
      draft.decisionCode !== 'SAME_PERSON'
    ) {
      throw new Error(
        'Same Person details require an active Same Person decision workflow.'
      );
    }

    const requestVersion =
      ++this._detailsRequestVersion;

    this._samePersonDetails.set(null);

    this._isDetailsLoading.set(true);

    this._detailsError.set(null);

    return requestVersion;
  }

  // ========================================
  // Check Details Request Version
  // ========================================

  isCurrentDetailsRequest(
    requestVersion: number
  ): boolean {

    return (
      requestVersion ===
      this._detailsRequestVersion
    );
  }

  // ========================================
  // Store Same Person Details
  // ========================================

  setSamePersonDetails(
    details: SamePersonDetails,
    requestVersion: number
  ): void {

    // ======================================
    // Reject Outdated Responses
    // ======================================

    if (
      !this.isCurrentDetailsRequest(
        requestVersion
      )
    ) {
      return;
    }

    // ======================================
    // Validate Current Decision
    // ======================================

    const draft =
      this._decisionDraft();

    if (
      !draft ||
      draft.decisionCode !== 'SAME_PERSON'
    ) {
      throw new Error(
        'No active Same Person decision workflow.'
      );
    }

    // ======================================
    // Validate Retrieved Person
    // ======================================

    if (
      details.personGuid.trim().toLowerCase() !==
      draft.personGuid.toLowerCase()
    ) {
      throw new Error(
        'Retrieved person does not match the selected candidate.'
      );
    }

    // ======================================
    // Store Details
    // ======================================

    this._samePersonDetails.set({
      ...details,
      availableActions: [
        ...details.availableActions,
      ],
    });

    this._isDetailsLoading.set(false);

    this._detailsError.set(null);
  }

  // ========================================
  // Store Details Error
  // ========================================

  setDetailsError(
    message: string,
    requestVersion: number
  ): void {

    if (
      !this.isCurrentDetailsRequest(
        requestVersion
      )
    ) {
      return;
    }

    this._samePersonDetails.set(null);

    this._isDetailsLoading.set(false);

    this._detailsError.set(message);
  }

  // ========================================
  // Clear Same Person Details
  // ========================================

  clearSamePersonDetails(): void {

    ++this._detailsRequestVersion;

    this._samePersonDetails.set(null);

    this._isDetailsLoading.set(false);

    this._detailsError.set(null);
  }

  // ========================================
  // Clear Decision Draft
  // ========================================

  clearDecisionDraft(): void {

    ++this._detailsRequestVersion;

    this._decisionDraft.set(null);

    this._samePersonDetails.set(null);

    this._isDetailsLoading.set(false);

    this._detailsError.set(null);

    this._draftError.set(null);
  }

  // ========================================
  // Reset Decision State
  // ========================================

  reset(): void {

    this.clearDecisionDraft();
  }
}

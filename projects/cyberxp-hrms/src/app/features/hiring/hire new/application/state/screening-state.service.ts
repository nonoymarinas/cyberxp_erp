
import {
  Injectable,
  signal,
  computed,
} from '@angular/core';

// ========================================
// Models
// ========================================

import type {
  PersonMatchDecision,
} from '../../domain/models/person-match-decision/person-match-decision.model';

// ========================================
// Screening State Service
// ========================================

@Injectable()
export class ScreeningStateService {

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
  // Computed Screening Session
  // ========================================

  readonly hasScreeningSession = computed(
    () => this._screeningId() !== null
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

  readonly hasConfirmedMatch = computed(() => {

    const screeningId =
      this._screeningId();

    if (!screeningId) {
      return false;
    }

    return this._personMatchDecisions().some(
      decision =>
        decision.screeningId === screeningId &&
        decision.decisionCode === 'SAME_PERSON'
    );
  });

  readonly hasEscalatedDecision = computed(() => {

    const screeningId =
      this._screeningId();

    if (!screeningId) {
      return false;
    }

    return this._personMatchDecisions().some(
      decision =>
        decision.screeningId === screeningId &&
        decision.decisionCode === 'ESCALATE'
    );
  });

  // ========================================
  // Set Screening Session
  // ========================================

  setScreeningSession(
    screeningId: string,
    statusCode: string | null
  ): void {

    // ======================================
    // Validate Screening ID
    // ======================================

    const normalizedId =
      screeningId.trim();

    if (!normalizedId) {

      throw new Error(
        'Screening ID is required.'
      );
    }

    // ======================================
    // Validate Screening Status
    // ======================================

    if (statusCode !== null) {

      this.validateScreeningStatus(
        statusCode
      );
    }

    // ======================================
    // Detect Screening Session Change
    // ======================================

    const previousId =
      this._screeningId();

    if (previousId !== normalizedId) {

      // ====================================
      // Clear Previous Session Decisions
      // ====================================

      this._personMatchDecisions.set([]);

      this._isDecisionSubmitting.set(false);

      this._decisionError.set(null);
    }

    // ======================================
    // Store Screening Session
    // ======================================

    this._screeningId.set(
      normalizedId
    );

    // ======================================
    // Store Screening Status
    // ======================================

    this.setScreeningStatus(
      statusCode
    );
  }

  // ========================================
  // Set Screening Status
  // ========================================

  setScreeningStatus(
    statusCode: string | null
  ): void {

    // ======================================
    // Clear Screening Status
    // ======================================

    if (statusCode === null) {

      this._screeningStatusCode.set(null);

      return;
    }

    // ======================================
    // Validate Screening Status
    // ======================================

    const normalizedCode =
      this.validateScreeningStatus(
        statusCode
      );

    // ======================================
    // Require Screening Session
    // ======================================

    if (!this._screeningId()) {

      throw new Error(
        'A screening session is required before setting its status.'
      );
    }

    // ======================================
    // Update Screening Status
    // ======================================

    this._screeningStatusCode.set(
      normalizedCode
    );
  }

  // ========================================
  // Validate Screening Status
  // ========================================

  private validateScreeningStatus(
    statusCode: string
  ): string {

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

    return normalizedCode;
  }

  // ========================================
  // Add Saved Person Match Decision
  // ========================================

  addPersonMatchDecision(
    decision: PersonMatchDecision
  ): void {

    // ======================================
    // Validate Screening Session
    // ======================================

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

    // ======================================
    // Check Existing Decision
    // ======================================

    const existingDecision =
      this.getPersonMatchDecision(
        screeningId,
        decision.personGuid
      );

    if (existingDecision) {

      throw new Error(
        'A decision already exists for this candidate.'
      );
    }

    // ======================================
    // Store Saved Decision
    // ======================================

    this._personMatchDecisions.update(
      decisions => [
        ...decisions,
        { ...decision },
      ]
    );

    this._decisionError.set(null);
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
  // Check Candidate Decision
  // ========================================

  hasCandidateDecision(
    personGuid: string
  ): boolean {

    const screeningId =
      this._screeningId();

    if (!screeningId) {
      return false;
    }

    return this.getPersonMatchDecision(
      screeningId,
      personGuid
    ) !== null;
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

    this._decisionError.set(
      message
    );
  }

  // ========================================
  // Clear Local Decision Cache
  // ========================================

  clearPersonMatchDecisions(): void {

    this._personMatchDecisions.set([]);

    this._decisionError.set(null);

    // ======================================
    // Important
    // ======================================
    //
    // This only clears local state.
    // It does not delete backend decisions.
  }

  // ========================================
  // Clear Screening Status
  // ========================================

  clearScreeningStatus(): void {

    this._screeningStatusCode.set(null);
  }

  // ========================================
  // Clear Screening Session
  // ========================================

  clearScreeningSession(): void {

    this._screeningId.set(null);

    this._screeningStatusCode.set(null);

    this._personMatchDecisions.set([]);

    this._isDecisionSubmitting.set(false);

    this._decisionError.set(null);
  }

  // ========================================
  // Reset Screening State
  // ========================================

  reset(): void {

    this.clearScreeningSession();
  }
}

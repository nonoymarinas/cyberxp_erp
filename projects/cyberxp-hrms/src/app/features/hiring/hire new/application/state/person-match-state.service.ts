
import {
  Injectable,
  signal,
  computed,
} from '@angular/core';

// ========================================
// Models
// ========================================

import type {
  PersonMatch,
  PersonMatchApiResponse,
} from '../../domain/models/person-match/person-match.model';

// ========================================
// Person Match State Service
// ========================================

@Injectable()
export class PersonMatchStateService {

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

  // ========================================
  // No Matching Candidates
  // ========================================

  readonly hasNoMatchCandidates = computed(
    () =>
      this.hasPersonMatchResponse() &&
      this.personMatches().length === 0
  );

  // ========================================
  // Selected Person Match
  // ========================================

  readonly selectedPersonMatch =
    computed<PersonMatch | null>(() => {

      const personGuid =
        this._selectedPersonMatchGuid();

      if (!personGuid) {
        return null;
      }

      return this.personMatches().find(
        match =>
          match.personGuid === personGuid
      ) ?? null;
    });

  // ========================================
  // Begin Person Match Request
  // ========================================

  beginPersonMatchRequest(): number {

    const requestVersion =
      ++this._personMatchRequestVersion;

    // ======================================
    // Clear Previous Match Results
    // ======================================

    this._personMatchResponse.set(null);

    this._selectedPersonMatchGuid.set(null);

    this._personMatchError.set(null);

    this._isPersonMatchChecking.set(true);

    return requestVersion;
  }

  // ========================================
  // Check Person Match Request Version
  // ========================================

  isCurrentPersonMatchRequest(
    requestVersion: number
  ): boolean {

    return (
      requestVersion ===
      this._personMatchRequestVersion
    );
  }

  // ========================================
  // Store Person Match Response
  // ========================================

  setPersonMatchResponse(
    response: PersonMatchApiResponse,
    requestVersion: number
  ): void {

    // ======================================
    // Reject Outdated Responses
    // ======================================

    if (
      !this.isCurrentPersonMatchRequest(
        requestVersion
      )
    ) {
      return;
    }

    // ======================================
    // Validate Response
    // ======================================

    if (
      !response.success ||
      !Array.isArray(response.data)
    ) {

      this.setPersonMatchError(
        response.message ||
        'Unable to retrieve person matches.',
        requestVersion
      );

      return;
    }

    // ======================================
    // Store Match Results
    // ======================================

    this._personMatchResponse.set({
      ...response,
      data: response.data.map(
        match => ({ ...match })
      ),
    });

    this._isPersonMatchChecking.set(false);

    this._personMatchError.set(null);

    this._selectedPersonMatchGuid.set(null);
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

    this._selectedPersonMatchGuid.set(null);
  }

  // ========================================
  // Select Person Match
  // ========================================

  selectPersonMatch(
    personGuid: string | null
  ): void {

    // ======================================
    // Validate Selected Candidate
    // ======================================

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

    // ======================================
    // Store Selected Candidate
    // ======================================

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
  // Clear Person Match
  // ========================================

  clearPersonMatch(): void {

    // ======================================
    // Invalidate Pending Requests
    // ======================================

    ++this._personMatchRequestVersion;

    // ======================================
    // Clear Matching State
    // ======================================

    this._personMatchResponse.set(null);

    this._selectedPersonMatchGuid.set(null);

    this._personMatchError.set(null);

    this._isPersonMatchChecking.set(false);
  }

  // ========================================
  // Reset Person Match State
  // ========================================

  reset(): void {

    this.clearPersonMatch();
  }
}

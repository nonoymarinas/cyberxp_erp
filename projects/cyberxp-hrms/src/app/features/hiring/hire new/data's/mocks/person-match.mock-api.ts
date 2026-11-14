
import {
  Observable,
  defer,
  of,
  delay,
  throwError,
} from 'rxjs';

// ========================================
// DTO Models
// ========================================

import {
  PersonMatchApiResponseDto,
  PersonMatchResponseDto,
} from '../../models/personal-info/person-match-response.dto.model';

// ========================================
// Application Models
// ========================================

import {
  PersonMatchResolution,
} from '../../models/personal-info/person-match-resolution.model';

import {
  PersonMatchSearchRequest,
} from '../../models/personal-info/person-match-request.model';

import {
  SubmitPersonMatchDecisionRequest,
  SubmitPersonMatchDecisionResponse,
} from '../../models/personal-info/person-match-decision.model';

// ========================================
// Mock Matcher
// ========================================

import {
  findPersonMatches,
  findMockPersonByGuid,
} from './person-match.matcher';

// ========================================
// Mock Data
// ========================================

import {
  PERSON_MATCH_RESOLUTION_MOCKS,
} from './person-match.mock-data';

// ========================================
// Configuration
// ========================================

const MOCK_API_DELAY = 500;

// ========================================
// Mock Decision Storage
// ========================================

// Temporary in-memory storage.
// Decisions are lost when the application reloads.

const MOCK_DECISIONS = new Map<
  string,
  SubmitPersonMatchDecisionResponse
>();

// ========================================
// Check Person Match Mock API
// ========================================

export function checkPersonMatchMockApi(
  request: PersonMatchSearchRequest
): Observable<PersonMatchApiResponseDto> {

  return defer(() => {

    // ======================================
    // Execute Matching Algorithm
    // ======================================

    const matches = findPersonMatches(request);

    // ======================================
    // Check Blocklist
    // ======================================

    const hasBlocklistMatch = matches.some(
      person =>
        PERSON_MATCH_RESOLUTION_MOCKS[
          person.personGuid
        ]?.isBlocklisted === true
    );

    // ======================================
    // Build DTO
    // ======================================

    const data: PersonMatchResponseDto = {
      status: hasBlocklistMatch
        ? 'HOLD'
        : matches.length > 0
          ? 'REVIEW'
          : 'CLEAR',

      hasPossibleMatch: matches.length > 0,
      hasBlocklistMatch,

      totalMatches: matches.length,
      matches,
    };

    // ======================================
    // Build API Response
    // ======================================

    const response: PersonMatchApiResponseDto = {
      success: true,
      message: 'Person matching completed successfully.',
      errorCode: null,
      data,
    };

    return of(response);

  }).pipe(
    delay(MOCK_API_DELAY)
  );
}

// ========================================
// Get Person Match Resolution Mock API
// ========================================

export function getPersonMatchResolutionMockApi(
  personGuid: string
): Observable<PersonMatchResolution> {

  return defer(() => {

    // ======================================
    // Validate Existing Person
    // ======================================

    const person = findMockPersonByGuid(
      personGuid
    );

    if (!person) {
      return throwError(() =>
        new Error(
          `Person not found: ${personGuid}`
        )
      );
    }

    // ======================================
    // Retrieve Resolution
    // ======================================

    const resolution =
      PERSON_MATCH_RESOLUTION_MOCKS[
        personGuid
      ];

    if (!resolution) {
      return throwError(() =>
        new Error(
          `Person resolution not found: ${personGuid}`
        )
      );
    }

    // ======================================
    // Return Resolution
    // ======================================

    return of({
      ...resolution,
      allowedActions: [
        ...resolution.allowedActions,
      ],
    });

  }).pipe(
    delay(MOCK_API_DELAY)
  );
}

// ========================================
// Submit Person Match Decision Mock API
// ========================================

export function submitPersonMatchDecisionMockApi(
  request: SubmitPersonMatchDecisionRequest
): Observable<SubmitPersonMatchDecisionResponse> {

  return defer(() => {

    // ======================================
    // Validate Existing Person
    // ======================================

    const person = findMockPersonByGuid(
      request.personGuid
    );

    if (!person) {
      return throwError(() =>
        new Error(
          `Person not found: ${request.personGuid}`
        )
      );
    }

    // ======================================
    // Validate Decision
    // ======================================

    const validDecisions = [
      'CONFIRMED',
      'DISMISSED',
      'ESCALATED',
    ];

    if (!validDecisions.includes(request.decision)) {
      return throwError(() =>
        new Error('Invalid match decision.')
      );
    }

    // ======================================
    // Validate Reason
    // ======================================

    const reason = request.reason.trim();

    if (reason.length < 10) {
      return throwError(() =>
        new Error(
          'Verification reason must contain at least 10 characters.'
        )
      );
    }

    // ======================================
    // Prevent Duplicate Decision
    // ======================================

    if (MOCK_DECISIONS.has(request.personGuid)) {
      return throwError(() =>
        new Error(
          'A decision has already been submitted for this person.'
        )
      );
    }

    // ======================================
    // Create Decision Response
    // ======================================

    const result: SubmitPersonMatchDecisionResponse = {
      screeningId:
        `MOCK-SCR-${request.personGuid}`,

      personGuid: request.personGuid,
      decision: request.decision,
      reason,
    };

    // ======================================
    // Save Mock Decision
    // ======================================

    MOCK_DECISIONS.set(
      request.personGuid,
      result
    );

    // ======================================
    // Return Response
    // ======================================

    return of({
      ...result,
    });

  }).pipe(
    delay(MOCK_API_DELAY)
  );
}

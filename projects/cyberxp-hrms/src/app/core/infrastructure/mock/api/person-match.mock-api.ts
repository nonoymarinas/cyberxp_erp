
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

import type {
  PersonMatchApiResponseDto,
  PersonMatchResponseDto,
} from '../../../../features/hiring/hire new/models/personal-info/person-match-response.dto.model';

// ========================================
// Application Models
// ========================================

import type {
  PersonMatchResolution,
} from '../../../../features/hiring/hire new/models/personal-info/person-match-resolution.model';

import type {
  PersonMatchSearchRequest,
} from '../../../../features/hiring/hire new/models/personal-info/person-match-request.model';

import type {
  SubmitPersonMatchDecisionRequest,
  SubmitPersonMatchDecisionResponse,
} from '../../../../features/hiring/hire new/models/personal-info/person-match-decision.model';

// ========================================
// Mock Person Repository
// ========================================

import {
  findPersonMatches,
  findMockPersonByGuid,
} from '../repository/person.mock-repository';

// ========================================
// General Mock Data
// ========================================

import {
  PERSON_MOCK_DATA,
} from '../data/person.mock-data';

import {
  EMPLOYMENT_MOCK_DATA,
} from '../data/employment.mock-data';

import type {
  MockEmploymentStatus,
} from '../data/employment.mock-data';

// ========================================
// Configuration
// ========================================

const MOCK_API_DELAY = 500;

// ========================================
// Original Resolution Fixtures
// ========================================

const LEGACY_RESOLUTIONS: Record<
  string,
  PersonMatchResolution
> = {
  'mock-person-001': {
    screeningId: 'SCR000001',
    personGuid: 'mock-person-001',
    personNumber: 'PER000123',
    fullName: 'Juan Santos Dela Cruz',
    employmentStatus: 'ACTIVE',
    isBlocklisted: false,
    allowedActions: ['VIEW_EMPLOYEE'],
  },

  'mock-person-002': {
    screeningId: 'SCR000002',
    personGuid: 'mock-person-002',
    personNumber: 'PER000287',
    fullName: 'Juan Dela Cruz',
    employmentStatus: 'RESIGNED',
    isBlocklisted: false,
    allowedActions: ['VIEW_EMPLOYEE', 'REHIRE'],
  },

  'mock-person-003': {
    screeningId: 'SCR000003',
    personGuid: 'mock-person-003',
    personNumber: 'PER000415',
    fullName: 'Juan S Cruz',
    employmentStatus: 'TERMINATED',
    isBlocklisted: true,
    allowedActions: [
      'VIEW_EMPLOYEE',
      'BLOCKLIST_REVIEW',
    ],
  },
};

// ========================================
// Mock Decision Storage
// ========================================

const MOCK_DECISIONS = new Map<
  string,
  SubmitPersonMatchDecisionResponse
>();

// ========================================
// Employment Status Mapping
// ========================================

// Only return values supported by the
// existing matching resolution fixtures.
//
// Do not misrepresent retirement or
// contract completion as resignation.

function mapEmploymentStatus(
  status: MockEmploymentStatus
): PersonMatchResolution['employmentStatus'] {

  switch (status) {
    case 'ACTIVE':
      return 'ACTIVE';

    case 'RESIGNED':
      return 'RESIGNED';

    case 'TERMINATED':
      return 'TERMINATED';

    case 'RETIRED':
    case 'END_OF_CONTRACT':
      throw new Error(
        `Employment status "${status}" is not yet supported by PersonMatchResolution.`
      );
  }
}

// ========================================
// Build Person Match Resolution
// ========================================

function buildPersonMatchResolution(
  personGuid: string
): PersonMatchResolution | null {

  // ======================================
  // Preserve Original Test Scenarios
  // ======================================

  const legacy = LEGACY_RESOLUTIONS[personGuid];

  if (legacy) {
    return {
      ...legacy,
      allowedActions: [...legacy.allowedActions],
    };
  }

  // ======================================
  // Find Person
  // ======================================

  const person = PERSON_MOCK_DATA.find(
    item => item.personGuid === personGuid
  );

  if (!person) {
    return null;
  }

  // ======================================
  // Find Latest Employment
  // ======================================

  const latestEmployment = EMPLOYMENT_MOCK_DATA
    .filter(
      employment =>
        employment.personGuid === personGuid
    )
    .sort(
      (a, b) =>
        b.hireDate.localeCompare(a.hireDate)
    )[0];

  if (!latestEmployment) {
    return null;
  }

  // ======================================
  // Map Employment Status
  // ======================================

  const employmentStatus = mapEmploymentStatus(
    latestEmployment.status
  );

  // ======================================
  // Allowed Actions
  // ======================================

  const allowedActions:
    PersonMatchResolution['allowedActions'] = [
      'VIEW_EMPLOYEE',
    ];

  // This is mock navigation permission,
  // not final rehire eligibility approval.

  if (employmentStatus === 'RESIGNED') {
    allowedActions.push('REHIRE');
  }

  // ======================================
  // Build Resolution
  // ======================================

  return {
    screeningId: `MOCK-SCR-${personGuid}`,

    personGuid: person.personGuid,
    personNumber: person.personNumber,

    fullName: [
      person.firstName,
      person.middleName,
      person.lastName,
    ]
      .filter(Boolean)
      .join(' '),

    employmentStatus,
    isBlocklisted: false,
    allowedActions,
  };
}

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
        LEGACY_RESOLUTIONS[
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

    const person = findMockPersonByGuid(personGuid);

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
      buildPersonMatchResolution(personGuid);

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
      allowedActions: [...resolution.allowedActions],
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

    const validDecisions:
      SubmitPersonMatchDecisionRequest['decision'][] = [
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

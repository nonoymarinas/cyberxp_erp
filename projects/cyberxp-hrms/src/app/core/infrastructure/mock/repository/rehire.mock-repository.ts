
import {
  PERSON_MOCK_DATA,
} from '../data/shared/person.mock-data';

import type {
  MockPersonRecord,
} from '../data/shared/person.mock-data';

import {
  PERSON_PROFILE_MOCK_DATA,
} from '../data/person-rehire-data/person-profile.mock-data';

import type {
  MockPersonProfileRecord,
} from '../data/person-rehire-data/person-profile.mock-data';

import {
  REHIRE_REQUEST_MOCK_DATA,
} from '../data/person-rehire-data/rehire-request.mock-data';

import type {
  MockRehireRequestRecord,
} from '../data/person-rehire-data/rehire-request.mock-data';

import {
  findMockLatestEmployment,
  findMockEmploymentSeparation,
  hasMockActiveEmployment,
} from './employment.mock-repository';

import type {
  MockEmploymentRecord,
} from '../data/shared/employment.mock-data';

import type {
  MockEmploymentSeparationRecord,
} from '../data/person-rehire-data/employment-separation.mock-data';

import {
  findMockActivePersonRestrictions,
  isMockPersonBlocklisted,
} from './person-restriction.mock-repository';

import type {
  MockPersonRestrictionRecord,
} from '../data/person-rehire-data/person-restriction.mock-data';

/* ========================================
   Rehire Candidate Repository Record
   ======================================== */

export interface MockRehireCandidateRecord {
  person: MockPersonRecord;
  profile: MockPersonProfileRecord | null;

  employment: MockEmploymentRecord | null;
  separation: MockEmploymentSeparationRecord | null;

  restrictions: MockPersonRestrictionRecord[];

  isBlocklisted: boolean;
  hasActiveEmployment: boolean;

  hasPendingRehireRequest: boolean;
}

/* ========================================
   Find Rehire Candidate By Person GUID
   ======================================== */

export function findMockRehireCandidate(
  personGuid: string
): MockRehireCandidateRecord | undefined {

  // ======================================
  // Find Person
  // ======================================

  const person = PERSON_MOCK_DATA.find(
    item => item.personGuid === personGuid
  );

  if (!person) {
    return undefined;
  }

  // ======================================
  // Find Profile
  // ======================================

  const profile =
    PERSON_PROFILE_MOCK_DATA.find(
      item => item.personGuid === personGuid
    ) ?? null;

  // ======================================
  // Find Latest Employment
  // ======================================

  const employment =
    findMockLatestEmployment(personGuid) ?? null;

  // ======================================
  // Find Separation
  // ======================================

  const separation = employment
    ? findMockEmploymentSeparation(
        employment.employmentGuid
      ) ?? null
    : null;

  // ======================================
  // Find Restrictions
  // ======================================

  const restrictions =
    findMockActivePersonRestrictions(personGuid);

  // ======================================
  // Check Pending Rehire Request
  // ======================================

  const hasPendingRehireRequest =
    REHIRE_REQUEST_MOCK_DATA.some(
      request =>
        request.personGuid === personGuid &&
        request.status === 'PENDING_APPROVAL'
    );

  // ======================================
  // Build Candidate Record
  // ======================================

  return {
    person,
    profile,
    employment,
    separation,

    restrictions,

    isBlocklisted:
      isMockPersonBlocklisted(personGuid),

    hasActiveEmployment:
      hasMockActiveEmployment(personGuid),

    hasPendingRehireRequest,
  };
}

/* ========================================
   Find Rehire Requests By Person
   ======================================== */

export function findMockRehireRequestsByPerson(
  personGuid: string
): MockRehireRequestRecord[] {

  return REHIRE_REQUEST_MOCK_DATA
    .filter(
      request =>
        request.personGuid === personGuid
    )
    .sort(
      (a, b) =>
        b.requestedAt.localeCompare(a.requestedAt)
    );
}

/* ========================================
   Find Rehire Request By GUID
   ======================================== */

export function findMockRehireRequestByGuid(
  rehireRequestGuid: string
): MockRehireRequestRecord | undefined {

  return REHIRE_REQUEST_MOCK_DATA.find(
    request =>
      request.rehireRequestGuid === rehireRequestGuid
  );
}

/* ========================================
   Check Pending Rehire Request
   ======================================== */

export function hasMockPendingRehireRequest(
  personGuid: string
): boolean {

  return REHIRE_REQUEST_MOCK_DATA.some(
    request =>
      request.personGuid === personGuid &&
      request.status === 'PENDING_APPROVAL'
  );
}

/* ========================================
   Save Mock Rehire Request
   ======================================== */

export function saveMockRehireRequest(
  request: MockRehireRequestRecord
): MockRehireRequestRecord {

  // ======================================
  // Validate Duplicate Request GUID
  // ======================================

  if (
    findMockRehireRequestByGuid(
      request.rehireRequestGuid
    )
  ) {
    throw new Error(
      'Rehire request GUID already exists.'
    );
  }

  // ======================================
  // Validate Duplicate Request Number
  // ======================================

  if (
    REHIRE_REQUEST_MOCK_DATA.some(
      item =>
        item.rehireRequestNumber ===
        request.rehireRequestNumber
    )
  ) {
    throw new Error(
      'Rehire request number already exists.'
    );
  }

  // ======================================
  // Prevent Multiple Pending Requests
  // ======================================

  if (
    request.status === 'PENDING_APPROVAL' &&
    hasMockPendingRehireRequest(request.personGuid)
  ) {
    throw new Error(
      'A pending rehire request already exists for this person.'
    );
  }

  // ======================================
  // Save In Memory
  // ======================================

  REHIRE_REQUEST_MOCK_DATA.push({
    ...request,
  });

  return {
    ...request,
  };
}

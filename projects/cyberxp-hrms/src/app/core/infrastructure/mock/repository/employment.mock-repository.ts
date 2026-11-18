
import {
  EMPLOYMENT_MOCK_DATA,
} from '../data/shared/employment.mock-data';

import type {
  MockEmploymentRecord,
} from '../data/shared/employment.mock-data';

import {
  EMPLOYMENT_SEPARATION_MOCK_DATA,
} from '../data/person-rehire-data/employment-separation.mock-data';

import type {
  MockEmploymentSeparationRecord,
} from '../data/person-rehire-data/employment-separation.mock-data';

/* ========================================
   Find Employment By GUID
   ======================================== */

export function findMockEmploymentByGuid(
  employmentGuid: string
): MockEmploymentRecord | undefined {

  return EMPLOYMENT_MOCK_DATA.find(
    employment =>
      employment.employmentGuid === employmentGuid
  );
}

/* ========================================
   Find Employment History By Person
   ======================================== */

export function findMockEmploymentHistory(
  personGuid: string
): MockEmploymentRecord[] {

  return EMPLOYMENT_MOCK_DATA
    .filter(
      employment =>
        employment.personGuid === personGuid
    )
    .sort(
      (a, b) =>
        b.hireDate.localeCompare(a.hireDate) ||
        b.employmentGuid.localeCompare(a.employmentGuid)
    );
}

/* ========================================
   Find Latest Employment
   ======================================== */

export function findMockLatestEmployment(
  personGuid: string
): MockEmploymentRecord | undefined {

  return findMockEmploymentHistory(personGuid)[0];
}

/* ========================================
   Find Separation By Employment
   ======================================== */

export function findMockEmploymentSeparation(
  employmentGuid: string
): MockEmploymentSeparationRecord | undefined {

  return EMPLOYMENT_SEPARATION_MOCK_DATA.find(
    separation =>
      separation.employmentGuid === employmentGuid
  );
}

/* ========================================
   Check Active Employment
   ======================================== */

export function hasMockActiveEmployment(
  personGuid: string
): boolean {

  return EMPLOYMENT_MOCK_DATA.some(
    employment =>
      employment.personGuid === personGuid &&
      employment.status === 'ACTIVE'
  );
}

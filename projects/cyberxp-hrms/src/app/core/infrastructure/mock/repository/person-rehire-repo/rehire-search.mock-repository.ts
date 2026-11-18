
import {
  PERSON_MOCK_DATA,
} from '../../data/shared/person.mock-data';

import type {
  MockPersonRecord,
} from '../../data/shared/person.mock-data';

import {
  EMPLOYMENT_MOCK_DATA,
} from '../../data/shared/employment.mock-data';

import type {
  MockEmploymentRecord,
} from '../../data/shared/employment.mock-data';

import {
  EMPLOYMENT_SEPARATION_MOCK_DATA,
} from '../../data/person-rehire-data/employment-separation.mock-data';

import type {
  MockEmploymentSeparationRecord,
} from '../../data/person-rehire-data/employment-separation.mock-data';

/* ========================================
   Repository Record
   ======================================== */

export interface MockFormerEmployeeRecord {
  person: MockPersonRecord;
  employment: MockEmploymentRecord;
  separation: MockEmploymentSeparationRecord | null;
}

/* ========================================
   Normalize Search Text
   ======================================== */

function normalize(value: string): string {
  return value
    .normalize('NFKC')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ');
}

/* ========================================
   Find Latest Employment
   ======================================== */

function findLatestEmployment(
  personGuid: string
): MockEmploymentRecord | undefined {

  return EMPLOYMENT_MOCK_DATA
    .filter(
      employment =>
        employment.personGuid === personGuid
    )
    .sort(
      (a, b) =>
        b.hireDate.localeCompare(a.hireDate) ||
        b.employmentGuid.localeCompare(a.employmentGuid)
    )[0];
}

/* ========================================
   Find Employment Separation
   ======================================== */

function findEmploymentSeparation(
  employmentGuid: string
): MockEmploymentSeparationRecord | null {

  return EMPLOYMENT_SEPARATION_MOCK_DATA.find(
    separation =>
      separation.employmentGuid === employmentGuid
  ) ?? null;
}

/* ========================================
   Build Person Full Name
   ======================================== */

function getFullName(
  person: MockPersonRecord
): string {

  return [
    person.firstName,
    person.middleName,
    person.lastName,
  ]
    .filter(Boolean)
    .join(' ');
}

/* ========================================
   Search Employees For Rehire Review
   ======================================== */

export function searchMockFormerEmployees(
  keyword: string,
  employmentStatus?: string | null
): MockFormerEmployeeRecord[] {

  // ======================================
  // Normalize Keyword
  // ======================================

  const query = normalize(keyword);

  // ======================================
  // Require Search Keyword
  // ======================================

  if (!query) {
    return [];
  }

  // ======================================
  // Normalize Status Filter
  // ======================================

  const statusFilter =
    employmentStatus?.trim().toUpperCase() ?? '';

  // ======================================
  // Prepare Results
  // ======================================

  const results: MockFormerEmployeeRecord[] = [];

  // ======================================
  // Search Person Records
  // ======================================

  for (const person of PERSON_MOCK_DATA) {

    // ====================================
    // Retrieve Latest Employment
    // ====================================

    const employment = findLatestEmployment(
      person.personGuid
    );

    // Only persons with employment
    // history are included.

    if (!employment) {
      continue;
    }

    // ====================================
    // Apply Employment Status Filter
    // ====================================

    if (
      statusFilter &&
      employment.status !== statusFilter
    ) {
      continue;
    }

    // ====================================
    // Build Full Name
    // ====================================

    const fullName = getFullName(person);

    // ====================================
    // Build Searchable Fields
    // ====================================

    const searchable = normalize([
      fullName,
      person.firstName,
      person.middleName,
      person.lastName,
      person.personNumber,

      employment.employeeNumber,

      employment.departmentName ?? '',
      employment.positionName ?? '',
      employment.workLocationName ?? '',
    ].join(' '));

    // ====================================
    // Match Search Keyword
    // ====================================

    if (!searchable.includes(query)) {
      continue;
    }

    // ====================================
    // Retrieve Separation
    // ====================================

    const separation = findEmploymentSeparation(
      employment.employmentGuid
    );

    // ====================================
    // Build Repository Result
    // ====================================

    results.push({
      person,
      employment,
      separation,
    });
  }

  // ======================================
  // Sort Results By Employee Name
  // ======================================

  return results.sort((a, b) => {

    const nameA = normalize([
      a.person.lastName,
      a.person.firstName,
      a.person.middleName,
    ].join(' '));

    const nameB = normalize([
      b.person.lastName,
      b.person.firstName,
      b.person.middleName,
    ].join(' '));

    return (
      nameA.localeCompare(nameB) ||
      a.person.personGuid.localeCompare(
        b.person.personGuid
      )
    );
  });
}

/* ========================================
   Find Employee By Person GUID
   ======================================== */

export function findMockFormerEmployeeByGuid(
  personGuid: string
): MockFormerEmployeeRecord | undefined {

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
  // Retrieve Latest Employment
  // ======================================

  const employment = findLatestEmployment(
    personGuid
  );

  if (!employment) {
    return undefined;
  }

  // ======================================
  // Retrieve Separation
  // ======================================

  const separation = findEmploymentSeparation(
    employment.employmentGuid
  );

  // ======================================
  // Return Employee
  // ======================================

  return {
    person,
    employment,
    separation,
  };
}

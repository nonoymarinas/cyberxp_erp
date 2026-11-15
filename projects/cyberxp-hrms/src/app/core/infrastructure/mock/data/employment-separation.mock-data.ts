
import {
  EMPLOYMENT_MOCK_DATA,
} from './employment.mock-data';

/* ========================================
   Employment Separation Types
   ======================================== */

export type MockSeparationType =
  | 'RESIGNATION'
  | 'TERMINATION'
  | 'RETIREMENT'
  | 'CONTRACT_EXPIRATION'
  | 'PROJECT_COMPLETION';

export type MockSeparationClearanceStatus =
  | 'PENDING'
  | 'IN_PROGRESS'
  | 'CLEARED'
  | 'WITH_HOLDINGS';

export interface MockEmploymentSeparationRecord {
  separationGuid: string;
  employmentGuid: string;

  separationType: MockSeparationType;
  effectiveDate: string;
  reason: string;

  clearanceStatus: MockSeparationClearanceStatus;

  remarks: string | null;
}

/* ========================================
   Employment Separation Mock Data
   ======================================== */

export const EMPLOYMENT_SEPARATION_MOCK_DATA:
  MockEmploymentSeparationRecord[] = [

  // ========================================
  // Person 002 - Resigned
  // ========================================

  {
    separationGuid: 'mock-separation-002',
    employmentGuid: 'mock-employment-002',

    separationType: 'RESIGNATION',
    effectiveDate: '2025-12-31',
    reason: 'Voluntary Resignation',

    clearanceStatus: 'CLEARED',
    remarks: null,
  },

  // ========================================
  // Person 003 - Terminated
  // ========================================

  {
    separationGuid: 'mock-separation-003',
    employmentGuid: 'mock-employment-003',

    separationType: 'TERMINATION',
    effectiveDate: '2024-11-30',
    reason: 'Termination - Policy Violation',

    clearanceStatus: 'WITH_HOLDINGS',
    remarks: 'For HR and management review.',
  },

  // ========================================
  // Person 004 - Contract Expiration
  // ========================================

  {
    separationGuid: 'mock-separation-004',
    employmentGuid: 'mock-employment-004',

    separationType: 'CONTRACT_EXPIRATION',
    effectiveDate: '2025-09-15',
    reason: 'Contract Expiration',

    clearanceStatus: 'CLEARED',
    remarks: null,
  },

  // ========================================
  // Person 005 - Resigned
  // ========================================

  {
    separationGuid: 'mock-separation-005',
    employmentGuid: 'mock-employment-005',

    separationType: 'RESIGNATION',
    effectiveDate: '2025-04-30',
    reason: 'Voluntary Resignation',

    clearanceStatus: 'CLEARED',
    remarks: null,
  },

  // ========================================
  // Person 006 - Terminated
  // ========================================

  {
    separationGuid: 'mock-separation-006',
    employmentGuid: 'mock-employment-006',

    separationType: 'TERMINATION',
    effectiveDate: '2025-06-20',
    reason: 'Termination - Policy Violation',

    clearanceStatus: 'WITH_HOLDINGS',
    remarks: 'Outstanding clearance requirements.',
  },

  // ========================================
  // Person 007 - Resigned
  // ========================================

  {
    separationGuid: 'mock-separation-007',
    employmentGuid: 'mock-employment-007',

    separationType: 'RESIGNATION',
    effectiveDate: '2025-03-31',
    reason: 'Voluntary Resignation',

    clearanceStatus: 'CLEARED',
    remarks: null,
  },

  // ========================================
  // Person 008 - Retired
  // ========================================

  {
    separationGuid: 'mock-separation-008',
    employmentGuid: 'mock-employment-008',

    separationType: 'RETIREMENT',
    effectiveDate: '2024-12-31',
    reason: 'Retirement',

    clearanceStatus: 'CLEARED',
    remarks: null,
  },

  // ========================================
  // Person 010 - Resigned
  // ========================================

  {
    separationGuid: 'mock-separation-010',
    employmentGuid: 'mock-employment-010',

    separationType: 'RESIGNATION',
    effectiveDate: '2025-08-10',
    reason: 'Voluntary Resignation',

    clearanceStatus: 'CLEARED',
    remarks: null,
  },

  // ========================================
  // Person 012 - Contract Expiration
  // ========================================

  {
    separationGuid: 'mock-separation-012',
    employmentGuid: 'mock-employment-012',

    separationType: 'CONTRACT_EXPIRATION',
    effectiveDate: '2025-01-09',
    reason: 'Contract Expiration',

    clearanceStatus: 'CLEARED',
    remarks: null,
  },

  // ========================================
  // Person 013 - Terminated
  // ========================================

  {
    separationGuid: 'mock-separation-013',
    employmentGuid: 'mock-employment-013',

    separationType: 'TERMINATION',
    effectiveDate: '2025-05-15',
    reason: 'Termination',

    clearanceStatus: 'IN_PROGRESS',
    remarks: 'Pending final HR clearance.',
  },

  // ========================================
  // Person 014 - Resigned
  // ========================================

  {
    separationGuid: 'mock-separation-014',
    employmentGuid: 'mock-employment-014',

    separationType: 'RESIGNATION',
    effectiveDate: '2025-10-01',
    reason: 'Voluntary Resignation',

    clearanceStatus: 'CLEARED',
    remarks: null,
  },

  // ========================================
  // Person 016 - Resigned
  // ========================================

  {
    separationGuid: 'mock-separation-016',
    employmentGuid: 'mock-employment-016',

    separationType: 'RESIGNATION',
    effectiveDate: '2025-09-30',
    reason: 'Voluntary Resignation',

    clearanceStatus: 'CLEARED',
    remarks: null,
  },

  // ========================================
  // Person 017 - Retired
  // ========================================

  {
    separationGuid: 'mock-separation-017',
    employmentGuid: 'mock-employment-017',

    separationType: 'RETIREMENT',
    effectiveDate: '2025-04-01',
    reason: 'Retirement',

    clearanceStatus: 'CLEARED',
    remarks: null,
  },

  // ========================================
  // Person 019 - Project Completion
  // ========================================

  {
    separationGuid: 'mock-separation-019',
    employmentGuid: 'mock-employment-019',

    separationType: 'PROJECT_COMPLETION',
    effectiveDate: '2025-12-31',
    reason: 'Project Completion',

    clearanceStatus: 'CLEARED',
    remarks: null,
  },

  // ========================================
  // Person 020 - Resigned
  // ========================================

  {
    separationGuid: 'mock-separation-020',
    employmentGuid: 'mock-employment-020',

    separationType: 'RESIGNATION',
    effectiveDate: '2025-11-01',
    reason: 'Voluntary Resignation',

    clearanceStatus: 'CLEARED',
    remarks: null,
  },
];

/* ========================================
   Validate Separation Mock Data
   ======================================== */

export function validateEmploymentSeparationMockData(): string[] {
  const errors: string[] = [];

  const employmentByGuid = new Map(
    EMPLOYMENT_MOCK_DATA.map(employment => [
      employment.employmentGuid,
      employment,
    ])
  );

  const seenEmploymentGuids = new Set<string>();

  for (const separation of EMPLOYMENT_SEPARATION_MOCK_DATA) {

    const employment = employmentByGuid.get(
      separation.employmentGuid
    );

    if (!employment) {
      errors.push(
        `Separation ${separation.separationGuid} references unknown employment ${separation.employmentGuid}.`
      );
      continue;
    }

    if (employment.status === 'ACTIVE') {
      errors.push(
        `Active employment ${employment.employmentGuid} cannot have a completed separation.`
      );
    }

    if (employment.separationDate !== separation.effectiveDate) {
      errors.push(
        `Separation date mismatch for ${employment.employmentGuid}.`
      );
    }

    if (seenEmploymentGuids.has(separation.employmentGuid)) {
      errors.push(
        `Duplicate separation for ${separation.employmentGuid}.`
      );
    }

    seenEmploymentGuids.add(separation.employmentGuid);
  }

  for (const employment of EMPLOYMENT_MOCK_DATA) {
    if (
      employment.status !== 'ACTIVE' &&
      !seenEmploymentGuids.has(employment.employmentGuid)
    ) {
      errors.push(
        `Missing separation for ${employment.employmentGuid}.`
      );
    }
  }

  return errors;
}

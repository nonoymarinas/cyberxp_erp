
import {
  EMPLOYMENT_MOCK_DATA,
} from '../shared/employment.mock-data';

// ========================================
// Employment Separation Type Reference
// ========================================

import {
  findMockEmploymentSeparationTypeByCode,
} from '../../repository/reference-repo/employment-separation-type-ref.mock-repository';

// ========================================
// Employment Clearance Status Reference
// ========================================

import {
  findMockEmploymentClearanceStatusByCode,
} from '../../repository/reference-repo/employment-clearance-status-ref.mock-repository';

/* ========================================
   Employment Separation Record
   ======================================== */

export interface MockEmploymentSeparationRecord {

  separationGuid: string;
  employmentGuid: string;

  // Database-driven reference codes

  separationType: string;

  effectiveDate: string;
  reason: string;

  clearanceStatus: string;

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
   Validate Employment Separation Mock Data
   ======================================== */

export function validateEmploymentSeparationMockData(): string[] {

  const errors: string[] = [];

  // ======================================
  // Employment Lookup
  // ======================================

  const employmentByGuid = new Map(
    EMPLOYMENT_MOCK_DATA.map(employment => [
      employment.employmentGuid,
      employment,
    ])
  );

  // ======================================
  // Duplicate Tracking
  // ======================================

  const seenSeparationGuids =
    new Set<string>();

  const seenEmploymentGuids =
    new Set<string>();

  // ======================================
  // Validate Separation Records
  // ======================================

  for (const separation of EMPLOYMENT_SEPARATION_MOCK_DATA) {

    // ====================================
    // Validate Separation GUID
    // ====================================

    if (seenSeparationGuids.has(separation.separationGuid)) {

      errors.push(
        `Duplicate separation GUID: ${separation.separationGuid}.`
      );
    }

    seenSeparationGuids.add(separation.separationGuid);

    // ====================================
    // Validate Employment GUID
    // ====================================

    if (seenEmploymentGuids.has(separation.employmentGuid)) {

      errors.push(
        `Duplicate separation for employment ${separation.employmentGuid}.`
      );
    }

    seenEmploymentGuids.add(separation.employmentGuid);

    // ====================================
    // Validate Separation Type Reference
    // ====================================

    const separationType =
      findMockEmploymentSeparationTypeByCode(
        separation.separationType
      );

    if (!separationType) {

      errors.push(
        `Unknown separation type "${separation.separationType}" for ${separation.separationGuid}.`
      );

    } else if (!separationType.isActive) {

      errors.push(
        `Inactive separation type "${separation.separationType}" for ${separation.separationGuid}.`
      );
    }

    // ====================================
    // Validate Clearance Status Reference
    // ====================================

    const clearanceStatus =
      findMockEmploymentClearanceStatusByCode(
        separation.clearanceStatus
      );

    if (!clearanceStatus) {

      errors.push(
        `Unknown clearance status "${separation.clearanceStatus}" for ${separation.separationGuid}.`
      );

    } else if (!clearanceStatus.isActive) {

      errors.push(
        `Inactive clearance status "${separation.clearanceStatus}" for ${separation.separationGuid}.`
      );
    }

    // ====================================
    // Find Employment Record
    // ====================================

    const employment = employmentByGuid.get(
      separation.employmentGuid
    );

    if (!employment) {

      errors.push(
        `Separation ${separation.separationGuid} references unknown employment ${separation.employmentGuid}.`
      );

      continue;
    }

    // ====================================
    // Validate Employment Status
    // ====================================

    if (employment.status === 'ACTIVE') {

      errors.push(
        `Active employment ${employment.employmentGuid} cannot have a completed separation.`
      );
    }

    if (employment.status === 'INACTIVE') {

      errors.push(
        `Inactive employment ${employment.employmentGuid} should not have a completed separation without an ended employment status.`
      );
    }

    // ====================================
    // Validate Separation Date
    // ====================================

    if (
      employment.separationDate !==
      separation.effectiveDate
    ) {

      errors.push(
        `Separation date mismatch for ${employment.employmentGuid}: employment=${employment.separationDate}, separation=${separation.effectiveDate}.`
      );
    }

    // ====================================
    // Validate Separation Type Consistency
    // ====================================

    const expectedTypes: Record<string, string[]> = {
      RESIGNED: ['RESIGNATION'],
      TERMINATED: ['TERMINATION'],
      RETIRED: ['RETIREMENT'],
      END_OF_CONTRACT: [
        'CONTRACT_EXPIRATION',
        'PROJECT_COMPLETION',
      ],
    };

    const allowedTypes =
      expectedTypes[employment.status];

    if (
      allowedTypes &&
      !allowedTypes.includes(separation.separationType)
    ) {

      errors.push(
        `Separation type "${separation.separationType}" is inconsistent with employment status "${employment.status}" for ${employment.employmentGuid}.`
      );
    }
  }

  // ======================================
  // Validate Missing Separations
  // ======================================

  const statusesRequiringSeparation =
    new Set<string>([
      'RESIGNED',
      'TERMINATED',
      'RETIRED',
      'END_OF_CONTRACT',
    ]);

  for (const employment of EMPLOYMENT_MOCK_DATA) {

    if (
      statusesRequiringSeparation.has(employment.status) &&
      !seenEmploymentGuids.has(employment.employmentGuid)
    ) {

      errors.push(
        `Missing separation for employment ${employment.employmentGuid}.`
      );
    }
  }

  return errors;
}

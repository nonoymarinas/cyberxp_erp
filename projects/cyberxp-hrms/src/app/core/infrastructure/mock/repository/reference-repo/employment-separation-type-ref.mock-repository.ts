
import {
  EMPLOYMENT_SEPARATION_TYPE_REF_MOCK_DATA,
} from '../../data/reference-data/employment-separation-type-ref.mock-data';

import type {
  MockEmploymentSeparationTypeRefRecord,
} from '../../data/reference-data/employment-separation-type-ref.mock-data';

/* ========================================
   Get All Employment Separation Types
   ======================================== */

export function getMockEmploymentSeparationTypes():
  MockEmploymentSeparationTypeRefRecord[] {

  return [
    ...EMPLOYMENT_SEPARATION_TYPE_REF_MOCK_DATA,
  ];
}

/* ========================================
   Get Active Employment Separation Types
   ======================================== */

export function getActiveMockEmploymentSeparationTypes():
  MockEmploymentSeparationTypeRefRecord[] {

  return EMPLOYMENT_SEPARATION_TYPE_REF_MOCK_DATA
    .filter(item => item.isActive);
}

/* ========================================
   Find Employment Separation Type By ID
   ======================================== */

export function findMockEmploymentSeparationTypeById(
  id: number
): MockEmploymentSeparationTypeRefRecord | undefined {

  return EMPLOYMENT_SEPARATION_TYPE_REF_MOCK_DATA
    .find(item => item.id === id);
}

/* ========================================
   Find Employment Separation Type By Code
   ======================================== */

export function findMockEmploymentSeparationTypeByCode(
  code: string
): MockEmploymentSeparationTypeRefRecord | undefined {

  const normalizedCode =
    code.trim().toUpperCase();

  return EMPLOYMENT_SEPARATION_TYPE_REF_MOCK_DATA
    .find(item => item.code === normalizedCode);
}

/* ========================================
   Check Employment Separation Type Exists
   ======================================== */

export function existsMockEmploymentSeparationType(
  code: string
): boolean {

  return findMockEmploymentSeparationTypeByCode(code)
    !== undefined;
}

/* ========================================
   Check Employment Separation Type Active
   ======================================== */

export function isMockEmploymentSeparationTypeActive(
  code: string
): boolean {

  return findMockEmploymentSeparationTypeByCode(code)
    ?.isActive ?? false;
}


import {
  EMPLOYMENT_CLEARANCE_STATUS_REF_MOCK_DATA,
} from '../../data/reference-data/employment-clearance-status-ref.mock-data';

import type {
  MockEmploymentClearanceStatusRefRecord,
} from '../../data/reference-data/employment-clearance-status-ref.mock-data';

/* ========================================
   Get All Employment Clearance Statuses
   ======================================== */

export function getMockEmploymentClearanceStatuses():
  MockEmploymentClearanceStatusRefRecord[] {

  return [
    ...EMPLOYMENT_CLEARANCE_STATUS_REF_MOCK_DATA,
  ];
}

/* ========================================
   Get Active Employment Clearance Statuses
   ======================================== */

export function getActiveMockEmploymentClearanceStatuses():
  MockEmploymentClearanceStatusRefRecord[] {

  return EMPLOYMENT_CLEARANCE_STATUS_REF_MOCK_DATA
    .filter(item => item.isActive);
}

/* ========================================
   Find Employment Clearance Status By ID
   ======================================== */

export function findMockEmploymentClearanceStatusById(
  id: number
): MockEmploymentClearanceStatusRefRecord | undefined {

  return EMPLOYMENT_CLEARANCE_STATUS_REF_MOCK_DATA
    .find(item => item.id === id);
}

/* ========================================
   Find Employment Clearance Status By Code
   ======================================== */

export function findMockEmploymentClearanceStatusByCode(
  code: string
): MockEmploymentClearanceStatusRefRecord | undefined {

  const normalizedCode =
    code.trim().toUpperCase();

  return EMPLOYMENT_CLEARANCE_STATUS_REF_MOCK_DATA
    .find(item => item.code === normalizedCode);
}

/* ========================================
   Check Employment Clearance Status Exists
   ======================================== */

export function existsMockEmploymentClearanceStatus(
  code: string
): boolean {

  return findMockEmploymentClearanceStatusByCode(code)
    !== undefined;
}

/* ========================================
   Check Employment Clearance Status Active
   ======================================== */

export function isMockEmploymentClearanceStatusActive(
  code: string
): boolean {

  return findMockEmploymentClearanceStatusByCode(code)
    ?.isActive ?? false;
}

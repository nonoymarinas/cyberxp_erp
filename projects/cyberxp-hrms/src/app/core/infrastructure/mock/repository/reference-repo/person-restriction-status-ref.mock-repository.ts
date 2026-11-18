
import {
  PERSON_RESTRICTION_STATUS_REF_MOCK_DATA,
} from '../../data/reference-data/person-restriction-status-ref.mock-data';

import type {
  MockPersonRestrictionStatusRefRecord,
} from '../../data/reference-data/person-restriction-status-ref.mock-data';

/* ========================================
   Get All Person Restriction Statuses
   ======================================== */

export function getMockPersonRestrictionStatuses():
  MockPersonRestrictionStatusRefRecord[] {

  return [
    ...PERSON_RESTRICTION_STATUS_REF_MOCK_DATA,
  ];
}

/* ========================================
   Get Active Person Restriction Statuses
   ======================================== */

export function getActiveMockPersonRestrictionStatuses():
  MockPersonRestrictionStatusRefRecord[] {

  return PERSON_RESTRICTION_STATUS_REF_MOCK_DATA
    .filter(item => item.isActive);
}

/* ========================================
   Find Person Restriction Status By ID
   ======================================== */

export function findMockPersonRestrictionStatusById(
  id: number
): MockPersonRestrictionStatusRefRecord | undefined {

  return PERSON_RESTRICTION_STATUS_REF_MOCK_DATA
    .find(item => item.id === id);
}

/* ========================================
   Find Person Restriction Status By Code
   ======================================== */

export function findMockPersonRestrictionStatusByCode(
  code: string
): MockPersonRestrictionStatusRefRecord | undefined {

  const normalizedCode =
    code.trim().toUpperCase();

  return PERSON_RESTRICTION_STATUS_REF_MOCK_DATA
    .find(item => item.code === normalizedCode);
}

/* ========================================
   Check Person Restriction Status Exists
   ======================================== */

export function existsMockPersonRestrictionStatus(
  code: string
): boolean {

  return findMockPersonRestrictionStatusByCode(code)
    !== undefined;
}

/* ========================================
   Check Person Restriction Status Active
   ======================================== */

export function isMockPersonRestrictionStatusActive(
  code: string
): boolean {

  return findMockPersonRestrictionStatusByCode(code)
    ?.isActive ?? false;
}

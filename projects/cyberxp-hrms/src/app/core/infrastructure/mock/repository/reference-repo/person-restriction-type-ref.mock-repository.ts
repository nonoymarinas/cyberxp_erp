
import {
  PERSON_RESTRICTION_TYPE_REF_MOCK_DATA,
} from '../../data/reference-data/person-restriction-type-ref.mock-data';

import type {
  MockPersonRestrictionTypeRefRecord,
} from '../../data/reference-data/person-restriction-type-ref.mock-data';

/* ========================================
   Get All Person Restriction Types
   ======================================== */

export function getMockPersonRestrictionTypes():
  MockPersonRestrictionTypeRefRecord[] {

  return [
    ...PERSON_RESTRICTION_TYPE_REF_MOCK_DATA,
  ];
}

/* ========================================
   Get Active Person Restriction Types
   ======================================== */

export function getActiveMockPersonRestrictionTypes():
  MockPersonRestrictionTypeRefRecord[] {

  return PERSON_RESTRICTION_TYPE_REF_MOCK_DATA
    .filter(item => item.isActive);
}

/* ========================================
   Find Person Restriction Type By ID
   ======================================== */

export function findMockPersonRestrictionTypeById(
  id: number
): MockPersonRestrictionTypeRefRecord | undefined {

  return PERSON_RESTRICTION_TYPE_REF_MOCK_DATA
    .find(item => item.id === id);
}

/* ========================================
   Find Person Restriction Type By Code
   ======================================== */

export function findMockPersonRestrictionTypeByCode(
  code: string
): MockPersonRestrictionTypeRefRecord | undefined {

  const normalizedCode =
    code.trim().toUpperCase();

  return PERSON_RESTRICTION_TYPE_REF_MOCK_DATA
    .find(item => item.code === normalizedCode);
}

/* ========================================
   Check Person Restriction Type Exists
   ======================================== */

export function existsMockPersonRestrictionType(
  code: string
): boolean {

  return findMockPersonRestrictionTypeByCode(code)
    !== undefined;
}

/* ========================================
   Check Person Restriction Type Active
   ======================================== */

export function isMockPersonRestrictionTypeActive(
  code: string
): boolean {

  return findMockPersonRestrictionTypeByCode(code)
    ?.isActive ?? false;
}

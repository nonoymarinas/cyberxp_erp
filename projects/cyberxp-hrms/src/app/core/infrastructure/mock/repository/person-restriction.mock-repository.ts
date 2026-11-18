
import {
  PERSON_RESTRICTION_MOCK_DATA,
} from '../data/person-rehire-data/person-restriction.mock-data';

import type {
  MockPersonRestrictionRecord,
  MockPersonRestrictionType,
} from '../data/person-rehire-data/person-restriction.mock-data';

/* ========================================
   Find Person Restrictions
   ======================================== */

export function findMockPersonRestrictions(
  personGuid: string
): MockPersonRestrictionRecord[] {

  return PERSON_RESTRICTION_MOCK_DATA.filter(
    restriction =>
      restriction.personGuid === personGuid
  );
}

/* ========================================
   Find Active Person Restrictions
   ======================================== */

export function findMockActivePersonRestrictions(
  personGuid: string
): MockPersonRestrictionRecord[] {

  return findMockPersonRestrictions(personGuid)
    .filter(
      restriction =>
        restriction.status === 'ACTIVE'
    );
}

/* ========================================
   Check Active Restriction By Type
   ======================================== */

export function hasMockActiveRestriction(
  personGuid: string,
  restrictionType: MockPersonRestrictionType
): boolean {

  return findMockActivePersonRestrictions(
    personGuid
  ).some(
    restriction =>
      restriction.restrictionType === restrictionType
  );
}

/* ========================================
   Check Person Blocklist
   ======================================== */

export function isMockPersonBlocklisted(
  personGuid: string
): boolean {

  return hasMockActiveRestriction(
    personGuid,
    'BLOCKLIST'
  );
}

/* ========================================
   Check Any Active Restriction
   ======================================== */

export function hasMockAnyActiveRestriction(
  personGuid: string
): boolean {

  return findMockActivePersonRestrictions(
    personGuid
  ).length > 0;
}


import {
  ReferenceItemDto,
} from '../../../../../shared/models/reference-item.dto.model';

import {
  PERSON_MATCH_DECISION_TYPE_MOCK_DATA,
} from '../../data/reference-data/person-match-decision-type-ref.mock-data';

// ========================================
// Get All Person Match Decision Types
// ========================================

export function getMockPersonMatchDecisionTypes():
  ReferenceItemDto[] {

  return PERSON_MATCH_DECISION_TYPE_MOCK_DATA
    .map(item => ({ ...item }));
}

// ========================================
// Find Decision Type By Public ID
// ========================================

export function findMockPersonMatchDecisionTypeById(
  publicId: string
): ReferenceItemDto | undefined {

  const item = PERSON_MATCH_DECISION_TYPE_MOCK_DATA.find(
    item => item.guid === publicId
  );

  return item ? { ...item } : undefined;
}

// ========================================
// Find Decision Type By Code
// ========================================

export function findMockPersonMatchDecisionTypeByCode(
  code: string
): ReferenceItemDto | undefined {

  const normalizedCode = code.trim().toUpperCase();

  const item = PERSON_MATCH_DECISION_TYPE_MOCK_DATA.find(
    item =>
      item.code?.toUpperCase() === normalizedCode
  );

  return item ? { ...item } : undefined;
}

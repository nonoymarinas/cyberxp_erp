
import {
  REHIRE_ELIGIBILITY_STATUS_REF_MOCK_DATA,
} from '../../data/reference-data/rehire-eligibility-status-ref.mock-data';

import type {
  MockRehireEligibilityStatusRefRecord,
} from '../../data/reference-data/rehire-eligibility-status-ref.mock-data';

/* ========================================
   Rehire Eligibility Status Mock Repository
   ======================================== */

// ========================================
// Get All References
// ========================================

export function getMockRehireEligibilityStatuses():
  MockRehireEligibilityStatusRefRecord[] {

  return REHIRE_ELIGIBILITY_STATUS_REF_MOCK_DATA.map(
    record => ({ ...record })
  );
}

// ========================================
// Get Active References
// ========================================

export function getActiveMockRehireEligibilityStatuses():
  MockRehireEligibilityStatusRefRecord[] {

  return REHIRE_ELIGIBILITY_STATUS_REF_MOCK_DATA
    .filter(record => record.isActive)
    .map(record => ({ ...record }));
}

// ========================================
// Find By ID
// ========================================

export function findMockRehireEligibilityStatusById(
  id: number
): MockRehireEligibilityStatusRefRecord | undefined {

  const record =
    REHIRE_ELIGIBILITY_STATUS_REF_MOCK_DATA.find(
      item => item.id === id
    );

  return record
    ? { ...record }
    : undefined;
}

// ========================================
// Find By Code
// ========================================

export function findMockRehireEligibilityStatusByCode(
  code: string
): MockRehireEligibilityStatusRefRecord | undefined {

  const normalizedCode = code
    .normalize('NFKC')
    .trim()
    .toUpperCase();

  const record =
    REHIRE_ELIGIBILITY_STATUS_REF_MOCK_DATA.find(
      item => item.code === normalizedCode
    );

  return record
    ? { ...record }
    : undefined;
}

// ========================================
// Check Status Exists
// ========================================

export function existsMockRehireEligibilityStatus(
  code: string
): boolean {

  return findMockRehireEligibilityStatusByCode(
    code
  ) !== undefined;
}

// ========================================
// Check Status Is Active
// ========================================

export function isMockRehireEligibilityStatusActive(
  code: string
): boolean {

  const record =
    findMockRehireEligibilityStatusByCode(
      code
    );

  return record?.isActive ?? false;
}


import {
  REHIRE_REQUEST_STATUS_REF_MOCK_DATA,
} from '../../data/reference-data/rehire-request-status-ref.mock-data';

import type {
  MockRehireRequestStatusRefRecord,
} from '../../data/reference-data/rehire-request-status-ref.mock-data';

/* ========================================
   Get All References
   ======================================== */

export function getMockRehireRequestStatuses():
  MockRehireRequestStatusRefRecord[] {

  return REHIRE_REQUEST_STATUS_REF_MOCK_DATA.map(
    record => ({ ...record })
  );
}

/* ========================================
   Get Active References
   ======================================== */

export function getActiveMockRehireRequestStatuses():
  MockRehireRequestStatusRefRecord[] {

  return REHIRE_REQUEST_STATUS_REF_MOCK_DATA
    .filter(record => record.isActive)
    .map(record => ({ ...record }));
}

/* ========================================
   Find By Code
   ======================================== */

export function findMockRehireRequestStatusByCode(
  code: string
): MockRehireRequestStatusRefRecord | undefined {

  const normalizedCode =
    code.trim().toUpperCase();

  const record =
    REHIRE_REQUEST_STATUS_REF_MOCK_DATA.find(
      item => item.code === normalizedCode
    );

  return record
    ? { ...record }
    : undefined;
}

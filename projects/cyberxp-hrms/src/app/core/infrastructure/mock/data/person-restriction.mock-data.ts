
/* ========================================
   Person Restriction Types
   ======================================== */

export type MockPersonRestrictionType =
  | 'BLOCKLIST'
  | 'REHIRE_HOLD'
  | 'DISCIPLINARY_REVIEW';

export type MockPersonRestrictionStatus =
  | 'ACTIVE'
  | 'RESOLVED';

/* ========================================
   Person Restriction Record
   ======================================== */

export interface MockPersonRestrictionRecord {
  restrictionGuid: string;
  personGuid: string;

  restrictionType: MockPersonRestrictionType;
  status: MockPersonRestrictionStatus;

  reason: string;

  effectiveDate: string;
  resolvedDate: string | null;

  remarks: string | null;
}

/* ========================================
   Person Restriction Mock Data
   ======================================== */

export const PERSON_RESTRICTION_MOCK_DATA:
  MockPersonRestrictionRecord[] = [

  // Existing Person Matching blocklist
  {
    restrictionGuid: 'mock-restriction-001',
    personGuid: 'mock-person-003',

    restrictionType: 'BLOCKLIST',
    status: 'ACTIVE',

    reason: 'HR restriction following termination.',

    effectiveDate: '2024-11-30',
    resolvedDate: null,

    remarks: 'Requires authorized HR review.',
  },

  // Pending disciplinary review
  {
    restrictionGuid: 'mock-restriction-002',
    personGuid: 'mock-person-006',

    restrictionType: 'DISCIPLINARY_REVIEW',
    status: 'ACTIVE',

    reason: 'Unresolved disciplinary review.',

    effectiveDate: '2025-06-20',
    resolvedDate: null,

    remarks: 'Management review required.',
  },

  // Temporary rehire hold
  {
    restrictionGuid: 'mock-restriction-003',
    personGuid: 'mock-person-013',

    restrictionType: 'REHIRE_HOLD',
    status: 'ACTIVE',

    reason: 'Pending HR clearance review.',

    effectiveDate: '2025-05-15',
    resolvedDate: null,

    remarks: 'Do not finalize rehire until resolved.',
  },

  // Historical resolved restriction
  {
    restrictionGuid: 'mock-restriction-004',
    personGuid: 'mock-person-005',

    restrictionType: 'REHIRE_HOLD',
    status: 'RESOLVED',

    reason: 'Previous clearance discrepancy.',

    effectiveDate: '2025-05-01',
    resolvedDate: '2025-06-15',

    remarks: 'Resolved by HR.',
  },
];

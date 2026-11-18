
/* ========================================
   Person Restriction Status Reference
   ======================================== */

export interface MockPersonRestrictionStatusRefRecord {
  id: number;
  code: string;
  name: string;
  isActive: boolean;
}

/* ========================================
   Person Restriction Status Mock Data
   ======================================== */

export const PERSON_RESTRICTION_STATUS_REF_MOCK_DATA:
  MockPersonRestrictionStatusRefRecord[] = [

  {
    id: 1,
    code: 'ACTIVE',
    name: 'Active',
    isActive: true,
  },

  {
    id: 2,
    code: 'RESOLVED',
    name: 'Resolved',
    isActive: true,
  },
];

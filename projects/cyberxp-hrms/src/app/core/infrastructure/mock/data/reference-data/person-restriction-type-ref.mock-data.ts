
/* ========================================
   Person Restriction Type Reference
   ======================================== */

export interface MockPersonRestrictionTypeRefRecord {
  id: number;
  code: string;
  name: string;
  isActive: boolean;
}

/* ========================================
   Person Restriction Type Mock Data
   ======================================== */

export const PERSON_RESTRICTION_TYPE_REF_MOCK_DATA:
  MockPersonRestrictionTypeRefRecord[] = [

  {
    id: 1,
    code: 'BLOCKLIST',
    name: 'Blocklist',
    isActive: true,
  },

  {
    id: 2,
    code: 'REHIRE_HOLD',
    name: 'Rehire Hold',
    isActive: true,
  },

  {
    id: 3,
    code: 'DISCIPLINARY_REVIEW',
    name: 'Disciplinary Review',
    isActive: true,
  },
];


/* ========================================
   Employment Clearance Status Reference
   ======================================== */

export interface MockEmploymentClearanceStatusRefRecord {
  id: number;
  code: string;
  name: string;
  isActive: boolean;
}

/* ========================================
   Employment Clearance Status Mock Data
   ======================================== */

export const EMPLOYMENT_CLEARANCE_STATUS_REF_MOCK_DATA:
  MockEmploymentClearanceStatusRefRecord[] = [

  {
    id: 1,
    code: 'PENDING',
    name: 'Pending',
    isActive: true,
  },

  {
    id: 2,
    code: 'IN_PROGRESS',
    name: 'In Progress',
    isActive: true,
  },

  {
    id: 3,
    code: 'CLEARED',
    name: 'Cleared',
    isActive: true,
  },

  {
    id: 4,
    code: 'WITH_HOLDINGS',
    name: 'With Holdings',
    isActive: true,
  },
];

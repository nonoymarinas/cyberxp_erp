
/* ========================================
   Employment Separation Type Reference
   ======================================== */

export interface MockEmploymentSeparationTypeRefRecord {
  id: number;
  code: string;
  name: string;
  isActive: boolean;
}

/* ========================================
   Employment Separation Type Mock Data
   ======================================== */

export const EMPLOYMENT_SEPARATION_TYPE_REF_MOCK_DATA:
  MockEmploymentSeparationTypeRefRecord[] = [

  {
    id: 1,
    code: 'RESIGNATION',
    name: 'Resignation',
    isActive: true,
  },

  {
    id: 2,
    code: 'TERMINATION',
    name: 'Termination',
    isActive: true,
  },

  {
    id: 3,
    code: 'RETIREMENT',
    name: 'Retirement',
    isActive: true,
  },

  {
    id: 4,
    code: 'CONTRACT_EXPIRATION',
    name: 'Contract Expiration',
    isActive: true,
  },

  {
    id: 5,
    code: 'PROJECT_COMPLETION',
    name: 'Project Completion',
    isActive: true,
  },
];

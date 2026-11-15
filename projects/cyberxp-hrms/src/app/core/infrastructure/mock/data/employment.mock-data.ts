
/* ========================================
   General Employment Mock Data
   ======================================== */

import {
  PERSON_MOCK_DATA,
} from './person.mock-data';

/* ========================================
   Employment Status
   ======================================== */

export type MockEmploymentStatus =
  | 'ACTIVE'
  | 'RESIGNED'
  | 'TERMINATED'
  | 'RETIRED'
  | 'END_OF_CONTRACT';

/* ========================================
   Employment Mock Record
   ======================================== */

export interface MockEmploymentRecord {
  employmentGuid: string;
  personGuid: string;
  employeeNumber: string;

  departmentId: string;
  departmentName: string;

  positionId: string;
  positionName: string;

  workLocationId: string;
  workLocationName: string;

  employmentType: string;

  hireDate: string;
  separationDate: string | null;
  separationReason: string | null;

  status: MockEmploymentStatus;
}

/* ========================================
   Employment Mock Data
   ======================================== */

export const EMPLOYMENT_MOCK_DATA: MockEmploymentRecord[] = [

  // ========================================
  // Employment 001 - Active
  // Person 001
  // ========================================

  {
    employmentGuid: 'mock-employment-001',
    personGuid: 'mock-person-001',
    employeeNumber: 'EMP000001',

    departmentId: 'OPS',
    departmentName: 'Operations',

    positionId: 'OPS_SUPERVISOR',
    positionName: 'Operations Supervisor',

    workLocationId: 'BACOLOD',
    workLocationName: 'Bacolod Office',

    employmentType: 'REGULAR',

    hireDate: '2018-06-01',
    separationDate: null,
    separationReason: null,

    status: 'ACTIVE',
  },

  // ========================================
  // Employment 002 - Resigned
  // Person 002
  // ========================================

  {
    employmentGuid: 'mock-employment-002',
    personGuid: 'mock-person-002',
    employeeNumber: 'EMP000002',

    departmentId: 'OPS',
    departmentName: 'Operations',

    positionId: 'OPS_SUPERVISOR',
    positionName: 'Operations Supervisor',

    workLocationId: 'BACOLOD',
    workLocationName: 'Bacolod Office',

    employmentType: 'REGULAR',

    hireDate: '2018-06-01',
    separationDate: '2025-12-31',
    separationReason: 'Voluntary Resignation',

    status: 'RESIGNED',
  },

  // ========================================
  // Employment 003 - Terminated
  // Person 003
  // ========================================

  {
    employmentGuid: 'mock-employment-003',
    personGuid: 'mock-person-003',
    employeeNumber: 'EMP000003',

    departmentId: 'WH',
    departmentName: 'Warehouse',

    positionId: 'WH_SUPERVISOR',
    positionName: 'Warehouse Supervisor',

    workLocationId: 'CEBU',
    workLocationName: 'Cebu Office',

    employmentType: 'REGULAR',

    hireDate: '2017-04-10',
    separationDate: '2024-11-30',
    separationReason: 'Termination - Policy Violation',

    status: 'TERMINATED',
  },

  // ========================================
  // Employment 004 - End of Contract
  // ========================================

  {
    employmentGuid: 'mock-employment-004',
    personGuid: 'mock-person-004',
    employeeNumber: 'EMP000004',

    departmentId: 'HR',
    departmentName: 'Human Resources',

    positionId: 'HR_ASSISTANT',
    positionName: 'HR Assistant',

    workLocationId: 'KABANKALAN',
    workLocationName: 'Kabankalan Office',

    employmentType: 'CONTRACTUAL',

    hireDate: '2021-03-01',
    separationDate: '2025-09-15',
    separationReason: 'Contract Expiration',

    status: 'END_OF_CONTRACT',
  },

  // ========================================
  // Employment 005 - Resigned
  // ========================================

  {
    employmentGuid: 'mock-employment-005',
    personGuid: 'mock-person-005',
    employeeNumber: 'EMP000005',

    departmentId: 'WH',
    departmentName: 'Warehouse',

    positionId: 'WH_SUPERVISOR',
    positionName: 'Warehouse Supervisor',

    workLocationId: 'CEBU',
    workLocationName: 'Cebu Office',

    employmentType: 'REGULAR',

    hireDate: '2017-04-10',
    separationDate: '2025-04-30',
    separationReason: 'Voluntary Resignation',

    status: 'RESIGNED',
  },

  // ========================================
  // Employment 006 - Terminated
  // ========================================

  {
    employmentGuid: 'mock-employment-006',
    personGuid: 'mock-person-006',
    employeeNumber: 'EMP000006',

    departmentId: 'FIN',
    departmentName: 'Finance',

    positionId: 'ACCOUNTING_CLERK',
    positionName: 'Accounting Clerk',

    workLocationId: 'ILOILO',
    workLocationName: 'Iloilo Office',

    employmentType: 'REGULAR',

    hireDate: '2019-05-06',
    separationDate: '2025-06-20',
    separationReason: 'Termination - Policy Violation',

    status: 'TERMINATED',
  },

  // ========================================
  // Employment 007 - Resigned
  // ========================================

  {
    employmentGuid: 'mock-employment-007',
    personGuid: 'mock-person-007',
    employeeNumber: 'EMP000007',

    departmentId: 'ENG',
    departmentName: 'Engineering',

    positionId: 'PROJECT_ENGINEER',
    positionName: 'Project Engineer',

    workLocationId: 'BACOLOD',
    workLocationName: 'Bacolod Office',

    employmentType: 'REGULAR',

    hireDate: '2016-09-12',
    separationDate: '2025-03-31',
    separationReason: 'Voluntary Resignation',

    status: 'RESIGNED',
  },

  // ========================================
  // Employment 008 - Retired
  // ========================================

  {
    employmentGuid: 'mock-employment-008',
    personGuid: 'mock-person-008',
    employeeNumber: 'EMP000008',

    departmentId: 'ADMIN',
    departmentName: 'Administration',

    positionId: 'ADMIN_OFFICER',
    positionName: 'Administrative Officer',

    workLocationId: 'MANILA',
    workLocationName: 'Manila Office',

    employmentType: 'REGULAR',

    hireDate: '1995-06-01',
    separationDate: '2024-12-31',
    separationReason: 'Retirement',

    status: 'RETIRED',
  },

  // ========================================
  // Employment 009 - Active
  // ========================================

  {
    employmentGuid: 'mock-employment-009',
    personGuid: 'mock-person-009',
    employeeNumber: 'EMP000009',

    departmentId: 'OPS',
    departmentName: 'Operations',

    positionId: 'OPS_MANAGER',
    positionName: 'Operations Manager',

    workLocationId: 'BACOLOD',
    workLocationName: 'Bacolod Office',

    employmentType: 'REGULAR',

    hireDate: '2020-01-15',
    separationDate: null,
    separationReason: null,

    status: 'ACTIVE',
  },

  // ========================================
  // Employment 010 - Resigned
  // ========================================

  {
    employmentGuid: 'mock-employment-010',
    personGuid: 'mock-person-010',
    employeeNumber: 'EMP000010',

    departmentId: 'HR',
    departmentName: 'Human Resources',

    positionId: 'HR_OFFICER',
    positionName: 'HR Officer',

    workLocationId: 'CEBU',
    workLocationName: 'Cebu Office',

    employmentType: 'REGULAR',

    hireDate: '2020-08-10',
    separationDate: '2025-08-10',
    separationReason: 'Voluntary Resignation',

    status: 'RESIGNED',
  },

  // ========================================
  // Employment 011 - Active
  // ========================================

  {
    employmentGuid: 'mock-employment-011',
    personGuid: 'mock-person-011',
    employeeNumber: 'EMP000011',

    departmentId: 'IT',
    departmentName: 'Information Technology',

    positionId: 'SOFTWARE_DEV',
    positionName: 'Software Developer',

    workLocationId: 'CEBU',
    workLocationName: 'Cebu Office',

    employmentType: 'REGULAR',

    hireDate: '2022-02-01',
    separationDate: null,
    separationReason: null,

    status: 'ACTIVE',
  },

  // ========================================
  // Employment 012 - End of Contract
  // ========================================

  {
    employmentGuid: 'mock-employment-012',
    personGuid: 'mock-person-012',
    employeeNumber: 'EMP000012',

    departmentId: 'ADMIN',
    departmentName: 'Administration',

    positionId: 'ADMIN_ASSISTANT',
    positionName: 'Administrative Assistant',

    workLocationId: 'ILOILO',
    workLocationName: 'Iloilo Office',

    employmentType: 'CONTRACTUAL',

    hireDate: '2023-01-10',
    separationDate: '2025-01-09',
    separationReason: 'Contract Expiration',

    status: 'END_OF_CONTRACT',
  },

  // ========================================
  // Employment 013 - Terminated
  // ========================================

  {
    employmentGuid: 'mock-employment-013',
    personGuid: 'mock-person-013',
    employeeNumber: 'EMP000013',

    departmentId: 'OPS',
    departmentName: 'Operations',

    positionId: 'OPS_SUPERVISOR',
    positionName: 'Operations Supervisor',

    workLocationId: 'KABANKALAN',
    workLocationName: 'Kabankalan Office',

    employmentType: 'REGULAR',

    hireDate: '2019-03-01',
    separationDate: '2025-05-15',
    separationReason: 'Termination',

    status: 'TERMINATED',
  },

  // ========================================
  // Employment 014 - Resigned
  // ========================================

  {
    employmentGuid: 'mock-employment-014',
    personGuid: 'mock-person-014',
    employeeNumber: 'EMP000014',

    departmentId: 'FIN',
    departmentName: 'Finance',

    positionId: 'ACCOUNTANT',
    positionName: 'Accountant',

    workLocationId: 'BACOLOD',
    workLocationName: 'Bacolod Office',

    employmentType: 'REGULAR',

    hireDate: '2020-06-15',
    separationDate: '2025-10-01',
    separationReason: 'Voluntary Resignation',

    status: 'RESIGNED',
  },

  // ========================================
  // Employment 015 - Active
  // ========================================

  {
    employmentGuid: 'mock-employment-015',
    personGuid: 'mock-person-015',
    employeeNumber: 'EMP000015',

    departmentId: 'ENG',
    departmentName: 'Engineering',

    positionId: 'PROJECT_ENGINEER',
    positionName: 'Project Engineer',

    workLocationId: 'MANILA',
    workLocationName: 'Manila Office',

    employmentType: 'REGULAR',

    hireDate: '2021-07-01',
    separationDate: null,
    separationReason: null,

    status: 'ACTIVE',
  },

  // ========================================
  // Employment 016 - Resigned
  // ========================================

  {
    employmentGuid: 'mock-employment-016',
    personGuid: 'mock-person-016',
    employeeNumber: 'EMP000016',

    departmentId: 'HR',
    departmentName: 'Human Resources',

    positionId: 'HR_ASSISTANT',
    positionName: 'HR Assistant',

    workLocationId: 'CEBU',
    workLocationName: 'Cebu Office',

    employmentType: 'REGULAR',

    hireDate: '2022-05-02',
    separationDate: '2025-09-30',
    separationReason: 'Voluntary Resignation',

    status: 'RESIGNED',
  },

  // ========================================
  // Employment 017 - Retired
  // ========================================

  {
    employmentGuid: 'mock-employment-017',
    personGuid: 'mock-person-017',
    employeeNumber: 'EMP000017',

    departmentId: 'OPS',
    departmentName: 'Operations',

    positionId: 'OPS_MANAGER',
    positionName: 'Operations Manager',

    workLocationId: 'BACOLOD',
    workLocationName: 'Bacolod Office',

    employmentType: 'REGULAR',

    hireDate: '1999-04-01',
    separationDate: '2025-04-01',
    separationReason: 'Retirement',

    status: 'RETIRED',
  },

  // ========================================
  // Employment 018 - Active
  // ========================================

  {
    employmentGuid: 'mock-employment-018',
    personGuid: 'mock-person-018',
    employeeNumber: 'EMP000018',

    departmentId: 'FIN',
    departmentName: 'Finance',

    positionId: 'ACCOUNTANT',
    positionName: 'Accountant',

    workLocationId: 'MANILA',
    workLocationName: 'Manila Office',

    employmentType: 'REGULAR',

    hireDate: '2023-09-01',
    separationDate: null,
    separationReason: null,

    status: 'ACTIVE',
  },

  // ========================================
  // Employment 019 - End of Contract
  // ========================================

  {
    employmentGuid: 'mock-employment-019',
    personGuid: 'mock-person-019',
    employeeNumber: 'EMP000019',

    departmentId: 'ENG',
    departmentName: 'Engineering',

    positionId: 'PROJECT_ENGINEER',
    positionName: 'Project Engineer',

    workLocationId: 'CEBU',
    workLocationName: 'Cebu Office',

    employmentType: 'PROJECT_BASED',

    hireDate: '2024-01-15',
    separationDate: '2025-12-31',
    separationReason: 'Project Completion',

    status: 'END_OF_CONTRACT',
  },

  // ========================================
  // Employment 020 - Resigned
  // ========================================

  {
    employmentGuid: 'mock-employment-020',
    personGuid: 'mock-person-020',
    employeeNumber: 'EMP000020',

    departmentId: 'ADMIN',
    departmentName: 'Administration',

    positionId: 'ADMIN_OFFICER',
    positionName: 'Administrative Officer',

    workLocationId: 'KABANKALAN',
    workLocationName: 'Kabankalan Office',

    employmentType: 'REGULAR',

    hireDate: '2022-10-01',
    separationDate: '2025-11-01',
    separationReason: 'Voluntary Resignation',

    status: 'RESIGNED',
  },
];

/* ========================================
   Validate Person References
   Development Only
   ======================================== */

export function validateEmploymentMockData(): string[] {
  const personGuids = new Set(
    PERSON_MOCK_DATA.map(person => person.personGuid)
  );

  const errors: string[] = [];

  for (const employment of EMPLOYMENT_MOCK_DATA) {
    if (!personGuids.has(employment.personGuid)) {
      errors.push(
        `Employment ${employment.employmentGuid} references unknown person ${employment.personGuid}.`
      );
    }
  }

  return errors;
}

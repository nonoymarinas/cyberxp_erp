
import type {
  EmploymentStatusRef,
} from '../../../../../shared/reference/employment-status-ref';

// ========================================
// Backward Compatibility
// ========================================

export type MockEmploymentStatus =
  EmploymentStatusRef;

// ========================================
// Employment Mock Record
// ========================================

export interface MockEmploymentRecord {

  employmentGuid: string;
  personGuid: string;
  employeeNumber: string;

  status: EmploymentStatusRef;

  hireDate: string;
  separationDate: string | null;

  departmentId: string | null;
  departmentName: string | null;

  positionId: string | null;
  positionName: string | null;

  branchId: string | null;
  workLocationName: string | null;

  employmentType: string | null;
  separationReason: string | null;

  createdAt: string;
  updatedAt: string;
}

// ========================================
// Employment Mock Database
// ========================================

export const EMPLOYMENT_MOCK_DATA:
  MockEmploymentRecord[] = [

  // ======================================
  // 001 — Juan Santos Dela Cruz
  // RESIGNED
  // ======================================

  {
    employmentGuid: 'mock-employment-001',
    personGuid: 'mock-person-001',
    employeeNumber: 'EMP000001',
    status: 'RESIGNED',
    hireDate: '2018-03-12',
    separationDate: '2023-06-30',
    departmentId: 'DEPT001',
    departmentName: 'Operations',
    positionId: 'POS001',
    positionName: 'Operations Supervisor',
    branchId: 'BR001',
    workLocationName: 'Bacolod',
    employmentType: 'REGULAR',
    separationReason: 'Voluntary resignation',
    createdAt: '2018-03-12T08:00:00Z',
    updatedAt: '2023-06-30T08:00:00Z',
  },

  // ======================================
  // 002 — Juan Dela Cruz
  // ACTIVE
  // ======================================

  {
    employmentGuid: 'mock-employment-002',
    personGuid: 'mock-person-002',
    employeeNumber: 'EMP000002',
    status: 'ACTIVE',
    hireDate: '2020-02-10',
    separationDate: null,
    departmentId: 'DEPT002',
    departmentName: 'Administration',
    positionId: 'POS002',
    positionName: 'Administrative Officer',
    branchId: 'BR001',
    workLocationName: 'Bacolod',
    employmentType: 'REGULAR',
    separationReason: null,
    createdAt: '2020-02-10T08:00:00Z',
    updatedAt: '2020-02-10T08:00:00Z',
  },

  // ======================================
  // 003 — Juan S Cruz
  // TERMINATED
  // ======================================

  {
    employmentGuid: 'mock-employment-003',
    personGuid: 'mock-person-003',
    employeeNumber: 'EMP000003',
    status: 'TERMINATED',
    hireDate: '2019-05-15',
    separationDate: '2022-09-20',
    departmentId: 'DEPT003',
    departmentName: 'Warehouse',
    positionId: 'POS003',
    positionName: 'Warehouse Staff',
    branchId: 'BR002',
    workLocationName: 'Cebu',
    employmentType: 'REGULAR',
    separationReason: 'Employment terminated following HR review',
    createdAt: '2019-05-15T08:00:00Z',
    updatedAt: '2022-09-20T08:00:00Z',
  },

  // ======================================
  // 004 — Maria Reyes Santos
  // RESIGNED
  // ======================================

  {
    employmentGuid: 'mock-employment-004',
    personGuid: 'mock-person-004',
    employeeNumber: 'EMP000004',
    status: 'RESIGNED',
    hireDate: '2021-01-11',
    separationDate: '2024-03-15',
    departmentId: 'DEPT004',
    departmentName: 'Finance',
    positionId: 'POS004',
    positionName: 'Accounting Assistant',
    branchId: 'BR001',
    workLocationName: 'Bacolod',
    employmentType: 'REGULAR',
    separationReason: 'Personal reasons',
    createdAt: '2021-01-11T08:00:00Z',
    updatedAt: '2024-03-15T08:00:00Z',
  },

  // ======================================
  // 005 — Pedro Garcia Reyes
  // INACTIVE
  // ======================================

  {
    employmentGuid: 'mock-employment-005',
    personGuid: 'mock-person-005',
    employeeNumber: 'EMP000005',
    status: 'INACTIVE',
    hireDate: '2022-04-18',
    separationDate: null,
    departmentId: 'DEPT005',
    departmentName: 'Engineering',
    positionId: 'POS005',
    positionName: 'Site Engineer',
    branchId: 'BR003',
    workLocationName: 'Rizal',
    employmentType: 'REGULAR',
    separationReason: null,
    createdAt: '2022-04-18T08:00:00Z',
    updatedAt: '2025-01-10T08:00:00Z',
  },

  // ======================================
  // 006 — Ana Lopez Garcia
  // ACTIVE
  // ======================================

  {
    employmentGuid: 'mock-employment-006',
    personGuid: 'mock-person-006',
    employeeNumber: 'EMP000006',
    status: 'ACTIVE',
    hireDate: '2023-06-05',
    separationDate: null,
    departmentId: 'DEPT006',
    departmentName: 'Human Resources',
    positionId: 'POS006',
    positionName: 'HR Officer',
    branchId: 'BR001',
    workLocationName: 'Bacolod',
    employmentType: 'REGULAR',
    separationReason: null,
    createdAt: '2023-06-05T08:00:00Z',
    updatedAt: '2023-06-05T08:00:00Z',
  },

  // ======================================
  // 007 — Carlos Ramos Mendoza
  // END OF CONTRACT
  // ======================================

  {
    employmentGuid: 'mock-employment-007',
    personGuid: 'mock-person-007',
    employeeNumber: 'EMP000007',
    status: 'END_OF_CONTRACT',
    hireDate: '2023-01-10',
    separationDate: '2024-01-09',
    departmentId: 'DEPT005',
    departmentName: 'Engineering',
    positionId: 'POS007',
    positionName: 'Project Coordinator',
    branchId: 'BR003',
    workLocationName: 'Rizal',
    employmentType: 'PROJECT_BASED',
    separationReason: 'Project contract completed',
    createdAt: '2023-01-10T08:00:00Z',
    updatedAt: '2024-01-09T08:00:00Z',
  },

  // ======================================
  // 008 — Elena Cruz Fernandez
  // RETIRED
  // ======================================

  {
    employmentGuid: 'mock-employment-008',
    personGuid: 'mock-person-008',
    employeeNumber: 'EMP000008',
    status: 'RETIRED',
    hireDate: '2005-07-01',
    separationDate: '2025-03-31',
    departmentId: 'DEPT001',
    departmentName: 'Operations',
    positionId: 'POS008',
    positionName: 'Operations Manager',
    branchId: 'BR001',
    workLocationName: 'Bacolod',
    employmentType: 'REGULAR',
    separationReason: 'Retirement',
    createdAt: '2005-07-01T08:00:00Z',
    updatedAt: '2025-03-31T08:00:00Z',
  },

  // ======================================
  // 009 — Roberto Diaz Villanueva
  // TERMINATED
  // ======================================

  {
    employmentGuid: 'mock-employment-009',
    personGuid: 'mock-person-009',
    employeeNumber: 'EMP000009',
    status: 'TERMINATED',
    hireDate: '2017-09-04',
    separationDate: '2021-12-10',
    departmentId: 'DEPT003',
    departmentName: 'Warehouse',
    positionId: 'POS009',
    positionName: 'Warehouse Supervisor',
    branchId: 'BR002',
    workLocationName: 'Cebu',
    employmentType: 'REGULAR',
    separationReason: 'Employment terminated',
    createdAt: '2017-09-04T08:00:00Z',
    updatedAt: '2021-12-10T08:00:00Z',
  },

  // ======================================
  // 010 — Angela Torres Navarro
  // RESIGNED
  // ======================================

  {
    employmentGuid: 'mock-employment-010',
    personGuid: 'mock-person-010',
    employeeNumber: 'EMP000010',
    status: 'RESIGNED',
    hireDate: '2020-08-17',
    separationDate: '2023-11-30',
    departmentId: 'DEPT002',
    departmentName: 'Administration',
    positionId: 'POS010',
    positionName: 'Office Assistant',
    branchId: 'BR001',
    workLocationName: 'Bacolod',
    employmentType: 'REGULAR',
    separationReason: 'Career opportunity',
    createdAt: '2020-08-17T08:00:00Z',
    updatedAt: '2023-11-30T08:00:00Z',
  },

  // ======================================
  // 011 — Michael Flores Bautista
  // ACTIVE
  // ======================================

  {
    employmentGuid: 'mock-employment-011',
    personGuid: 'mock-person-011',
    employeeNumber: 'EMP000011',
    status: 'ACTIVE',
    hireDate: '2021-10-04',
    separationDate: null,
    departmentId: 'DEPT007',
    departmentName: 'IT',
    positionId: 'POS011',
    positionName: 'Systems Developer',
    branchId: 'BR001',
    workLocationName: 'Bacolod',
    employmentType: 'REGULAR',
    separationReason: null,
    createdAt: '2021-10-04T08:00:00Z',
    updatedAt: '2021-10-04T08:00:00Z',
  },

  // ======================================
  // 012 — Christine Aquino Rivera
  // END OF CONTRACT
  // ======================================

  {
    employmentGuid: 'mock-employment-012',
    personGuid: 'mock-person-012',
    employeeNumber: 'EMP000012',
    status: 'END_OF_CONTRACT',
    hireDate: '2022-06-01',
    separationDate: '2023-05-31',
    departmentId: 'DEPT004',
    departmentName: 'Finance',
    positionId: 'POS012',
    positionName: 'Project Accounting Staff',
    branchId: 'BR002',
    workLocationName: 'Cebu',
    employmentType: 'CONTRACTUAL',
    separationReason: 'Contract period completed',
    createdAt: '2022-06-01T08:00:00Z',
    updatedAt: '2023-05-31T08:00:00Z',
  },

  // ======================================
  // 013 — Joseph Castillo Domingo
  // INACTIVE
  // ======================================

  {
    employmentGuid: 'mock-employment-013',
    personGuid: 'mock-person-013',
    employeeNumber: 'EMP000013',
    status: 'INACTIVE',
    hireDate: '2020-03-09',
    separationDate: null,
    departmentId: 'DEPT001',
    departmentName: 'Operations',
    positionId: 'POS013',
    positionName: 'Equipment Operator',
    branchId: 'BR003',
    workLocationName: 'Rizal',
    employmentType: 'REGULAR',
    separationReason: null,
    createdAt: '2020-03-09T08:00:00Z',
    updatedAt: '2024-10-01T08:00:00Z',
  },

  // ======================================
  // 014 — Patricia Morales Salazar
  // RESIGNED
  // ======================================

  {
    employmentGuid: 'mock-employment-014',
    personGuid: 'mock-person-014',
    employeeNumber: 'EMP000014',
    status: 'RESIGNED',
    hireDate: '2021-07-12',
    separationDate: '2024-06-28',
    departmentId: 'DEPT006',
    departmentName: 'Human Resources',
    positionId: 'POS014',
    positionName: 'HR Assistant',
    branchId: 'BR001',
    workLocationName: 'Bacolod',
    employmentType: 'REGULAR',
    separationReason: 'Voluntary resignation',
    createdAt: '2021-07-12T08:00:00Z',
    updatedAt: '2024-06-28T08:00:00Z',
  },

  // ======================================
  // 015 — Daniel Mercado Ramos
  // ACTIVE
  // ======================================

  {
    employmentGuid: 'mock-employment-015',
    personGuid: 'mock-person-015',
    employeeNumber: 'EMP000015',
    status: 'ACTIVE',
    hireDate: '2022-02-14',
    separationDate: null,
    departmentId: 'DEPT005',
    departmentName: 'Engineering',
    positionId: 'POS015',
    positionName: 'Civil Engineer',
    branchId: 'BR003',
    workLocationName: 'Rizal',
    employmentType: 'REGULAR',
    separationReason: null,
    createdAt: '2022-02-14T08:00:00Z',
    updatedAt: '2022-02-14T08:00:00Z',
  },

  // ======================================
  // 016 — Sofia Mendoza Cruz
  // RESIGNED
  // ======================================

  {
    employmentGuid: 'mock-employment-016',
    personGuid: 'mock-person-016',
    employeeNumber: 'EMP000016',
    status: 'RESIGNED',
    hireDate: '2023-05-08',
    separationDate: '2025-02-14',
    departmentId: 'DEPT002',
    departmentName: 'Administration',
    positionId: 'POS016',
    positionName: 'Administrative Assistant',
    branchId: 'BR002',
    workLocationName: 'Cebu',
    employmentType: 'REGULAR',
    separationReason: 'Personal reasons',
    createdAt: '2023-05-08T08:00:00Z',
    updatedAt: '2025-02-14T08:00:00Z',
  },

  // ======================================
  // 017 — Antonio Gomez Reyes
  // TERMINATED
  // ======================================

  {
    employmentGuid: 'mock-employment-017',
    personGuid: 'mock-person-017',
    employeeNumber: 'EMP000017',
    status: 'TERMINATED',
    hireDate: '2016-04-11',
    separationDate: '2022-07-29',
    departmentId: 'DEPT001',
    departmentName: 'Operations',
    positionId: 'POS017',
    positionName: 'Operations Staff',
    branchId: 'BR001',
    workLocationName: 'Bacolod',
    employmentType: 'REGULAR',
    separationReason: 'Employment terminated following HR review',
    createdAt: '2016-04-11T08:00:00Z',
    updatedAt: '2022-07-29T08:00:00Z',
  },

  // ======================================
  // 018 — Isabella Lim Tan
  // NO EMPLOYMENT HISTORY
  // ======================================

  // Intentionally no employment record.

  // ======================================
  // 019 — Francis Dizon Pascual
  // FIRST EMPLOYMENT: RESIGNED
  // ======================================

  {
    employmentGuid: 'mock-employment-019-a',
    personGuid: 'mock-person-019',
    employeeNumber: 'EMP000019',
    status: 'RESIGNED',
    hireDate: '2015-06-01',
    separationDate: '2020-12-31',
    departmentId: 'DEPT003',
    departmentName: 'Warehouse',
    positionId: 'POS019',
    positionName: 'Warehouse Staff',
    branchId: 'BR002',
    workLocationName: 'Cebu',
    employmentType: 'REGULAR',
    separationReason: 'Voluntary resignation',
    createdAt: '2015-06-01T08:00:00Z',
    updatedAt: '2020-12-31T08:00:00Z',
  },

  // ======================================
  // 019 — Francis Dizon Pascual
  // SECOND EMPLOYMENT: ACTIVE
  // ======================================

  {
    employmentGuid: 'mock-employment-019-b',
    personGuid: 'mock-person-019',
    employeeNumber: 'EMP000019',
    status: 'ACTIVE',
    hireDate: '2022-01-10',
    separationDate: null,
    departmentId: 'DEPT003',
    departmentName: 'Warehouse',
    positionId: 'POS020',
    positionName: 'Warehouse Supervisor',
    branchId: 'BR002',
    workLocationName: 'Cebu',
    employmentType: 'REGULAR',
    separationReason: null,
    createdAt: '2022-01-10T08:00:00Z',
    updatedAt: '2022-01-10T08:00:00Z',
  },

  // ======================================
  // 020 — Gabriela Ortiz Valdez
  // NO EMPLOYMENT HISTORY
  // ======================================

  // Intentionally no employment record.

];

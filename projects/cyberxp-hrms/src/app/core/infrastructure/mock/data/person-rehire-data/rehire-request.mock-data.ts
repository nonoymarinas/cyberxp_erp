
/* ========================================
   Rehire Request Status
   ======================================== */

export type MockRehireRequestStatus =
  | 'PENDING_APPROVAL'
  | 'APPROVED'
  | 'REJECTED'
  | 'CANCELLED';

/* ========================================
   Rehire Request Mock Record
   ======================================== */

export interface MockRehireRequestRecord {
  rehireRequestGuid: string;
  rehireRequestNumber: string;

  personGuid: string;
  previousEmploymentGuid: string;

  departmentId: string;
  positionId: string;
  workLocationId: string;

  employmentType: string;
  startDate: string;

  profileVerified: boolean;
  justification: string;

  status: MockRehireRequestStatus;

  requestedAt: string;
  approvedAt: string | null;
  rejectedAt: string | null;

  remarks: string | null;
}

/* ========================================
   Rehire Request Mock Data
   ======================================== */

export const REHIRE_REQUEST_MOCK_DATA:
  MockRehireRequestRecord[] = [
  {
    rehireRequestGuid: 'mock-rehire-001',
    rehireRequestNumber: 'RHR000001',

    personGuid: 'mock-person-005',
    previousEmploymentGuid: 'mock-employment-005',

    departmentId: 'WH',
    positionId: 'WH_SUPERVISOR',
    workLocationId: 'CEBU',

    employmentType: 'REGULAR',
    startDate: '2026-12-01',

    profileVerified: true,
    justification: 'Previous experience and satisfactory performance.',

    status: 'PENDING_APPROVAL',

    requestedAt: '2026-11-10T09:00:00',
    approvedAt: null,
    rejectedAt: null,

    remarks: null,
  },
  {
    rehireRequestGuid: 'mock-rehire-002',
    rehireRequestNumber: 'RHR000002',

    personGuid: 'mock-person-007',
    previousEmploymentGuid: 'mock-employment-007',

    departmentId: 'ENG',
    positionId: 'PROJECT_ENGINEER',
    workLocationId: 'BACOLOD',

    employmentType: 'REGULAR',
    startDate: '2026-12-15',

    profileVerified: true,
    justification: 'Required engineering experience for upcoming projects.',

    status: 'APPROVED',

    requestedAt: '2026-11-01T10:30:00',
    approvedAt: '2026-11-05T14:00:00',
    rejectedAt: null,

    remarks: 'Approved by management.',
  },
  {
    rehireRequestGuid: 'mock-rehire-003',
    rehireRequestNumber: 'RHR000003',

    personGuid: 'mock-person-003',
    previousEmploymentGuid: 'mock-employment-003',

    departmentId: 'WH',
    positionId: 'WH_SUPERVISOR',
    workLocationId: 'CEBU',

    employmentType: 'REGULAR',
    startDate: '2026-12-01',

    profileVerified: true,
    justification: 'Request submitted for management review.',

    status: 'REJECTED',

    requestedAt: '2026-10-20T08:00:00',
    approvedAt: null,
    rejectedAt: '2026-10-22T16:00:00',

    remarks: 'Rejected due to active HR restriction.',
  },
  {
    rehireRequestGuid: 'mock-rehire-004',
    rehireRequestNumber: 'RHR000004',

    personGuid: 'mock-person-010',
    previousEmploymentGuid: 'mock-employment-010',

    departmentId: 'HR',
    positionId: 'HR_OFFICER',
    workLocationId: 'CEBU',

    employmentType: 'REGULAR',
    startDate: '2026-12-01',

    profileVerified: false,
    justification: 'Former employee requested reconsideration.',

    status: 'CANCELLED',

    requestedAt: '2026-10-15T09:00:00',
    approvedAt: null,
    rejectedAt: null,

    remarks: 'Cancelled before approval.',
  },
];

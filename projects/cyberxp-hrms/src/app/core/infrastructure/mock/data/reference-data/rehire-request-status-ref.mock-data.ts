
/* ========================================
   Rehire Request Status Reference
   ======================================== */

export interface MockRehireRequestStatusRefRecord {
  id: number;
  code: string;
  name: string;
  isActive: boolean;
}

/* ========================================
   Mock Database
   ======================================== */

export const REHIRE_REQUEST_STATUS_REF_MOCK_DATA:
  MockRehireRequestStatusRefRecord[] = [

  {
    id: 1,
    code: 'PENDING_APPROVAL',
    name: 'Pending Approval',
    isActive: true,
  },

  {
    id: 2,
    code: 'APPROVED',
    name: 'Approved',
    isActive: true,
  },

  {
    id: 3,
    code: 'REJECTED',
    name: 'Rejected',
    isActive: true,
  },

  {
    id: 4,
    code: 'CANCELLED',
    name: 'Cancelled',
    isActive: true,
  },

];

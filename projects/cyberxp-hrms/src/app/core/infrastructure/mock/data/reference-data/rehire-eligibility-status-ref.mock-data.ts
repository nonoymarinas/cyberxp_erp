
/* ========================================
   Rehire Eligibility Status Reference
   ======================================== */

export interface MockRehireEligibilityStatusRefRecord {

  id: number;

  code: string;

  name: string;

  isActive: boolean;
}

/* ========================================
   Rehire Eligibility Status Mock Database
   ======================================== */

export const REHIRE_ELIGIBILITY_STATUS_REF_MOCK_DATA:
  MockRehireEligibilityStatusRefRecord[] = [

  // ======================================
  // Eligible
  // ======================================

  {
    id: 1,
    code: 'ELIGIBLE',
    name: 'Eligible',
    isActive: true,
  },

  // ======================================
  // Review Required
  // ======================================

  {
    id: 2,
    code: 'REVIEW_REQUIRED',
    name: 'Review Required',
    isActive: true,
  },

  // ======================================
  // Not Eligible
  // ======================================

  {
    id: 3,
    code: 'NOT_ELIGIBLE',
    name: 'Not Eligible',
    isActive: true,
  },

];

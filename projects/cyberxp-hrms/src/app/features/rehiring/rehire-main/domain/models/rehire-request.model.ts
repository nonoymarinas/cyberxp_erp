
/* ========================================
   Rehire Request Model
   ======================================== */

export interface RehireRequest {

  // ======================================
  // Person Identity
  // ======================================

  personGuid: string;

  // ======================================
  // Previous Employment
  // ======================================

  previousEmploymentGuid: string;

  // ======================================
  // Proposed New Employment
  // ======================================

  departmentId: string;
  positionId: string;
  workLocationId: string;

  employmentType: string;
  startDate: string;

  // ======================================
  // Profile Verification
  // ======================================

  profileVerified: boolean;

  // ======================================
  // Request Justification
  // ======================================

  justification: string;
}

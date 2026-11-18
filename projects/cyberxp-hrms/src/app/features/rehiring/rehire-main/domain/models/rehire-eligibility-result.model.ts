
import type {
  ApiResponse,
} from '../../../../../shared/models/api-response.model';

/* ========================================
   Rehire Eligibility Result Data
   ======================================== */

export interface RehireEligibilityResultData {

  // ======================================
  // Person and Employment
  // ======================================

  personGuid: string;
  employmentGuid: string;

  // ======================================
  // Eligibility Status
  // ======================================

  // Database-driven reference code.
  // Examples:
  // ELIGIBLE
  // REVIEW_REQUIRED
  // NOT_ELIGIBLE

  eligibilityStatus: string;

  // ======================================
  // Eligibility Verification
  // ======================================

  isBlocklisted: boolean;
  clearanceStatus: string | null;

  // ======================================
  // Eligibility Reasons
  // ======================================

  reasons: string[];

  // ======================================
  // Approval Requirements
  // ======================================

  requiresApproval: boolean;
  canProceed: boolean;

  // ======================================
  // Verification Timestamp
  // ======================================

  verifiedAt: string | null;
}

/* ========================================
   Rehire Eligibility Result
   ======================================== */

export type RehireEligibilityResult =
  ApiResponse<RehireEligibilityResultData>;

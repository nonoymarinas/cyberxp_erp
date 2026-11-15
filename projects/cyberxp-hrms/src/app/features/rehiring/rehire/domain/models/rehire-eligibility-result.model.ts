
import type {
  ApiResponse,
} from '../../../../../shared/models/api-response.model';

/* ========================================
   Rehire Eligibility Status
   ======================================== */

export type RehireEligibilityStatus =
  | 'ELIGIBLE'
  | 'REVIEW_REQUIRED'
  | 'NOT_ELIGIBLE';

/* ========================================
   Rehire Eligibility Result Data
   ======================================== */

export interface RehireEligibilityResultData {
  personGuid: string;
  employmentGuid: string;

  eligibilityStatus: RehireEligibilityStatus;

  isBlocklisted: boolean;
  clearanceStatus: string | null;

  reasons: string[];

  requiresApproval: boolean;
  canProceed: boolean;

  verifiedAt: string | null;
}

/* ========================================
   Rehire Eligibility Result
   ======================================== */

export type RehireEligibilityResult =
  ApiResponse<RehireEligibilityResultData>;

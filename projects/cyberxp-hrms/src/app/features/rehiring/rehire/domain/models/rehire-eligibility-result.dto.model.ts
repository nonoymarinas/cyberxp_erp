
import type {
  ApiResponse,
} from '../../../../../shared/models/api-response.model';

/* ========================================
   Rehire Eligibility Status DTO
   ======================================== */

export type RehireEligibilityStatusDto =
  | 'ELIGIBLE'
  | 'REVIEW_REQUIRED'
  | 'NOT_ELIGIBLE';

/* ========================================
   Rehire Eligibility Result DTO
   ======================================== */

export interface RehireEligibilityResultDto {
  personGuid: string;
  employmentGuid: string;

  eligibilityStatus: RehireEligibilityStatusDto;

  isBlocklisted: boolean;
  clearanceStatus: string | null;

  reasons: string[];

  requiresApproval: boolean;
  canProceed: boolean;

  verifiedAt: string | null;
}

/* ========================================
   Rehire Eligibility API Result DTO
   ======================================== */

export type RehireEligibilityApiResultDto =
  ApiResponse<RehireEligibilityResultDto>;

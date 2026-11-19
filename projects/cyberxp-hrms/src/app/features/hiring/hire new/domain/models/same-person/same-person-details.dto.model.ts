import type { ApiResponse } from '../../../../../../shared/models/api-response.model';

// ========================================
// Same Person Details DTO
// ========================================

export interface SamePersonDetailsDto {
  // ======================================
  // Person Identity
  // ======================================

  personGuid: string;
  personNumber: string;

  firstName: string;
  middleName: string | null;
  lastName: string;

  dateOfBirth: string | null;
  imageUrl: string | null;

  // ======================================
  // Employment Information
  // ======================================

  employmentStatusCode: string;
  employmentStatusName: string;

  // ======================================
  // Rehire Eligibility
  // ======================================

  rehireEligibilityStatusCode: string;
  rehireEligibilityStatusName: string;

  // ======================================
  // Person Restrictions
  // ======================================

  personRestrictionStatusCode: string;
  personRestrictionStatusName: string;

  // ======================================
  // Available Actions
  // ======================================

  availableActions: string[];
}

// ========================================
// Same Person API Response DTO
// ========================================

export type SamePersonDetailsApiResponseDto = ApiResponse<SamePersonDetailsDto>;

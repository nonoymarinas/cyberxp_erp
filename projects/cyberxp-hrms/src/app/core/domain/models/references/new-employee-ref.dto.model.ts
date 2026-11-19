
import type {
  ApiResponse,
} from '../../../../shared/models/api-response.model';

import type {
  ReferenceItemDto,
} from '../../../../shared/models/reference-item.dto.model';

// ========================================
// New Employee Reference Data DTO
// ========================================

export interface NewEmployeeRefDataDto {

  // ======================================
  // Personal Information
  // ======================================

  genders: ReferenceItemDto[];
  civilStatuses: ReferenceItemDto[];
  suffixes: ReferenceItemDto[];

  // ======================================
  // Organization
  // ======================================

  departments: ReferenceItemDto[];
  positions: ReferenceItemDto[];

  // ======================================
  // Employment
  // ======================================

  employmentStatuses: ReferenceItemDto[];
  employmentSeparationTypes: ReferenceItemDto[];
  employmentClearanceStatuses: ReferenceItemDto[];

  // ======================================
  // Address
  // ======================================

  addressTypes: ReferenceItemDto[];

  // ======================================
  // Contacts
  // ======================================

  contactTypes: ReferenceItemDto[];
  contactScopes: ReferenceItemDto[];

  // ======================================
  // Person Matching
  // ======================================

  workFlowStatuses: ReferenceItemDto[];
  personMatchDecisionTypes: ReferenceItemDto[];

  // ======================================
  // Person Restrictions
  // ======================================

  personRestrictionStatuses: ReferenceItemDto[];

  // ======================================
  // Rehire
  // ======================================

  rehireRequestStatuses: ReferenceItemDto[];
  rehireEligibilityStatuses: ReferenceItemDto[];
}

// ========================================
// New Employee Reference API Response DTO
// ========================================

export type NewEmployeeRefApiResponseDto =
  ApiResponse<NewEmployeeRefDataDto>;

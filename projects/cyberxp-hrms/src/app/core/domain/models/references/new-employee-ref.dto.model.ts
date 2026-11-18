
import type {
  ApiResponse,
} from '../../../../shared/models/api-response.model';

import type {
  ReferenceItemDto,
} from '../../../../shared/models/reference-item.dto.model';

/* ========================================
   New Employee Reference Data DTO
   ======================================== */

export interface NewEmployeeRefDataDto {

  // ======================================
  // Personal Information
  // ======================================

  genders: ReferenceItemDto[];
  civilStatuses: ReferenceItemDto[];
  suffixes: ReferenceItemDto[];

  // ======================================
  // Employment
  // ======================================

  departments: ReferenceItemDto[];
  positions: ReferenceItemDto[];
  employmentStatuses: ReferenceItemDto[];
  branches: ReferenceItemDto[];

  // ======================================
  // Employment Separation Types
  // ======================================

  employmentSeparationTypes: ReferenceItemDto[];

  // ======================================
  // Employment Clearance Statuses
  // ======================================

  employmentClearanceStatuses: ReferenceItemDto[];

  // ======================================
  // Address
  // ======================================

  addressTypes: ReferenceItemDto[];

  // ======================================
  // Contacts
  // ======================================

  contactMediumTypes: ReferenceItemDto[];
  contactContextTypes: ReferenceItemDto[];

  // ======================================
  // Person Match
  // ======================================

  personMatchLevels: ReferenceItemDto[];
  workFlowStatuses: ReferenceItemDto[];
  matchDecisionTypes: ReferenceItemDto[];

  // ======================================
  // Person Restriction Types
  // ======================================

  personRestrictionTypes: ReferenceItemDto[];

  // ======================================
  // Person Restriction Statuses
  // ======================================

  personRestrictionStatuses: ReferenceItemDto[];

  // ======================================
  // Rehire
  // ======================================

  rehireRequestStatuses: ReferenceItemDto[];
  rehireEligibilityStatuses: ReferenceItemDto[];
}

/* ========================================
   API Response DTO
   ======================================== */

export type NewEmployeeRefApiResponseDto =
  ApiResponse<NewEmployeeRefDataDto>;

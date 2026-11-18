
import type {
  ReferenceItem,
} from '../../../shared/models/reference-item.model';

import type {
  ReferenceItemDto,
} from '../../../shared/models/reference-item.dto.model';

// ========================================
// DTO Models
// ========================================

import type {
  NewEmployeeRefDataDto,
  NewEmployeeRefApiResponseDto,
} from '../../domain/models/references/new-employee-ref.dto.model';

// ========================================
// Application Models
// ========================================

import type {
  NewEmployeeRefData,
  NewEmployeeRefApiResponse,
} from '../../domain/models/references/new-employee-ref.model';

// ========================================
// Reference Item Mapper
// ========================================

export function mapReferenceItem(
  dto: ReferenceItemDto
): ReferenceItem<string> {

  return {
    id: dto.publicId,
    name: dto.referenceName,
    code: dto.code
      ? dto.code.trim().toUpperCase()
      : null,
    disabled: false,
  };
}

// ========================================
// New Employee Reference Data Mapper
// ========================================

export function mapNewEmployeeRefData(
  dto: NewEmployeeRefDataDto
): NewEmployeeRefData {

  return {

    // ====================================
    // Personal Information References
    // ====================================

    genders:
      (dto.genders ?? []).map(mapReferenceItem),

    civilStatuses:
      (dto.civilStatuses ?? []).map(mapReferenceItem),

    suffixes:
      (dto.suffixes ?? []).map(mapReferenceItem),

    // ====================================
    // Employment References
    // ====================================

    departments:
      (dto.departments ?? []).map(mapReferenceItem),

    positions:
      (dto.positions ?? []).map(mapReferenceItem),

    employmentStatuses:
      (dto.employmentStatuses ?? []).map(mapReferenceItem),

    branches:
      (dto.branches ?? []).map(mapReferenceItem),

    // ====================================
    // Employment Separation Type References
    // ====================================

    employmentSeparationTypes:
      (dto.employmentSeparationTypes ?? [])
        .map(mapReferenceItem),

    // ====================================
    // Employment Clearance Status References
    // ====================================

    employmentClearanceStatuses:
      (dto.employmentClearanceStatuses ?? [])
        .map(mapReferenceItem),

    // ====================================
    // Address References
    // ====================================

    addressTypes:
      (dto.addressTypes ?? []).map(mapReferenceItem),

    // ====================================
    // Contact References
    // ====================================

    contactMediumTypes:
      (dto.contactMediumTypes ?? []).map(mapReferenceItem),

    contactContextTypes:
      (dto.contactContextTypes ?? []).map(mapReferenceItem),

    // ====================================
    // Person Match Level References
    // ====================================

    personMatchLevels:
      (dto.personMatchLevels ?? []).map(mapReferenceItem),

    // ====================================
    // Workflow Status References
    // ====================================

    workFlowStatuses:
      (dto.workFlowStatuses ?? []).map(mapReferenceItem),

    // ====================================
    // Person Match Decision References
    // ====================================

    matchDecisionTypes:
      (dto.matchDecisionTypes ?? []).map(mapReferenceItem),

    // ====================================
    // Person Restriction Type References
    // ====================================

    personRestrictionTypes:
      (dto.personRestrictionTypes ?? [])
        .map(mapReferenceItem),

    // ====================================
    // Person Restriction Status References
    // ====================================

    personRestrictionStatuses:
      (dto.personRestrictionStatuses ?? [])
        .map(mapReferenceItem),

    // ====================================
    // Rehire Request Status References
    // ====================================

    rehireRequestStatuses:
      (dto.rehireRequestStatuses ?? [])
        .map(mapReferenceItem),

    // ====================================
    // Rehire Eligibility Status References
    // ====================================

    rehireEligibilityStatuses:
      (dto.rehireEligibilityStatuses ?? [])
        .map(mapReferenceItem),

  };
}

// ========================================
// New Employee API Response Mapper
// ========================================

export function mapNewEmployeeRefApiResponse(
  response: NewEmployeeRefApiResponseDto
): NewEmployeeRefApiResponse {

  // ======================================
  // Validate API Response
  // ======================================

  if (!response.success || !response.data) {

    throw new Error(
      response.message ||
      'Unable to retrieve employee references.'
    );
  }

  // ======================================
  // Map API Response
  // ======================================

  return {
    ...response,
    data: mapNewEmployeeRefData(response.data),
  };
}

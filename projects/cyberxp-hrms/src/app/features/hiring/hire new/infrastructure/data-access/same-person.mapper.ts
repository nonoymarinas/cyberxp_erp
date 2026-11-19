
import type {
  SamePersonDetailsDto,
  SamePersonDetailsApiResponseDto,
} from '../../domain/models/same-person/same-person-details.dto.model';

// ========================================
// Application Models
// ========================================

import type {
  SamePersonDetails,
  SamePersonDetailsApiResponse,
} from '../../domain/models/same-person/same-person-details.model';

// ========================================
// Same Person Details Mapper
// ========================================

export function mapSamePersonDetails(
  dto: SamePersonDetailsDto
): SamePersonDetails {

  return {

    // ======================================
    // Person Identity
    // ======================================

    personGuid: dto.personGuid,
    personNumber: dto.personNumber,

    firstName: dto.firstName,
    middleName: dto.middleName,
    lastName: dto.lastName,

    dateOfBirth: dto.dateOfBirth,
    imageUrl: dto.imageUrl,

    // ======================================
    // Employment Information
    // ======================================

    employmentStatusCode:
      dto.employmentStatusCode,

    employmentStatusName:
      dto.employmentStatusName,

    // ======================================
    // Rehire Eligibility
    // ======================================

    rehireEligibilityStatusCode:
      dto.rehireEligibilityStatusCode,

    rehireEligibilityStatusName:
      dto.rehireEligibilityStatusName,

    // ======================================
    // Person Restrictions
    // ======================================

    personRestrictionStatusCode:
      dto.personRestrictionStatusCode,

    personRestrictionStatusName:
      dto.personRestrictionStatusName,

    // ======================================
    // Available Actions
    // ======================================

    availableActions: [
      ...dto.availableActions,
    ],
  };
}

// ========================================
// Same Person API Response Mapper
// ========================================

export function mapSamePersonApiResponse(
  response: SamePersonDetailsApiResponseDto
): SamePersonDetailsApiResponse {

  // ======================================
  // Validate API Response
  // ======================================

  if (
    !response.success ||
    !response.data
  ) {

    throw new Error(
      response.message ||
      'Unable to retrieve Same Person details.'
    );
  }

  // ======================================
  // Map API Response
  // ======================================

  return {
    ...response,
    data: mapSamePersonDetails(
      response.data
    ),
  };
}

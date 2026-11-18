
import type {
  PersonMatchResolutionDto,
  PersonMatchResolutionApiResponseDto,
} from '../../domain/models/shared/person-match-resolution/person-match-resolution.dto.model';

import type {
  PersonMatchResolution,
  PersonMatchResolutionApiResponse,
} from '../../domain/models/shared/person-match-resolution/person-match-resolution.model';

// ========================================
// Map Person Match Resolution DTO
// ========================================

export function mapPersonMatchResolution(
  dto: PersonMatchResolutionDto
): PersonMatchResolution {

  return {
    screeningId: dto.screeningId,
    personGuid: dto.personGuid,
    personNumber: dto.personNumber,
    fullName: dto.fullName,
    employmentStatus: dto.employmentStatus,
    isBlocklisted: dto.isBlocklisted,
    allowedActions: [...dto.allowedActions],
  };
}

// ========================================
// Map API Response
// ========================================

export function mapPersonMatchResolutionApiResponse(
  response: PersonMatchResolutionApiResponseDto
): PersonMatchResolutionApiResponse {

  if (!response.success) {
    throw new Error(
      response.message ||
      'Unable to retrieve person match resolution.'
    );
  }

  if (!response.data) {
    throw new Error(
      'Person match resolution response contains no data.'
    );
  }

  return {
    success: response.success,
    message: response.message,
    errorCode: response.errorCode,
    data: mapPersonMatchResolution(response.data),
  };
}

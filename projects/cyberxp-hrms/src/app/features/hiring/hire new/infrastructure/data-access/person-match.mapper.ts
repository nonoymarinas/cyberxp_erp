
import {
  PersonMatchDto,
  PersonMatchApiResponseDto,
} from '../../domain/models/person-match/person-match.dto.model';

import {
  PersonMatch,
  PersonMatchApiResponse,
} from '../../domain/models/person-match/person-match.model';

// ========================================
// Map Person Match DTO
// ========================================

export function mapPersonMatch(
  dto: PersonMatchDto
): PersonMatch {

  return {
    personGuid: dto.personGuid,
    personNumber: dto.personNumber,

    firstName: dto.firstName,
    middleName: dto.middleName,
    lastName: dto.lastName,
    dateOfBirth: dto.dateOfBirth,

    personMatchScore: dto.personMatchScore,
    personMatchLevel: dto.personMatchLevel,
    personMatchMethod: dto.personMatchMethod,

    imageUrl: dto.imageUrl,
  };
}

// ========================================
// Map Person Match API Response
// ========================================

export function mapPersonMatchApiResponse(
  response: PersonMatchApiResponseDto
): PersonMatchApiResponse {

  if (!response.success) {
    throw new Error(
      response.message ||
      'Person matching failed.'
    );
  }

  if (!Array.isArray(response.data)) {
    throw new Error(
      'Invalid person matching response: data must be an array.'
    );
  }

  return {
    success: response.success,
    message: response.message,
    errorCode: response.errorCode,
    data: response.data.map(mapPersonMatch),
  };
}


import {
  PersonMatchDto,
} from '../../domain/models/shared/person-match/person-match.dto.model';

import {
  PersonMatch,
} from '../../domain/models/shared/person-match/person-match.model';

import {
  PersonMatchApiResponseDto,
} from '../../domain/models/shared/person-match/person-match-result.dto.model';

import {
  PersonMatchResult,
  PersonMatchApiResponse,
} from '../../domain/models/shared/person-match/person-match-result.model';

// ========================================
// Map Individual Person Match
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

    matchScore: dto.matchScore,
    matchType: dto.matchType,

    imageUrl: dto.imageUrl,

    matchClassificationId:
      dto.matchClassificationId,
  };
}

// ========================================
// Map Person Match Result
// ========================================

export function mapPersonMatchResult(
  dto: PersonMatchApiResponseDto['data']
): PersonMatchResult {

  return {
    workflowStatus: dto.workflowStatus,
    workflowStatusCode: dto.workflowStatusCode,

    hasPossibleMatch: dto.hasPossibleMatch,
    hasBlocklistMatch: dto.hasBlocklistMatch,

    totalMatches: dto.totalMatches,

    matches: dto.matches.map(
      item => mapPersonMatch(item)
    ),
  };
}

// ========================================
// Map Complete API Response
// ========================================

export function mapPersonMatchApiResult(
  response: PersonMatchApiResponseDto
): PersonMatchApiResponse {

  if (!response.success || !response.data) {
    throw new Error(
      response.message || 'Person matching failed.'
    );
  }

  return {
    success: response.success,
    message: response.message,
    errorCode: response.errorCode,

    data: mapPersonMatchResult(
      response.data
    ),
  };
}

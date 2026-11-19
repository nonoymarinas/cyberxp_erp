
import {
  PersonMatchDecisionDto,
  PersonMatchDecisionApiResponseDto,
} from '../../domain/models/person-match-decision/person-match-decision.dto.model';

import {
  PersonMatchDecision,
  PersonMatchDecisionApiResponse,
} from '../../domain/models/person-match-decision/person-match-decision.model';

// ========================================
// Map Person Match Decision DTO
// ========================================

export function mapPersonMatchDecision(
  dto: PersonMatchDecisionDto
): PersonMatchDecision {

  return {
    decisionGuid: dto.decisionGuid,

    screeningId: dto.screeningId,
    personGuid: dto.personGuid,

    decisionCode: dto.decisionCode,

    remarks: dto.remarks,

    decidedBy: dto.decidedBy,
    decidedAt: dto.decidedAt,
  };
}

// ========================================
// Map Person Match Decision API Response
// ========================================

export function mapPersonMatchDecisionApiResponse(
  response: PersonMatchDecisionApiResponseDto
): PersonMatchDecisionApiResponse {

  // ======================================
  // Validate API Success
  // ======================================

  if (!response.success) {
    throw new Error(
      response.message ||
      'Unable to save person match decision.'
    );
  }

  // ======================================
  // Validate Response Data
  // ======================================

  if (
    !response.data ||
    typeof response.data !== 'object' ||
    Array.isArray(response.data)
  ) {
    throw new Error(
      'Invalid person match decision response: data is missing.'
    );
  }

  // ======================================
  // Map Response
  // ======================================

  return {
    success: response.success,
    message: response.message,
    errorCode: response.errorCode,

    data: mapPersonMatchDecision(
      response.data
    ),
  };
}

import { ApiResponse } from '../../../../../../shared/models/api-response.model';

// ========================================
// Person Match Decision DTO
// ========================================

export interface PersonMatchDecisionDto {
  decisionGuid: string;

  screeningId: string;

  personGuid: string;

  decisionCode: string;

  remarks: string | null;

  decidedBy: string;

  decidedAt: string;
}

// ========================================
// Person Match Decision API Response DTO
// ========================================

export type PersonMatchDecisionApiResponseDto = ApiResponse<PersonMatchDecisionDto>;

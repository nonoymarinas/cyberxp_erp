import { ApiResponse } from '../../../../../../shared/models/api-response.model';

// ========================================
// Person Match Decision
// ========================================

export interface PersonMatchDecision {
  decisionGuid: string;

  screeningId: string;

  personGuid: string;

  decisionCode: string;

  remarks: string | null;

  decidedBy: string;

  decidedAt: string;
}

// ========================================
// Person Match Decision API Response
// ========================================

export type PersonMatchDecisionApiResponse = ApiResponse<PersonMatchDecision>;

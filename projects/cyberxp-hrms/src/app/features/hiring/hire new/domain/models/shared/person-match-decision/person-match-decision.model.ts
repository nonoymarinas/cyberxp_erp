// ========================================
// Match Decision
// ========================================

export type MatchDecision =
  | 'CONFIRMED'
  | 'DISMISSED'
  | 'ESCALATED';

// ========================================
// Submit Decision Request
// ========================================

export interface SubmitPersonMatchDecisionRequest {
  personGuid: string;
  decision: MatchDecision;
  reason: string;
}

// ========================================
// Submit Decision Response
// ========================================

export interface SubmitPersonMatchDecisionResponse {
  screeningId: string;
  personGuid: string;
  decision: MatchDecision;
  reason: string;
}



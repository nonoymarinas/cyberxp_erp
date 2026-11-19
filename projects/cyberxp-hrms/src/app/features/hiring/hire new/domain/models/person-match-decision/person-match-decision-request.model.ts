
// ========================================
// Person Match Decision Request
// ========================================

export interface PersonMatchDecisionRequest {

  screeningId: string;

  personGuid: string;

  decisionCode: string;

  remarks: string | null;
}

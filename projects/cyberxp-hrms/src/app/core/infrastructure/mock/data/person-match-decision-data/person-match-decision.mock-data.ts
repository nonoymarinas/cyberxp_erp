
// ========================================
// Person Match Decision Mock Database
// ========================================

export interface MockPersonMatchDecisionRecord {

  decisionGuid: string;

  screeningId: string;

  personGuid: string;

  decisionCode: string;

  remarks: string | null;

  decidedBy: string;

  decidedAt: string;
}

// ========================================
// Mock Database Storage
// ========================================

// Starts empty because no HR decisions
// have been recorded yet.
//
// Records are inserted by the
// PersonMatchDecisionMockRepository.

export const PERSON_MATCH_DECISION_MOCK_DATA:
  MockPersonMatchDecisionRecord[] = [];

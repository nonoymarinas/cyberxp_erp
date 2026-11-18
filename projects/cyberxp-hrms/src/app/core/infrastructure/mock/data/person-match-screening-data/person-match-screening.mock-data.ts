
// ========================================
// Person Match Screening Mock Data
// ========================================

// ========================================
// Screening Workflow Status
// ========================================

// These codes correspond to the existing
// WORK_FLOW_STATUS_MOCK_DATA reference.
//
// CLEAR  - Screening cleared
// REVIEW - HR review required
// HOLD   - Screening on hold

export type PersonMatchScreeningStatusCode =
  | 'CLEAR'
  | 'REVIEW'
  | 'HOLD';

// ========================================
// Screening Candidate Record
// ========================================

export interface MockPersonMatchScreeningCandidateRecord {

  // Existing person identified by matching.
  personGuid: string;

}

// ========================================
// Screening Session Record
// ========================================

export interface MockPersonMatchScreeningRecord {

  // Unique screening session identifier.
  screeningId: string;

  // Applicant identity snapshot.
  // This is not yet an employee record.

  firstName: string;

  middleName: string | null;

  lastName: string;

  dateOfBirth: string;

  // ======================================
  // Screening Workflow
  // ======================================

  statusCode: PersonMatchScreeningStatusCode;

  // ======================================
  // Matching Candidates
  // ======================================

  candidates: MockPersonMatchScreeningCandidateRecord[];

  // ======================================
  // Audit Information
  // ======================================

  createdAt: string;

  updatedAt: string;

}

// ========================================
// Screening Session Mock Database
// ========================================

// Empty initially.
//
// Sessions must be created by the
// Person Match Screening Mock Repository
// when a matching request is processed.
//
// Do not create hardcoded screening IDs
// or candidate GUIDs here.

export const PERSON_MATCH_SCREENING_MOCK_DATA:
  MockPersonMatchScreeningRecord[] = [];

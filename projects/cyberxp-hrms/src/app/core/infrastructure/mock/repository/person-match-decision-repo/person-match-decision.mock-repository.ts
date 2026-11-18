
import {
  Injectable,
} from '@angular/core';

// ========================================
// Mock Database
// ========================================

import {
  PERSON_MATCH_DECISION_MOCK_DATA,
  MockPersonMatchDecisionRecord,
} from '../../data/person-match-decision-data/person-match-decision.mock-data';

// ========================================
// Decision Type Reference Repository
// ========================================

import {
  findMockPersonMatchDecisionTypeByCode,
} from '../reference-repo/person-match-decision-type-ref.mock-repository';

// ========================================
// Request Model
// ========================================

import {
  PersonMatchDecisionRequest,
} from '../../../../../features/hiring/hire new/domain/models/shared/person-match-decision/person-match-decision-request.model';

// ========================================
// Mock Repository
// ========================================

@Injectable({
  providedIn: 'root',
})
export class PersonMatchDecisionMockRepository {

  // ========================================
  // Create Decision
  // ========================================

  createDecision(
    request: PersonMatchDecisionRequest,
    decidedBy: string
  ): MockPersonMatchDecisionRecord {

    // ======================================
    // Validate Request
    // ======================================

    const screeningId =
      request.screeningId?.trim();

    const personGuid =
      request.personGuid?.trim();

    const decisionCode =
      request.decisionCode?.trim().toUpperCase();

    if (!screeningId) {
      throw new Error(
        'Screening ID is required.'
      );
    }

    if (!personGuid) {
      throw new Error(
        'Person GUID is required.'
      );
    }

    if (!decisionCode) {
      throw new Error(
        'Decision code is required.'
      );
    }

    if (!decidedBy?.trim()) {
      throw new Error(
        'Decision reviewer is required.'
      );
    }

    // ======================================
    // Validate Decision Reference
    // ======================================

    const decisionType =
      findMockPersonMatchDecisionTypeByCode(
        decisionCode
      );

    if (!decisionType) {
      throw new Error(
        `Invalid person match decision code: ${decisionCode}`
      );
    }

    // ======================================
    // Prevent Duplicate Decision
    // ======================================

    const existingDecision =
      this.getDecisionByScreeningAndPerson(
        screeningId,
        personGuid
      );

    if (existingDecision) {
      throw new Error(
        'A decision has already been recorded for this person in the current screening.'
      );
    }

    // ======================================
    // Create Decision Record
    // ======================================

    const decision: MockPersonMatchDecisionRecord = {
      decisionGuid: crypto.randomUUID(),

      screeningId,
      personGuid,

      decisionCode,

      remarks: request.remarks?.trim() || null,

      decidedBy: decidedBy.trim(),

      decidedAt: new Date().toISOString(),
    };

    // ======================================
    // Save to Mock Database
    // ======================================

    PERSON_MATCH_DECISION_MOCK_DATA.push(
      decision
    );

    return { ...decision };
  }

  // ========================================
  // Get All Decisions
  // ========================================

  getAllDecisions():
    MockPersonMatchDecisionRecord[] {

    return PERSON_MATCH_DECISION_MOCK_DATA
      .map(item => ({ ...item }));
  }

  // ========================================
  // Get Decision By GUID
  // ========================================

  getDecisionByGuid(
    decisionGuid: string
  ): MockPersonMatchDecisionRecord | undefined {

    const item =
      PERSON_MATCH_DECISION_MOCK_DATA.find(
        item =>
          item.decisionGuid === decisionGuid
      );

    return item ? { ...item } : undefined;
  }

  // ========================================
  // Get Decisions By Screening ID
  // ========================================

  getDecisionsByScreeningId(
    screeningId: string
  ): MockPersonMatchDecisionRecord[] {

    return PERSON_MATCH_DECISION_MOCK_DATA
      .filter(
        item =>
          item.screeningId === screeningId
      )
      .map(item => ({ ...item }));
  }

  // ========================================
  // Get Decision By Screening And Person
  // ========================================

  getDecisionByScreeningAndPerson(
    screeningId: string,
    personGuid: string
  ): MockPersonMatchDecisionRecord | undefined {

    const item =
      PERSON_MATCH_DECISION_MOCK_DATA.find(
        item =>
          item.screeningId === screeningId &&
          item.personGuid === personGuid
      );

    return item ? { ...item } : undefined;
  }
}

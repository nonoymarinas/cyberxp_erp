
import {
  Injectable,
    inject,
} from '@angular/core';

// ========================================
// Request and DTO Models
// ========================================

import type {
  PersonMatchResolutionRequest,
} from '../../../../../features/hiring/hire new/domain/models/person-match-resolution/person-match-resolution-request.model';

import type {
  PersonMatchResolutionDto,
} from '../../../../../features/hiring/hire new/domain/models/person-match-resolution/person-match-resolution.dto.model';

import type {
  PersonEmploymentStatus,
  PersonResolutionAction,
} from '../../../../../features/hiring/hire new/domain/models/person-match-resolution/person-match-resolution-type-ref.model';

// ========================================
// Mock Data
// ========================================

import {
  PERSON_MATCH_SCREENING_MOCK_DATA,
} from '../../data/person-match-screening-data/person-match-screening.mock-data';

import {
  PERSON_EMPLOYMENT_MOCK_DATA,
} from '../../data/person-match-resolution-data/person-employment.mock-data';

import {
  PERSON_BLOCKLIST_MOCK_DATA,
} from '../../data/person-match-resolution-data/person-blocklist.mock-data';

// ========================================
// Existing Mock Repositories
// ========================================

import {
  findMockPersonByGuid,
} from '../shared/person.mock-repository';

import {
  PersonMatchDecisionMockRepository,
} from '../person-match-decision-repo/person-match-decision.mock-repository';

// ========================================
// Resolution Mock Repository
// ========================================

@Injectable({
  providedIn: 'root',
})
export class PersonMatchResolutionMockRepository {

  // ========================================
  // Dependencies
  // ========================================

  private readonly decisionRepository =
    inject(PersonMatchDecisionMockRepository);

  // ========================================
  // Get Resolution
  // ========================================

  getResolution(
    request: PersonMatchResolutionRequest
  ): PersonMatchResolutionDto {

    // ======================================
    // Validate Request
    // ======================================

    const screeningId =
      request.screeningId?.trim();

    const personGuid =
      request.personGuid?.trim();

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

    // ======================================
    // Validate Screening Session
    // ======================================

    const screening =
      PERSON_MATCH_SCREENING_MOCK_DATA.find(
        record =>
          record.screeningId === screeningId
      );

    if (!screening) {
      throw new Error(
        'Screening session was not found.'
      );
    }

    // ======================================
    // Validate Candidate Membership
    // ======================================

    const isCandidate =
      screening.candidates.some(
        candidate =>
          candidate.personGuid === personGuid
      );

    if (!isCandidate) {
      throw new Error(
        'Person does not belong to this screening session.'
      );
    }

    // ======================================
    // Validate Confirmed Decision
    // ======================================

    const decision =
      this.decisionRepository
        .getDecisionByScreeningAndPerson(
          screeningId,
          personGuid
        );

    if (!decision) {
      throw new Error(
        'No saved HR decision exists for this person.'
      );
    }

    if (decision.decisionCode !== 'SAME_PERSON') {
      throw new Error(
        'A confirmed Same Person decision is required.'
      );
    }

    // ======================================
    // Retrieve Existing Person
    // ======================================

    const person =
      findMockPersonByGuid(personGuid);

    if (!person) {
      throw new Error(
        'Existing person record was not found.'
      );
    }

    // ======================================
    // Retrieve Employment Record
    // ======================================

    const employment =
      PERSON_EMPLOYMENT_MOCK_DATA.find(
        record =>
          record.personGuid === personGuid
      );

    const employmentStatus:
      PersonEmploymentStatus =
        employment?.employmentStatus ?? 'NONE';

    // ======================================
    // Retrieve Blocklist Status
    // ======================================

    const isBlocklisted =
      PERSON_BLOCKLIST_MOCK_DATA.some(
        record =>
          record.personGuid === personGuid &&
          record.isActive
      );

    // ======================================
    // Calculate Allowed Actions
    // ======================================

    const allowedActions =
      this.resolveAllowedActions(
        employmentStatus,
        isBlocklisted
      );

    // ======================================
    // Build Full Name
    // ======================================

    const fullName = [
      person.firstName,
      person.middleName,
      person.lastName,
    ]
      .map(value => value?.trim())
      .filter(Boolean)
      .join(' ');

    // ======================================
    // Return Resolution DTO
    // ======================================

    return {
      screeningId,
      personGuid,
      personNumber: person.personNumber,
      fullName,
      employmentStatus,
      isBlocklisted,
      allowedActions,
    };
  }

  // ========================================
  // Resolve Allowed Actions
  // ========================================

  private resolveAllowedActions(
    employmentStatus: PersonEmploymentStatus,
    isBlocklisted: boolean
  ): PersonResolutionAction[] {

    // ======================================
    // Blocklisted Person
    // ======================================

    if (isBlocklisted) {
      return [
        'BLOCKLIST_REVIEW',
      ];
    }

    // ======================================
    // Employment Status Rules
    // ======================================

    switch (employmentStatus) {

      case 'ACTIVE':
        return [
          'VIEW_EMPLOYEE',
        ];

      case 'INACTIVE':
        return [
          'VIEW_EMPLOYEE',
          'REACTIVATE',
        ];

      case 'RESIGNED':
        return [
          'VIEW_EMPLOYEE',
          'REHIRE',
        ];

      case 'TERMINATED':
        return [
          'VIEW_EMPLOYEE',
        ];

      case 'RETIRED':
        return [
          'VIEW_EMPLOYEE',
        ];

      case 'NONE':
        return [
          'HIRE_EXISTING',
        ];

      default:
        return [];
    }
  }
}

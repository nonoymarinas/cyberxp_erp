import { Injectable } from '@angular/core';

// ========================================
// Existing Mock Data
// ========================================

import { PERSON_MOCK_DATA } from '../../data/shared/person.mock-data';

import { EMPLOYMENT_MOCK_DATA } from '../../data/shared/employment.mock-data';

import { EMPLOYMENT_SEPARATION_MOCK_DATA } from '../../data/person-rehire-data/employment-separation.mock-data';

import { PERSON_RESTRICTION_MOCK_DATA } from '../../data/person-rehire-data/person-restriction.mock-data';

import { REHIRE_REQUEST_MOCK_DATA } from '../../data/person-rehire-data/rehire-request.mock-data';

// ========================================
// DTO
// ========================================

import type { SamePersonDetailsDto } from '../../../../../features/hiring/hire new/domain/models/same-person/same-person-details.dto.model';

// ========================================
// Same Person Mock Repository
// ========================================

@Injectable({
  providedIn: 'root',
})
export class SamePersonMockRepository {
  // ========================================
  // Find Same Person Details
  // ========================================

  findByPersonGuid(personGuid: string): SamePersonDetailsDto | null {
    const guid = personGuid.trim().toLowerCase();

    if (!guid) {
      return null;
    }

    // ======================================
    // Find Existing Person
    // ======================================

    const person = PERSON_MOCK_DATA.find((item) => item.personGuid.toLowerCase() === guid);

    if (!person) {
      return null;
    }

    // ======================================
    // Find Employment History
    // ======================================

    const employmentHistory = EMPLOYMENT_MOCK_DATA.filter(
      (item) => item.personGuid.toLowerCase() === guid,
    ).sort((a, b) => b.hireDate.localeCompare(a.hireDate));

    // ======================================
    // Determine Current Employment
    // ======================================

    const activeEmployment = employmentHistory.find((item) => item.status === 'ACTIVE');

    const inactiveEmployment = employmentHistory.find((item) => item.status === 'INACTIVE');

    const latestEmployment = activeEmployment ?? inactiveEmployment ?? employmentHistory[0] ?? null;

    // ======================================
    // Employment Status
    // ======================================

    // ========================================
    // Employment Status
    // ========================================

    const employmentStatusCode: string = latestEmployment ? latestEmployment.status : 'NONE';

    const employmentStatusName = this.formatCode(employmentStatusCode);

    // ======================================
    // Separation Records
    // ======================================

    const separationRecords = employmentHistory.flatMap((employment) =>
      EMPLOYMENT_SEPARATION_MOCK_DATA.filter(
        (separation) => separation.employmentGuid === employment.employmentGuid,
      ),
    );

    // ======================================
    // Employment Data Consistency
    // ======================================

    const hasEmploymentConflict = employmentHistory.some((employment) => {
      const separation = separationRecords.find(
        (item) => item.employmentGuid === employment.employmentGuid,
      );

      if (!separation) {
        return false;
      }

      if (employment.status === 'ACTIVE' || employment.status === 'INACTIVE') {
        return true;
      }

      if (employment.separationDate !== separation.effectiveDate) {
        return true;
      }

      const expectedTypes: Record<string, string[]> = {
        RESIGNED: ['RESIGNATION'],

        TERMINATED: ['TERMINATION'],

        RETIRED: ['RETIREMENT'],

        END_OF_CONTRACT: ['CONTRACT_EXPIRATION', 'PROJECT_COMPLETION'],
      };

      const allowedTypes = expectedTypes[employment.status];

      return !!allowedTypes && !allowedTypes.includes(separation.separationType);
    });

    // ======================================
    // Active Restrictions
    // ======================================

    const activeRestrictions = PERSON_RESTRICTION_MOCK_DATA.filter(
      (item) => item.personGuid.toLowerCase() === guid && item.status === 'ACTIVE',
    );

    const hasActiveRestriction = activeRestrictions.length > 0;

    const hasBlocklistRestriction = activeRestrictions.some(
      (item) => item.restrictionType === 'BLOCKLIST',
    );

    // ======================================
    // Restriction Status
    // ======================================

    const personRestrictionStatusCode = hasActiveRestriction ? 'ACTIVE' : 'CLEAR';

    const personRestrictionStatusName = hasActiveRestriction
      ? 'Active Restriction'
      : 'No Active Restriction';

    // ======================================
    // Existing Rehire Requests
    // ======================================

    const existingRehireRequests = REHIRE_REQUEST_MOCK_DATA.filter(
      (item) => item.personGuid.toLowerCase() === guid,
    );

    const hasPendingRehireRequest = existingRehireRequests.some(
      (item) => item.status === 'PENDING_APPROVAL',
    );

    // ======================================
    // Clearance Status
    // ======================================

    const hasUnresolvedClearance = separationRecords.some(
      (item) => item.clearanceStatus !== 'CLEARED',
    );

    // ======================================
    // Rehire Eligibility
    // ======================================

    let rehireEligibilityStatusCode = 'REVIEW_REQUIRED';

    let rehireEligibilityStatusName = 'Review Required';

    if (hasBlocklistRestriction || hasActiveRestriction) {
      rehireEligibilityStatusCode = 'ON_HOLD';

      rehireEligibilityStatusName = 'On Hold';
    } else if (hasEmploymentConflict || hasUnresolvedClearance) {
      rehireEligibilityStatusCode = 'REVIEW_REQUIRED';

      rehireEligibilityStatusName = 'Review Required';
    } else if (hasPendingRehireRequest) {
      rehireEligibilityStatusCode = 'PENDING_APPROVAL';

      rehireEligibilityStatusName = 'Pending Approval';
    } else if (employmentStatusCode === 'ACTIVE' || employmentStatusCode === 'INACTIVE') {
      rehireEligibilityStatusCode = 'NOT_APPLICABLE';

      rehireEligibilityStatusName = 'Existing Employment Relationship';
    } else if (employmentStatusCode === 'NONE') {
      rehireEligibilityStatusCode = 'NOT_APPLICABLE';

      rehireEligibilityStatusName = 'No Previous Employment';
    } else if (employmentStatusCode === 'RESIGNED' || employmentStatusCode === 'END_OF_CONTRACT') {
      rehireEligibilityStatusCode = 'FOR_ASSESSMENT';

      rehireEligibilityStatusName = 'For Rehire Assessment';
    } else {
      rehireEligibilityStatusCode = 'REVIEW_REQUIRED';

      rehireEligibilityStatusName = 'HR Review Required';
    }

    // ======================================
    // Available Actions
    // ======================================

    const availableActions: string[] = ['VIEW_PERSON', 'VIEW_EMPLOYMENT_HISTORY'];

    if (hasActiveRestriction || hasEmploymentConflict || hasUnresolvedClearance) {
      availableActions.push('REVIEW_RESTRICTION');
    } else if (hasPendingRehireRequest) {
      availableActions.push('VIEW_REHIRE_REQUEST');
    } else if (employmentStatusCode === 'ACTIVE') {
      availableActions.push('VIEW_EMPLOYEE');
    } else if (employmentStatusCode === 'INACTIVE') {
      availableActions.push('REVIEW_REACTIVATION');
    } else if (employmentStatusCode === 'RESIGNED' || employmentStatusCode === 'END_OF_CONTRACT') {
      availableActions.push('START_REHIRE_ASSESSMENT');
    } else if (employmentStatusCode === 'NONE') {
      availableActions.push('CONTINUE_HIRING');
    } else {
      availableActions.push('REQUEST_HR_REVIEW');
    }

    // ======================================
    // Return Same Person Details
    // ======================================

    return {
      personGuid: person.personGuid,
      personNumber: person.personNumber,

      firstName: person.firstName,
      middleName: person.middleName || null,
      lastName: person.lastName,

      dateOfBirth: person.dateOfBirth,
      imageUrl: person.imageUrl,

      employmentStatusCode,
      employmentStatusName,

      rehireEligibilityStatusCode,
      rehireEligibilityStatusName,

      personRestrictionStatusCode,
      personRestrictionStatusName,

      availableActions,
    };
  }

  // ========================================
  // Format Reference Code
  // ========================================

  private formatCode(code: string): string {
    return code
      .replace(/_/g, ' ')
      .toLowerCase()
      .replace(/\b\w/g, (character) => character.toUpperCase());
  }
}

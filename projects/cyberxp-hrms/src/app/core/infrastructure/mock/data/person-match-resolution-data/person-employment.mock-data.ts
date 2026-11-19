
// ========================================
// Person Employment Mock Data
// ========================================

import type {
  PersonEmploymentStatus,
} from '../../../../../features/hiring/hire new/domain/models/person-match-resolution/person-match-resolution-type-ref.model';

// ========================================
// Person Employment Record
// ========================================

export interface MockPersonEmploymentRecord {

  // Existing person identifier.
  personGuid: string;

  // Employee number assigned to the person.
  employeeNumber: string;

  // Current employment status.
  employmentStatus: PersonEmploymentStatus;

  // Employment dates.
  dateHired: string | null;

  dateSeparated: string | null;

  // Audit information.
  createdAt: string;

  updatedAt: string;

}

// ========================================
// Person Employment Mock Database
// ========================================

// Empty initially.
//
// Employment records must reference
// existing persons in the shared
// person.mock-data.ts database.
//
// Records should be created or updated
// by the appropriate mock repository.
//
// Do not generate unrelated person GUIDs.

export const PERSON_EMPLOYMENT_MOCK_DATA:
  MockPersonEmploymentRecord[] = [];

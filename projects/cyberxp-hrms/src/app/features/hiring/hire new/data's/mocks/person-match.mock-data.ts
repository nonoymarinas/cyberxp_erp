
import {
  PersonMatch,
} from '../../models/personal-info/person-match.model';

import {
  PersonMatchResolution,
} from '../../models/personal-info/person-match-resolution.model';


/* ========================================
   Person Match Mock Data
   ======================================== */

export const PERSON_MATCH_MOCKS: PersonMatch[] = [

  // ========================================
  // Person 001 — High Similarity
  // ========================================

  {
    personGuid: 'mock-person-001',
    personNumber: 'PER000123',

    firstName: 'Juan',
    middleName: 'Santos',
    lastName: 'Dela Cruz',

    dateOfBirth: '1990-05-15',

    imageUrl: '/assets/images/mock/person-001.jpg',

    matchScore: 96,
    matchType: 'High Similarity',
    matchClassification: 'high',
  },

  // ========================================
  // Person 002 — Possible Duplicate
  // ========================================

  {
    personGuid: 'mock-person-002',
    personNumber: 'PER000287',

    firstName: 'Juan',
    middleName: '',
    lastName: 'Dela Cruz',

    dateOfBirth: '1990-05-15',

    imageUrl: '/assets/images/mock/person-002.jpg',

    matchScore: 88,
    matchType: 'Possible Duplicate',
    matchClassification: 'high',
  },

  // ========================================
  // Person 003 — Review Required
  // ========================================

  {
    personGuid: 'mock-person-003',
    personNumber: 'PER000415',

    firstName: 'Juan',
    middleName: 'S',
    lastName: 'Cruz',

    dateOfBirth: '1991-05-15',

    imageUrl: '/assets/images/mock/person-003.jpg',

    matchScore: 74,
    matchType: 'Review Required',
    matchClassification: 'medium',
  },
];


/* ========================================
   Person Match Resolution Mock Data
   ======================================== */

export const PERSON_MATCH_RESOLUTION_MOCKS: Record<
  string,
  PersonMatchResolution
> = {

  // ========================================
  // Person 001 — Active Employee
  // ========================================

  'mock-person-001': {
    screeningId: 'SCR000001',

    personGuid: 'mock-person-001',
    personNumber: 'PER000123',
    fullName: 'Juan Santos Dela Cruz',

    employmentStatus: 'ACTIVE',
    isBlocklisted: false,

    allowedActions: [
      'VIEW_EMPLOYEE',
    ],
  },

  // ========================================
  // Person 002 — Resigned Employee
  // ========================================

  'mock-person-002': {
    screeningId: 'SCR000002',

    personGuid: 'mock-person-002',
    personNumber: 'PER000287',
    fullName: 'Juan Dela Cruz',

    employmentStatus: 'RESIGNED',
    isBlocklisted: false,

    allowedActions: [
      'VIEW_EMPLOYEE',
      'REHIRE',
    ],
  },

  // ========================================
  // Person 003 — Blocklisted Employee
  // ========================================

  'mock-person-003': {
    screeningId: 'SCR000003',

    personGuid: 'mock-person-003',
    personNumber: 'PER000415',
    fullName: 'Juan S Cruz',

    employmentStatus: 'TERMINATED',
    isBlocklisted: true,

    allowedActions: [
      'VIEW_EMPLOYEE',
      'BLOCKLIST_REVIEW',
    ],
  },
};

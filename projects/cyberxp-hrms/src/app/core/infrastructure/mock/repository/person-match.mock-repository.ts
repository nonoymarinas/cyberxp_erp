
import {
  MockPersonRecord,
} from '../data/person.mock-data';

import {
  MockPersonMatchClassificationReference,
} from '../data/person-match-classification.mock-data';

import {
  getMockPersons,
  findMockPersonByGuid,
} from './person.mock-repository';

import {
  getMockPersonMatchClassifications,
  findMockPersonMatchClassificationById,
  findMockPersonMatchClassificationByCode,
  findMockPersonMatchClassificationByScore,
} from './person-match-classification.mock-repository';

// ========================================
// Person Match Mock Repository
// ========================================

export class PersonMatchMockRepository {

  // ======================================
  // Get All Persons
  // ======================================

  getPersons(): MockPersonRecord[] {
    return getMockPersons();
  }

  // ======================================
  // Find Person By GUID
  // ======================================

  getPersonByGuid(
    personGuid: string
  ): MockPersonRecord | undefined {

    return findMockPersonByGuid(personGuid);
  }

  // ======================================
  // Get All Match Classifications
  // ======================================

  getClassifications():
    MockPersonMatchClassificationReference[] {

    return getMockPersonMatchClassifications();
  }

  // ======================================
  // Find Classification By ID
  // ======================================

  getClassificationById(
    classificationId: number
  ): MockPersonMatchClassificationReference | undefined {

    return findMockPersonMatchClassificationById(
      classificationId
    );
  }

  // ======================================
  // Find Classification By Code
  // ======================================

  getClassificationByCode(
    code: string
  ): MockPersonMatchClassificationReference | undefined {

    return findMockPersonMatchClassificationByCode(
      code
    );
  }

  // ======================================
  // Resolve Classification By Score
  // ======================================

  getClassificationByScore(
    score: number
  ): MockPersonMatchClassificationReference | undefined {

    return findMockPersonMatchClassificationByScore(
      score
    );
  }
}

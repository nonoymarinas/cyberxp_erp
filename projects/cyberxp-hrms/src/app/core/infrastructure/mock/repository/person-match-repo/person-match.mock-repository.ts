
import {
  MockPersonRecord,
} from '../../data/shared/person.mock-data';

import {
  MockPersonMatchLevelReference,
} from '../../data/person-match-data/person-match-level.mock-data';

import {
  getMockPersons,
  findMockPersonByGuid,
} from '../shared/person.mock-repository';

import {
  getMockPersonMatchLevels,
  findMockPersonMatchLevelById,
  findMockPersonMatchLevelByCode,
  findMockPersonMatchLevelByScore,
} from './person-match-level.mock-repository';

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
  // Get All Match Levels
  // ======================================

  getMatchLevels():
    MockPersonMatchLevelReference[] {

    return getMockPersonMatchLevels();
  }

  // ======================================
  // Find Match Level By ID
  // ======================================

  getMatchLevelById(
    levelId: number
  ): MockPersonMatchLevelReference | undefined {

    return findMockPersonMatchLevelById(
      levelId
    );
  }

  // ======================================
  // Find Match Level By Code
  // ======================================

  getMatchLevelByCode(
    code: string
  ): MockPersonMatchLevelReference | undefined {

    return findMockPersonMatchLevelByCode(
      code
    );
  }

  // ======================================
  // Resolve Match Level By Score
  // ======================================

  getMatchLevelByScore(
    score: number
  ): MockPersonMatchLevelReference | undefined {

    return findMockPersonMatchLevelByScore(
      score
    );
  }
}

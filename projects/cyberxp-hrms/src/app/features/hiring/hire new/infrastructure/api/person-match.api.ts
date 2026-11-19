
import {
  Injectable,
  inject,
} from '@angular/core';

import {
  HttpClient,
} from '@angular/common/http';

import {
  Observable,
  defer,
  of,
  delay,
} from 'rxjs';

import {
  PersonMatchRequest,
} from '../../domain/models/person-match/person-match-request.model';

import {
  PersonMatchDto,
  PersonMatchApiResponseDto,
} from '../../domain/models/person-match/person-match.dto.model';

import {
  PersonMatchMockRepository,
} from '../../../../../core/infrastructure/mock/repository/person-match-repo/person-match.mock-repository';

// ========================================
// Configuration
// ========================================

const USE_MOCK_API = true;

const API_URL = '/api/v1/person-match';

const MATCH_THRESHOLD = 65;

const MOCK_DELAY_MS = 300;

// ========================================
// Person Match API
// ========================================

@Injectable({
  providedIn: 'root',
})
export class PersonMatchApi {

  private readonly http =
    inject(HttpClient);

  private readonly repository =
    new PersonMatchMockRepository();

  // ========================================
  // Check Existing Person
  // ========================================

  checkExistingPerson(
    request: PersonMatchRequest
  ): Observable<PersonMatchApiResponseDto> {

    if (!USE_MOCK_API) {
      return this.http.post<PersonMatchApiResponseDto>(
        `${API_URL}/search`,
        request
      );
    }

    return defer(() =>
      of(this.executeMockMatching(request))
    ).pipe(
      delay(MOCK_DELAY_MS)
    );
  }

  // ========================================
  // Execute Mock Matching
  // ========================================

  private executeMockMatching(
    request: PersonMatchRequest
  ): PersonMatchApiResponseDto {

    const firstName =
      this.normalize(request.firstName);

    const middleName =
      this.normalize(request.middleName);

    const lastName =
      this.normalize(request.lastName);

    const dateOfBirth =
      request.dateOfBirth?.trim() ?? '';

    // ======================================
    // Validate Request
    // ======================================

    if (
      !firstName ||
      !lastName ||
      !dateOfBirth
    ) {
      throw new Error(
        'First name, last name, and date of birth are required.'
      );
    }

    // ======================================
    // Retrieve Mock Persons
    // ======================================

    const persons =
      this.repository.getPersons();

    const matches: PersonMatchDto[] = [];

    // ======================================
    // Calculate Similarity
    // ======================================

    for (const person of persons) {

      const firstNameScore =
        this.similarity(
          firstName,
          this.normalize(person.firstName)
        );

      const middleNameScore =
        this.similarity(
          middleName,
          this.normalize(person.middleName)
        );

      const lastNameScore =
        this.similarity(
          lastName,
          this.normalize(person.lastName)
        );

      const birthDateScore =
        dateOfBirth === person.dateOfBirth
          ? 100
          : 0;

      const weightedScore =
        firstNameScore * 0.30 +
        middleNameScore * 0.10 +
        lastNameScore * 0.35 +
        birthDateScore * 0.25;

      const personMatchScore =
        Math.round(weightedScore);

      // ======================================
      // Apply Matching Threshold
      // ======================================

      if (personMatchScore < MATCH_THRESHOLD) {
        continue;
      }

      // ======================================
      // Resolve Match Level
      // ======================================

      const matchLevel =
        this.repository.getMatchLevelByScore(
          personMatchScore
        );

      if (!matchLevel?.code) {
        throw new Error(
          `No match level configured for score ${personMatchScore}.`
        );
      }

      const personMatchLevel =
        matchLevel.code;

      // ======================================
      // Determine Match Method
      // ======================================

      const exactIdentity =
        firstName === this.normalize(person.firstName) &&
        middleName === this.normalize(person.middleName) &&
        lastName === this.normalize(person.lastName) &&
        dateOfBirth === person.dateOfBirth;

      const personMatchMethod =
        exactIdentity
          ? 'EXACT'
          : 'FUZZY';

      // ======================================
      // Build Match DTO
      // ======================================

      matches.push({
        personGuid: person.personGuid,
        personNumber: person.personNumber,

        firstName: person.firstName,
        middleName: person.middleName,
        lastName: person.lastName,
        dateOfBirth: person.dateOfBirth,

        personMatchScore,
        personMatchLevel,
        personMatchMethod,

        imageUrl: person.imageUrl ?? undefined,
      });
    }

    // ========================================
    // Sort Matches
    // ========================================

    matches.sort(
      (a, b) =>
        b.personMatchScore - a.personMatchScore
    );

    // ========================================
    // Return API Response
    // ========================================

    return {
      success: true,
      message: 'Person matching completed.',
      errorCode: null,
      data: matches,
    };
  }

  // ========================================
  // Normalize Text
  // ========================================

  private normalize(
    value: string | null | undefined
  ): string {

    return (value ?? '')
      .normalize('NFKC')
      .trim()
      .replace(/\s+/g, ' ')
      .toLowerCase();
  }

  // ========================================
  // Similarity Percentage
  // ========================================

  private similarity(
    first: string,
    second: string
  ): number {

    if (first === second) {
      return 100;
    }

    if (!first || !second) {
      return 0;
    }

    const distance =
      this.levenshteinDistance(
        first,
        second
      );

    const maxLength =
      Math.max(
        first.length,
        second.length
      );

    return Math.max(
      0,
      (1 - distance / maxLength) * 100
    );
  }

  // ========================================
  // Levenshtein Distance
  // ========================================

  private levenshteinDistance(
    first: string,
    second: string
  ): number {

    const rows = first.length + 1;
    const columns = second.length + 1;

    const matrix: number[][] =
      Array.from(
        { length: rows },
        () => Array<number>(columns).fill(0)
      );

    for (let i = 0; i < rows; i++) {
      matrix[i][0] = i;
    }

    for (let j = 0; j < columns; j++) {
      matrix[0][j] = j;
    }

    for (let i = 1; i < rows; i++) {
      for (let j = 1; j < columns; j++) {

        const cost =
          first[i - 1] === second[j - 1]
            ? 0
            : 1;

        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j - 1] + cost
        );
      }
    }

    return matrix[rows - 1][columns - 1];
  }
}

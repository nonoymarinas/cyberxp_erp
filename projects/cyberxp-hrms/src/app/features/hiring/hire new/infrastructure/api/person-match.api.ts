
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
  throwError,
  delay,
} from 'rxjs';

// ========================================
// Domain Models
// ========================================

import {
  PersonMatchRequest,
} from '../../domain/models/shared/person-match/person-match-request.model';

import {
  PersonMatchDto,
} from '../../domain/models/shared/person-match/person-match.dto.model';

import {
  PersonMatchResultDto,
  PersonMatchApiResponseDto,
} from '../../domain/models/shared/person-match/person-match-result.dto.model';

import {
  PersonMatchResolution,
} from '../../domain/models/shared/person-match-resolution/person-match-resolution.model';

// ========================================
// Mock Repository
// ========================================

import {
  PersonMatchMockRepository,
} from '../../../../../core/infrastructure/mock/repository/person-match.mock-repository';

// ========================================
// Configuration
// ========================================

// Change to false when the real backend
// endpoints are available.

const USE_MOCK_API = true;

const API_URL =
  '/api/v1/person-match';

// ========================================
// Matching Configuration
// ========================================

const MATCH_THRESHOLD = 65;

const MOCK_DELAY_MS = 300;

// ========================================
// Person Match API
// ========================================

@Injectable({
  providedIn: 'root',
})
export class PersonMatchApi {

  // ========================================
  // Dependencies
  // ========================================

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
  // Get Person Match Resolution
  // ========================================

  getResolution(
    personGuid: string
  ): Observable<PersonMatchResolution> {

    const guid = personGuid.trim();

    if (!guid) {
      return throwError(
        () => new Error(
          'Person GUID is required.'
        )
      );
    }

    // ======================================
    // Real Backend
    // ======================================

    if (!USE_MOCK_API) {
      return this.http.get<PersonMatchResolution>(
        `${API_URL}/resolution/${encodeURIComponent(guid)}`
      );
    }

    // ======================================
    // Mock Backend
    // ======================================
    //
    // Person matching records alone cannot
    // establish employment eligibility.
    //
    // Resolution requires:
    // - Employment status
    // - Employment history
    // - Blocklist status
    // - Allowed employment actions
    //
    // Do not manufacture these values.
    // ======================================

    return throwError(
      () => new Error(
        'Mock person resolution is not yet implemented. ' +
        'Employment and blocklist records are required.'
      )
    );
  }

  // ========================================
  // Execute Mock Matching
  // ========================================

  private executeMockMatching(
    request: PersonMatchRequest
  ): PersonMatchApiResponseDto {

    // ======================================
    // Normalize Request
    // ======================================

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
    // Calculate Matches
    // ======================================

    for (const person of persons) {

      const firstNameScore =
        this.similarity(
          firstName,
          this.normalize(person.firstName)
        );

      const lastNameScore =
        this.similarity(
          lastName,
          this.normalize(person.lastName)
        );

      const middleNameScore =
        this.similarity(
          middleName,
          this.normalize(person.middleName)
        );

      const birthDateScore =
        dateOfBirth === person.dateOfBirth
          ? 100
          : 0;

      // ====================================
      // Weighted Similarity
      // ====================================

      const weightedScore =
        firstNameScore * 0.30 +
        middleNameScore * 0.10 +
        lastNameScore * 0.35 +
        birthDateScore * 0.25;

      const matchScore =
        Math.round(weightedScore);

      // ====================================
      // Apply Threshold
      // ====================================

      if (matchScore < MATCH_THRESHOLD) {
        continue;
      }

      // ====================================
      // Resolve Classification Reference
      // ====================================

      const classification =
        this.repository
          .getClassificationByScore(
            matchScore
          );

      if (!classification) {
        throw new Error(
          `No classification configured for score ${matchScore}.`
        );
      }

      // ====================================
      // Determine Match Type
      // ====================================

      const exactIdentity =
        firstName ===
          this.normalize(person.firstName) &&
        middleName ===
          this.normalize(person.middleName) &&
        lastName ===
          this.normalize(person.lastName) &&
        dateOfBirth ===
          person.dateOfBirth;

      const matchType = exactIdentity
        ? 'EXACT'
        : 'POSSIBLE';

      // ====================================
      // Build Match DTO
      // ====================================

      matches.push({
        personGuid: person.personGuid,
        personNumber: person.personNumber,

        firstName: person.firstName,
        middleName: person.middleName,

        lastName: person.lastName,
        dateOfBirth: person.dateOfBirth,

        imageUrl: person.imageUrl ?? undefined,

        matchScore,
        matchType,

        matchClassificationId:
          classification.id,
      });
    }

    // ======================================
    // Sort by Similarity
    // ======================================

    matches.sort(
      (a, b) =>
        b.matchScore - a.matchScore
    );

    // ======================================
    // Workflow Decision
    // ======================================

    const hasPossibleMatch =
      matches.length > 0;

    // Blocklist detection is not available
    // until the mock blocklist repository
    // has been implemented.

    const hasBlocklistMatch = false;

    const workflowStatusCode =
      hasBlocklistMatch
        ? 'HOLD'
        : hasPossibleMatch
          ? 'REVIEW'
          : 'CLEAR';

    const workflowStatus =
      workflowStatusCode === 'HOLD'
        ? 'On Hold'
        : workflowStatusCode === 'REVIEW'
          ? 'Requires Review'
          : 'Clear';

    // ======================================
    // Build Result DTO
    // ======================================

    const result: PersonMatchResultDto = {
      workflowStatus,
      workflowStatusCode,

      hasPossibleMatch,
      hasBlocklistMatch,

      totalMatches: matches.length,
      matches,
    };

    // ======================================
    // Return API Response
    // ======================================

    return {
      success: true,
      message: 'Person matching completed.',
      errorCode: null,
      data: result,
    };
  }

  // ========================================
  // Normalize Text
  // ========================================

  private normalize(
    value: string | null | undefined
  ): string {

    return (value ?? '')
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

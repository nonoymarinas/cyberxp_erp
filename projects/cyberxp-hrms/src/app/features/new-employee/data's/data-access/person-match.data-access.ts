import { Injectable } from '@angular/core';

import { Observable, map } from 'rxjs';

// ========================================
// Application Models
// ========================================

import { PersonMatchResponse } from '../../models/personal-info/personal-match-response.model';

// ========================================
// DTO Models
// ========================================

import { PersonMatchApiResponseDto } from '../../models/personal-info/personal-match-response.dto.model';

// ========================================
// Mock API
// ========================================

import { checkPersonMatchMockApi } from '../mocks/person-match.mock-api';

import { PersonMatchSearchRequest } from '../mocks/person-match.matcher';

// ========================================
// Data Access
// ========================================

@Injectable({
  providedIn: 'root',
})
export class PersonMatchDataAccess {
  checkExistingPerson(request: PersonMatchSearchRequest): Observable<PersonMatchResponse> {
    return checkPersonMatchMockApi(request).pipe(
      map((response: PersonMatchApiResponseDto) => {
        // ========================================
        // Validate API Response
        // ========================================

        if (!response.success) {
          throw new Error(response.message ?? 'Failed to check existing person.');
        }

        // ========================================
        // DTO → Application Model
        // ========================================

        const result: PersonMatchResponse = {
          status: response.data.status,
          hasPossibleMatch: response.data.hasPossibleMatch,
          hasBlocklistMatch: response.data.hasBlocklistMatch,
          totalMatches: response.data.totalMatches,
          matches: response.data.matches,
        };

        return result;
      }),
    );
  }
}


import { Injectable } from '@angular/core';

import { Observable, map, throwError } from 'rxjs';

// ========================================
// Application Models
// ========================================

import { PersonMatchResponse } from '../../models/personal-info/person-match-response.model';

import { PersonMatchResolution } from '../../models/personal-info/person-match-resolution.model';

// ========================================
// Request Models
// ========================================

import { PersonMatchSearchRequest } from '../../models/personal-info/person-match-request.model';

// ========================================
// Decision Models
// ========================================

import {
  SubmitPersonMatchDecisionRequest,
  SubmitPersonMatchDecisionResponse,
} from '../../models/personal-info/person-match-decision.model';

// ========================================
// DTO Models
// ========================================

import { PersonMatchApiResponseDto } from '../../models/personal-info/person-match-response.dto.model';

// ========================================
// Mock API
// ========================================

import {
  checkPersonMatchMockApi,
  getPersonMatchResolutionMockApi,
  submitPersonMatchDecisionMockApi,
} from '../mocks/person-match.mock-api';

// ========================================
// Data Access
// ========================================

@Injectable({
  providedIn: 'root',
})
export class PersonMatchDataAccess {

  // ========================================
  // Check Existing Person
  // ========================================

  checkExistingPerson(
    request: PersonMatchSearchRequest
  ): Observable<PersonMatchResponse> {

    return checkPersonMatchMockApi(request).pipe(
      map((response: PersonMatchApiResponseDto) => {

        // ========================================
        // Validate API Response
        // ========================================

        if (!response.success) {
          throw new Error(
            response.message ??
            'Failed to check existing person.'
          );
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

  // ========================================
  // Get Person Match Resolution
  // ========================================

  getResolution(
    personGuid: string
  ): Observable<PersonMatchResolution> {

    if (!personGuid?.trim()) {
      return throwError(() =>
        new Error('Person GUID is required.')
      );
    }

    return getPersonMatchResolutionMockApi(
      personGuid.trim()
    );
  }

  // ========================================
  // Submit Person Match Decision
  // ========================================

  submitDecision(
    request: SubmitPersonMatchDecisionRequest
  ): Observable<SubmitPersonMatchDecisionResponse> {

    if (!request.personGuid?.trim()) {
      return throwError(() =>
        new Error('Person GUID is required.')
      );
    }

    if (!request.reason?.trim()) {
      return throwError(() =>
        new Error('Verification reason is required.')
      );
    }

    return submitPersonMatchDecisionMockApi({
      ...request,
      personGuid: request.personGuid.trim(),
      reason: request.reason.trim(),
    });
  }
}

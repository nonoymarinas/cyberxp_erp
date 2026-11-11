import { Observable, defer, of, delay } from 'rxjs';

// ========================================
// DTO Models
// ========================================

import {
  PersonMatchApiResponseDto,
  PersonMatchResponseDto,
} from '../../models/personal-info/person-match-response.dto.model';

// ========================================
// Mock Matcher
// ========================================

import { findPersonMatches } from './person-match.matcher';
import { PersonMatchSearchRequest } from '../../models/personal-info/person-match-request.model';

// ========================================
// Configuration
// ========================================

const MOCK_API_DELAY = 500;

// ========================================
// Mock API
// ========================================

export function checkPersonMatchMockApi(
  request: PersonMatchSearchRequest,
): Observable<PersonMatchApiResponseDto> {
  return defer(() => {
    // Execute matching algorithm
    const matches = findPersonMatches(request);

    // Build DTO
    const data: PersonMatchResponseDto = {
      status: matches.length > 0 ? 'REVIEW' : 'CLEAR',

      hasPossibleMatch: matches.length > 0,
      hasBlocklistMatch: false,
      totalMatches: matches.length,
      matches,
    };

    // Build API response
    const response: PersonMatchApiResponseDto = {
      success: true,
      message: 'Person matching completed successfully.',
      errorCode: null,
      data,
    };

    return of(response);
  }).pipe(delay(MOCK_API_DELAY));
}

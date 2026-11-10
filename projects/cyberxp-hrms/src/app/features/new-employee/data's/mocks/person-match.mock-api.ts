import { Observable, defer, of, delay } from 'rxjs';

// ========================================
// Models
// ========================================

import { PersonMatch } from '../../models/personal-info/personal-match.model';

// ========================================
// Mock Matcher
// ========================================

import { findPersonMatches, PersonMatchSearchRequest } from './person-match.matcher';

// ========================================
// Configuration
// ========================================

const MOCK_API_DELAY = 500;

// ========================================
// Mock API
// ========================================

export function checkPersonMatchMockApi(
  request: PersonMatchSearchRequest,
): Observable<PersonMatch[]> {
  return defer(() => {
    // Simulate PostgreSQL matching logic
    const matches = findPersonMatches(request);

    // Simulate API response
    return of(matches);
  }).pipe(delay(MOCK_API_DELAY));
}

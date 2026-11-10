import { PersonMatch } from '../../models/personal-info/personal-match.model';

import { PERSON_MATCH_MOCKS } from './person-match.mock-data';

/* ========================================
   Request Model
   ======================================== */

export interface PersonMatchSearchRequest {
  firstName: string;
  middleName?: string | null;
  lastName: string;
  dateOfBirth: string;
}

/* ========================================
   Configuration
   ======================================== */

const MATCH_THRESHOLD = 65;

const WEIGHTS = {
  firstName: 30,
  middleName: 10,
  lastName: 35,
  dateOfBirth: 25,
} as const;

/* ========================================
   Normalize Text
   ======================================== */

function normalize(value?: string | null): string {
  return (value ?? '').normalize('NFKC').trim().toLowerCase().replace(/\s+/g, ' ');
}

/* ========================================
   Levenshtein Similarity
   Returns 0.0 to 1.0
   ======================================== */

function similarity(first: string, second: string): number {
  const a = normalize(first);
  const b = normalize(second);

  if (a === b) return 1;

  if (!a.length || !b.length) {
    return 0;
  }

  const previous = Array.from({ length: b.length + 1 }, (_, index) => index);

  for (let i = 1; i <= a.length; i++) {
    const current: number[] = [i];

    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;

      current[j] = Math.min(current[j - 1] + 1, previous[j] + 1, previous[j - 1] + cost);
    }

    previous.splice(0, previous.length, ...current);
  }

  const distance = previous[b.length];

  return 1 - distance / Math.max(a.length, b.length);
}

/* ========================================
   Middle Name Similarity
   ======================================== */

function middleNameSimilarity(first?: string | null, second?: string | null): number {
  const a = normalize(first);
  const b = normalize(second);

  // Both missing: neutral, not identity evidence.
  if (!a && !b) return 0.5;

  // One missing: do not treat as a contradiction.
  if (!a || !b) return 0.5;

  // Support middle initials.
  if ((a.length === 1 || b.length === 1) && a[0] === b[0]) {
    return 0.8;
  }

  return similarity(a, b);
}

/* ========================================
   Calculate Match Score
   ======================================== */

function calculateMatchScore(request: PersonMatchSearchRequest, person: PersonMatch): number {
  const firstScore = similarity(request.firstName, person.firstName);

  const middleScore = middleNameSimilarity(request.middleName, person.middleName);

  const lastScore = similarity(request.lastName, person.lastName);

  const dobScore = request.dateOfBirth === person.dateOfBirth ? 1 : 0;

  const score =
    firstScore * WEIGHTS.firstName +
    middleScore * WEIGHTS.middleName +
    lastScore * WEIGHTS.lastName +
    dobScore * WEIGHTS.dateOfBirth;

  return Math.round(score);
}

/* ========================================
   Match Classification
   ======================================== */

function getMatchClassification(score: number): PersonMatch['matchClassification'] {
  if (score >= 85) {
    return 'high';
  }

  if (score >= 65) {
    return 'medium';
  }

  return 'low';
}

/* ========================================
   Match Type
   ======================================== */

function getMatchType(
  score: number,
  request: PersonMatchSearchRequest,
  person: PersonMatch,
): string {
  const exactFirst = normalize(request.firstName) === normalize(person.firstName);

  const exactLast = normalize(request.lastName) === normalize(person.lastName);

  const exactDob = request.dateOfBirth === person.dateOfBirth;

  if (exactFirst && exactLast && exactDob) {
    return 'Exact Name and Birthdate';
  }

  if (score >= 85) {
    return 'High Similarity';
  }

  if (score >= 65) {
    return 'Possible Duplicate';
  }

  return 'Low Similarity';
}

/* ========================================
   Main Person Matching Function
   ======================================== */

export function findPersonMatches(request: PersonMatchSearchRequest): PersonMatch[] {
  if (!normalize(request.firstName) || !normalize(request.lastName) || !request.dateOfBirth) {
    throw new Error('First name, last name and date of birth are required.');
  }

  const matches: PersonMatch[] = [];

  for (const person of PERSON_MATCH_MOCKS) {
    const score = calculateMatchScore(request, person);

    if (score < MATCH_THRESHOLD) {
      continue;
    }

    const match: PersonMatch = {
      ...person,

      matchScore: score,

      matchClassification: getMatchClassification(score),

      matchType: getMatchType(score, request, person),
    };

    matches.push(match);
  }

  return matches.sort((a, b) => b.matchScore - a.matchScore);
}

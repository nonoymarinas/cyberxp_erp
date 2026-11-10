import { Injectable } from '@angular/core';

// ========================================
// Models
// ========================================

import { PersonMatch } from '../../models/personal-info/personal-match.model';

// ========================================
// Mock Data
// ========================================

import { PERSON_MATCH_MOCKS } from "../../data's/mocks/person-match.mock-data";

@Injectable({
  providedIn: 'root',
})
export class PersonMatchService {
  // ========================================
  // Mock Data Source
  // ========================================

  private readonly matches: readonly PersonMatch[] = PERSON_MATCH_MOCKS;

  // ========================================
  // Get All Person Matches
  // ========================================

  getMatches(): PersonMatch[] {
    return [...this.matches];
  }

  // ========================================
  // Get Person Match by GUID
  // ========================================

  getMatchByGuid(personGuid: string): PersonMatch | null {
    return this.matches.find((person) => person.personGuid === personGuid) ?? null;
  }
}

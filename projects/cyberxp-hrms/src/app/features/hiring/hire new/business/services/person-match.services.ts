
import { Injectable, inject } from '@angular/core';

import { Observable } from 'rxjs';

// ========================================
// Application Models
// ========================================

import { PersonMatchResponse } from '../../models/personal-info/person-match-response.model';

import { PersonMatchResolution } from '../../models/personal-info/person-match-resolution.model';

// ========================================
// Request Model
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
// Data Access
// ========================================

import { PersonMatchDataAccess } from "../../data's/data-access/person-match.data-access";

// ========================================
// Business Service
// ========================================

@Injectable({
  providedIn: 'root',
})
export class PersonMatchService {

  // ========================================
  // Dependencies
  // ========================================

  private readonly dataAccess = inject(PersonMatchDataAccess);

  // ========================================
  // Check Existing Person
  // ========================================

  checkExistingPerson(
    request: PersonMatchSearchRequest
  ): Observable<PersonMatchResponse> {
    return this.dataAccess.checkExistingPerson(request);
  }

  // ========================================
  // Get Person Match Resolution
  // ========================================

  getResolution(
    personGuid: string
  ): Observable<PersonMatchResolution> {
    return this.dataAccess.getResolution(personGuid);
  }

  // ========================================
  // Submit Person Match Decision
  // ========================================

  submitDecision(
    request: SubmitPersonMatchDecisionRequest
  ): Observable<SubmitPersonMatchDecisionResponse> {
    return this.dataAccess.submitDecision(request);
  }
}

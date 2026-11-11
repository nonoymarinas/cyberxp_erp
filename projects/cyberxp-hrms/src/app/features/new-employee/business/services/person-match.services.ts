import { Injectable, inject } from '@angular/core';

import { Observable } from 'rxjs';

// ========================================
// Application Models
// ========================================

import { PersonMatchResponse } from '../../models/personal-info/person-match-response.model';

// ========================================
// Request Model
// ========================================

import { PersonMatchSearchRequest } from '../../models/personal-info/person-match-request.model';

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

  checkExistingPerson(request: PersonMatchSearchRequest): Observable<PersonMatchResponse> {
    return this.dataAccess.checkExistingPerson(request);
  }
}

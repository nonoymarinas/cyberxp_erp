
import {
  Injectable,
  inject,
} from '@angular/core';

import {
  Observable,
  map,
} from 'rxjs';

// ========================================
// API
// ========================================

import {
  PersonMatchDecisionApi,
} from '../api/person-match-decision.api';

// ========================================
// Request Model
// ========================================

import {
  PersonMatchDecisionRequest,
} from '../../domain/models/person-match-decision/person-match-decision-request.model';

// ========================================
// Domain Response Model
// ========================================

import {
  PersonMatchDecisionApiResponse,
} from '../../domain/models/person-match-decision/person-match-decision.model';

// ========================================
// Mapper
// ========================================

import {
  mapPersonMatchDecisionApiResponse,
} from './person-match-decision.mapper';

// ========================================
// Person Match Decision Data Access
// ========================================

@Injectable({
  providedIn: 'root',
})
export class PersonMatchDecisionDataAccess {

  // ========================================
  // Dependencies
  // ========================================

  private readonly api =
    inject(PersonMatchDecisionApi);

  // ========================================
  // Submit Person Match Decision
  // ========================================

  submitDecision(
    request: PersonMatchDecisionRequest
  ): Observable<PersonMatchDecisionApiResponse> {

    return this.api
      .submitDecision(request)
      .pipe(
        map(mapPersonMatchDecisionApiResponse)
      );
  }
}

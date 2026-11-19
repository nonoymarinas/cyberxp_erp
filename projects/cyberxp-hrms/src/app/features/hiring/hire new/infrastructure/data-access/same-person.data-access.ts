
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
  SamePersonApi,
} from '../api/same-person.api';

// ========================================
// Request Model
// ========================================

import type {
  SamePersonRequest,
} from '../../domain/models/same-person/same-person-request.model';

// ========================================
// Application Models
// ========================================

import type {
  SamePersonDetailsApiResponse,
} from '../../domain/models/same-person/same-person-details.model';

// ========================================
// Mapper
// ========================================

import {
  mapSamePersonApiResponse,
} from './same-person.mapper';

// ========================================
// Same Person Data Access
// ========================================

@Injectable({
  providedIn: 'root',
})
export class SamePersonDataAccess {

  // ======================================
  // Dependencies
  // ======================================

  private readonly api =
    inject(SamePersonApi);

  // ======================================
  // Get Same Person Details
  // ======================================

  getDetails(
    request: SamePersonRequest
  ): Observable<SamePersonDetailsApiResponse> {

    return this.api
      .getDetails(request)
      .pipe(

        // ==================================
        // Map DTO To Application Model
        // ==================================

        map(mapSamePersonApiResponse)

      );
  }
}

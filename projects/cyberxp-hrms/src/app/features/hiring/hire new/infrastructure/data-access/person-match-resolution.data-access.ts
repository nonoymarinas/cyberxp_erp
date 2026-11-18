
import {
  Injectable,
  inject,
} from '@angular/core';

import {
  Observable,
  map,
} from 'rxjs';

// ========================================
// Request Model
// ========================================

import type {
  PersonMatchResolutionRequest,
} from '../../domain/models/shared/person-match-resolution/person-match-resolution-request.model';

// ========================================
// Domain Response
// ========================================

import type {
  PersonMatchResolutionApiResponse,
} from '../../domain/models/shared/person-match-resolution/person-match-resolution.model';

// ========================================
// API
// ========================================

import {
  PersonMatchResolutionApi,
} from '../api/person-match-resolution.api';

// ========================================
// Mapper
// ========================================

import {
  mapPersonMatchResolutionApiResponse,
} from './person-match-resolution.mapper';

// ========================================
// Data Access
// ========================================

@Injectable({
  providedIn: 'root',
})
export class PersonMatchResolutionDataAccess {

  // ========================================
  // Dependencies
  // ========================================

  private readonly api =
    inject(PersonMatchResolutionApi);

  // ========================================
  // Get Person Match Resolution
  // ========================================

  getResolution(
    request: PersonMatchResolutionRequest
  ): Observable<PersonMatchResolutionApiResponse> {

    return this.api
      .getResolution(request)
      .pipe(
        map(
          response =>
            mapPersonMatchResolutionApiResponse(
              response
            )
        )
      );
  }
}


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
  RehireSearchRequest,
} from '../../domain/models/rehire-search-request.model';

// ========================================
// Application Result Model
// ========================================

import type {
  RehireSearchResult,
} from '../../domain/models/rehire-search-result.model';

// ========================================
// Rehire Search API
// ========================================

import {
  RehireSearchApi,
} from '../api/rehire-search.api';

// ========================================
// Rehire Search Mapper
// ========================================

import {
  mapRehireSearchApiResponse,
} from './rehire-search.mapper';

/* ========================================
   Rehire Search Data Access
   ======================================== */

@Injectable({
  providedIn: 'root',
})
export class RehireSearchDataAccess {

  // ======================================
  // Dependencies
  // ======================================

  private readonly api = inject(
    RehireSearchApi
  );

  // ======================================
  // Search Employees
  // ======================================

  search(
    request: RehireSearchRequest
  ): Observable<RehireSearchResult> {

    return this.api.search(request).pipe(
      map(mapRehireSearchApiResponse)
    );
  }
}

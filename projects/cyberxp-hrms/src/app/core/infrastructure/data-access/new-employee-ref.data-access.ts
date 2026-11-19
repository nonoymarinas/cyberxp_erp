
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
  NewEmployeeRefApi,
} from '../api/new-employee-ref.api';

// ========================================
// Application Models
// ========================================

import type {
  NewEmployeeRefApiResponse,
} from '../../domain/models/references/new-employee-ref.model';

// ========================================
// Mapper
// ========================================

import {
  mapNewEmployeeRefApiResponse,
} from './new-employee-ref.mapper';

// ========================================
// New Employee Reference Data Access
// ========================================

@Injectable({
  providedIn: 'root',
})
export class NewEmployeeRefDataAccess {

  // ======================================
  // Dependencies
  // ========================================

  private readonly api =
    inject(NewEmployeeRefApi);

  // ======================================
  // Get Employee References
  // ========================================

  getReferences(): Observable<NewEmployeeRefApiResponse> {

    return this.api
      .getReferences()
      .pipe(

        // ==================================
        // Convert API DTO To Domain Model
        // ==================================

        map(mapNewEmployeeRefApiResponse)

      );
  }
}

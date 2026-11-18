
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
  RehireRequest,
} from '../../domain/models/rehire-request.model';

// ========================================
// Employee Application Model
// ========================================

import type {
  RehireEmployeeResult,
} from '../../domain/models/rehire-employee.model';

// ========================================
// Eligibility Application Model
// ========================================

import type {
  RehireEligibilityResult,
} from '../../domain/models/rehire-eligibility-result.model';

// ========================================
// Rehire Submission Application Model
// ========================================

import type {
  RehireResult,
} from '../../domain/models/rehire-result.model';

// ========================================
// Rehire APIs
// ========================================

import {
  RehireEmployeeApi,
} from '../api/rehire-employee.api';

import {
  RehireEligibilityApi,
} from '../api/rehire-eligibility.api';

import {
  RehireRequestApi,
} from '../api/rehire-request.api';

// ========================================
// Rehire Mapper
// ========================================

import {
  mapRehireEmployeeApiResponse,
  mapRehireEligibilityApiResponse,
  mapRehireApiResponse,
} from './rehire.mapper';

/* ========================================
   Rehire Data Access
   ======================================== */

@Injectable({
  providedIn: 'root',
})
export class RehireDataAccess {

  // ======================================
  // Dependencies
  // ======================================

  private readonly employeeApi =
    inject(RehireEmployeeApi);

  private readonly eligibilityApi =
    inject(RehireEligibilityApi);

  private readonly requestApi =
    inject(RehireRequestApi);

  // ======================================
  // Get Selected Rehire Employee
  // ======================================

  getEmployee(
    personGuid: string
  ): Observable<RehireEmployeeResult> {

    return this.employeeApi
      .getEmployee(personGuid)
      .pipe(
        map(mapRehireEmployeeApiResponse)
      );
  }

  // ======================================
  // Check Rehire Eligibility
  // ======================================

  checkEligibility(
    personGuid: string,
    employmentGuid: string
  ): Observable<RehireEligibilityResult> {

    return this.eligibilityApi
      .verifyEligibility(
        personGuid,
        employmentGuid
      )
      .pipe(
        map(mapRehireEligibilityApiResponse)
      );
  }

  // ======================================
  // Submit Rehire Request
  // ======================================

  submit(
    request: RehireRequest
  ): Observable<RehireResult> {

    return this.requestApi
      .submitRequest(request)
      .pipe(
        map(mapRehireApiResponse)
      );
  }
}

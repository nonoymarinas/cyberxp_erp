
import {
  Injectable,
  inject,
} from '@angular/core';

import {
  HttpClient,
} from '@angular/common/http';

import {
  Observable,
  defer,
  throwError,
} from 'rxjs';

// ========================================
// Environment
// ========================================

import {
  environment,
} from '../../../../../../environments/environment';

// ========================================
// Request Model
// ========================================

import type {
  RehireRequest,
} from '../../domain/models/rehire-request.model';

// ========================================
// Response DTO
// ========================================

import type {
  RehireApiResultDto,
} from '../../domain/models/rehire-result.dto.model';

/* ========================================
   Rehire Request API
   ======================================== */

@Injectable({
  providedIn: 'root',
})
export class RehireRequestApi {

  // ======================================
  // Dependencies
  // ======================================

  private readonly http =
    inject(HttpClient);

  // ======================================
  // API Endpoint
  // ======================================

  private readonly endpoint =
    `${environment.api.baseUrl}/rehire/requests`;

  // ======================================
  // Submit Rehire Request
  // ======================================

  submitRequest(
    request: RehireRequest
  ): Observable<RehireApiResultDto> {

    return defer(() => {

      // ==================================
      // Validate Request
      // ==================================

      if (!request) {

        return throwError(() => new Error(
          'Rehire request is required.'
        ));
      }

      // ==================================
      // Validate Person
      // ==================================

      if (!request.personGuid?.trim()) {

        return throwError(() => new Error(
          'Person GUID is required.'
        ));
      }

      // ==================================
      // Validate Previous Employment
      // ==================================

      if (!request.previousEmploymentGuid?.trim()) {

        return throwError(() => new Error(
          'Previous employment GUID is required.'
        ));
      }

      // ==================================
      // Validate Proposed Employment
      // ==================================

      if (
        !request.departmentId?.trim() ||
        !request.positionId?.trim() ||
        !request.workLocationId?.trim() ||
        !request.employmentType?.trim() ||
        !request.startDate?.trim()
      ) {

        return throwError(() => new Error(
          'Complete proposed employment details are required.'
        ));
      }

      // ==================================
      // Validate Profile Verification
      // ==================================

      if (request.profileVerified !== true) {

        return throwError(() => new Error(
          'Employee profile verification is required.'
        ));
      }

      // ==================================
      // Validate Justification
      // ==================================

      if (!request.justification?.trim()) {

        return throwError(() => new Error(
          'Rehire justification is required.'
        ));
      }

      // ==================================
      // Submit Request
      // ==================================

      return this.http.post<RehireApiResultDto>(
        this.endpoint,
        request
      );
    });
  }
}

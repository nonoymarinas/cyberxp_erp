
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
// DTO Models
// ========================================

import type {
  RehireEmployeeApiResultDto,
} from '../../domain/models/rehire-employee.dto.model';

/* ========================================
   Rehire Employee API
   ======================================== */

@Injectable({
  providedIn: 'root',
})
export class RehireEmployeeApi {

  // ======================================
  // Dependencies
  // ======================================

  private readonly http =
    inject(HttpClient);

  // ======================================
  // API Endpoint
  // ======================================

  private readonly endpoint =
    `${environment.api.baseUrl}/rehire/employees`;

  // ======================================
  // Get Rehire Employee
  // ======================================

  getEmployee(
    personGuid: string
  ): Observable<RehireEmployeeApiResultDto> {

    return defer(() => {

      // ==================================
      // Validate Person GUID
      // ==================================

      const normalizedPersonGuid =
        personGuid?.trim();

      if (!normalizedPersonGuid) {

        return throwError(() => new Error(
          'Person GUID is required.'
        ));
      }

      // ==================================
      // Get Existing Employee
      // ==================================

      return this.http.get<RehireEmployeeApiResultDto>(
        `${this.endpoint}/${encodeURIComponent(normalizedPersonGuid)}`
      );
    });
  }
}

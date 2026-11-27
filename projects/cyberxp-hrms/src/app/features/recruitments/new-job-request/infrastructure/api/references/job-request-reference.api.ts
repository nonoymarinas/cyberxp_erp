import {
  HttpClient,
} from '@angular/common/http';

import {
  Injectable,
  inject,
  isDevMode,
} from '@angular/core';

import {
  Observable,
  tap,
  catchError,
  throwError,
} from 'rxjs';

// ========================================
// DTO
// ========================================

import type {
  JobRequestReferencesApiResponseDto,
} from '../../dtos/references/job-request-references.dto.model';

// ========================================
// Environment
// ========================================

import {
  environment,
} from '../../../../../../../environments/environment';

// ========================================
// Job Request Reference API
// ========================================

@Injectable({
  providedIn: 'root',
})
export class JobRequestReferenceApi {

  // ======================================
  // Dependencies
  // ======================================

  private readonly http =
    inject(HttpClient);

  // ======================================
  // API Endpoint
  // ======================================

  private readonly endpoint =
    `${environment.api.baseUrl}/hrms/recruitments/job-requests/references`;

  // ======================================
  // Get References
  // ======================================

  getReferences(
    companyId: number
  ): Observable<JobRequestReferencesApiResponseDto> {

    return this.http
      .get<JobRequestReferencesApiResponseDto>(
        this.endpoint,
        {
          params: {
            companyId,
          },
        }
      )
      .pipe(

        // ==================================
        // External API Response
        // ==================================

        tap(response => {

          // ==================================
          // Development Logging Only
          // ==================================

          if (!isDevMode()) {
            return;
          }

          console.groupCollapsed(
            '%c[EXTERNAL API] Job Request References',
            'color: #2196f3; font-weight: bold;'
          );

          console.log(
            'Endpoint:',
            this.endpoint
          );

          console.log(
            'Company ID:',
            companyId
          );

          console.log(
            'Success:',
            response.success
          );

          console.log(
            'Message:',
            response.message
          );

          console.log(
            'Error Code:',
            response.errorCode
          );

          // ==================================
          // Full API Response
          // ==================================

          console.log(
            'Full API Response:',
            structuredClone(response)
          );

          // ==================================
          // Reference Collections
          // ==================================

          if (
            response.success &&
            response.data
          ) {

            const data =
              response.data;

            // ==================================
            // Organization
            // ==================================

            console.group(
              '[API] Organization'
            );

            console.log(
              'Departments:',
              data.departments
            );

            console.log(
              'Positions:',
              data.positions
            );

            console.groupEnd();

            // ==================================
            // Job Request
            // ==================================

            console.group(
              '[API] Job Request'
            );

            console.log(
              'Priority Levels:',
              data.priorityLevels
            );

            console.log(
              'Job Request Types:',
              data.jobRequestTypes
            );

            console.groupEnd();

          }

          console.groupEnd();

        }),

        // ==================================
        // HTTP Error Handling
        // ==================================

        catchError(error => {

          if (isDevMode()) {

            console.error(
              '[EXTERNAL API] Failed to load job request references',
              {
                endpoint: this.endpoint,
                companyId,
                status: error.status,
                message: error.message,
                error,
              }
            );

          }

          return throwError(() => error);

        })
      );
  }
}

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
  NewEmployeeRefApiResponseDto,
} from '../../domain/models/references/new-employee-ref.dto.model';

// ========================================
// Environment
// ========================================

import {
  environment,
} from '../../../../environments/environment';

// ========================================
// New Employee Reference API
// ========================================

@Injectable({
  providedIn: 'root',
})
export class NewEmployeeRefApi {

  // ======================================
  // Dependencies
  // ======================================

  private readonly http =
    inject(HttpClient);

  // ======================================
  // API Endpoint
  // ======================================

  private readonly endpoint =
    `${environment.api.baseUrl}/employees/references`;

  // ======================================
  // Get References
  // ======================================

  getReferences(): Observable<NewEmployeeRefApiResponseDto> {

    return this.http
      .get<NewEmployeeRefApiResponseDto>(
        this.endpoint
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
            '%c[EXTERNAL API] Employee References',
            'color: #2196f3; font-weight: bold;'
          );

          console.log(
            'Endpoint:',
            this.endpoint
          );

          console.log(
            'Success:',
            response.success
          );

          console.log(
            'Message:',
            response.message
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

            console.group(
              '[API] Personal Information'
            );

            console.log(
              'Genders:',
              data.genders
            );

            console.log(
              'Civil Statuses:',
              data.civilStatuses
            );

            console.log(
              'Suffixes:',
              data.suffixes
            );

            console.groupEnd();

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
            // Employment
            // ==================================

            console.group(
              '[API] Employment'
            );

            console.log(
              'Employment Statuses:',
              data.employmentStatuses
            );

            console.log(
              'Employment Separation Types:',
              data.employmentSeparationTypes
            );

            console.log(
              'Employment Clearance Statuses:',
              data.employmentClearanceStatuses
            );

            console.groupEnd();

            // ==================================
            // Address
            // ==================================

            console.group(
              '[API] Address'
            );

            console.log(
              'Address Types:',
              data.addressTypes
            );

            console.groupEnd();

            // ==================================
            // Contacts
            // ==================================

            console.group(
              '[API] Contacts'
            );

            console.log(
              'Contact Types:',
              data.contactTypes
            );

            console.log(
              'Contact Scopes:',
              data.contactScopes
            );

            console.groupEnd();

            // ==================================
            // Person Matching
            // ==================================

            console.group(
              '[API] Person Matching'
            );

            console.log(
              'Workflow Statuses:',
              data.workFlowStatuses
            );

            console.log(
              'Person Match Decision Types:',
              data.personMatchDecisionTypes
            );

            console.groupEnd();

            // ==================================
            // Person Restrictions
            // ==================================

            console.group(
              '[API] Person Restrictions'
            );

            console.log(
              'Person Restriction Statuses:',
              data.personRestrictionStatuses
            );

            console.groupEnd();

            // ==================================
            // Rehire
            // ==================================

            console.group(
              '[API] Rehire'
            );

            console.log(
              'Rehire Request Statuses:',
              data.rehireRequestStatuses
            );

            console.log(
              'Rehire Eligibility Statuses:',
              data.rehireEligibilityStatuses
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
              '[EXTERNAL API] Failed to load employee references',
              {
                endpoint: this.endpoint,
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

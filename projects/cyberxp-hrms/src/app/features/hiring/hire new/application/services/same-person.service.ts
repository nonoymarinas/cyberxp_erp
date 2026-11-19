
import {
  Injectable,
  inject,
} from '@angular/core';

import {
  Observable,
  defer,
  map,
  tap,
  throwError,
} from 'rxjs';

// ========================================
// Data Access
// ========================================

import {
  SamePersonDataAccess,
} from '../../infrastructure/data-access/same-person.data-access';

// ========================================
// Request Model
// ========================================

import type {
  SamePersonRequest,
} from '../../domain/models/same-person/same-person-request.model';

// ========================================
// Application Model
// ========================================

import type {
  SamePersonDetails,
} from '../../domain/models/same-person/same-person-details.model';

// ========================================
// Wizard State
// ========================================

import {
  NewEmployeeStateService,
} from '../state/new-employee-state.service';

// ========================================
// Same Person Service
// ========================================

@Injectable()

export class SamePersonService {

  // ========================================
  // Dependencies
  // ========================================

  private readonly dataAccess =
    inject(SamePersonDataAccess);

  private readonly wizardState =
    inject(NewEmployeeStateService);

  // ========================================
  // Get Same Person Details
  // ========================================

  getDetails(
    request: SamePersonRequest
  ): Observable<SamePersonDetails> {

    return defer(() => {

      // ======================================
      // Validate Request
      // ======================================

      const personGuid =
        request.personGuid?.trim();

      if (!personGuid) {

        return throwError(() =>
          new Error(
            'Person GUID is required.'
          )
        );
      }

      // ======================================
      // Clear Previous Person Details
      // ======================================

      this.wizardState.clearSamePersonDetails();

      // ======================================
      // Retrieve Person Details
      // ======================================

      return this.dataAccess
        .getDetails({
          personGuid,
        })
        .pipe(

          // ==================================
          // Extract Application Data
          // ==================================

          map(response => {

            if (
              !response.success ||
              !response.data
            ) {

              throw new Error(
                response.message ||
                'Unable to retrieve Same Person details.'
              );
            }

            return response.data;
          }),

          // ==================================
          // Validate Retrieved Person
          // ==================================

          tap(details => {

            if (
              details.personGuid.trim().toLowerCase() !==
              personGuid.toLowerCase()
            ) {

              throw new Error(
                'Retrieved person does not match the requested person GUID.'
              );
            }

          }),

          // ==================================
          // Store Same Person Details
          // ==================================

          tap(details => {

            this.wizardState.setSamePersonDetails(
              details
            );

          })

        );
    });
  }

  // ========================================
  // Get Cached Same Person Details
  // ========================================

  getCachedDetails(
    personGuid: string
  ): SamePersonDetails | null {

    const details =
      this.wizardState.samePersonDetails();

    if (!details) {
      return null;
    }

    if (
      details.personGuid.trim().toLowerCase() !==
      personGuid.trim().toLowerCase()
    ) {
      return null;
    }

    return details;
  }

  // ========================================
  // Clear Same Person Details
  // ========================================

  clearDetails(): void {

    this.wizardState.clearSamePersonDetails();
  }
}

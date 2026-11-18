
import {
  Injectable,
  inject,
} from '@angular/core';

import {
  Observable,
  defer,
  finalize,
  map,
  tap,
  throwError,
} from 'rxjs';

// ========================================
// Request Model
// ========================================

import type {
  PersonMatchResolutionRequest,
} from '../../domain/models/shared/person-match-resolution/person-match-resolution-request.model';

// ========================================
// Domain Model
// ========================================

import type {
  PersonMatchResolution,
} from '../../domain/models/shared/person-match-resolution/person-match-resolution.model';

// ========================================
// Data Access
// ========================================

import {
  PersonMatchResolutionDataAccess,
} from '../../infrastructure/data-access/person-match-resolution.data-access';

// ========================================
// Wizard State
// ========================================

import {
  NewEmployeeStateService,
} from '../state/new-employee-state.service';

// ========================================
// Person Match Resolution Service
// ========================================

@Injectable()
export class PersonMatchResolutionService {

  // ========================================
  // Dependencies
  // ========================================

  private readonly dataAccess =
    inject(PersonMatchResolutionDataAccess);

  private readonly state =
    inject(NewEmployeeStateService);

  // ========================================
  // Get Resolution
  // ========================================

  getResolution(
    request: PersonMatchResolutionRequest
  ): Observable<PersonMatchResolution> {

    return defer(() => {

      const screeningId =
        request.screeningId?.trim();

      const personGuid =
        request.personGuid?.trim();

      // ======================================
      // Validate Request
      // ======================================

      if (!screeningId || !personGuid) {

        return throwError(
          () => new Error(
            'Screening ID and Person GUID are required.'
          )
        );
      }

      // ======================================
      // Validate Current Screening
      // ======================================

      if (this.state.screeningId() !== screeningId) {

        return throwError(
          () => new Error(
            'Resolution request does not match the current screening session.'
          )
        );
      }

      // ======================================
      // Validate Candidate
      // ======================================

      const person =
        this.state.getPersonMatchByGuid(
          personGuid
        );

      if (!person) {

        return throwError(
          () => new Error(
            'Person does not belong to the current screening.'
          )
        );
      }

      // ======================================
      // Validate Saved Decision
      // ======================================

      const decision =
        this.state.getPersonMatchDecision(
          screeningId,
          personGuid
        );

      if (
        !decision ||
        decision.decisionCode !== 'SAME_PERSON'
      ) {

        return throwError(
          () => new Error(
            'A saved Same Person decision is required before resolution.'
          )
        );
      }

      // ======================================
      // Prevent Duplicate Request
      // ======================================

      if (this.state.isResolutionLoading()) {

        return throwError(
          () => new Error(
            'Person match resolution is already loading.'
          )
        );
      }

      // ======================================
      // Begin Resolution Request
      // ======================================

      const requestVersion =
        this.state.beginResolutionRequest();

      // ======================================
      // Call Data Access
      // ======================================

      return this.dataAccess
        .getResolution({
          screeningId,
          personGuid,
        })
        .pipe(

          // ==================================
          // Extract Domain Model
          // ==================================

          map(response => {

            if (
              !response.success ||
              !response.data
            ) {

              throw new Error(
                response.message ||
                'Unable to retrieve person match resolution.'
              );
            }

            return response.data;
          }),

          // ==================================
          // Validate And Store Resolution
          // ==================================

          tap(resolution => {

            // ==================================
            // Reject Stale Request
            // ==================================

            if (
              !this.state.isCurrentResolutionRequest(
                requestVersion
              )
            ) {

              throw new Error(
                'Resolution request is no longer current.'
              );
            }

            // ==================================
            // Validate Response Identity
            // ==================================

            if (
              resolution.screeningId !== screeningId ||
              resolution.personGuid !== personGuid
            ) {

              throw new Error(
                'Resolution response does not match the requested screening and person.'
              );
            }

            // ==================================
            // Validate Current Screening
            // ==================================

            if (
              this.state.screeningId() !== screeningId
            ) {

              throw new Error(
                'The screening session changed while loading resolution.'
              );
            }

            // ==================================
            // Validate Candidate Still Exists
            // ==================================

            const currentPerson =
              this.state.getPersonMatchByGuid(
                personGuid
              );

            if (!currentPerson) {

              throw new Error(
                'The person is no longer part of the current screening.'
              );
            }

            // ==================================
            // Validate Confirmed Decision
            // ==================================

            const currentDecision =
              this.state.getPersonMatchDecision(
                screeningId,
                personGuid
              );

            if (
              currentDecision?.decisionCode !==
              'SAME_PERSON'
            ) {

              throw new Error(
                'The confirmed person decision is no longer valid.'
              );
            }

            // ==================================
            // Store Resolution In Wizard State
            // ==================================

            this.state.setPersonMatchResolution(
              resolution,
              requestVersion
            );
          }),

          // ==================================
          // Handle Error
          // ==================================

          tap({
            error: (error: unknown) => {

              this.state.setResolutionError(
                error instanceof Error
                  ? error.message
                  : 'Unable to retrieve person match resolution.',
                requestVersion
              );
            },
          }),

          // ==================================
          // Finish Request
          // ==================================

          finalize(() => {

            this.state.finishResolutionRequest(
              requestVersion
            );
          })
        );
    });
  }
}

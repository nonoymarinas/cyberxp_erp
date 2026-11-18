
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
// Data Access
// ========================================

import {
  PersonMatchDecisionDataAccess,
} from '../../infrastructure/data-access/person-match-decision.data-access';

// ========================================
// Models
// ========================================

import {
  PersonMatchDecisionRequest,
} from '../../domain/models/shared/person-match-decision/person-match-decision-request.model';

import {
  PersonMatchDecision,
} from '../../domain/models/shared/person-match-decision/person-match-decision.model';

// ========================================
// Wizard State
// ========================================

import {
  NewEmployeeStateService,
} from '../state/new-employee-state.service';

// ========================================
// Person Match Decision Service
// ========================================

@Injectable()
export class PersonMatchDecisionService {

  // ========================================
  // Dependencies
  // ========================================

  private readonly dataAccess =
    inject(PersonMatchDecisionDataAccess);

  readonly state =
    inject(NewEmployeeStateService);

  // ========================================
  // Submit Decision
  // ========================================

  submitDecision(
    request: PersonMatchDecisionRequest
  ): Observable<PersonMatchDecision> {

    return defer(() => {

      // ====================================
      // Prevent Concurrent Submission
      // ====================================

      if (this.state.isDecisionSubmitting()) {
        return throwError(
          () => new Error(
            'A person match decision is already being submitted.'
          )
        );
      }

      // ====================================
      // Validate Screening Session
      // ====================================

      const screeningId =
        this.state.screeningId();

      if (
        !screeningId ||
        request.screeningId !== screeningId
      ) {
        return throwError(
          () => new Error(
            'Invalid or missing screening session.'
          )
        );
      }

      // ====================================
      // Validate Candidate
      // ====================================

      const person =
        this.state.getPersonMatchByGuid(
          request.personGuid
        );

      if (!person) {
        return throwError(
          () => new Error(
            'The selected person is not part of the current screening.'
          )
        );
      }

      // ====================================
      // Prevent Duplicate Decision
      // ====================================

      const existingDecision =
        this.state.getPersonMatchDecision(
          screeningId,
          request.personGuid
        );

      if (existingDecision) {
        return throwError(
          () => new Error(
            'A decision has already been recorded for this person.'
          )
        );
      }

      // ====================================
      // Begin Submission
      // ====================================

      this.state.setDecisionSubmitting(true);
      this.state.setDecisionError(null);

      return this.dataAccess
        .submitDecision(request)
        .pipe(

          // ==================================
          // Extract Saved Decision
          // ==================================

          map(response => {

            if (!response.success || !response.data) {
              throw new Error(
                response.message ||
                'Unable to save person match decision.'
              );
            }

            return response.data;
          }),

          // ==================================
          // Update Local Decision State
          // ==================================

          tap(decision => {

            this.state.addPersonMatchDecision(
              decision
            );
          }),

          // ==================================
          // Handle Errors
          // ==================================

          tap({
            error: (error: unknown) => {

              this.state.setDecisionError(
                error instanceof Error
                  ? error.message
                  : 'Unable to save person match decision.'
              );
            },
          }),

          // ==================================
          // Finalize Submission
          // ==================================

          finalize(() => {

            this.state.setDecisionSubmitting(false);
          })
        );
    });
  }
}

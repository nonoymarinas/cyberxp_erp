import {
  Injectable,
  inject,
  isDevMode,
} from '@angular/core';

import {
  Observable,
  tap,
  map,
  catchError,
  throwError,
  finalize,
  defer,
} from 'rxjs';

// ========================================
// Repository
// ========================================

import {
  JobRequestReferenceRepository,
} from '../../../infrastructure/repositories/references/job-request-reference.repository';

// ========================================
// State
// ========================================

import {
  JobRequestReferenceState,
} from '../../states/references/job-request-reference.state';

// ========================================
// Job Request Reference Service
// ========================================

@Injectable({
  providedIn: 'root',
})
export class JobRequestReferenceService {

  // ======================================
  // Dependencies
  // ======================================

  private readonly repository =
    inject(JobRequestReferenceRepository);

  private readonly state =
    inject(JobRequestReferenceState);

  // ======================================
  // Load References
  // ======================================

  loadReferences(
    companyId: number
  ): Observable<void> {

    return defer(() => {

      // ==================================
      // Validate Company ID
      // ==================================

      if (
        !Number.isSafeInteger(companyId) ||
        companyId <= 0
      ) {

        return throwError(() =>
          new Error('Invalid company ID.')
        );

      }

      // ==================================
      // Prevent Concurrent Requests
      // ==================================

      if (this.state.loading()) {

        return throwError(() =>
          new Error(
            'Job request references are already loading.'
          )
        );

      }

      // ==================================
      // Initialize State
      // ==================================

      this.state.beginLoading(companyId);

      // ==================================
      // Retrieve References
      // ==================================

      return this.repository
        .getReferences(companyId)
        .pipe(

          // ================================
          // Update State
          // ================================

          tap(references => {

            this.state.setReferences(
              references
            );

            // ==============================
            // Development Logging Only
            // ==============================

            if (!isDevMode()) {
              return;
            }

            console.groupCollapsed(
              '%c[SERVICE] Job Request References',
              'color: #9c27b0; font-weight: bold;'
            );

            console.log(
              'Company ID:',
              companyId
            );

            console.log(
              'References:',
              structuredClone(references)
            );

            console.groupEnd();

          }),

          // ================================
          // Convert Result to Void
          // ================================

          map(() => undefined),

          // ================================
          // Error Handling
          // ================================

          catchError(error => {

            const message =
              error?.message ??
              'Failed to load job request references.';

            this.state.setError(message);

            if (isDevMode()) {

              console.error(
                '[SERVICE] Failed to load job request references',
                {
                  companyId,
                  message,
                  error,
                }
              );

            }

            return throwError(() => error);

          }),

          // ================================
          // Finalize Loading
          // ================================

          finalize(() => {

            this.state.setLoading(false);

          })
        );

    });
  }

  // ======================================
  // Clear References
  // ======================================

  clear(): void {

    this.state.clear();

  }
}
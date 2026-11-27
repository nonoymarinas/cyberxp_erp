import {
  Injectable,
  inject,
} from '@angular/core';

import {
  HttpClient,
  HttpErrorResponse,
} from '@angular/common/http';

import {
  Observable,
  catchError,
  map,
  switchMap,
  tap,
  throwError,
} from 'rxjs';

// ========================================
// Configuration
// ========================================

import {
  IAM_CONFIG,
} from '../../configuration/iam-config.token';

// ========================================
// Shared Models
// ========================================

import {
  ApiResponse,
} from '../../shared/models/api-response.model';

// ========================================
// Authentication Models
// ========================================

import {
  AuthenticationSession,
} from '../../authentication/models/authentication-session.model';

// ========================================
// Authentication Services
// ========================================

import {
  AuthenticationService,
} from '../../authentication/services/authentication.service';

// ========================================
// Authentication State
// ========================================

import {
  AuthenticationState,
} from '../../authentication/state/authentication.state';

// ========================================
// Session Service
// ========================================

@Injectable({
  providedIn: 'root',
})
export class SessionService {

  // ========================================
  // Dependencies
  // ========================================

  private readonly http =
    inject(HttpClient);

  private readonly config =
    inject(IAM_CONFIG);

  private readonly authenticationService =
    inject(AuthenticationService);

  private readonly authenticationState =
    inject(AuthenticationState);

  // ========================================
  // API Configuration
  // ========================================

  private readonly sessionUrl =
    `${this.config.apiBaseUrl.replace(/\/+$/, '')}` +
    '/api/v1/iam/browser';

  // ========================================
  // Validate Current Session
  // ========================================

  validateSession():
    Observable<AuthenticationSession> {

    const sessionGuid =
      this.authenticationState.sessionGuid();

    if (!sessionGuid) {

      return throwError(() =>
        new Error('No authenticated session.')
      );
    }

    return this.authenticationService
      .getCurrentSession()
      .pipe(

        tap(session => {

          // ================================
          // Prevent Stale Session Updates
          // ================================

          if (
            this.authenticationState.sessionGuid() !==
            sessionGuid
          ) {

            throw new Error(
              'Authentication session has changed.'
            );
          }

          // ================================
          // Validate Session Identity
          // ================================

          if (
            session.sessionGuid !== sessionGuid
          ) {

            this.authenticationState.clear();

            throw new Error(
              'Authentication session does not match.'
            );
          }

          // ================================
          // Update Session State
          // ================================

          this.authenticationState
            .updateSession(session);
        }),

        catchError(error => {

          this.handleSessionError(
            error,
            sessionGuid
          );

          return throwError(() => error);
        })
      );
  }

  // ========================================
  // Record User Activity
  // ========================================

  recordActivity():
    Observable<AuthenticationSession> {

    const sessionGuid =
      this.authenticationState.sessionGuid();

    if (!sessionGuid) {

      return throwError(() =>
        new Error('No authenticated session.')
      );
    }

    return this.http.post<
      ApiResponse<unknown>
    >(
      `${this.sessionUrl}/activity`,
      null
    ).pipe(

      map(response => {

        if (!response.success) {

          throw new Error(
            response.message ??
            'Session activity could not be recorded.'
          );
        }
      }),

      // ====================================
      // Retrieve Updated Session Information
      // ====================================

      switchMap(() => {

        if (
          this.authenticationState.sessionGuid() !==
          sessionGuid
        ) {

          return throwError(() =>
            new Error(
              'Authentication session has changed.'
            )
          );
        }

        return this.validateSession();
      }),

      catchError(error => {

        this.handleSessionError(
          error,
          sessionGuid
        );

        return throwError(() => error);
      })
    );
  }

  // ========================================
  // Check Local Session Validity
  // ========================================

  hasValidSession(): boolean {

    return this.authenticationState
      .hasValidSession();
  }

  // ========================================
  // Get Remaining Absolute Session Time
  // ========================================

  getRemainingSessionMilliseconds(): number {

    const session =
      this.authenticationState.session();

    if (!session) {
      return 0;
    }

    return this.getRemainingMilliseconds(
      session.expiresAt
    );
  }

  // ========================================
  // Get Remaining Inactivity Time
  // ========================================

  getRemainingInactivityMilliseconds(): number {

    const session =
      this.authenticationState.session();

    if (!session) {
      return 0;
    }

    return this.getRemainingMilliseconds(
      session.inactivityExpiresAt
    );
  }

  // ========================================
  // Get Effective Remaining Session Time
  // ========================================

  getEffectiveRemainingMilliseconds(): number {

    return Math.min(

      this.getRemainingSessionMilliseconds(),

      this.getRemainingInactivityMilliseconds()
    );
  }

  // ========================================
  // Calculate Remaining Time
  // ========================================

  private getRemainingMilliseconds(
    expiration: string
  ): number {

    const expiresAt =
      Date.parse(expiration);

    if (!Number.isFinite(expiresAt)) {
      return 0;
    }

    return Math.max(
      0,
      expiresAt - Date.now()
    );
  }

  // ========================================
  // Handle Session Errors
  // ========================================

  private handleSessionError(
    error: unknown,
    sessionGuid: string
  ): void {

    if (
      error instanceof HttpErrorResponse &&
      error.status === 401 &&
      this.authenticationState.sessionGuid() ===
        sessionGuid
    ) {

      this.authenticationState.clear();
    }
  }
}
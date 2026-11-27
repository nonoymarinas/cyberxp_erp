import {
  Injectable,
  inject,
} from '@angular/core';

import {
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';

import {
  Observable,
  catchError,
  forkJoin,
  map,
  of,
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
  LoginRequest,
} from '../models/login-request.model';

import {
  LoginResult,
} from '../models/login-result.model';

import {
  AuthenticatedUser,
} from '../models/authenticated-user.model';

import {
  AuthenticationSession,
} from '../models/authentication-session.model';

// ========================================
// Authentication State
// ========================================

import {
  AuthenticationState,
} from '../state/authentication.state';

// ========================================
// Session Services
// ========================================

import {
  ClientInstanceService,
} from '../../session/services/client-instance.service';

// ========================================
// Authentication Service
// ========================================

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {

  // ========================================
  // Dependencies
  // ========================================

  private readonly http =
    inject(HttpClient);

  private readonly config =
    inject(IAM_CONFIG);

  private readonly authenticationState =
    inject(AuthenticationState);

  private readonly clientInstanceService =
    inject(ClientInstanceService);

  // ========================================
  // API Configuration
  // ========================================

  private readonly authenticationUrl =
    `${this.config.apiBaseUrl.replace(/\/+$/, '')}` +
    '/api/v1/iam/browser';

  // ========================================
  // Login
  // ========================================

  login(
    email: string,
    password: string
  ): Observable<LoginResult> {

    const request: LoginRequest = {

      email: email.trim(),

      password,

      clientInstanceId:
        this.clientInstanceService
          .getClientInstanceId(),
    };

    return this.http.post<
      ApiResponse<LoginResult>
    >(
      `${this.authenticationUrl}/login`,
      request,
      {
        headers: this.createCsrfHeaders(),

        withCredentials: true,
      }
    ).pipe(

      map(response =>
        this.extractData(response)
      ),

      switchMap(result => {

        // ==================================
        // Restricted Authentication
        // ==================================

        if (
          result.authenticationStatus !==
          'AUTHENTICATED'
        ) {

          this.clearAuthentication();

          return of(result);
        }

        // ==================================
        // Validate Authentication Result
        // ==================================

        this.validateAuthenticatedResult(
          result
        );

        // ==================================
        // Establish Authentication State
        // ==================================

        return this.restoreAuthentication()
          .pipe(

            map(() => result)
          );
      }),

      catchError(error => {

        this.clearAuthentication();

        return throwError(() => error);
      })
    );
  }

  // ========================================
  // Get Current User
  // ========================================

  getCurrentUser(): Observable<AuthenticatedUser> {

    return this.http.get<
      ApiResponse<AuthenticatedUser>
    >(
      `${this.authenticationUrl}/me`,
      {
        withCredentials: true,
      }
    ).pipe(

      map(response =>
        this.extractData(response)
      )
    );
  }

  // ========================================
  // Get Current Session
  // ========================================

  getCurrentSession():
    Observable<AuthenticationSession> {

    return this.http.get<
      ApiResponse<AuthenticationSession>
    >(
      `${this.authenticationUrl}/session`,
      {
        withCredentials: true,
      }
    ).pipe(

      map(response =>
        this.extractData(response)
      )
    );
  }

  // ========================================
  // Restore Authentication
  // ========================================

  restoreAuthentication(): Observable<{
    user: AuthenticatedUser;
    session: AuthenticationSession;
  }> {

    return forkJoin({

      user: this.getCurrentUser(),

      session: this.getCurrentSession(),

    }).pipe(

      tap(({ user, session }) => {

        this.authenticationState
          .setAuthenticated(
            user,
            session
          );
      }),

      catchError(error => {

        this.clearAuthentication();

        return throwError(() => error);
      })
    );
  }

  // ========================================
  // Logout
  // ========================================

  logout(): Observable<void> {

    return this.http.post<
      ApiResponse<unknown>
    >(
      `${this.authenticationUrl}/logout`,
      null,
      {
        headers: this.createCsrfHeaders(),

        withCredentials: true,
      }
    ).pipe(

      map(response => {

        if (!response.success) {

          throw new Error(
            response.message ??
            'Logout failed.'
          );
        }
      }),

      tap(() => {

        this.clearAuthentication();
      })
    );
  }

  // ========================================
  // Validate Authenticated Result
  // ========================================

  private validateAuthenticatedResult(
    result: LoginResult
  ): void {

    if (
      !result.userGuid ||
      !result.sessionGuid ||
      !result.sessionExpiresAt
    ) {

      throw new Error(
        'Invalid authenticated response.'
      );
    }

    if (
      result.requiresPasswordChange ||
      result.requiresEmailVerification ||
      result.requiresTwoFactorAuthentication ||
      result.challengeToken !== null
    ) {

      throw new Error(
        'Authentication requirements are incomplete.'
      );
    }

    const sessionExpiresAt =
      Date.parse(result.sessionExpiresAt);

    if (
      !Number.isFinite(sessionExpiresAt) ||
      sessionExpiresAt <= Date.now()
    ) {

      throw new Error(
        'Invalid session expiration.'
      );
    }
  }

  // ========================================
  // Extract API Response Data
  // ========================================

  private extractData<T>(
    response: ApiResponse<T>
  ): T {

    if (
      !response.success ||
      response.data === null ||
      response.data === undefined
    ) {

      throw new Error(
        response.message ??
        'The request could not be completed.'
      );
    }

    return response.data;
  }

  // ========================================
  // Create CSRF Headers
  // ========================================

  private createCsrfHeaders(): HttpHeaders {

    return new HttpHeaders({

      [this.config.csrfHeaderName]:
        this.config.csrfHeaderValue,
    });
  }

  // ========================================
  // Clear Local Authentication State
  // ========================================

  clearAuthentication(): void {

    this.authenticationState.clear();
  }
}
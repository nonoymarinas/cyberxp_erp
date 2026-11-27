import {
  Injectable,
  inject,
} from '@angular/core';

import {
  HttpErrorResponse,
} from '@angular/common/http';

import {
  firstValueFrom,
  timeout,
} from 'rxjs';

// ========================================
// Authentication Services
// ========================================

import {
  AuthenticationService,
} from './authentication.service';

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
  SessionActivityService,
} from '../../session/services/session-activity.service';

// ========================================
// Authentication Initializer Service
// ========================================

@Injectable({
  providedIn: 'root',
})
export class AuthenticationInitializerService {

  // ========================================
  // Dependencies
  // ========================================

  private readonly authenticationService =
    inject(AuthenticationService);

  private readonly authenticationState =
    inject(AuthenticationState);

  private readonly sessionActivityService =
    inject(SessionActivityService);

  // ========================================
  // Initialization Configuration
  // ========================================

  private readonly initializationTimeoutMs =
    10000;

  // ========================================
  // Initialization State
  // ========================================

  private initializationPromise:
    Promise<void> | null = null;

  // ========================================
  // Initialize Authentication
  // ========================================

  initialize(): Promise<void> {

    // Prevent duplicate initialization.

    if (this.initializationPromise) {

      return this.initializationPromise;
    }

    this.initializationPromise =
      this.initializeAuthentication();

    return this.initializationPromise;
  }

  // ========================================
  // Restore Existing Authentication
  // ========================================

  private async initializeAuthentication():
    Promise<void> {

    try {

      // ====================================
      // Restore Browser Authentication
      // ====================================

      await firstValueFrom(

        this.authenticationService
          .restoreAuthentication()
          .pipe(

            timeout(
              this.initializationTimeoutMs
            )
          )
      );

    } catch (error: unknown) {

      // ====================================
      // Clear Local Authentication
      // ====================================

      this.authenticationState.clear();

      // ====================================
      // Handle Initialization Failure
      // ====================================

      if (
        error instanceof HttpErrorResponse &&
        error.status === 401
      ) {

        // No valid browser session.
        // This is a normal startup condition.

      } else {

        // Unexpected initialization failure.
        // Allow application startup.

        console.warn(
          'CyberXP authentication initialization failed.'
        );
      }

    } finally {

      // ====================================
      // Mark Authentication Initialized
      // ====================================

      this.authenticationState
        .markInitialized();

      // ====================================
      // Start Session Activity Monitoring
      // ====================================

      this.sessionActivityService.start();
    }
  }
}
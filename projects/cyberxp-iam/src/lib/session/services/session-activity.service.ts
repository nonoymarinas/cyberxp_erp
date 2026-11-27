import {
  DestroyRef,
  Injectable,
  NgZone,
  inject,
} from '@angular/core';

import {
  DOCUMENT,
} from '@angular/common';

import {
  Subscription,
  finalize,
  fromEvent,
  interval,
  merge,
} from 'rxjs';

// ========================================
// Authentication State
// ========================================

import {
  AuthenticationState,
} from '../../authentication/state/authentication.state';

// ========================================
// Session Services
// ========================================

import {
  SessionService,
} from '../../authentication/services/session.service';

// ========================================
// Session Activity Service
// ========================================

@Injectable({
  providedIn: 'root',
})
export class SessionActivityService {

  // ========================================
  // Dependencies
  // ========================================

  private readonly document =
    inject(DOCUMENT);

  private readonly ngZone =
    inject(NgZone);

  private readonly destroyRef =
    inject(DestroyRef);

  private readonly authenticationState =
    inject(AuthenticationState);

  private readonly sessionService =
    inject(SessionService);

  // ========================================
  // Monitoring Configuration
  // ========================================

  private readonly monitoringIntervalMs =
    1000;

  private readonly activityRetryIntervalMs =
    5000;

  // ========================================
  // Internal State
  // ========================================

  private monitoringSubscription:
    Subscription | null = null;

  private activityRequestSubscription:
    Subscription | null = null;

  private validationRequestSubscription:
    Subscription | null = null;

  private monitoredSessionGuid:
    string | null = null;

  private lastUserActivityAt = 0;

  private lastReportedUserActivityAt = 0;

  private lastActivityAttemptAt = 0;

  private lastValidationAttemptAt = 0;

  private activityRequestInProgress = false;

  private validationRequestInProgress = false;

  // ========================================
  // Constructor
  // ========================================

  constructor() {

    this.destroyRef.onDestroy(() => {

      this.stop();
    });
  }

  // ========================================
  // Start Session Monitoring
  // ========================================

  start(): void {

    // Prevent duplicate monitoring.

    if (
      this.monitoringSubscription &&
      !this.monitoringSubscription.closed
    ) {
      return;
    }

    if (!this.document.defaultView) {
      return;
    }

    this.monitoringSubscription =
      new Subscription();

    // ====================================
    // Monitor Outside Angular Zone
    // ====================================

    this.ngZone.runOutsideAngular(() => {

      const userActivity$ = merge(

        fromEvent<Event>(
          this.document,
          'pointerdown'
        ),

        fromEvent<Event>(
          this.document,
          'keydown'
        ),

        fromEvent<Event>(
          this.document,
          'wheel',
          { passive: true }
        ),

        fromEvent<Event>(
          this.document,
          'touchstart',
          { passive: true }
        )
      );

      // ==================================
      // Monitor User Interaction
      // ==================================

      this.monitoringSubscription?.add(

        userActivity$.subscribe(event => {

          this.handleUserActivity(event);
        })
      );

      // ==================================
      // Monitor Session Expiration
      // ==================================

      this.monitoringSubscription?.add(

        interval(
          this.monitoringIntervalMs
        ).subscribe(() => {

          this.monitorSession();
        })
      );
    });
  }

  // ========================================
  // Stop Session Monitoring
  // ========================================

  stop(): void {

    this.monitoringSubscription
      ?.unsubscribe();

    this.monitoringSubscription = null;

    this.resetMonitoringState();
  }

  // ========================================
  // Handle User Activity
  // ========================================

  private handleUserActivity(
    event: Event
  ): void {

    // ====================================
    // Ignore Synthetic Events
    // ====================================

    if (!event.isTrusted) {
      return;
    }

    // ====================================
    // Require Visible Application
    // ====================================

    if (
      this.document.visibilityState !==
      'visible'
    ) {
      return;
    }

    // ====================================
    // Require Authenticated Session
    // ====================================

    if (
      !this.authenticationState
        .isAuthenticated()
    ) {
      return;
    }

    this.synchronizeSession();

    // ====================================
    // Record Local User Activity
    // ====================================

    this.lastUserActivityAt =
      Date.now();

    // ====================================
    // Evaluate Activity Reporting
    // ====================================

    this.monitorSession();
  }

  // ========================================
  // Monitor Current Session
  // ========================================

  private monitorSession(): void {

    this.synchronizeSession();

    const session =
      this.authenticationState.session();

    if (!session) {
      return;
    }

    // ====================================
    // Check Local Session Expiration
    // ====================================

    if (
      !this.sessionService.hasValidSession()
    ) {

      this.validateExpiredSession();

      return;
    }

    // ====================================
    // Report Qualifying User Activity
    // ====================================

    this.reportActivityIfRequired();
  }

  // ========================================
  // Report User Activity
  // ========================================

  private reportActivityIfRequired(): void {

    const session =
      this.authenticationState.session();

    if (
      !session ||
      this.activityRequestInProgress ||
      this.validationRequestInProgress
    ) {
      return;
    }

    // ====================================
    // Require Unreported User Activity
    // ====================================

    if (
      this.lastUserActivityAt <=
      this.lastReportedUserActivityAt
    ) {
      return;
    }

    const now = Date.now();

    // ====================================
    // Read Backend Activity Policy
    // ====================================

    const activityIntervalMs =
      session.activityUpdateIntervalMinutes *
      60 *
      1000;

    if (
      !Number.isFinite(activityIntervalMs) ||
      activityIntervalMs <= 0
    ) {
      return;
    }

    const lastServerActivityAt =
      Date.parse(session.lastActivityAt);

    if (
      !Number.isFinite(lastServerActivityAt)
    ) {
      return;
    }

    // ====================================
    // Require Recent Actual Activity
    // ====================================

    if (
      now - this.lastUserActivityAt >
      activityIntervalMs
    ) {

      this.lastReportedUserActivityAt =
        this.lastUserActivityAt;

      return;
    }

    // ====================================
    // Respect Backend Update Interval
    // ====================================

    if (
      now - lastServerActivityAt <
      activityIntervalMs
    ) {
      return;
    }

    // ====================================
    // Prevent Excessive Retry Requests
    // ====================================

    if (
      now - this.lastActivityAttemptAt <
      this.activityRetryIntervalMs
    ) {
      return;
    }

    const reportedActivityAt =
      this.lastUserActivityAt;

    const sessionGuid =
      session.sessionGuid;

    this.lastActivityAttemptAt = now;

    this.activityRequestInProgress = true;

    // ====================================
    // Record Activity Through Backend
    // ====================================

    this.ngZone.run(() => {

      this.activityRequestSubscription =
        this.sessionService
          .recordActivity()
          .pipe(

            finalize(() => {

              this.activityRequestInProgress =
                false;
            })
          )
          .subscribe({

            next: () => {

              if (
                this.authenticationState
                  .sessionGuid() !==
                sessionGuid
              ) {
                return;
              }

              this.lastReportedUserActivityAt =
                reportedActivityAt;
            },

            error: () => {

              // SessionService handles HTTP 401.
              //
              // Temporary failures do not
              // immediately terminate the session.
            },
          });
    });
  }

  // ========================================
  // Validate Locally Expired Session
  // ========================================

  private validateExpiredSession(): void {

    if (
      this.validationRequestInProgress ||
      this.activityRequestInProgress
    ) {
      return;
    }

    const now = Date.now();

    if (
      now - this.lastValidationAttemptAt <
      this.activityRetryIntervalMs
    ) {
      return;
    }

    this.lastValidationAttemptAt = now;

    this.validationRequestInProgress = true;

    // ====================================
    // Confirm Expiration With Backend
    // ====================================

    this.ngZone.run(() => {

      this.validationRequestSubscription =
        this.sessionService
          .validateSession()
          .pipe(

            finalize(() => {

              this.validationRequestInProgress =
                false;
            })
          )
          .subscribe({

            next: () => {

              // SessionService updates the
              // authoritative session timestamps.
            },

            error: () => {

              // HTTP 401 clears authentication.
              //
              // Network failures are retried
              // without extending session time.
            },
          });
    });
  }

  // ========================================
  // Synchronize Monitored Session
  // ========================================

  private synchronizeSession(): void {

    const currentSessionGuid =
      this.authenticationState.sessionGuid();

    if (
      currentSessionGuid ===
      this.monitoredSessionGuid
    ) {
      return;
    }

    this.resetMonitoringState();

    this.monitoredSessionGuid =
      currentSessionGuid;
  }

  // ========================================
  // Reset Monitoring State
  // ========================================

  private resetMonitoringState(): void {

    this.activityRequestSubscription
      ?.unsubscribe();

    this.validationRequestSubscription
      ?.unsubscribe();

    this.activityRequestSubscription =
      null;

    this.validationRequestSubscription =
      null;

    this.monitoredSessionGuid = null;

    this.lastUserActivityAt = 0;

    this.lastReportedUserActivityAt = 0;

    this.lastActivityAttemptAt = 0;

    this.lastValidationAttemptAt = 0;

    this.activityRequestInProgress = false;

    this.validationRequestInProgress = false;
  }
}
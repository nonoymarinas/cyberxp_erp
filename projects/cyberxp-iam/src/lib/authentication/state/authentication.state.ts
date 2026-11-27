import {
  Injectable,
  computed,
  signal,
} from '@angular/core';

// ========================================
// Authentication Models
// ========================================

import {
  AuthenticatedUser,
} from '../models/authenticated-user.model';

import {
  AuthenticationSession,
} from '../models/authentication-session.model';

// ========================================
// Authentication State
// ========================================

@Injectable({
  providedIn: 'root',
})
export class AuthenticationState {

  // ========================================
  // Private State
  // ========================================

  private readonly _authentication = signal<{
    readonly user: AuthenticatedUser;
    readonly session: AuthenticationSession;
  } | null>(null);

  private readonly _initialized =
    signal(false);

  // ========================================
  // Public Readonly State
  // ========================================

  readonly user = computed(
    () => this._authentication()?.user ?? null
  );

  readonly session = computed(
    () => this._authentication()?.session ?? null
  );

  readonly initialized =
    this._initialized.asReadonly();

  // ========================================
  // Computed Authentication State
  // ========================================

  readonly isAuthenticated = computed(
    () => this._authentication() !== null
  );

  // ========================================
  // Session Information
  // ========================================

  readonly sessionGuid = computed(
    () => this.session()?.sessionGuid ?? null
  );

  readonly clientInstanceId = computed(
    () => this.session()?.clientInstanceId ?? null
  );

  readonly sessionExpiresAt = computed(
    () => this.session()?.expiresAt ?? null
  );

  readonly inactivityExpiresAt = computed(
    () => this.session()?.inactivityExpiresAt ?? null
  );

  // ========================================
  // User Information
  // ========================================

  readonly userGuid = computed(
    () => this.user()?.userGuid ?? null
  );

  readonly displayName = computed(
    () => this.user()?.displayName ?? null
  );

  readonly email = computed(
    () => this.user()?.email ?? null
  );

  readonly isEmailVerified = computed(
    () => this.user()?.isEmailVerified ?? false
  );

  // ========================================
  // Establish Authentication
  // ========================================

  setAuthenticated(
    user: AuthenticatedUser,
    session: AuthenticationSession
  ): void {

    this._authentication.set({
      user: Object.freeze({ ...user }),
      session: Object.freeze({ ...session }),
    });

    this._initialized.set(true);
  }

  // ========================================
  // Update Authentication Session
  // ========================================

  updateSession(
    session: AuthenticationSession
  ): void {

    const current = this._authentication();

    if (!current) {
      throw new Error(
        'Cannot update an unauthenticated session.'
      );
    }

    if (
      current.session.sessionGuid !==
      session.sessionGuid
    ) {
      throw new Error(
        'Authentication session does not match.'
      );
    }

    this._authentication.set({
      user: current.user,
      session: Object.freeze({ ...session }),
    });
  }

  // ========================================
  // Check Local Session Expiration
  // ========================================

  hasValidSession(): boolean {

    const session = this.session();

    if (!session) {
      return false;
    }

    const expiresAt =
      Date.parse(session.expiresAt);

    const inactivityExpiresAt =
      Date.parse(session.inactivityExpiresAt);

    if (
      !Number.isFinite(expiresAt) ||
      !Number.isFinite(inactivityExpiresAt)
    ) {
      return false;
    }

    const now = Date.now();

    return (
      expiresAt > now &&
      inactivityExpiresAt > now
    );
  }

  // ========================================
  // Mark Authentication Initialized
  // ========================================

  markInitialized(): void {

    this._initialized.set(true);
  }

  // ========================================
  // Clear Authentication
  // ========================================

  clear(): void {

    this._authentication.set(null);

    this._initialized.set(true);
  }
}
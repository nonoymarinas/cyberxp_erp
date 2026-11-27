export interface AuthenticationSession {
  // ========================================
  // Session Identity
  // ========================================

  readonly sessionGuid: string;

  readonly clientInstanceId: string;

  // ========================================
  // Session Timestamps
  // ========================================

  readonly authenticatedAt: string;

  readonly lastActivityAt: string;

  readonly expiresAt: string;

  readonly inactivityExpiresAt: string;

  // ========================================
  // Session Policy
  // ========================================

  readonly inactivityTimeoutMinutes: number;

  readonly activityUpdateIntervalMinutes: number;
}
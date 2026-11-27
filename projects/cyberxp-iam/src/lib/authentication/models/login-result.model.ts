import {
  AuthenticationStatus,
} from './authentication-status.model';

export interface LoginResult {
  // ========================================
  // Authentication Status
  // ========================================

  readonly authenticationStatus: AuthenticationStatus;

  // ========================================
  // User Information
  // ========================================

  readonly userGuid: string | null;

  readonly email: string | null;

  readonly displayName: string | null;

  // ========================================
  // Authentication Requirements
  // ========================================

  readonly requiresPasswordChange: boolean;

  readonly requiresEmailVerification: boolean;

  readonly requiresTwoFactorAuthentication: boolean;

  // ========================================
  // Authentication Challenge
  // ========================================

  readonly challengeToken: string | null;

  // ========================================
  // Session Information
  // ========================================

  readonly sessionGuid: string | null;

  readonly sessionExpiresAt: string | null;
}
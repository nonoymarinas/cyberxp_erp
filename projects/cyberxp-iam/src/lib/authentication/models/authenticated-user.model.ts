export interface AuthenticatedUser {
  // ========================================
  // User Identity
  // ========================================

  readonly userGuid: string;

  readonly email: string;

  readonly displayName: string;

  // ========================================
  // Account Verification
  // ========================================

  readonly isEmailVerified: boolean;
}
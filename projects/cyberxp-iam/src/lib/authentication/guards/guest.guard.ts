import {
  inject,
} from '@angular/core';

import {
  CanActivateFn,
  Router,
} from '@angular/router';

// ========================================
// Configuration
// ========================================

import {
  IAM_CONFIG,
} from '../../configuration/iam-config.token';

// ========================================
// Authentication Services
// ========================================

import {
  AuthenticationInitializerService,
} from '../services/authentication-initializer.service';

// ========================================
// Authentication State
// ========================================

import {
  AuthenticationState,
} from '../state/authentication.state';

// ========================================
// Guest Guard
// ========================================

export const guestGuard: CanActivateFn =
  async () => {

    // ====================================
    // Dependencies
    // ====================================

    const router =
      inject(Router);

    const config =
      inject(IAM_CONFIG);

    const authenticationState =
      inject(AuthenticationState);

    const initializer =
      inject(AuthenticationInitializerService);

    // ====================================
    // Wait for Authentication Initialization
    // ====================================

    if (!authenticationState.initialized()) {

      await initializer.initialize();
    }

    // ====================================
    // Allow Unauthenticated Users
    // ====================================

    if (
      !authenticationState.isAuthenticated() ||
      !authenticationState.hasValidSession()
    ) {

      return true;
    }

    // ====================================
    // Resolve Launchpad URL
    // ====================================

    const launchpadUrl = new URL(
      config.launchpadUrl,
      window.location.origin
    );

    // ====================================
    // Same-Origin Launchpad Navigation
    // ====================================

    if (
      launchpadUrl.origin ===
      window.location.origin
    ) {

      return router.parseUrl(
        launchpadUrl.pathname +
        launchpadUrl.search +
        launchpadUrl.hash
      );
    }

    // ====================================
    // External Launchpad Navigation
    // ====================================

    window.location.replace(
      launchpadUrl.href
    );

    return false;
  };
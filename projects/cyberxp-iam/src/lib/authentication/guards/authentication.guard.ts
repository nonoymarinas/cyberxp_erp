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
// Authentication Guard
// ========================================

export const authenticationGuard: CanActivateFn =
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
    // Validate Authentication State
    // ====================================

    if (
      authenticationState.isAuthenticated() &&
      authenticationState.hasValidSession()
    ) {

      return true;
    }

    // ====================================
    // Resolve Centralized Login URL
    // ====================================

    const loginUrl = new URL(
      config.loginUrl,
      window.location.origin
    );

    // ====================================
    // Same-Origin Login Navigation
    // ====================================

    if (
      loginUrl.origin ===
      window.location.origin
    ) {

      return router.parseUrl(
        loginUrl.pathname +
        loginUrl.search +
        loginUrl.hash
      );
    }

    // ====================================
    // External ATMS Login Navigation
    // ====================================

    window.location.replace(
      loginUrl.href
    );

    return false;
  };
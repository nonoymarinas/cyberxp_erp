import { inject } from '@angular/core';

import { CanActivateFn, Router } from '@angular/router';

// ========================================
// Authorization
// ========================================

import { UserAccessService } from '../../../core/authorization/services/user-access.services';

// ========================================
// Wizard Permission Guard
// ========================================

export const wizardPermissionGuard: CanActivateFn = (route, state) => {
  // ========================================
  // Dependencies
  // ========================================

  const userAccessService = inject(UserAccessService);

  const router = inject(Router);

  // ========================================
  // Get Required Permission
  // ========================================

  const permission = route.data['permission'] as string | undefined;

  // ========================================
  // Validate Permission Configuration
  // ========================================

  if (!permission) {
    console.error('Wizard permission is not configured:', state.url);

    return router.createUrlTree(['/app']);
  }

  // ========================================
  // Check User Permission
  // ========================================

  const hasPermission = userAccessService.hasPermission(permission);

  // ========================================
  // Allow Navigation
  // ========================================

  if (hasPermission) {
    return true;
  }

  // ========================================
  // Deny Navigation
  // ========================================

  return router.createUrlTree(['/app']);
};

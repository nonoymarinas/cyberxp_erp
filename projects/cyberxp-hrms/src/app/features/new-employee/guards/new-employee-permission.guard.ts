import { inject } from '@angular/core';

import { CanActivateFn, Router } from '@angular/router';

// ========================================
// Authorization Service
// ========================================

import { UserAccessService } from '../../../core/authorization/services/user-access.services';

// ========================================
// Permission References
// ========================================

import { EMPLOYEE_PERMISSIONS } from '../../../core/authorization/permissions/employee-permissions';

// ========================================
// New Employee Permission Guard
// ========================================

export const newEmployeePermissionGuard: CanActivateFn = () => {
  // ========================================
  // Dependencies
  // ========================================

  const userAccessService = inject(UserAccessService);

  const router = inject(Router);

  // ========================================
  // Check Employee Create Permission
  // ========================================

  const hasPermission = userAccessService.hasPermission(EMPLOYEE_PERMISSIONS.employee.create);

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

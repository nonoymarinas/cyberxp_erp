import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { UserAccessService } from '../../../core/authorization/services/user-access.services';

export const newEmployeeGuard: CanActivateFn = () => {
  const userAccessService = inject(UserAccessService);
  const router = inject(Router);

  const access = userAccessService.userAccess();

  const allowed =
    access?.permissions.some(
      permission => permission.code === 'hrms.employee.create'
    ) ?? false;

  return allowed
    ? true
    : router.createUrlTree(['/app/dashboard']);
};
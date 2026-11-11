import { UserPermission } from '../../models/user-access.model';

import { EMPLOYEE_PERMISSIONS } from '../../permissions/employee-permissions';

// ========================================
// Permission Catalog
// ========================================

const permissionCodes = Object.values(EMPLOYEE_PERMISSIONS).flatMap((group) =>
  Object.values(group),
);

// ========================================
// Mock Permissions
// ========================================

export const USER_PERMISSIONS_MOCK: UserPermission[] = permissionCodes.map((code) => {
  const parts = code.split('.');
  const action = parts[parts.length - 1];
  const resource = parts.slice(1, -1).join('.');

  return {
    // Development-only identifier.
    id: code,
    code,
    name: code,
    module: 'HRMS',
    resource,
    action,
  };
});

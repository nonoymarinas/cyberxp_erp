import { UserPermission } from '../../models/user-access.model';

export const USER_PERMISSIONS_MOCK: UserPermission[] = [
  // ==========================
  // Dashboard
  // ==========================
  {
    id: 'PERM-0001',
    code: 'dashboard.view',
    name: 'View Dashboard',
    module: 'Dashboard',
    resource: 'Dashboard',
    action: 'View',
  },

  // ==========================
  // Employee
  // ==========================
  {
    id: 'PERM-1001',
    code: 'hrms.employee.view',
    name: 'View Employees',
    module: 'HRMS',
    resource: 'Employee',
    action: 'View',
  },
  {
    id: 'PERM-1002',
    code: 'hrms.employee.create',
    name: 'Create Employee',
    module: 'HRMS',
    resource: 'Employee',
    action: 'Create',
  },
  {
    id: 'PERM-1003',
    code: 'hrms.employee.update',
    name: 'Update Employee',
    module: 'HRMS',
    resource: 'Employee',
    action: 'Update',
  },
  {
    id: 'PERM-1004',
    code: 'hrms.employee.delete',
    name: 'Delete Employee',
    module: 'HRMS',
    resource: 'Employee',
    action: 'Delete',
  },

  // ==========================
  // Attendance
  // ==========================
  {
    id: 'PERM-2001',
    code: 'attendance.view',
    name: 'View Attendance',
    module: 'Attendance',
    resource: 'Attendance',
    action: 'View',
  },
  {
    id: 'PERM-2002',
    code: 'attendance.approve',
    name: 'Approve Attendance',
    module: 'Attendance',
    resource: 'Attendance',
    action: 'Approve',
  },

  // ==========================
  // Payroll
  // ==========================
  {
    id: 'PERM-3001',
    code: 'payroll.view',
    name: 'View Payroll',
    module: 'Payroll',
    resource: 'Payroll',
    action: 'View',
  },
  {
    id: 'PERM-3002',
    code: 'payroll.process',
    name: 'Process Payroll',
    module: 'Payroll',
    resource: 'Payroll',
    action: 'Process',
  },

  // ==========================
  // Settings
  // ==========================
  {
    id: 'PERM-9001',
    code: 'settings.view',
    name: 'View Settings',
    module: 'System',
    resource: 'Settings',
    action: 'View',
  },
  {
    id: 'PERM-9002',
    code: 'roles.manage',
    name: 'Manage Roles',
    module: 'System',
    resource: 'Role',
    action: 'Manage',
  },
  {
    id: 'PERM-9003',
    code: 'users.manage',
    name: 'Manage Users',
    module: 'System',
    resource: 'User',
    action: 'Manage',
  },
];
import { UserPermission } from '../../models/user-access.model';

export const USER_PERMISSIONS_MOCK: UserPermission[] = [
  // ==========================
  // Create Employee
  // ==========================

  // Personal Info
  {
    id: 'CXP-PERM-1001',
    code: 'hrms.employee.create',
    name: 'Create Employee',
    module: 'HRMS',
    resource: 'Employee',
    action: 'Create',
  },
  {
    id: 'CXP-PERM-1002',
    code: 'hrms.employee.personalinfo.view',
    name: 'Add Personal Info',
    module: 'HRMS',
    resource: 'Employee',
    action: 'Add',
  },
  {
    id: 'CXP-PERM-1003',
    code: 'hrms.employee.personalinfo.edit',
    name: 'Update Personal Info',
    module: 'HRMS',
    resource: 'Employee',
    action: 'Update',
  },

  // Address
  {
    id: 'CXP-PERM-1004',
    code: 'hrms.employee.address.add',
    name: 'Add Address',
    module: 'HRMS',
    resource: 'Employee',
    action: 'Add',
  },
  {
    id: 'CXP-PERM-1005',
    code: 'hrms.employee.address.update',
    name: 'Update Address',
    module: 'HRMS',
    resource: 'Employee',
    action: 'Update',
  },

  // Contacts
  {
    id: 'CXP-PERM-1006',
    code: 'hrms.employee.contacts.add',
    name: 'Add Contacts',
    module: 'HRMS',
    resource: 'Employee',
    action: 'Add',
  },
  {
    id: 'CXP-PERM-1007',
    code: 'hrms.employee.contacts.update',
    name: 'Update Contacts',
    module: 'HRMS',
    resource: 'Employee',
    action: 'Update',
  },

  // Benefits
  {
    id: 'CXP-PERM-1008',
    code: 'hrms.employee.benefits.add',
    name: 'Add Benefits',
    module: 'HRMS',
    resource: 'Employee',
    action: 'Add',
  },
  {
    id: 'CXP-PERM-1009',
    code: 'hrms.employee.benefits.update',
    name: 'Update Benefits',
    module: 'HRMS',
    resource: 'Employee',
    action: 'Update',
  },

  // Employment
  {
    id: 'CXP-PERM-1010',
    code: 'hrms.employee.employment.add',
    name: 'Add Employment',
    module: 'HRMS',
    resource: 'Employee',
    action: 'Add',
  },
  {
    id: 'CXP-PERM-1011',
    code: 'hrms.employee.employment.update',
    name: 'Update Employment',
    module: 'HRMS',
    resource: 'Employee',
    action: 'Update',
  },

  // Compensation
  {
    id: 'CXP-PERM-1012',
    code: 'hrms.employee.compensation.add',
    name: 'Add Compensation',
    module: 'HRMS',
    resource: 'Employee',
    action: 'Add',
  },
  {
    id: 'CXP-PERM-1013',
    code: 'hrms.employee.compensation.update',
    name: 'Update Compensation',
    module: 'HRMS',
    resource: 'Employee',
    action: 'Update',
  },
];

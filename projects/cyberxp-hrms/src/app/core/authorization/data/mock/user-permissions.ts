import { UserPermission } from '../../models/user-access.model';

export const USER_PERMISSIONS_MOCK: UserPermission[] = [
  // ==========================
  // Employee
  // ==========================

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
    code: 'hrms.employee.read',
    name: 'Read Employee',
    module: 'HRMS',
    resource: 'Employee',
    action: 'Read',
  },

  // ==========================
  // Employee > Personal Info
  // ==========================

  {
    id: 'CXP-PERM-1003',
    code: 'hrms.employee.personalinfo.create',
    name: 'Create Personal Info',
    module: 'HRMS',
    resource: 'PersonalInfo',
    action: 'Create',
  },
  {
    id: 'CXP-PERM-1004',
    code: 'hrms.employee.personalinfo.read',
    name: 'Read Personal Info',
    module: 'HRMS',
    resource: 'PersonalInfo',
    action: 'Read',
  },
  {
    id: 'CXP-PERM-1005',
    code: 'hrms.employee.personalinfo.update',
    name: 'Update Personal Info',
    module: 'HRMS',
    resource: 'PersonalInfo',
    action: 'Update',
  },
  {
    id: 'CXP-PERM-1006',
    code: 'hrms.employee.personalinfo.delete',
    name: 'Delete Personal Info',
    module: 'HRMS',
    resource: 'PersonalInfo',
    action: 'Delete',
  },

  // ==========================
  // Employee > Contact
  // ==========================

  {
    id: 'CXP-PERM-1007',
    code: 'hrms.employee.contact.create',
    name: 'Create Contact',
    module: 'HRMS',
    resource: 'Contact',
    action: 'Create',
  },
  {
    id: 'CXP-PERM-1008',
    code: 'hrms.employee.contact.read',
    name: 'Read Contact',
    module: 'HRMS',
    resource: 'Contact',
    action: 'Read',
  },
  {
    id: 'CXP-PERM-1009',
    code: 'hrms.employee.contact.update',
    name: 'Update Contact',
    module: 'HRMS',
    resource: 'Contact',
    action: 'Update',
  },
  {
    id: 'CXP-PERM-1010',
    code: 'hrms.employee.contact.delete',
    name: 'Delete Contact',
    module: 'HRMS',
    resource: 'Contact',
    action: 'Delete',
  },

  // ==========================
  // Employee > Benefit
  // ==========================

  {
    id: 'CXP-PERM-1011',
    code: 'hrms.employee.benefit.create',
    name: 'Create Benefit',
    module: 'HRMS',
    resource: 'Benefit',
    action: 'Create',
  },
  {
    id: 'CXP-PERM-1012',
    code: 'hrms.employee.benefit.read',
    name: 'Read Benefit',
    module: 'HRMS',
    resource: 'Benefit',
    action: 'Read',
  },
  {
    id: 'CXP-PERM-1013',
    code: 'hrms.employee.benefit.update',
    name: 'Update Benefit',
    module: 'HRMS',
    resource: 'Benefit',
    action: 'Update',
  },
  {
    id: 'CXP-PERM-1014',
    code: 'hrms.employee.benefit.delete',
    name: 'Delete Benefit',
    module: 'HRMS',
    resource: 'Benefit',
    action: 'Delete',
  },

  // ==========================
  // Employee > Address
  // ==========================

  {
    id: 'CXP-PERM-1015',
    code: 'hrms.employee.address.create',
    name: 'Create Address',
    module: 'HRMS',
    resource: 'Address',
    action: 'Create',
  },
  {
    id: 'CXP-PERM-1016',
    code: 'hrms.employee.address.read',
    name: 'Read Address',
    module: 'HRMS',
    resource: 'Address',
    action: 'Read',
  },
  {
    id: 'CXP-PERM-1017',
    code: 'hrms.employee.address.update',
    name: 'Update Address',
    module: 'HRMS',
    resource: 'Address',
    action: 'Update',
  },
  {
    id: 'CXP-PERM-1018',
    code: 'hrms.employee.address.delete',
    name: 'Delete Address',
    module: 'HRMS',
    resource: 'Address',
    action: 'Delete',
  },

  // ==========================
  // Employee > Emergency Contact
  // ==========================

  {
    id: 'CXP-PERM-1019',
    code: 'hrms.employee.emergencycontact.create',
    name: 'Create Emergency Contact',
    module: 'HRMS',
    resource: 'EmergencyContact',
    action: 'Create',
  },
  {
    id: 'CXP-PERM-1020',
    code: 'hrms.employee.emergencycontact.read',
    name: 'Read Emergency Contact',
    module: 'HRMS',
    resource: 'EmergencyContact',
    action: 'Read',
  },
  {
    id: 'CXP-PERM-1021',
    code: 'hrms.employee.emergencycontact.update',
    name: 'Update Emergency Contact',
    module: 'HRMS',
    resource: 'EmergencyContact',
    action: 'Update',
  },
  {
    id: 'CXP-PERM-1022',
    code: 'hrms.employee.emergencycontact.delete',
    name: 'Delete Emergency Contact',
    module: 'HRMS',
    resource: 'EmergencyContact',
    action: 'Delete',
  },

  // ==========================
  // Employee > Employment
  // ==========================

  {
    id: 'CXP-PERM-1023',
    code: 'hrms.employee.employment.create',
    name: 'Create Employment',
    module: 'HRMS',
    resource: 'Employment',
    action: 'Create',
  },
  {
    id: 'CXP-PERM-1024',
    code: 'hrms.employee.employment.read',
    name: 'Read Employment',
    module: 'HRMS',
    resource: 'Employment',
    action: 'Read',
  },
  {
    id: 'CXP-PERM-1025',
    code: 'hrms.employee.employment.update',
    name: 'Update Employment',
    module: 'HRMS',
    resource: 'Employment',
    action: 'Update',
  },
  {
    id: 'CXP-PERM-1026',
    code: 'hrms.employee.employment.delete',
    name: 'Delete Employment',
    module: 'HRMS',
    resource: 'Employment',
    action: 'Delete',
  },

  // ==========================
  // Employee > Compensation
  // ==========================

  {
    id: 'CXP-PERM-1027',
    code: 'hrms.employee.compensation.create',
    name: 'Create Compensation',
    module: 'HRMS',
    resource: 'Compensation',
    action: 'Create',
  },
  {
    id: 'CXP-PERM-1028',
    code: 'hrms.employee.compensation.read',
    name: 'Read Compensation',
    module: 'HRMS',
    resource: 'Compensation',
    action: 'Read',
  },
  {
    id: 'CXP-PERM-1029',
    code: 'hrms.employee.compensation.update',
    name: 'Update Compensation',
    module: 'HRMS',
    resource: 'Compensation',
    action: 'Update',
  },
  {
    id: 'CXP-PERM-1030',
    code: 'hrms.employee.compensation.delete',
    name: 'Delete Compensation',
    module: 'HRMS',
    resource: 'Compensation',
    action: 'Delete',
  },
];
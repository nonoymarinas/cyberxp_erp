export const EMPLOYEE_PERMISSIONS = {
  employee: {
    // ========================================
    // Basic CRUD
    // ========================================
    create: 'hrms.employee.create',
    read: 'hrms.employee.read',
    update: 'hrms.employee.update',
    delete: 'hrms.employee.delete',

    // ========================================
    // Employee Status
    // ========================================
    activate: 'hrms.employee.activate',
    deactivate: 'hrms.employee.deactivate',
    blocklist: 'hrms.employee.blocklist',
    unblocklist: 'hrms.employee.unblocklist',

    // ========================================
    // Employment Lifecycle
    // ========================================
    hire: 'hrms.employee.hire',
    rehire: 'hrms.employee.rehire',
    transfer: 'hrms.employee.transfer',
    promote: 'hrms.employee.promote',
    demote: 'hrms.employee.demote',
    terminate: 'hrms.employee.terminate',
    resign: 'hrms.employee.resign',
    retire: 'hrms.employee.retire',

    // ========================================
    // Assignment
    // ========================================
    assignDepartment: 'hrms.employee.assign-department',
    assignPosition: 'hrms.employee.assign-position',
    assignManager: 'hrms.employee.assign-manager',
    assignWorkLocation: 'hrms.employee.assign-work-location',

    // ========================================
    // Administrative
    // ========================================
    import: 'hrms.employee.import',
    export: 'hrms.employee.export',
    restore: 'hrms.employee.restore',
    archive: 'hrms.employee.archive',
    viewAuditLog: 'hrms.employee.view-audit-log',
  },

  personalInfo: {
    create: 'hrms.employee.personalinfo.create',
    read: 'hrms.employee.personalinfo.read',
    update: 'hrms.employee.personalinfo.update',
    delete: 'hrms.employee.personalinfo.delete',
  },

  address: {
    create: 'hrms.employee.address.create',
    read: 'hrms.employee.address.read',
    update: 'hrms.employee.address.update',
    delete: 'hrms.employee.address.delete',
  },

  contact: {
    create: 'hrms.employee.contact.create',
    read: 'hrms.employee.contact.read',
    update: 'hrms.employee.contact.update',
    delete: 'hrms.employee.contact.delete',
  },

  emergencyContact: {
    create: 'hrms.employee.emergencycontact.create',
    read: 'hrms.employee.emergencycontact.read',
    update: 'hrms.employee.emergencycontact.update',
    delete: 'hrms.employee.emergencycontact.delete',
  },

  benefit: {
    create: 'hrms.employee.benefit.create',
    read: 'hrms.employee.benefit.read',
    update: 'hrms.employee.benefit.update',
    delete: 'hrms.employee.benefit.delete',
  },

  employment: {
    create: 'hrms.employee.employment.create',
    read: 'hrms.employee.employment.read',
    update: 'hrms.employee.employment.update',
    delete: 'hrms.employee.employment.delete',
  },

  compensation: {
    create: 'hrms.employee.compensation.create',
    read: 'hrms.employee.compensation.read',
    update: 'hrms.employee.compensation.update',
    delete: 'hrms.employee.compensation.delete',
  },

  document: {
    create: 'hrms.employee.document.create',
    read: 'hrms.employee.document.read',
    update: 'hrms.employee.document.update',
    delete: 'hrms.employee.document.delete',
    upload: 'hrms.employee.document.upload',
    download: 'hrms.employee.document.download',
  },
} as const;
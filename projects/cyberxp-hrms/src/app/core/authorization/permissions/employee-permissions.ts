export const EMPLOYEE_PERMISSIONS = {
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
} as const;
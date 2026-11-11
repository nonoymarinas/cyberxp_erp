import { EMPLOYEE_PERMISSIONS as P } from '../../permissions/employee-permissions';

// ========================================
// Role Permission Assignments
// ========================================

export const ROLE_PERMISSIONS_MOCK: Record<string, readonly string[]> = {
  // ======================================
  // HRMS Administrator
  // ======================================

  'hrms.admin': Object.values(P).flatMap((group) => Object.values(group)),

  // ======================================
  // HRMS Assistant
  // ======================================

  'hrms.assistant': [
    P.employee.read,

    P.personalInfo.create,
    P.personalInfo.read,

    P.address.create,
    P.address.read,

    P.contact.create,
    P.contact.read,

    P.emergencyContact.create,
    P.emergencyContact.read,

    P.employment.read,
  ],
};

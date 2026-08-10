import { UserRole } from '../../models/user-access.model';

export const USER_ROLES_MOCK: UserRole[] = [
  {
    id: 'CXP-ROLE-1001',
    code: 'hrms.admin',
    name: 'HRMS Administrator',
  },
  {
    id: 'CXP-ROLE-1002',
    code: 'hrms.assistant',
    name: 'HRMS Assistant',
  },
];
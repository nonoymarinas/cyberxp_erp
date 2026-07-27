import { Employee } from '../models/employee';

export const EMPLOYEE_MOCK: Employee[] = [
  {
    id: 1,
    employeeNo: 'EMP-000001',

    firstName: 'Juan',
    middleName: 'Santos',
    lastName: 'Dela Cruz',

    suffixId: null,
    genderId: 1,
    civilStatusId: 2,

    birthDate: '1990-05-12',
  },

  {
    id: 2,
    employeeNo: 'EMP-000002',

    firstName: 'Maria',
    middleName: 'Lopez',
    lastName: 'Reyes',

    suffixId: null,
    genderId: 2,
    civilStatusId: 1,

    birthDate: '1995-08-21',
  },

  {
    id: 3,
    employeeNo: 'EMP-000003',

    firstName: 'Michael',
    middleName: 'Garcia',
    lastName: 'Torres',

    suffixId: 2,
    genderId: 1,
    civilStatusId: 1,

    birthDate: '1988-01-30',
  },
];
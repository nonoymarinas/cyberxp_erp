import { Routes } from '@angular/router';

import { NewEmployeePage } from '../new-employee/new-employee';
import { PersonalInfo } from '../../components/personal-info/personal-info';
import { Address } from '../../components/address/address';
import { Contacts } from '../../components/contacts/contacts';
import { Employment } from '../../components/employment/employment';
import { EmergencyContacts } from '../../components/emergency-contacts/emergency-contacts';
import { EmployeeListPage } from './employee-list';
export const NEW_EMPLOYEE_ROUTES: Routes = [
  {
    path: '',
    component: EmployeeListPage,
    children: [
      {
        path: 'personal-info',
        component: PersonalInfo,
      }
    ],
  },
];

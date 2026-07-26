import { Routes } from '@angular/router';

import { NewEmployeePage } from '../new-employee/new-employee';
import { PersonalInfo } from '../personal-info/personal-info';
import { Address } from '../address/address';
import { Contacts } from '../contacts/contacts';
import { Employment } from '../employment/employment';
import { EmergencyContacts } from '../emergency-contacts/emergency-contacts';
export const NEW_EMPLOYEE_ROUTES: Routes = [
  {
    path: '',
    component: NewEmployeePage,
    children: [
      {
        path: 'personal-info',
        component: PersonalInfo,
      },
      {
        path: 'address',
        component: Address,
      },
      {
        path: 'contacts',
        component: Contacts,
      },
      {
        path: 'emergency-contacts',
        component: EmergencyContacts,
      },
      {
        path: 'employment',
        component: Employment,
      },
    ],
  },
];

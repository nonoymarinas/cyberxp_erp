import { Routes } from '@angular/router';

import { NewEmployeePage } from './new-employee';
import { PersonalComponent } from '../personal/personal';
import { AddressComponent } from '../address/address';
import { ContactsComponent } from '../contacts/contacts';
import { EmploymentComponent } from '../employment/employment';
import { EmergencyComponent } from '../emergency/emergency';

export const NEW_EMPLOYEE_ROUTES: Routes = [
  {
    path: '',
    component: NewEmployeePage,

    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'personal-info',
      },

      {
        path: 'personal-info',
        component: PersonalComponent,
      },

      {
        path: 'address',
        component: AddressComponent,
      },

      {
        path: 'contacts',
        component: ContactsComponent,
      },

      {
        path: 'emergency',
        component: EmergencyComponent,
      },

      {
        path: 'employment',
        component: EmploymentComponent,
      },
    ],
  },
];
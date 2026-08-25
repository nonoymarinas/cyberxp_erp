import { Routes } from '@angular/router';

import { NewEmployeePage } from './new-employee';
import { PersonalInfoComponent } from '../personal-info/personal-info';
import { AddressComponent  } from '../address/address';
import { ContactsComponent} from '../contacts/contacts';
import { EmploymentComponent } from '../employment/employment';
import { EmergencyContactsComponent } from '../emergency-contacts/emergency-contacts';
export const NEW_EMPLOYEE_ROUTES: Routes = [
  {
    path: '',
    component: NewEmployeePage,
    children: [
      {
        path: 'personal-info',
        component: PersonalInfoComponent,
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
        path: 'emergency-contacts',
        component: EmergencyContactsComponent,
      },
      {
        path: 'employment',
        component: EmploymentComponent,
      },
    ],
  },
];

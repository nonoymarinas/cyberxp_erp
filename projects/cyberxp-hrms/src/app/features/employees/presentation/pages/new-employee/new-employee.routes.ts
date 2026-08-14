import { Routes } from '@angular/router';

import { NewEmployeePage } from './new-employee';
import { PersonalInfoComponent } from '../../components/personal-info/personal-info';
import { AddressComponent  } from '../../components/address/address';
import { ContactsComponent} from '../../components/contacts/contacts';
import { EmploymentComponent } from '../../components/employment/employment';
import { EmergencyContactsComponent } from '../../components/emergency-contacts/emergency-contacts';
import { EmployeeListPage } from '../employee-list/employee-list';
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

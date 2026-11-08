
import { Routes } from '@angular/router';

import { NewEmployeePage } from './new-employee';

import { PersonalComponent } from '../personal/personal';
import { AddressComponent } from '../address/address';
import { ContactsComponent } from '../contacts/contacts';
import { EmploymentComponent } from '../employment/employment';
import { EmergencyComponent } from '../emergency/emergency';

// ========================================
// Person Matching
// ========================================

import {
  PersonMatchListComponent,
} from '../person-match/person-match-list/person-match-list';

import {
  PersonMatchCompareComponent,
} from '../person-match/person-match-compare/person-match-compare';


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

      // ========================================
      // Personal Information
      // ========================================

      {
        path: 'personal-info',
        component: PersonalComponent,
      },

      // ========================================
      // Address
      // ========================================

      {
        path: 'address',
        component: AddressComponent,
      },

      // ========================================
      // Contacts
      // ========================================

      {
        path: 'contacts',
        component: ContactsComponent,
      },

      // ========================================
      // Emergency Contacts
      // ========================================

      {
        path: 'emergency',
        component: EmergencyComponent,
      },

      // ========================================
      // Employment
      // ========================================

      {
        path: 'employment',
        component: EmploymentComponent,
      },

      // ========================================
      // Person Match List
      // ========================================

      {
        path: 'screening',
        component: PersonMatchListComponent,
      },

      // ========================================
      // Person Match Comparison
      // ========================================

      {
        path: 'screening/compare/:personGuid',
        component: PersonMatchCompareComponent,
      },

    ],
  },
];

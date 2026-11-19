import { Routes } from '@angular/router';

// ========================================
// Main Page
// ========================================

import { NewEmployeePage } from '../presentation/pages/hire-new/hire-new';

// ========================================
// Wizard Components
// ========================================

import { PersonalInfoComponent } from '../presentation/pages/personal-info/personal-info';

import { AddressComponent } from '../presentation/pages/address/address';

import { ContactsComponent } from '../presentation/pages/contacts/contacts';

import { EmergencyComponent } from '../presentation/pages/emergency/emergency';

import { EmploymentComponent } from '../presentation/pages/employment/employment';

// ========================================
// Person Matching Components
// ========================================

import { PersonMatchListComponent } from '../presentation/pages/person-match/person-match-list/person-match-list';

import { PersonMatchCompareComponent } from '../presentation/pages/person-match/person-match-compare/person-match-compare';

// ========================================
// State
// ========================================

import { NewEmployeeStateService } from '../application/state/new-employee-state.service';

// ========================================
// Guards
// ========================================

import { newEmployeePermissionGuard } from '../guards/new-employee-permission.guard';

import { wizardPermissionGuard } from '../guards/wizard-permission.guard';

import { personalInfoValidationGuard } from '../guards/personal-info-validation.guard';

// ========================================
// Permissions
// ========================================

import { EMPLOYEE_PERMISSIONS } from '../../../../core/authorization/permissions/employee-permissions';
import { PersonMatchResolutionComponent } from '../presentation/pages/person-match/person-match-resolution/person-match-resolution';

import { SamePersonComponent } from '../presentation/pages/person-match/person-match-compare/same-person/same-person';

import { SamePersonService } from '../application/services/same-person.service';

// ========================================
// Routes
// ========================================

export const NEW_EMPLOYEE_ROUTES: Routes = [
  {
    path: '',
    component: NewEmployeePage,

    // ======================================
    // Shared Wizard State
    // ======================================

    providers: [NewEmployeeStateService, SamePersonService],

    // ======================================
    // New Employee RBAC
    // ======================================

    canActivate: [newEmployeePermissionGuard],

    children: [
      // ====================================
      // Default Route
      // ====================================

      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'personal-info',
      },

      // ====================================
      // Personal Information
      // ====================================

      {
        path: 'personal-info',
        component: PersonalInfoComponent,

        canActivate: [wizardPermissionGuard],

        data: {
          permission: EMPLOYEE_PERMISSIONS.personalInfo.create,
        },
      },

      // ====================================
      // Address
      // ====================================

      {
        path: 'address',
        component: AddressComponent,

        canActivate: [wizardPermissionGuard, personalInfoValidationGuard],

        data: {
          permission: EMPLOYEE_PERMISSIONS.address.create,
        },
      },

      // ====================================
      // Contacts
      // ====================================

      {
        path: 'contacts',
        component: ContactsComponent,

        canActivate: [wizardPermissionGuard, personalInfoValidationGuard],

        data: {
          permission: EMPLOYEE_PERMISSIONS.contact.create,
        },
      },

      // ====================================
      // Emergency Contacts
      // ====================================

      {
        path: 'emergency-contacts',
        component: EmergencyComponent,

        canActivate: [wizardPermissionGuard, personalInfoValidationGuard],

        data: {
          permission: EMPLOYEE_PERMISSIONS.emergencyContact.create,
        },
      },

      // ====================================
      // Employment
      // ====================================

      {
        path: 'employment',
        component: EmploymentComponent,

        canActivate: [wizardPermissionGuard, personalInfoValidationGuard],

        data: {
          permission: EMPLOYEE_PERMISSIONS.employment.create,
        },
      },

      // ====================================
      // Person Match Screening
      // ====================================

      {
        path: 'screening',
        component: PersonMatchListComponent,
      },

      // ====================================
      // Person Match Comparison
      // ====================================

      {
        path: 'screening/compare/:personGuid',
        component: PersonMatchCompareComponent,
      },

      {
        path: 'screening/resolution/:personGuid',
        component: PersonMatchResolutionComponent,
      },

      // Inside NEW_EMPLOYEE_ROUTES children:

      {
        path: 'screening/compare/:personGuid/same-person',
        component: SamePersonComponent,
      },
    ],
  },
];

import { Routes } from '@angular/router';

// ========================================
// Main Page
// ========================================

import { NewEmployeePage } from './new-employee';

// ========================================
// Wizard Components
// ========================================

import { PersonalComponent } from '../personal/personal';

import { AddressComponent } from '../address/address';

import { ContactsComponent } from '../contacts/contacts';

import { EmergencyComponent } from '../emergency/emergency';

import { EmploymentComponent } from '../employment/employment';

// ========================================
// Person Matching Components
// ========================================

import { PersonMatchListComponent } from '../person-match/person-match-list/person-match-list';

import { PersonMatchCompareComponent } from '../person-match/person-match-compare/person-match-compare';

// ========================================
// State
// ========================================

import { NewEmployeeStateService } from '../../../state/new-employee-state.service';

// ========================================
// Guards
// ========================================

import { newEmployeePermissionGuard } from '../../../guards/new-employee-permission.guard';

import { wizardPermissionGuard } from '../../../guards/wizard-permission.guard';

import { personalInfoValidationGuard } from '../../../guards/personal-info-validation.guard';

// ========================================
// Permissions
// ========================================

import { EMPLOYEE_PERMISSIONS } from '../../../../../core/authorization/permissions/employee-permissions';

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

    providers: [NewEmployeeStateService],

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
        component: PersonalComponent,

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
    ],
  },
];

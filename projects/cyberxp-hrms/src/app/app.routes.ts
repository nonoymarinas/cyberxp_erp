
import { Routes } from '@angular/router';

// ========================================
// Main Layout
// ========================================

import { MainLayout } from './layouts/main-layout/main-layout';

// ========================================
// Pages
// ========================================

import { HomePage } from './features/home/pages/home-page/home-page';
import { SettingsPage } from './features/settings/pages/settings-page/settings-page';
import { DashboardPage } from './features/dashboard/dashboard';

// ========================================
// Guards
// ========================================

import { newEmployeeGuard } from './features/employees/guards/new-employee.guards';

// ========================================
// Application Routes
// ========================================

export const routes: Routes = [

  // ======================================
  // Root
  // ======================================

  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: '',
        component: DashboardPage,
      },
    ],
  },

  // ======================================
  // Main Application
  // ======================================

  {
    path: 'app',
    component: MainLayout,

    children: [

      // ==================================
      // Dashboard
      // ==================================

      {
        path: 'dashboard',
        component: DashboardPage,
      },

      // ==================================
      // Home
      // ==================================

      {
        path: 'home',
        component: HomePage,
      },

      // ==================================
      // Recruitment
      // ==================================

      {
        path: 'recruitment',
        loadChildren: () =>
          import(
            './features/recruitments/recruitment.route'
          ).then((m) => m.RECRUITMENT_ROUTES),
      },

      // ==================================
      // Hire New Employee
      // ==================================

      {
        path: 'hire-new',
        canActivate: [newEmployeeGuard],
        loadChildren: () =>
          import(
            './features/hiring/hire new/routes/hire-new.route'
          ).then((m) => m.NEW_EMPLOYEE_ROUTES),
      },

      // ==================================
      // Employee List
      // ==================================

      {
        path: 'employee-list',
        loadChildren: () =>
          import(
            './features/employees/presentation/pages/employee-list/employee-list.routes'
          ).then((m) => m.NEW_EMPLOYEE_ROUTES),
      },

      // ==================================
      // Rehire Search
      // ==================================

      {
        path: 'rehire-search',
        canActivate: [newEmployeeGuard],
        loadChildren: () =>
          import(
            './features/rehiring/rehire-search/rehire-search.routes'
          ).then((m) => m.REHIRE_SEARCH_ROUTES),
      },

      // ==================================
      // Rehire
      // ==================================

      {
        path: 'rehire',
        canActivate: [newEmployeeGuard],
        loadChildren: () =>
          import(
            './features/rehiring/rehire-main/rehire.routes'
          ).then((m) => m.REHIRE_ROUTES),
      },

      // ==================================
      // Rehire History
      // ==================================

      {
        path: 'rehire-history',
        canActivate: [newEmployeeGuard],
        loadChildren: () =>
          import(
            './features/rehiring/history/rehire-history.routes'
          ).then((m) => m.REHIRE_ROUTES),
      },

      // ==================================
      // Settings
      // ==================================

      {
        path: 'settings',
        component: SettingsPage,
      },

    ],
  },

];

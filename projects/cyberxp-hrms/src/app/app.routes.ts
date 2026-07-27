import { Routes } from '@angular/router';
import { MainLayout } from './layouts/main-layout/main-layout';
import { HomePage } from './features/home/pages/home-page/home-page';
import { SettingsPage } from './features/settings/pages/settings-page/settings-page';
import { DashboardPage } from './features/dashboard/dashboard';
import { NewEmployeePage } from './features/employees/pages/new-employee/new-employee';

export const routes: Routes = [
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
  {
    path: 'app',
    component: MainLayout,
    children: [
      {
        path: 'dashboard',
        component: DashboardPage,
      },
      {
        path: 'home',
        component: HomePage,
      },
      {
        path: 'new-employee',
        loadChildren: () =>
          import('./features/employees/pages/new-employee/new-employee.routes')
            .then(m => m.NEW_EMPLOYEE_ROUTES),
      },
      {
        path: 'employee-list',
        loadChildren: () =>
          import('./features/employees/pages/employee-list/employee-list.routes')
            .then(m => m.NEW_EMPLOYEE_ROUTES),
      },
      {
        path: 'settings',
        component: SettingsPage,
      },
    ],
  },
];

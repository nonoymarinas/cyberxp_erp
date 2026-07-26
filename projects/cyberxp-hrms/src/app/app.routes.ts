import { Routes } from '@angular/router';
import { MainLayout } from './layouts/main-layout/main-layout';
import { HomePage } from './pages/home/home';
import { SettingsPage } from './pages/settings/settings-page/settings-page';
import { DashboardPage } from './pages/dashboard/dashboard';
import { NewEmployeePage } from './pages/employee/new-employee/new-employee';

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
          import('./pages/employee/new-employee/new-employee.routes')
            .then(m => m.NEW_EMPLOYEE_ROUTES),
      },
      {
        path: 'settings',
        component: SettingsPage,
      },
    ],
  },
];

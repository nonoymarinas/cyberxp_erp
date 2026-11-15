import { Routes } from '@angular/router';
import { MainLayout } from './layouts/main-layout/main-layout';
import { HomePage } from './features/home/pages/home-page/home-page';
import { SettingsPage } from './features/settings/pages/settings-page/settings-page';
import { DashboardPage } from './features/dashboard/dashboard';
import { NewEmployeePage } from './features/hiring/hire new/presentations/pages/new-employee/new-employee';
import { newEmployeeGuard } from './features/employees/guards/new-employee.guards';
import { RehirePageComponent } from './features/rehiring/rehire/presentation/pages/rehire-page/rehire-page';
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
        canActivate: [newEmployeeGuard],
        loadChildren: () =>
          import('./features/hiring/hire new/presentations/pages/new-employee/new-employee.routes').then(
            (m) => m.NEW_EMPLOYEE_ROUTES,
          ),
      },
      {
        path: 'employee-list',
        loadChildren: () =>
          import('./features/employees/presentation/pages/employee-list/employee-list.routes').then(
            (m) => m.NEW_EMPLOYEE_ROUTES,
          ),
      },
       {
        path: 'rehire-search',
        canActivate: [newEmployeeGuard],
        loadChildren: () =>
          import('./features/rehiring/search/rehire-search.routes').then(
            (m) => m.REHIRE_SEARCH_ROUTES,
          ),
      },
      {
        path: 'rehire',
        canActivate: [newEmployeeGuard],
        loadChildren: () =>
          import('./features/rehiring/rehire/rehire.routes').then(
            (m) => m.REHIRE_ROUTES,
          ),
      },
       {
        path: 'rehire-history',
        canActivate: [newEmployeeGuard],
        loadChildren: () =>
          import('./features/rehiring/history/rehire-history.routes').then(
            (m) => m.REHIRE_ROUTES,
          ),
      },
      {
        path: 'settings',
        component: SettingsPage,
      },
    ],
  },
];

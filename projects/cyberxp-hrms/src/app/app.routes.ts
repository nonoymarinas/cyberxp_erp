import { Routes } from '@angular/router';
import { MainLayout } from './layouts/main-layout/main-layout';
import { HomePage } from './pages/home/home';
import { SettingsPage } from './pages/settings/settings-page/settings-page';
import { DashboardPage } from './pages/dashboard/dashboard';

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
        path: 'home',
        component: HomePage,
      },
      {
        path: 'dashboard',
        component: DashboardPage,
      },
      {
        path: 'settings',
        component: SettingsPage,
      },
    ],
  },
];

import { Routes } from '@angular/router';
import { AuthLayout } from './layouts/auth-layout/auth-layout';
import { MainLayout } from './layouts/main-layout/main-layout';
import { Login } from './pages/auth/login/login';
import { Home } from './pages/home/home/home';
import { AccountPage } from './pages/accounts/account-page/account-page';
import { AmsSettingsPage } from './pages/settings/settings-page/settings-page';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: '',
        component: AccountPage
      }
    ]
  },
  {
    path: 'app',
    component: MainLayout,
    children: [
      {
        path: '',
        component: AccountPage
      }
    ]
  }
];

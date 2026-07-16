import { Routes } from '@angular/router';
import { AuthLayout } from './layouts/auth-layout/auth-layout';
import { MainLayout } from './layouts/main-layout/main-layout';
import { Login } from './pages/auth/login/login';
import { Home } from './pages/home/home/home';
import { AccountPage } from './pages/accounts/account-page/account-page';

export const routes: Routes = [
  {
    path: '',
    component: AuthLayout,
    children: [
      {
        path: '',
        component: Login
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

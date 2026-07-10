import { Routes } from '@angular/router';
import { AuthLayout } from './layouts/auth-layout/auth-layout';
import { MainLayout } from './layouts/main-layout/main-layout';
import { Login } from './pages/auth/login/login';
import { MainDashboard } from './pages/dashboard/main-dashboard/main-dashboard';

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
        component: MainDashboard
      }
    ]
  }
];

import { Routes } from '@angular/router';
import { AuthLayout } from './layouts/auth-layout/auth-layout';
import { MainLayout } from './layouts/main-layout/main-layout';
import { Login } from './pages/auth/login/login';
import { HomePage } from './pages/home/home/home';
import { AccountPage } from './pages/accounts/account-page/account-page';
import { SettingsPage } from './pages/settings/settings-page/settings-page';
import { TermsOfService } from './pages/legal/terms-of-service/terms-of-service';
import { PrivacyPolicy } from './pages/legal/privacy-policy/privacy-policy';
import { ForgotPassword as ForgotPassword } from './pages/auth/forgot-password/forgot-password';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: '',
        component: HomePage,
      },
      {
        path: 'forgot-password',
        component: ForgotPassword,
      },
       {
        path: 'atms-terms-of-service',
        component: TermsOfService,
      },
      {
        path: 'atms-privacy-policy',
        component: PrivacyPolicy,
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
        path: 'accounts',
        component: AccountPage,
      },
      {
        path: 'settings',
        component: SettingsPage,
      },
    ],
  },
];

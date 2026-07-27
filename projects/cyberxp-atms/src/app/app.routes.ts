import { Routes } from '@angular/router';
import { AuthLayout } from './layouts/auth-layout/auth-layout';
import { MainLayout } from './layouts/main-layout/main-layout';
import { Login } from './features/authentication/pages/login/login';
import { HomePage } from './features/home/home';
import { AccountPage } from './features/accounts/pages/account-page/account-page';
import { SettingsPage } from './features/settings-page/settings-page';
import { TermsOfService } from './components/legal/terms-of-service/terms-of-service';
import { PrivacyPolicy } from './components/legal/privacy-policy/privacy-policy';
import { ForgotPassword as ForgotPassword } from './features/authentication/pages/forgot-password/forgot-password';

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

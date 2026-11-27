import {
  EnvironmentProviders,
  inject,
  makeEnvironmentProviders,
  provideAppInitializer,
} from '@angular/core';

import {
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';

// ========================================
// Configuration
// ========================================

import {
  IamConfig,
} from './iam-config.model';

import {
  IAM_CONFIG,
} from './iam-config.token';

// ========================================
// Authentication Interceptors
// ========================================

import {
  authenticationInterceptor,
} from '../authentication/interceptors/authentication.interceptor';

// ========================================
// Authentication Services
// ========================================

import {
  AuthenticationInitializerService,
} from '../authentication/services/authentication-initializer.service';

// ========================================
// IAM Provider
// ========================================

export function provideIam(
  config: IamConfig
): EnvironmentProviders {

  return makeEnvironmentProviders([

    // ====================================
    // IAM Configuration
    // ====================================

    {
      provide: IAM_CONFIG,

      useValue: Object.freeze({
        ...config,
      }),
    },

    // ====================================
    // HTTP Client Configuration
    // ====================================

    provideHttpClient(

      withInterceptors([
        authenticationInterceptor,
      ])
    ),

    // ====================================
    // Authentication Initialization
    // ====================================

    provideAppInitializer(() => {

      const initializer =
        inject(
          AuthenticationInitializerService
        );

      return initializer.initialize();
    }),
  ]);
}
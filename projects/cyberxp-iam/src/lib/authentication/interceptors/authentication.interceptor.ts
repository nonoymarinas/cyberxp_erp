import {
  inject,
} from '@angular/core';

import {
  HttpInterceptorFn,
} from '@angular/common/http';

// ========================================
// Configuration
// ========================================

import {
  IAM_CONFIG,
} from '../../configuration/iam-config.token';

// ========================================
// Authentication Interceptor
// ========================================

export const authenticationInterceptor: HttpInterceptorFn =
  (request, next) => {

    // ====================================
    // Dependencies
    // ====================================

    const config = inject(IAM_CONFIG);

    // ====================================
    // Validate API Destination
    // ====================================

    const apiBaseUrl = new URL(
      config.apiBaseUrl,
      document.baseURI
    );

    const requestUrl = new URL(
      request.url,
      document.baseURI
    );

    const apiBasePath =
      apiBaseUrl.pathname.replace(/\/+$/, '');

    const isCyberXpApiRequest =
      requestUrl.origin === apiBaseUrl.origin &&
      (
        requestUrl.pathname === apiBasePath ||
        requestUrl.pathname.startsWith(
          `${apiBasePath}/`
        )
      );

    if (!isCyberXpApiRequest) {

      return next(request);
    }

    // ====================================
    // Determine HTTP Request Method
    // ====================================

    const method =
      request.method.toUpperCase();

    const isSafeMethod =
      method === 'GET' ||
      method === 'HEAD' ||
      method === 'OPTIONS';

    // ====================================
    // Prepare Browser Authentication
    // ====================================

    let headers = request.headers;

    // ====================================
    // Attach CSRF Protection Header
    // ====================================

    if (!isSafeMethod) {

      headers = headers.set(
        config.csrfHeaderName,
        config.csrfHeaderValue
      );
    }

    // ====================================
    // Clone Authenticated Request
    // ====================================

    const authenticatedRequest =
      request.clone({

        headers,

        withCredentials: true,
      });

    // ====================================
    // Forward Request
    // ====================================

    return next(authenticatedRequest);
  };
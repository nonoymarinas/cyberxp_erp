
import {
  inject,
} from '@angular/core';

import {
  CanActivateFn,
  Router,
} from '@angular/router';

// ========================================
// State
// ========================================

import {
  NewEmployeeStateService,
} from '../application/state/new-employee-state.service';

// ========================================
// Personal Information Validation Guard
// ========================================

export const personalInfoValidationGuard: CanActivateFn = () => {

  // ========================================
  // Dependencies
  // ========================================

  const router =
    inject(Router);

  const newEmployeeState =
    inject(NewEmployeeStateService);

  // ========================================
  // Check Personal Information Validity
  // ========================================

  const isValid =
    newEmployeeState.isValid('personal-info');

  // ========================================
  // Check Personal Information Verification
  // ========================================

  const isVerified =
    newEmployeeState.isVerified('personal-info');

  // ========================================
  // Check Screening Session
  // ========================================

  const screeningId =
    newEmployeeState.screeningId();

  // ========================================
  // Check Screening Status
  // ========================================

  const isScreeningClear =
    newEmployeeState.isScreeningClear();

  // ========================================
  // Allow Navigation
  // ========================================

  if (
    isValid &&
    isVerified &&
    !!screeningId &&
    isScreeningClear
  ) {
    return true;
  }

  // ========================================
  // Redirect to Personal Information
  // ========================================

  return router.createUrlTree([
    '/app',
    'new-employee',
    'personal-info',
  ]);
};

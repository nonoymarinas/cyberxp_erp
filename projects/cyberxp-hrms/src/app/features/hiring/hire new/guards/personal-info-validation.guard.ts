
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
  // Personal Information Validation
  // ========================================

  const isValid =
    newEmployeeState.isValid('personal-info');

  const isVerified =
    newEmployeeState.isVerified('personal-info');

  // ========================================
  // Persisted Screening Session Clearance
  // ========================================

  const screeningId =
    newEmployeeState.screeningId();

  const isScreeningClear =
    newEmployeeState.isScreeningClear();

  const hasSessionClearance =
    isValid &&
    isVerified &&
    !!screeningId &&
    isScreeningClear;

  // ========================================
  // Successful Zero-Match Local Clearance
  // ========================================

  const hasZeroMatchClearance =
    newEmployeeState.isZeroMatchCleared();

  // ========================================
  // Allow Navigation
  // ========================================

  if (
    hasSessionClearance ||
    hasZeroMatchClearance
  ) {
    return true;
  }

  // ========================================
  // Diagnostic Logging
  // ========================================

  console.warn(
    '[HireNew] Personal information validation blocked',
    {
      isValid,
      isVerified,
      hasScreeningId: !!screeningId,
      isScreeningClear,
      hasZeroMatchClearance,
    }
  );

  // ========================================
  // Redirect To Personal Information
  // ========================================

  return router.createUrlTree([
    '/app',
    'hire-new',
    'personal-info',
  ]);
};

import { Injectable, signal } from '@angular/core';

import { NewEmployeeStep } from '../../models/general/new-employee-step.model';

@Injectable()
export class NewEmployeeStateService {

  // ========================================
  // Valid Steps
  // ========================================

  private readonly _validSteps =
    signal<Set<NewEmployeeStep>>(new Set());

  readonly validSteps =
    this._validSteps.asReadonly();


  // ========================================
  // Verified Steps
  // ========================================

  private readonly _verifiedSteps =
    signal<Set<NewEmployeeStep>>(new Set());

  readonly verifiedSteps =
    this._verifiedSteps.asReadonly();


  // ========================================
  // Set Step Validity
  // ========================================

  setValid(
    step: NewEmployeeStep,
    valid: boolean,
  ): void {

    this._validSteps.update(current => {
      const updated = new Set(current);

      if (valid) {
        updated.add(step);
      } else {
        updated.delete(step);

        // If the step becomes invalid,
        // it can no longer be considered verified.
        this.setVerified(step, false);
      }

      return updated;
    });
  }


  // ========================================
  // Check Step Validity
  // ========================================

  isValid(
    step: NewEmployeeStep,
  ): boolean {

    return this._validSteps().has(step);
  }


  // ========================================
  // Set Step Verification
  // ========================================

  setVerified(
    step: NewEmployeeStep,
    verified: boolean,
  ): void {

    this._verifiedSteps.update(current => {
      const updated = new Set(current);

      if (verified) {
        updated.add(step);
      } else {
        updated.delete(step);
      }

      return updated;
    });
  }


  // ========================================
  // Check Step Verification
  // ========================================

  isVerified(
    step: NewEmployeeStep,
  ): boolean {

    return this._verifiedSteps().has(step);
  }


  // ========================================
  // Reset New Employee Workflow
  // ========================================

  reset(): void {

    this._validSteps.set(new Set());

    this._verifiedSteps.set(new Set());
  }
}
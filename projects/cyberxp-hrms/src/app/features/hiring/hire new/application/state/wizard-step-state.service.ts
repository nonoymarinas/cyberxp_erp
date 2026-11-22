
import {
  Injectable,
  signal,
  computed,
} from '@angular/core';

// ========================================
// Models
// ========================================

import type {
  NewEmployeeStep,
} from '../../domain/models/complete-steps/new-employee-step.model';

// ========================================
// Wizard Step State Service
// ========================================

@Injectable()
export class WizardStepStateService {

  // ========================================
  // Step Validation State
  // ========================================

  private readonly _validSteps =
    signal<ReadonlySet<NewEmployeeStep>>(
      new Set<NewEmployeeStep>()
    );

  readonly validSteps =
    this._validSteps.asReadonly();

  // ========================================
  // Step Verification State
  // ========================================

  private readonly _verifiedSteps =
    signal<ReadonlySet<NewEmployeeStep>>(
      new Set<NewEmployeeStep>()
    );

  readonly verifiedSteps =
    this._verifiedSteps.asReadonly();

  // ========================================
  // Computed State
  // ========================================

  readonly hasValidSteps = computed(
    () => this._validSteps().size > 0
  );

  readonly hasVerifiedSteps = computed(
    () => this._verifiedSteps().size > 0
  );

  readonly totalValidSteps = computed(
    () => this._validSteps().size
  );

  readonly totalVerifiedSteps = computed(
    () => this._verifiedSteps().size
  );

  // ========================================
  // Set Step Validation
  // ========================================

  setValid(
    step: NewEmployeeStep,
    valid: boolean
  ): void {

    this._validSteps.update(current => {

      const updated =
        new Set<NewEmployeeStep>(current);

      if (valid) {

        updated.add(step);

      } else {

        updated.delete(step);
      }

      return updated;
    });

    // ======================================
    // Invalid Steps Cannot Remain Verified
    // ======================================

    if (!valid) {

      this.setVerified(step, false);
    }
  }

  // ========================================
  // Check Step Validation
  // ========================================

  isValid(
    step: NewEmployeeStep
  ): boolean {

    return this._validSteps().has(step);
  }

  // ========================================
  // Set Step Verification
  // ========================================

  setVerified(
    step: NewEmployeeStep,
    verified: boolean
  ): void {

    // ======================================
    // Prevent Verification Of Invalid Step
    // ======================================

    if (
      verified &&
      !this.isValid(step)
    ) {

      throw new Error(
        `Cannot verify an invalid wizard step: ${step}`
      );
    }

    this._verifiedSteps.update(current => {

      const updated =
        new Set<NewEmployeeStep>(current);

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
    step: NewEmployeeStep
  ): boolean {

    return this._verifiedSteps().has(step);
  }

  // ========================================
  // Invalidate Step
  // ========================================

  invalidateStep(
    step: NewEmployeeStep
  ): void {

    this.setVerified(step, false);
  }

  // ========================================
  // Clear Step Validation
  // ========================================

  clearValidSteps(): void {

    this._validSteps.set(
      new Set<NewEmployeeStep>()
    );

    this._verifiedSteps.set(
      new Set<NewEmployeeStep>()
    );
  }

  // ========================================
  // Clear Step Verification
  // ========================================

  clearVerifiedSteps(): void {

    this._verifiedSteps.set(
      new Set<NewEmployeeStep>()
    );
  }

  // ========================================
  // Reset Wizard Step State
  // ========================================

  reset(): void {

    this._validSteps.set(
      new Set<NewEmployeeStep>()
    );

    this._verifiedSteps.set(
      new Set<NewEmployeeStep>()
    );
  }
}


import {
  Injectable,
  signal,
} from '@angular/core';

import {
  NewEmployeeStep,
} from '../models/general/new-employee-step.model';

import {
  PersonalInfo,
} from '../models/personal-info/personal-info.model';


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
  // Personal Information Draft
  // ========================================

  private readonly _personalDraft =
    signal<PersonalInfo | null>(null);

  readonly personalDraft =
    this._personalDraft.asReadonly();


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
      }

      return updated;
    });

    // Invalid steps cannot remain verified.
    if (!valid) {
      this.setVerified(step, false);
    }
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

    // Prevent verification of invalid steps.
    if (verified && !this.isValid(step)) {
      return;
    }

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
  // Set Personal Draft
  // ========================================

  setPersonalDraft(
    data: PersonalInfo,
  ): void {

    const previous = this._personalDraft();

    const identifyingDataChanged =
      previous !== null &&
      (
        previous.firstName !== data.firstName ||
        previous.middleName !== data.middleName ||
        previous.lastName !== data.lastName ||
        previous.suffixId !== data.suffixId ||
        previous.dateOfBirth !== data.dateOfBirth
      );

    this._personalDraft.set({ ...data });

    // Screening is no longer valid if
    // identifying information changes.
    if (identifyingDataChanged) {
      this.setVerified('personal-info', false);
    }
  }


  // ========================================
  // Clear Personal Draft
  // ========================================

  clearPersonalDraft(): void {

    this._personalDraft.set(null);

    this.setVerified('personal-info', false);
  }


  // ========================================
  // Reset New Employee Workflow
  // ========================================

  reset(): void {

    this._validSteps.set(new Set());

    this._verifiedSteps.set(new Set());

    this._personalDraft.set(null);
  }
}

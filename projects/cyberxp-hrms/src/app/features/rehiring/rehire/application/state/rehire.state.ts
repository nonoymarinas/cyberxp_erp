
import {
  Injectable,
  computed,
  signal,
} from '@angular/core';

import type {
  RehireEmployee,
} from '../../domain/models/rehire-employee.model';

import type {
  RehireEligibilityResultData,
} from '../../domain/models/rehire-eligibility-result.model';

import type {
  RehireRequest,
} from '../../domain/models/rehire-request.model';

import type {
  RehireResult,
} from '../../domain/models/rehire-result.model';

/* ========================================
   Rehire Wizard Types
   ======================================== */

export type RehireStepId =
  | 'eligibility'
  | 'profile'
  | 'employment'
  | 'review';

export interface RehireStep {
  id: RehireStepId;
  label: string;
}

/* ========================================
   Rehire Employment Form
   ======================================== */

export interface RehireEmploymentForm {
  departmentId: string | null;
  positionId: string | null;
  workLocationId: string | null;
  employmentType: string | null;
  startDate: string;
  justification: string;
}

/* ========================================
   Default Employment Form
   ======================================== */

function createDefaultEmploymentForm(): RehireEmploymentForm {
  return {
    departmentId: null,
    positionId: null,
    workLocationId: null,
    employmentType: null,
    startDate: '',
    justification: '',
  };
}

/* ========================================
   Rehire State
   ======================================== */

@Injectable()
export class RehireState {

  // ======================================
  // Wizard Steps
  // ======================================

  readonly steps: readonly RehireStep[] = [
    {
      id: 'eligibility',
      label: 'Eligibility',
    },
    {
      id: 'profile',
      label: 'Profile Review',
    },
    {
      id: 'employment',
      label: 'Employment',
    },
    {
      id: 'review',
      label: 'Review',
    },
  ];

  // ======================================
  // Private Writable Signals
  // ======================================

  private readonly _personGuid =
    signal<string | null>(null);

  private readonly _employee =
    signal<RehireEmployee | null>(null);

  private readonly _eligibility =
    signal<RehireEligibilityResultData | null>(null);

  private readonly _employmentForm =
    signal<RehireEmploymentForm>(
      createDefaultEmploymentForm()
    );

  private readonly _currentStepIndex =
    signal(0);

  private readonly _profileVerified =
    signal(false);

  private readonly _loading =
    signal(false);

  private readonly _verifying =
    signal(false);

  private readonly _submitting =
    signal(false);

  private readonly _error =
    signal<string | null>(null);

  private readonly _submissionResult =
    signal<RehireResult | null>(null);

  // ======================================
  // Public Readonly Signals
  // ======================================

  readonly personGuid =
    this._personGuid.asReadonly();

  readonly employee =
    this._employee.asReadonly();

  readonly eligibility =
    this._eligibility.asReadonly();

  readonly employmentForm =
    this._employmentForm.asReadonly();

  readonly currentStepIndex =
    this._currentStepIndex.asReadonly();

  readonly profileVerified =
    this._profileVerified.asReadonly();

  readonly loading =
    this._loading.asReadonly();

  readonly verifying =
    this._verifying.asReadonly();

  readonly submitting =
    this._submitting.asReadonly();

  readonly error =
    this._error.asReadonly();

  readonly submissionResult =
    this._submissionResult.asReadonly();

  // ======================================
  // Computed Employee State
  // ======================================

  readonly employeeFound = computed(
    () => this._employee() !== null
  );

  readonly fullName = computed(
    () => this._employee()?.fullName ?? ''
  );

  readonly previousEmploymentGuid = computed(
    () => this._eligibility()?.employmentGuid ?? null
  );

  // ======================================
  // Computed Eligibility
  // ======================================

  readonly eligibilityStatus = computed(
    () => this._eligibility()?.eligibilityStatus ?? null
  );

  readonly canProceed = computed(
    () =>
      this._eligibility()?.canProceed === true
  );

  readonly isBlocklisted = computed(
    () =>
      this._eligibility()?.isBlocklisted === true
  );

  // ======================================
  // Computed Wizard State
  // ======================================

  readonly currentStep = computed<RehireStepId>(
    () => this.steps[this._currentStepIndex()].id
  );

  readonly isFirstStep = computed(
    () => this._currentStepIndex() === 0
  );

  readonly isLastStep = computed(
    () =>
      this._currentStepIndex() ===
      this.steps.length - 1
  );

  readonly busy = computed(
    () =>
      this._loading() ||
      this._verifying() ||
      this._submitting()
  );

  // ======================================
  // Employment Form Validation
  // ======================================

  readonly employmentValid = computed(() => {
    const form = this._employmentForm();

    return (
      !!form.departmentId &&
      !!form.positionId &&
      !!form.workLocationId &&
      !!form.employmentType &&
      form.startDate.trim().length > 0 &&
      form.justification.trim().length >= 10
    );
  });

  // ======================================
  // Computed Submission State
  // ======================================

  readonly submitted = computed(
    () => this._submissionResult() !== null
  );

  readonly canSubmit = computed(() => {
    return (
      !this.busy() &&
      !this.submitted() &&
      this.employeeFound() &&
      this.canProceed() &&
      !this.isBlocklisted() &&
      this._profileVerified() &&
      this.employmentValid() &&
      !!this.previousEmploymentGuid()
    );
  });

  // ======================================
  // Set Selected Person
  // ======================================

  setPersonGuid(personGuid: string | null): void {
    this._personGuid.set(personGuid);
  }

  // ======================================
  // Set Employee
  // ======================================

  setEmployee(employee: RehireEmployee | null): void {
    this._employee.set(employee);
  }

  // ======================================
  // Set Eligibility
  // ======================================

  setEligibility(
    eligibility: RehireEligibilityResultData | null
  ): void {
    this._eligibility.set(eligibility);
  }

  // ======================================
  // Set Profile Verification
  // ======================================

  setProfileVerified(verified: boolean): void {
    this._profileVerified.set(verified);
  }

  // ======================================
  // Update Employment Form
  // ======================================

  updateEmploymentForm(
    changes: Partial<RehireEmploymentForm>
  ): void {

    this._employmentForm.update(current => ({
      ...current,
      ...changes,
    }));
  }

  // ======================================
  // Set Wizard Step
  // ======================================

  setCurrentStepIndex(index: number): void {

    if (
      !Number.isInteger(index) ||
      index < 0 ||
      index >= this.steps.length
    ) {
      return;
    }

    this._currentStepIndex.set(index);
  }

  // ======================================
  // Loading State
  // ======================================

  setLoading(value: boolean): void {
    this._loading.set(value);
  }

  setVerifying(value: boolean): void {
    this._verifying.set(value);
  }

  setSubmitting(value: boolean): void {
    this._submitting.set(value);
  }

  // ======================================
  // Error State
  // ======================================

  setError(message: string | null): void {
    this._error.set(message);
  }

  // ======================================
  // Submission Result
  // ======================================

  setSubmissionResult(
    result: RehireResult | null
  ): void {
    this._submissionResult.set(result);
  }

  // ======================================
  // Build Rehire Request
  // ======================================

  buildRequest(): RehireRequest | null {

    const personGuid = this._personGuid();
    const previousEmploymentGuid =
      this.previousEmploymentGuid();

    if (
      !personGuid ||
      !previousEmploymentGuid ||
      !this.canSubmit()
    ) {
      return null;
    }

    const form = this._employmentForm();

    return {
      personGuid,
      previousEmploymentGuid,

      departmentId: form.departmentId!,
      positionId: form.positionId!,
      workLocationId: form.workLocationId!,

      employmentType: form.employmentType!,
      startDate: form.startDate,

      profileVerified: this._profileVerified(),
      justification: form.justification.trim(),
    };
  }

  // ======================================
  // Reset State
  // ======================================

  reset(): void {

    this._personGuid.set(null);
    this._employee.set(null);
    this._eligibility.set(null);

    this._employmentForm.set(
      createDefaultEmploymentForm()
    );

    this._currentStepIndex.set(0);
    this._profileVerified.set(false);

    this._loading.set(false);
    this._verifying.set(false);
    this._submitting.set(false);

    this._error.set(null);
    this._submissionResult.set(null);
  }
}

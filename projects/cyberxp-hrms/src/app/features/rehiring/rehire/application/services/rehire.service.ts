
import {
  DestroyRef,
  Injectable,
  inject,
} from '@angular/core';

import {
  Subscription,
  forkJoin,
} from 'rxjs';

// ========================================
// Application State
// ========================================

import {
  RehireState,
} from '../state/rehire.state';

import type {
  RehireEmploymentForm,
} from '../state/rehire.state';

// ========================================
// Infrastructure Data Access
// ========================================

import {
  RehireDataAccess,
} from '../../infrastructure/data-access/rehire.data-access';

/* ========================================
   Rehire Service
   ======================================== */

@Injectable()
export class RehireService {

  // ======================================
  // Dependencies
  // ======================================

  private readonly dataAccess =
    inject(RehireDataAccess);

  private readonly state =
    inject(RehireState);

  private readonly destroyRef =
    inject(DestroyRef);

  // ======================================
  // Active Operations
  // ======================================

  private activeLoad: Subscription | null = null;

  private activeSubmission: Subscription | null = null;

  private loadVersion = 0;

  private submissionVersion = 0;

  // ======================================
  // Public Readonly State
  // ======================================

  readonly steps = this.state.steps;

  // ======================================
  // Selected Employee
  // ======================================

  readonly personGuid = this.state.personGuid;

  readonly employee = this.state.employee;

  readonly employeeFound =
    this.state.employeeFound;

  readonly fullName = this.state.fullName;

  readonly previousEmploymentGuid =
    this.state.previousEmploymentGuid;

  // ======================================
  // Eligibility
  // ======================================

  readonly eligibility = this.state.eligibility;

  readonly eligibilityStatus =
    this.state.eligibilityStatus;

  readonly canProceed = this.state.canProceed;

  readonly isBlocklisted =
    this.state.isBlocklisted;

  // ======================================
  // Profile Verification
  // ======================================

  readonly profileVerified =
    this.state.profileVerified;

  // ======================================
  // Employment Form
  // ======================================

  readonly employmentForm =
    this.state.employmentForm;

  readonly employmentValid =
    this.state.employmentValid;

  // ======================================
  // Wizard Navigation
  // ======================================

  readonly currentStepIndex =
    this.state.currentStepIndex;

  readonly currentStep =
    this.state.currentStep;

  readonly isFirstStep =
    this.state.isFirstStep;

  readonly isLastStep =
    this.state.isLastStep;

  // ======================================
  // Loading And Errors
  // ======================================

  readonly loading = this.state.loading;

  readonly verifying = this.state.verifying;

  readonly submitting = this.state.submitting;

  readonly busy = this.state.busy;

  readonly error = this.state.error;

  // ======================================
  // Submission
  // ======================================

  readonly submitted = this.state.submitted;

  readonly submissionResult =
    this.state.submissionResult;

  readonly canSubmit = this.state.canSubmit;

  // ======================================
  // Constructor
  // ======================================

  constructor() {

    this.destroyRef.onDestroy(() => {
      this.cancelActiveLoad();
      this.cancelActiveSubmission();
    });
  }

  // ======================================
  // Load Selected Employee
  // ======================================

  loadEmployee(personGuid: string): void {

    // ====================================
    // Cancel Previous Operations
    // ====================================

    this.cancelActiveLoad();
    this.cancelActiveSubmission();

    // ====================================
    // Reset State
    // ====================================

    this.state.reset();

    const normalizedGuid =
      personGuid?.trim() ?? '';

    if (!normalizedGuid) {
      this.state.setError(
        'Person GUID is required.'
      );
      return;
    }

    this.state.setPersonGuid(normalizedGuid);

    const version = ++this.loadVersion;

    this.state.setLoading(true);
    this.state.setVerifying(true);
    this.state.setError(null);

    // ====================================
    // Load Employee And Eligibility
    // ====================================

    this.activeLoad = forkJoin({
      employee: this.dataAccess.getEmployee(
        normalizedGuid
      ),
      eligibility: this.dataAccess.checkEligibility(
        normalizedGuid
      ),
    }).subscribe({

      next: ({ employee, eligibility }) => {

        if (version !== this.loadVersion) {
          return;
        }

        // ==================================
        // Validate Response Identity
        // ==================================

        if (
          employee.data.employee.personGuid !==
            normalizedGuid ||
          eligibility.data.personGuid !==
            normalizedGuid
        ) {
          this.state.setEmployee(null);
          this.state.setEligibility(null);

          this.state.setError(
            'Employee identity mismatch.'
          );

          return;
        }

        // ==================================
        // Update State
        // ==================================

        this.state.setEmployee(
          employee.data.employee
        );

        this.state.setEligibility(
          eligibility.data
        );

        this.state.setError(null);
      },

      error: error => {

        if (version !== this.loadVersion) {
          return;
        }

        // ==================================
        // Fail Closed
        // ==================================

        this.state.setEmployee(null);
        this.state.setEligibility(null);

        this.state.setError(
          this.getErrorMessage(error)
        );

        // ==================================
        // Reset Loading Flags
        // ==================================

        this.state.setLoading(false);
        this.state.setVerifying(false);
      },

      complete: () => {

        if (version !== this.loadVersion) {
          return;
        }

        this.state.setLoading(false);
        this.state.setVerifying(false);
      },
    });
  }

  // ======================================
  // Recheck Rehire Eligibility
  // ======================================

  verifyEligibility(): void {

    const personGuid =
      this.state.personGuid();

    if (
      !personGuid ||
      !this.state.employeeFound() ||
      this.state.busy() ||
      this.state.submitted()
    ) {
      return;
    }

    // ====================================
    // Cancel Previous Verification
    // ====================================

    this.cancelActiveLoad();

    const version = ++this.loadVersion;

    // ====================================
    // Invalidate Previous Eligibility
    // ====================================

    this.state.setEligibility(null);

    this.state.setVerifying(true);
    this.state.setError(null);

    // ====================================
    // Call Data Access
    // ====================================

    this.activeLoad = this.dataAccess
      .checkEligibility(personGuid)
      .subscribe({

        next: result => {

          if (version !== this.loadVersion) {
            return;
          }

          // ==================================
          // Validate Response Identity
          // ==================================

          if (
            result.data.personGuid !== personGuid
          ) {
            this.state.setEligibility(null);

            this.state.setError(
              'Eligibility response does not match the selected employee.'
            );

            return;
          }

          // ==================================
          // Update Eligibility
          // ==================================

          this.state.setEligibility(
            result.data
          );

          this.state.setError(null);
        },

        error: error => {

          if (version !== this.loadVersion) {
            return;
          }

          // ==================================
          // Failed Verification
          // ==================================

          this.state.setEligibility(null);

          this.state.setError(
            this.getErrorMessage(error)
          );

          this.state.setVerifying(false);
        },

        complete: () => {

          if (version !== this.loadVersion) {
            return;
          }

          this.state.setVerifying(false);
        },
      });
  }

  // ======================================
  // Profile Verification
  // ======================================

  setProfileVerified(
    verified: boolean
  ): void {

    if (
      this.state.busy() ||
      this.state.submitted() ||
      !this.state.employeeFound()
    ) {
      return;
    }

    this.state.setProfileVerified(
      verified
    );
  }

  // ======================================
  // Update Employment Form
  // ======================================

  updateEmploymentForm(
    changes: Partial<RehireEmploymentForm>
  ): void {

    if (
      this.state.busy() ||
      this.state.submitted() ||
      !this.state.employeeFound()
    ) {
      return;
    }

    this.state.updateEmploymentForm(
      changes
    );
  }

  // ======================================
  // Previous Wizard Step
  // ======================================

  previous(): void {

    if (
      this.state.busy() ||
      this.state.submitted() ||
      this.state.isFirstStep()
    ) {
      return;
    }

    this.state.setCurrentStepIndex(
      this.state.currentStepIndex() - 1
    );
  }

  // ======================================
  // Next Wizard Step
  // ======================================

  next(): void {

    if (
      this.state.busy() ||
      this.state.submitted() ||
      !this.state.employeeFound() ||
      this.state.isLastStep()
    ) {
      return;
    }

    const currentStep =
      this.state.currentStep();

    // ====================================
    // Eligibility Validation
    // ====================================

    if (
      currentStep === 'eligibility' &&
      !this.state.canProceed()
    ) {
      this.state.setError(
        'Employee is not cleared to proceed with rehire.'
      );
      return;
    }

    // ====================================
    // Profile Validation
    // ====================================

    if (
      currentStep === 'profile' &&
      !this.state.profileVerified()
    ) {
      this.state.setError(
        'Employee profile must be verified.'
      );
      return;
    }

    // ====================================
    // Employment Validation
    // ====================================

    if (
      currentStep === 'employment' &&
      !this.state.employmentValid()
    ) {
      this.state.setError(
        'Complete all required employment details.'
      );
      return;
    }

    // ====================================
    // Proceed To Next Step
    // ====================================

    this.state.setError(null);

    this.state.setCurrentStepIndex(
      this.state.currentStepIndex() + 1
    );
  }

  // ======================================
  // Navigate To Wizard Step
  // ======================================

  goToStep(index: number): void {

    if (
      this.state.busy() ||
      this.state.submitted() ||
      !this.state.employeeFound()
    ) {
      return;
    }

    if (
      !Number.isInteger(index) ||
      index < 0 ||
      index >= this.state.steps.length
    ) {
      return;
    }

    const currentIndex =
      this.state.currentStepIndex();

    // ====================================
    // Allow Backward Navigation
    // ====================================

    if (index <= currentIndex) {
      this.state.setCurrentStepIndex(index);
      this.state.setError(null);
      return;
    }

    // ====================================
    // Validate Eligibility
    // ====================================

    if (!this.state.canProceed()) {
      this.state.setError(
        'Employee is not cleared to proceed with rehire.'
      );
      return;
    }

    // ====================================
    // Validate Profile Verification
    // ====================================

    if (
      index > 1 &&
      !this.state.profileVerified()
    ) {
      this.state.setError(
        'Employee profile must be verified.'
      );
      return;
    }

    // ====================================
    // Validate Employment Form
    // ====================================

    if (
      index > 2 &&
      !this.state.employmentValid()
    ) {
      this.state.setError(
        'Complete all required employment details.'
      );
      return;
    }

    // ====================================
    // Navigate
    // ====================================

    this.state.setError(null);
    this.state.setCurrentStepIndex(index);
  }

  // ======================================
  // Submit Rehire Request
  // ======================================

  submitRequest(): void {

    if (
      this.state.busy() ||
      this.state.submitted() ||
      !this.state.isLastStep() ||
      !this.state.canSubmit()
    ) {
      return;
    }

    // ====================================
    // Build Request
    // ====================================

    const request =
      this.state.buildRequest();

    if (!request) {
      this.state.setError(
        'Rehire request is incomplete.'
      );
      return;
    }

    // ====================================
    // Cancel Previous Submission
    // ====================================

    this.cancelActiveSubmission();

    const version =
      ++this.submissionVersion;

    this.state.setSubmitting(true);
    this.state.setError(null);

    // ====================================
    // Submit Through Data Access
    // ====================================

    this.activeSubmission = this.dataAccess
      .submit(request)
      .subscribe({

        next: result => {

          if (
            version !== this.submissionVersion
          ) {
            return;
          }

          // ==================================
          // Validate Submission Identity
          // ==================================

          if (
            result.data.personGuid !==
              request.personGuid ||
            result.data.previousEmploymentGuid !==
              request.previousEmploymentGuid
          ) {
            this.state.setError(
              'Rehire submission response identity mismatch.'
            );

            return;
          }

          // ==================================
          // Store Submission Result
          // ==================================

          this.state.setSubmissionResult(
            result
          );

          this.state.setError(null);
        },

        error: error => {

          if (
            version !== this.submissionVersion
          ) {
            return;
          }

          this.state.setError(
            this.getErrorMessage(error)
          );

          this.state.setSubmitting(false);
        },

        complete: () => {

          if (
            version !== this.submissionVersion
          ) {
            return;
          }

          this.state.setSubmitting(false);
        },
      });
  }

  // ======================================
  // Reset Rehire Wizard
  // ======================================

  reset(): void {

    const personGuid =
      this.state.personGuid();

    // ====================================
    // Cancel Active Operations
    // ====================================

    this.cancelActiveLoad();
    this.cancelActiveSubmission();

    // ====================================
    // Reset State
    // ====================================

    this.state.reset();

    // ====================================
    // Reload Selected Employee
    // ====================================

    if (personGuid) {
      this.loadEmployee(personGuid);
    }
  }

  // ======================================
  // Cancel Active Load
  // ======================================

  private cancelActiveLoad(): void {

    this.loadVersion++;

    this.activeLoad?.unsubscribe();
    this.activeLoad = null;
  }

  // ======================================
  // Cancel Active Submission
  // ======================================

  private cancelActiveSubmission(): void {

    this.submissionVersion++;

    this.activeSubmission?.unsubscribe();
    this.activeSubmission = null;
  }

  // ======================================
  // Extract Error Message
  // ======================================

  private getErrorMessage(
    error: unknown
  ): string {

    if (
      error instanceof Error &&
      error.message
    ) {
      return error.message;
    }

    return 'An unexpected rehire operation error occurred.';
  }
}

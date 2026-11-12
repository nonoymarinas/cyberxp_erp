import { Component, inject } from '@angular/core';

import { Router, RouterOutlet } from '@angular/router';

import { finalize, take } from 'rxjs';

import { CxpIconChevronApp, CxpMenuPageItem, CxpButton, CxpActionAlertButton } from 'cyberxp-ui';

// ========================================
// Authorization
// ========================================

import { UserAccessService } from '../../../../../core/authorization/services/user-access.services';

import { EMPLOYEE_PERMISSIONS } from '../../../../../core/authorization/permissions/employee-permissions';

// ========================================
// State
// ========================================

import { NewEmployeeStateService } from '../../../state/new-employee-state.service';

// ========================================
// Business Services
// ========================================

import { PersonMatchService } from '../../../business/services/person-match.services';

// ========================================
// Models
// ========================================

import { NewEmployeeStep } from '../../../models/new-employee/new-employee-step.model';

import { PersonMatchSearchRequest } from '../../../models/personal-info/person-match-request.model';

// ========================================
// Component
// ========================================

@Component({
  selector: 'cxp-new-employee',
  standalone: true,

  imports: [CxpMenuPageItem, RouterOutlet, CxpIconChevronApp, CxpButton, CxpActionAlertButton],

  templateUrl: './new-employee.html',
  styleUrl: './new-employee.css',
})
export class NewEmployeePage {
  // ========================================
  // Dependencies
  // ========================================

  private readonly userAccessService = inject(UserAccessService);

  private readonly router = inject(Router);

  private readonly personMatchService = inject(PersonMatchService);

  readonly newEmployeeState = inject(NewEmployeeStateService);

  // ========================================
  // Status
  // ========================================

  errorMessage = '';

  readonly hasPossibleMatch = this.newEmployeeState.hasPossibleMatch;

  readonly isChecking = this.newEmployeeState.isPersonMatchChecking;

  // ========================================
  // Permissions
  // ========================================

  readonly permissions = EMPLOYEE_PERMISSIONS;

  get canCreatePersonalInfo(): boolean {
    return this.userAccessService.hasPermission(this.permissions.personalInfo.create);
  }

  get canCreateAddress(): boolean {
    return this.userAccessService.hasPermission(this.permissions.address.create);
  }

  get canCreateContact(): boolean {
    return this.userAccessService.hasPermission(this.permissions.contact.create);
  }

  get canCreateEmergencyContact(): boolean {
    return this.userAccessService.hasPermission(this.permissions.emergencyContact.create);
  }

  get canCreateGovernmentInfo(): boolean {
    return this.userAccessService.hasPermission(this.permissions.benefit.create);
  }

  get canCreateEmployment(): boolean {
    return this.userAccessService.hasPermission(this.permissions.employment.create);
  }

  get canCreateCompensation(): boolean {
    return this.userAccessService.hasPermission(this.permissions.compensation.create);
  }

  // ========================================
  // Available Wizard Steps
  // ========================================

  get steps(): NewEmployeeStep[] {
    const steps: NewEmployeeStep[] = [];

    if (this.canCreatePersonalInfo) {
      steps.push('personal-info');
    }

    if (this.canCreateAddress) {
      steps.push('address');
    }

    if (this.canCreateContact) {
      steps.push('contacts');
    }

    if (this.canCreateEmergencyContact) {
      steps.push('emergency-contacts');
    }

    if (this.canCreateEmployment) {
      steps.push('employment');
    }

    return steps;
  }

  // ========================================
  // Current Step
  // ========================================

  get currentStep(): NewEmployeeStep | null {
    const url = this.router.url.split('?')[0];

    const route = url.split('/').filter(Boolean).at(-1);

    if (!route) {
      return null;
    }

    return this.steps.find((step) => step === route) ?? null;
  }

  // ========================================
  // Current Step Index
  // ========================================

  get currentStepIndex(): number {
    const step = this.currentStep;

    return step ? this.steps.indexOf(step) : -1;
  }

  // ========================================
  // Previous Button
  // ========================================

  get canPrevious(): boolean {
    return this.currentStepIndex > 0 && !this.isChecking();
  }

  // ========================================
  // Next Button
  // ========================================

  get canNext(): boolean {
    const step = this.currentStep;

    if (!step || this.isChecking()) {
      return false;
    }

    // ======================================
    // Block Unresolved Screening
    // ======================================

    if (step === 'personal-info') {
      const status = this.newEmployeeState.personMatchStatus();

      if (status === 'REVIEW' || status === 'HOLD') {
        return false;
      }
    }

    return this.newEmployeeState.isValid(step);
  }

  // ========================================
  // Last Step
  // ========================================

  get isLastStep(): boolean {
    const index = this.currentStepIndex;

    return index >= 0 && index === this.steps.length - 1;
  }

  // ========================================
  // Screening Route
  // ========================================

  get isScreeningPage(): boolean {
    return this.router.url.split('?')[0].split('/').includes('screening');
  }

  // ========================================
  // Previous
  // ========================================

  previous(): void {
    if (!this.canPrevious) {
      return;
    }

    const previousStep = this.steps[this.currentStepIndex - 1];

    if (previousStep) {
      this.navigateToStep(previousStep);
    }
  }

  // ========================================
  // Next
  // ========================================

  next(): void {
    const step = this.currentStep;

    if (!step || !this.canNext) {
      return;
    }

    // ======================================
    // Personal Information Screening
    // ======================================

    if (step === 'personal-info') {
      this.checkExistingPerson();
      return;
    }

    // ======================================
    // Other Wizard Steps
    // ======================================

    if (this.isLastStep) {
      // Employee creation will be
      // implemented separately.

      this.errorMessage = 'Employee creation is not yet available.';

      return;
    }

    const nextStep = this.steps[this.currentStepIndex + 1];

    if (nextStep) {
      this.navigateToStep(nextStep);
    }
  }

  // ========================================
  // Check Existing Person
  // ========================================

  private checkExistingPerson(): void {
    // ======================================
    // Prevent Duplicate Requests
    // ======================================

    if (this.isChecking()) {
      return;
    }

    // ======================================
    // Validate Personal Information
    // ======================================

    if (!this.newEmployeeState.isValid('personal-info')) {
      this.errorMessage = 'Please complete the required personal information.';

      return;
    }

    const draft = this.newEmployeeState.personalDraft();

    if (!draft) {
      this.errorMessage = 'Personal information is unavailable.';

      return;
    }

    // ======================================
    // Build Search Request
    // ======================================

    const request: PersonMatchSearchRequest = {
      firstName: draft.firstName.trim(),
      middleName: draft.middleName?.trim() || null,
      lastName: draft.lastName.trim(),
      dateOfBirth: draft.dateOfBirth,
    };

    // ======================================
    // Initialize Screening
    // ======================================

    this.errorMessage = '';

    this.newEmployeeState.clearPersonMatch();

    this.newEmployeeState.setVerified('personal-info', false);

    this.newEmployeeState.setPersonMatchChecking(true);

    // ======================================
    // Call Business Service
    // ======================================

    this.personMatchService
      .checkExistingPerson(request)
      .pipe(
        take(1),

        finalize(() => {
          this.newEmployeeState.setPersonMatchChecking(false);
        }),
      )
      .subscribe({
        // ====================================
        // Screening Response
        // ====================================

        next: (response) => {
          // ==================================
          // Reject Stale Results
          // ==================================

          const current = this.newEmployeeState.personalDraft();

          if (
            !current ||
            current.firstName.trim() !== request.firstName ||
            (current.middleName?.trim() || null) !== request.middleName ||
            current.lastName.trim() !== request.lastName ||
            current.dateOfBirth !== request.dateOfBirth
          ) {
            this.errorMessage = 'Personal information changed. Please check again.';

            return;
          }

          // ==================================
          // Store Screening Result
          // ==================================

          this.newEmployeeState.setPersonMatchResponse(response);

          // ==================================
          // Process Screening Status
          // ==================================

          switch (response.status) {
            // ================================
            // CLEAR: Continue Wizard
            // ================================

            case 'CLEAR': {
              this.newEmployeeState.setVerified('personal-info', true);

              const nextStep = this.steps[this.currentStepIndex + 1];

              if (nextStep) {
                this.navigateToStep(nextStep);
              }

              break;
            }

            // ================================
            // REVIEW / HOLD: Stay on Page
            // ================================

            case 'REVIEW':
            case 'HOLD': {
              // Stay on Personal Info.
              // The red breathing button
              // and green Try Again button
              // appear automatically.

              this.newEmployeeState.setVerified('personal-info', false);

              break;
            }

            // ================================
            // Unknown Screening Result
            // ================================

            default: {
              this.newEmployeeState.clearPersonMatch();

              this.errorMessage = 'Unknown screening result.';

              break;
            }
          }
        },

        // ====================================
        // Screening Error
        // ====================================

        error: (error) => {
          console.error('Person matching failed:', error);

          this.errorMessage = 'Unable to check existing persons. Please try again.';
        },
      });
  }

  // ========================================
  // Open Screening
  // ========================================

  private openScreening(): void {
    void this.router.navigate(['/app', 'new-employee', 'screening']);
  }

  // ========================================
  // Open Possible Matches
  // ========================================

  openPossibleMatches(): void {
    const status = this.newEmployeeState.personMatchStatus();

    if (status !== 'REVIEW' && status !== 'HOLD') {
      return;
    }

    this.openScreening();
  }

  // ========================================
  // Try Again
  // ========================================

  tryAgain(): void {
    // ======================================
    // Validate Current Step
    // ======================================

    if (this.currentStep !== 'personal-info' || this.isChecking()) {
      return;
    }

    // ======================================
    // Validate Screening Status
    // ======================================

    const status = this.newEmployeeState.personMatchStatus();

    if (status !== 'REVIEW' && status !== 'HOLD') {
      return;
    }

    // ======================================
    // Clear Previous Screening
    // ======================================

    this.newEmployeeState.clearPersonMatch();

    // ======================================
    // Invalidate Verification
    // ======================================

    this.newEmployeeState.setVerified('personal-info', false);

    // ======================================
    // Reset Error Message
    // ======================================

    this.errorMessage = '';

    // ======================================
    // Result
    // ======================================

    // The PersonalComponent observes
    // the screening status and unlocks
    // its reactive form automatically.
    //
    // The existing draft is preserved.
    //
    // The Next button becomes available
    // when the form is valid.
    //
    // Clicking Next performs a new
    // Person Match screening.
  }

  // ========================================
  // Navigate to Wizard Step
  // ========================================

  private navigateToStep(step: NewEmployeeStep): void {
    void this.router.navigate(['/app', 'new-employee', step]);
  }
}

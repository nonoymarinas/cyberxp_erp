
import {
  Component,
  inject,
  signal,
} from '@angular/core';

import {
  Router,
  RouterOutlet,
} from '@angular/router';

import {
  CxpIconChevronApp,
  CxpMenuPageItem,
  CxpIconUserNav,
  CxpButton,
} from 'cyberxp-ui';

import { UserAccessService } from
  '../../../../../core/authorization/services/user-access.services';

import { EMPLOYEE_PERMISSIONS } from
  '../../../../../core/authorization/permissions/employee-permissions';

import { NewEmployeeStateService } from
  '../../../state/new-employee-state.service';

import { NewEmployeeStep } from
  '../../../models/general/new-employee-step.model';


@Component({
  selector: 'cxp-new-employee',

  templateUrl: './new-employee.html',

  styleUrl: './new-employee.css',

  imports: [
    CxpMenuPageItem,
    RouterOutlet,
    CxpIconChevronApp,
    CxpIconUserNav,
    CxpButton,
  ],

  providers: [
    NewEmployeeStateService,
  ],
})
export class NewEmployeePage {

  // ========================================
  // Dependencies
  // ========================================

  private readonly userAccessService =
    inject(UserAccessService);

  private readonly router =
    inject(Router);

  readonly newEmployeeState =
    inject(NewEmployeeStateService);


  // ========================================
  // UI Simulation State
  // ========================================

  readonly hasPossibleMatch =
    signal(false);


  // ========================================
  // Permissions
  // ========================================

  readonly permissions =
    EMPLOYEE_PERMISSIONS;


  get canCreatePersonalInfo(): boolean {
    return this.userAccessService.hasPermission(
      this.permissions.personalInfo.create,
    );
  }


  get canCreateAddress(): boolean {
    return this.userAccessService.hasPermission(
      this.permissions.address.create,
    );
  }


  get canCreateContact(): boolean {
    return this.userAccessService.hasPermission(
      this.permissions.contact.create,
    );
  }


  get canCreateEmergencyContact(): boolean {
    return this.userAccessService.hasPermission(
      this.permissions.emergencyContact.create,
    );
  }


  get canCreateGovernmentInfo(): boolean {
    return this.userAccessService.hasPermission(
      this.permissions.benefit.create,
    );
  }


  get canCreateEmployment(): boolean {
    return this.userAccessService.hasPermission(
      this.permissions.employment.create,
    );
  }


  get canCreateCompensation(): boolean {
    return this.userAccessService.hasPermission(
      this.permissions.compensation.create,
    );
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

    const url =
      this.router.url.split('?')[0];

    const route =
      url.split('/').filter(Boolean).at(-1);

    if (!route) {
      return null;
    }

    const step =
      this.steps.find(
        item => item === route,
      );

    return step ?? null;
  }


  // ========================================
  // Current Step Index
  // ========================================

  get currentStepIndex(): number {

    const currentStep =
      this.currentStep;

    if (!currentStep) {
      return -1;
    }

    return this.steps.indexOf(
      currentStep,
    );
  }


  // ========================================
  // Previous Button
  // ========================================

  get canPrevious(): boolean {
    return this.currentStepIndex > 0;
  }


  // ========================================
  // Next Button
  // ========================================

  get canNext(): boolean {

    const currentStep =
      this.currentStep;

    if (!currentStep) {
      return false;
    }

    if (
      currentStep === 'personal-info' &&
      this.hasPossibleMatch()
    ) {
      return false;
    }

    return this.newEmployeeState.isValid(
      currentStep,
    );
  }


  // ========================================
  // Last Step
  // ========================================

  get isLastStep(): boolean {

    const index =
      this.currentStepIndex;

    return (
      index >= 0 &&
      index === this.steps.length - 1
    );
  }


  // ========================================
  // Screening Route
  // ========================================

  get isScreeningPage(): boolean {

    return this.router.url
      .split('?')[0]
      .split('/')
      .includes('screening');
  }


  // ========================================
  // Previous
  // ========================================

  previous(): void {

    if (!this.canPrevious) {
      return;
    }

    const previousStep =
      this.steps[
        this.currentStepIndex - 1
      ];

    this.navigateToStep(previousStep);
  }


  // ========================================
  // Next
  // ========================================

  next(): void {

    const currentStep =
      this.currentStep;

    if (!currentStep || !this.canNext) {
      return;
    }

    // ======================================
    // Personal Info Screening Simulation
    // ======================================

    if (currentStep === 'personal-info') {

      // Simulate a possible employee match.
      this.hasPossibleMatch.set(true);

      // Do not verify the step.
      this.newEmployeeState.setVerified(
        'personal-info',
        false,
      );

      // Do not navigate to Address.
      return;
    }


    // ======================================
    // Other Wizard Steps
    // ======================================

    this.newEmployeeState.setVerified(
      currentStep,
      true,
    );

    if (this.isLastStep) {
      return;
    }

    const nextStep =
      this.steps[
        this.currentStepIndex + 1
      ];

    this.navigateToStep(nextStep);
  }


  // ========================================
  // Open Possible Matches
  // ========================================

  openPossibleMatches(): void {

    if (!this.hasPossibleMatch()) {
      return;
    }

    this.router.navigate([
      '/app',
      'new-employee',
      'screening',
    ]);
  }


  // ========================================
  // Navigate
  // ========================================

  private navigateToStep(
    step: NewEmployeeStep,
  ): void {

    this.router.navigate([
      '/app',
      'new-employee',
      step,
    ]);
  }
}

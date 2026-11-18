
import {
  Component,
  inject,
} from '@angular/core';

import {
  Router,
  RouterOutlet,
} from '@angular/router';

import {
  take,
} from 'rxjs';

import {
  CxpIconChevronApp,
  CxpMenuPageItem,
  CxpButton,
  CxpActionAlertButton,
} from 'cyberxp-ui';

// ========================================
// Authorization
// ========================================

import {
  UserAccessService,
} from '../../../../../../core/authorization/services/user-access.services';

import {
  EMPLOYEE_PERMISSIONS,
} from '../../../../../../core/authorization/permissions/employee-permissions';

// ========================================
// State
// ========================================

import {
  NewEmployeeStateService,
} from '../../../application/state/new-employee-state.service';

import {
  NewEmployeeRefStateService,
} from '../../../../../../core/application/states/new-employee-ref-state.service';

// ========================================
// Business Services
// ========================================

import {
  PersonMatchService,
} from '../../../application/services/person-match.service';

import {
  PersonMatchDecisionService,
} from '../../../application/services/person-match-decision.service';

// ========================================
// Models
// ========================================

import {
  NewEmployeeStep,
} from '../../../domain/models/shared/complete-steps/new-employee-step.model';

import {
  PersonMatchRequest,
} from '../../../domain/models/shared/person-match/person-match-request.model';

// ========================================
// Component
// ========================================

@Component({
  selector: 'cxp-new-employee',
  standalone: true,

  imports: [
    CxpMenuPageItem,
    RouterOutlet,
    CxpIconChevronApp,
    CxpButton,
    CxpActionAlertButton,
  ],

  templateUrl: './new-employee.html',
  styleUrl: './new-employee.css',

  providers: [
    NewEmployeeStateService,
    PersonMatchDecisionService,
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

  private readonly personMatchService =
    inject(PersonMatchService);

  private readonly refState =
    inject(NewEmployeeRefStateService);

  readonly newEmployeeState =
    inject(NewEmployeeStateService);

  // ========================================
  // Status
  // ========================================

  errorMessage = '';

  readonly hasPossibleMatch =
    this.newEmployeeState.hasPossibleMatch;

  readonly isChecking =
    this.newEmployeeState.isPersonMatchChecking;

  readonly hasNoMatchCandidates =
    this.newEmployeeState.hasNoMatchCandidates;

  readonly personMatchError =
    this.newEmployeeState.personMatchError;

  readonly isDecisionSubmitting =
    this.newEmployeeState.isDecisionSubmitting;

  // ========================================
  // Workflow Status References
  // ========================================

  readonly workFlowStatuses =
    this.refState.workFlowStatuses;

  private hasWorkFlowStatus(
    code: string
  ): boolean {

    return this.workFlowStatuses().some(
      item =>
        item.code?.toUpperCase() === code
    );
  }

  // ========================================
  // Permissions
  // ========================================

  readonly permissions = EMPLOYEE_PERMISSIONS;

  get canCreatePersonalInfo(): boolean {

    return this.userAccessService.hasPermission(
      this.permissions.personalInfo.create
    );
  }

  get canCreateAddress(): boolean {

    return this.userAccessService.hasPermission(
      this.permissions.address.create
    );
  }

  get canCreateContact(): boolean {

    return this.userAccessService.hasPermission(
      this.permissions.contact.create
    );
  }

  get canCreateEmergencyContact(): boolean {

    return this.userAccessService.hasPermission(
      this.permissions.emergencyContact.create
    );
  }

  get canCreateGovernmentInfo(): boolean {

    return this.userAccessService.hasPermission(
      this.permissions.benefit.create
    );
  }

  get canCreateEmployment(): boolean {

    return this.userAccessService.hasPermission(
      this.permissions.employment.create
    );
  }

  get canCreateCompensation(): boolean {

    return this.userAccessService.hasPermission(
      this.permissions.compensation.create
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

    const route = url
      .split('/')
      .filter(Boolean)
      .at(-1);

    if (!route) {
      return null;
    }

    return this.steps.find(
      step => step === route
    ) ?? null;
  }

  // ========================================
  // Current Step Index
  // ========================================

  get currentStepIndex(): number {

    const step = this.currentStep;

    return step
      ? this.steps.indexOf(step)
      : -1;
  }

  // ========================================
  // Previous Button
  // ========================================

  get canPrevious(): boolean {

    return (
      this.currentStepIndex > 0 &&
      !this.isChecking() &&
      !this.isDecisionSubmitting()
    );
  }

  // ========================================
  // Next Button
  // ========================================

  get canNext(): boolean {

    const step = this.currentStep;

    if (
      !step ||
      this.isChecking() ||
      this.isDecisionSubmitting()
    ) {
      return false;
    }

    if (!this.newEmployeeState.isValid(step)) {
      return false;
    }

    if (step === 'personal-info') {

      // A confirmed screening clearance
      // is required before proceeding.

      if (
        this.newEmployeeState.isScreeningClear() &&
        this.newEmployeeState.isVerified('personal-info')
      ) {
        return true;
      }

      // Existing matching results require
      // review or authoritative clearance.

      if (
        this.hasPossibleMatch() ||
        this.hasNoMatchCandidates() ||
        this.newEmployeeState.isScreeningOnHold()
      ) {
        return false;
      }
    }

    return true;
  }

  // ========================================
  // Last Step
  // ========================================

  get isLastStep(): boolean {

    const index = this.currentStepIndex;

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
      this.steps[this.currentStepIndex - 1];

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

    if (step === 'personal-info') {

      // Do not repeat matching when the
      // screening has already been cleared.

      if (
        this.newEmployeeState.isScreeningClear() &&
        this.newEmployeeState.isVerified('personal-info')
      ) {
        const nextStep =
          this.steps[this.currentStepIndex + 1];

        if (nextStep) {
          this.navigateToStep(nextStep);
        }

        return;
      }

      this.checkExistingPerson();
      return;
    }

    if (this.isLastStep) {

      this.errorMessage =
        'Employee creation is not yet available.';

      return;
    }

    const nextStep =
      this.steps[this.currentStepIndex + 1];

    if (nextStep) {
      this.navigateToStep(nextStep);
    }
  }

  // ========================================
  // Check Existing Person
  // ========================================

  private checkExistingPerson(): void {

    if (
      this.isChecking() ||
      this.isDecisionSubmitting()
    ) {
      return;
    }

    // ======================================
    // Validate Personal Information
    // ======================================

    if (
      !this.newEmployeeState.isValid(
        'personal-info'
      )
    ) {

      this.errorMessage =
        'Please complete the required personal information.';

      return;
    }

    const draft =
      this.newEmployeeState.personalDraft();

    if (!draft) {

      this.errorMessage =
        'Personal information is unavailable.';

      return;
    }

    // ======================================
    // Build Person Match Request
    // ======================================

    const request: PersonMatchRequest = {

      firstName: draft.firstName.trim(),

      middleName:
        draft.middleName?.trim() || null,

      lastName: draft.lastName.trim(),

      dateOfBirth: draft.dateOfBirth,
    };

    // ======================================
    // Begin Matching
    // ======================================

    this.errorMessage = '';

    const requestVersion =
      this.newEmployeeState.beginPersonMatchRequest();

    // ======================================
    // Call Person Match Service
    // ======================================

    this.personMatchService
      .checkExistingPerson(request)
      .pipe(
        take(1)
      )
      .subscribe({

        next: response => {

          // ==================================
          // Reject Stale Request
          // ==================================

          if (
            !this.newEmployeeState
              .isCurrentPersonMatchRequest(
                requestVersion
              )
          ) {
            return;
          }

          // ==================================
          // Store Matching Results
          // ==================================

          this.newEmployeeState
            .setPersonMatchResponse(
              response,
              requestVersion
            );

          // ==================================
          // Handle Possible Matches
          // ==================================

          if (this.hasPossibleMatch()) {

            this.newEmployeeState.setVerified(
              'personal-info',
              false
            );

            this.errorMessage =
              this.hasWorkFlowStatus('REVIEW')
                ? 'Possible matching persons found. Please review the results.'
                : 'Possible matching persons found. Screening review is required.';

            return;
          }

          // ==================================
          // No Matching Candidates
          // ==================================

          this.newEmployeeState.setVerified(
            'personal-info',
            false
          );

          this.errorMessage =
            'No matching candidates found. ' +
            'Additional screening clearance is required before continuing.';

          // No automatic clearance.
        },

        error: error => {

          if (
            !this.newEmployeeState
              .isCurrentPersonMatchRequest(
                requestVersion
              )
          ) {
            return;
          }

          console.error(
            'Person matching failed:',
            error
          );

          this.newEmployeeState
            .setPersonMatchError(
              'Unable to check existing persons. Please try again.',
              requestVersion
            );

          this.newEmployeeState.setVerified(
            'personal-info',
            false
          );

          this.errorMessage =
            'Unable to check existing persons. Please try again.';
        },
      });
  }

  // ========================================
  // Open Screening
  // ========================================

  private openScreening(): void {

    void this.router.navigate([
      '/app',
      'new-employee',
      'screening',
    ]);
  }

  // ========================================
  // Open Possible Matches
  // ========================================

  openPossibleMatches(): void {

    if (
      !this.hasPossibleMatch() ||
      this.isDecisionSubmitting()
    ) {
      return;
    }

    this.openScreening();
  }

  // ========================================
  // Try Again
  // ========================================

  tryAgain(): void {

    if (
      this.currentStep !== 'personal-info' ||
      this.isChecking() ||
      this.isDecisionSubmitting()
    ) {
      return;
    }

    if (
      !this.newEmployeeState.hasNoMatchCandidates()
    ) {
      return;
    }

    this.newEmployeeState
      .invalidatePersonMatch();

    this.errorMessage = '';

    // Personal draft is preserved.
    // Clicking Next starts a new match check.
  }

  // ========================================
  // Navigate to Wizard Step
  // ========================================

  private navigateToStep(
    step: NewEmployeeStep
  ): void {

    void this.router.navigate([
      '/app',
      'new-employee',
      step,
    ]);
  }
}

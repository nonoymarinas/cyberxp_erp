
import {
  Component,
  inject,
} from '@angular/core';

import {
  ActivatedRoute,
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

import type {
  NewEmployeeStep,
} from '../../../domain/models/complete-steps/new-employee-step.model';

import type {
  PersonMatchRequest,
} from '../../../domain/models/person-match/person-match-request.model';

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

  templateUrl: './hire-new.html',
  styleUrl: './hire-new.css',

  providers: [
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

  private readonly route =
    inject(ActivatedRoute);

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

  readonly permissions =
    EMPLOYEE_PERMISSIONS;

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

    const step =
      this.currentStep;

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

    const step =
      this.currentStep;

    if (
      !step ||
      this.isChecking() ||
      this.isDecisionSubmitting()
    ) {
      return false;
    }

    if (
      !this.newEmployeeState.isValid(step)
    ) {
      return false;
    }

    if (step === 'personal-info') {

      // ======================================
      // Possible Matches Require Review
      // ======================================

      if (
        this.hasPossibleMatch() ||
        this.newEmployeeState.isScreeningOnHold()
      ) {
        return false;
      }

      // ======================================
      // Screening Already Cleared
      // ======================================

      if (
        this.newEmployeeState.isZeroMatchCleared() ||
        (
          this.newEmployeeState.isVerified(
            'personal-info'
          ) &&
          this.newEmployeeState.isScreeningClear() &&
          !!this.newEmployeeState.screeningId()
        )
      ) {
        return true;
      }

      // ======================================
      // Allow Initial Screening
      // ======================================

      return !this.hasNoMatchCandidates();
    }

    return true;
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
      this.steps[this.currentStepIndex - 1];

    if (previousStep) {
      this.navigateToStep(previousStep);
    }
  }

  // ========================================
  // Next
  // ========================================

  next(): void {

    const step =
      this.currentStep;

    if (
      !step ||
      !this.canNext
    ) {
      return;
    }

    if (step === 'personal-info') {

      // ======================================
      // Previously Cleared Screening
      // ======================================

      if (
        this.newEmployeeState.isZeroMatchCleared() ||
        (
          this.newEmployeeState.isScreeningClear() &&
          this.newEmployeeState.isVerified(
            'personal-info'
          ) &&
          !!this.newEmployeeState.screeningId()
        )
      ) {

        this.navigateToNextStep();

        return;
      }

      // ======================================
      // Start Person Match Screening
      // ======================================

      this.checkExistingPerson();

      return;
    }

    // ======================================
    // Last Step
    // ======================================

    if (this.isLastStep) {

      this.errorMessage =
        'Employee creation is not yet available.';

      return;
    }

    // ======================================
    // Navigate To Next Step
    // ======================================

    this.navigateToNextStep();
  }

  // ========================================
  // Navigate To Next Step
  // ========================================

  private navigateToNextStep(): void {

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

      firstName:
        draft.firstName.trim(),

      middleName:
        draft.middleName?.trim() || null,

      lastName:
        draft.lastName.trim(),

      dateOfBirth:
        draft.dateOfBirth,
    };

    // ======================================
    // Begin Matching
    // ======================================

    this.errorMessage = '';

    const requestVersion =
      this.newEmployeeState
        .beginPersonMatchRequest();

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
          // Reject Failed API Responses
          // ==================================

          if (
            response.success !== true ||
            !Array.isArray(response.data)
          ) {

            this.newEmployeeState
              .setPersonMatchError(
                'Person matching did not complete successfully.',
                requestVersion
              );

            this.newEmployeeState.setVerified(
              'personal-info',
              false
            );

            this.errorMessage =
              'Person matching did not complete successfully.';

            return;
          }

          // ==================================
          // Store Screening Results
          // ==================================

          this.newEmployeeState
            .setPersonMatchResponse(
              response,
              requestVersion
            );

          // ==================================
          // Possible Matches
          // ==================================

          if (this.hasPossibleMatch()) {

            this.newEmployeeState
              .setVerified(
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
          // No Matches - Automatic Progression
          // ==================================

          if (this.hasNoMatchCandidates()) {

            this.newEmployeeState.setVerified(
              'personal-info',
              true
            );

            if (
              !this.newEmployeeState.isZeroMatchCleared()
            ) {

              this.errorMessage =
                'Zero-match clearance could not be established.';

              return;
            }

            this.errorMessage = '';

            this.navigateToNextStep();

            return;
          }

          // ==================================
          // Unexpected Screening Result
          // ==================================

          this.newEmployeeState
            .setVerified(
              'personal-info',
              false
            );

          this.errorMessage =
            'Screening did not return a valid clearance result.';
        },

        error: error => {

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

          console.error(
            'Person matching failed:',
            error
          );

          this.newEmployeeState
            .setPersonMatchError(
              'Unable to check existing persons. Please try again.',
              requestVersion
            );

          this.newEmployeeState
            .setVerified(
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

  private async openScreening(): Promise<void> {

    try {

      const navigated =
        await this.router.navigate(
          ['screening'],
          {
            relativeTo: this.route,
          }
        );

      if (!navigated) {

        this.errorMessage =
          'Screening navigation was cancelled.';

        console.warn(
          '[HireNew] Screening navigation cancelled.'
        );
      }

    } catch (error) {

      console.error(
        '[HireNew] Screening navigation failed:',
        error
      );

      this.errorMessage =
        'Unable to open the Possible Matches page.';
    }
  }

  // ========================================
  // Open Possible Matches
  // ========================================

  openPossibleMatches(): void {

    if (
      !this.hasPossibleMatch() ||
      this.isChecking() ||
      this.isDecisionSubmitting()
    ) {
      return;
    }

    void this.openScreening();
  }

  // ========================================
  // Try Again - Personal Information
  // ========================================

  tryAgain(): void {

    // ======================================
    // Prevent Actions During Screening
    // ======================================

    if (
      this.isChecking() ||
      this.isDecisionSubmitting()
    ) {
      return;
    }

    // ======================================
    // Only Allow Retry For Possible Matches
    // ======================================

    if (!this.hasPossibleMatch()) {
      return;
    }

    // ======================================
    // Invalidate Previous Screening
    // ======================================

    this.newEmployeeState
      .invalidatePersonMatch();

    // ======================================
    // Clear Previous Error
    // ======================================

    this.errorMessage = '';

    // ======================================
    // Return To Personal Information
    // ======================================

    this.navigateToStep(
      'personal-info'
    );

    // Personal draft remains preserved.
    // Next starts a fresh screening request.
  }

  // ========================================
  // Navigate To Wizard Step
  // ========================================

  private navigateToStep(
    step: NewEmployeeStep
  ): void {

    void this.router.navigate(
      [step],
      {
        relativeTo: this.route,
      }
    );
  }
}

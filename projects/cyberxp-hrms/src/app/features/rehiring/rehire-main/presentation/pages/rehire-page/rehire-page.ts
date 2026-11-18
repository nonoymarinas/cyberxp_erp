
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  computed,
  inject,
} from '@angular/core';

import {
  FormsModule,
} from '@angular/forms';

import {
  ActivatedRoute,
  Router,
} from '@angular/router';

import {
  takeUntilDestroyed,
} from '@angular/core/rxjs-interop';

// ========================================
// CyberXP UI Components
// ========================================

import {
  CxpButton,
  CxpInputText,
  CxpInputSelect,
} from 'cyberxp-ui';

import type {
  CxpSelectOption,
  CxpSelectValue,
} from 'cyberxp-ui';

// ========================================
// Rehire Application Service
// ========================================

import {
  RehireService,
} from '../../../application/services/rehire.service';

// ========================================
// Rehire Application State
// ========================================

import {
  RehireState,
} from '../../../application/state/rehire.state';

// ========================================
// Core Reference Service
// ========================================

import {
  NewEmployeeRefService,
} from '../../../../../../core/application/services/new-employee-ref.service';

// ========================================
// Core Reference State
// ========================================

import {
  NewEmployeeRefStateService,
} from '../../../../../../core/application/states/new-employee-ref-state.service';

/* ========================================
   Rehire Page
   ======================================== */

@Component({
  selector: 'cxp-rehire-page',

  standalone: true,

  imports: [
    FormsModule,
    CxpButton,
    CxpInputText,
    CxpInputSelect,
  ],

  providers: [
    RehireState,
    RehireService,
  ],

  templateUrl: './rehire-page.html',
  styleUrl: './rehire-page.css',

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RehirePageComponent {

  // ======================================
  // Dependencies
  // ======================================

  private readonly route =
    inject(ActivatedRoute);

  private readonly router =
    inject(Router);

  private readonly destroyRef =
    inject(DestroyRef);

  private readonly rehireService =
    inject(RehireService);

  private readonly refService =
    inject(NewEmployeeRefService);

  private readonly refState =
    inject(NewEmployeeRefStateService);

  // ======================================
  // Selected Employee
  // ======================================

  readonly personGuid =
    this.rehireService.personGuid;

  readonly employee =
    this.rehireService.employee;

  readonly employeeFound =
    this.rehireService.employeeFound;

  readonly fullName =
    this.rehireService.fullName;

  readonly previousEmploymentGuid =
    this.rehireService.previousEmploymentGuid;

  // ======================================
  // Eligibility
  // ======================================

  readonly eligibility =
    this.rehireService.eligibility;

  readonly eligibilityStatus =
    this.rehireService.eligibilityStatus;

  readonly canProceed =
    this.rehireService.canProceed;

  readonly isBlocklisted =
    this.rehireService.isBlocklisted;

  // ======================================
  // Wizard Steps
  // ======================================

  readonly steps =
    this.rehireService.steps;

  readonly currentStepIndex =
    this.rehireService.currentStepIndex;

  readonly currentStep =
    this.rehireService.currentStep;

  readonly profileVerified =
    this.rehireService.profileVerified;

  readonly employmentForm =
    this.rehireService.employmentForm;

  // ======================================
  // Loading And Submission
  // ======================================

  readonly loading =
    this.rehireService.loading;

  readonly verifying =
    this.rehireService.verifying;

  readonly submitting =
    this.rehireService.submitting;

  readonly busy =
    this.rehireService.busy;

  readonly error =
    this.rehireService.error;

  readonly submitted =
    this.rehireService.submitted;

  readonly submissionResult =
    this.rehireService.submissionResult;

  // ======================================
  // Core Reference Loading State
  // ======================================

  readonly referencesLoading =
    this.refState.isLoading;

  readonly referencesError =
    this.refState.errorMessage;

  // ======================================
  // Computed Display State
  // ======================================

  readonly canGoNext = computed(() => {

    if (
      this.busy() ||
      this.submitted() ||
      !this.employeeFound()
    ) {
      return false;
    }

    switch (this.currentStep()) {

      case 'eligibility':
        return this.canProceed();

      case 'profile':
        return this.profileVerified();

      case 'employment':
        return this.rehireService.employmentValid();

      case 'review':
        return false;

      default:
        return false;
    }
  });

  // ======================================
  // Department Options
  // Core Reference IDs
  // ======================================

  readonly departmentOptions = computed<
    CxpSelectOption[]
  >(() => {

    return this.refState
      .departments()
      .map(item => ({
        value: item.id,
        label: item.name,
        disabled: item.disabled ?? false,
      }));
  });

  // ======================================
  // Position Options
  // Core Reference IDs
  // ======================================

  readonly positionOptions = computed<
    CxpSelectOption[]
  >(() => {

    return this.refState
      .positions()
      .map(item => ({
        value: item.id,
        label: item.name,
        disabled: item.disabled ?? false,
      }));
  });

  // ======================================
  // Work Location Options
  // Temporary Until Reference Is Confirmed
  // ======================================

  readonly workLocationOptions: CxpSelectOption[] = [

    {
      value: 'BACOLOD',
      label: 'Bacolod Office',
    },

    {
      value: 'KABANKALAN',
      label: 'Kabankalan Office',
    },

    {
      value: 'CEBU',
      label: 'Cebu Office',
    },

    {
      value: 'ILOILO',
      label: 'Iloilo Office',
    },

    {
      value: 'MANILA',
      label: 'Manila Office',
    },
  ];

  // ======================================
  // Employment Type Options
  // Temporary Until Reference Is Confirmed
  // ======================================

  readonly employmentTypeOptions: CxpSelectOption[] = [

    {
      value: 'REGULAR',
      label: 'Regular',
    },

    {
      value: 'PROBATIONARY',
      label: 'Probationary',
    },

    {
      value: 'CONTRACTUAL',
      label: 'Contractual',
    },

    {
      value: 'PROJECT_BASED',
      label: 'Project-Based',
    },
  ];

  // ======================================
  // Constructor
  // ======================================

  constructor() {

    // ====================================
    // Load Shared Core References
    // ====================================

    this.refService
      .getReferences()
      .pipe(
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        error: error => {

          console.error(
            'Unable to load Rehire references:',
            error
          );
        },
      });

    // ====================================
    // Load Employee From Route
    // ====================================

    this.route.paramMap
      .pipe(
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(params => {

        const personGuid =
          params.get('personGuid');

        if (personGuid) {

          this.rehireService.loadEmployee(
            personGuid
          );

        } else {

          this.rehireService.reset();
        }
      });
  }

  // ======================================
  // Department Form Binding
  // ======================================

  get department(): CxpSelectValue {

    return this.employmentForm().departmentId;
  }

  set department(
    value: CxpSelectValue
  ) {

    this.rehireService.updateEmploymentForm({
      departmentId: this.toStringValue(value),
    });
  }

  // ======================================
  // Position Form Binding
  // ======================================

  get position(): CxpSelectValue {

    return this.employmentForm().positionId;
  }

  set position(
    value: CxpSelectValue
  ) {

    this.rehireService.updateEmploymentForm({
      positionId: this.toStringValue(value),
    });
  }

  // ======================================
  // Work Location Form Binding
  // ======================================

  get workLocation(): CxpSelectValue {

    return this.employmentForm().workLocationId;
  }

  set workLocation(
    value: CxpSelectValue
  ) {

    this.rehireService.updateEmploymentForm({
      workLocationId: this.toStringValue(value),
    });
  }

  // ======================================
  // Employment Type Form Binding
  // ======================================

  get employmentType(): CxpSelectValue {

    return this.employmentForm().employmentType;
  }

  set employmentType(
    value: CxpSelectValue
  ) {

    this.rehireService.updateEmploymentForm({
      employmentType: this.toStringValue(value),
    });
  }

  // ======================================
  // Start Date Form Binding
  // ======================================

  get startDate(): string {

    return this.employmentForm().startDate;
  }

  set startDate(
    value: string
  ) {

    this.rehireService.updateEmploymentForm({
      startDate: value,
    });
  }

  // ======================================
  // Justification Form Binding
  // ======================================

  get justification(): string {

    return this.employmentForm().justification;
  }

  set justification(
    value: string
  ) {

    this.rehireService.updateEmploymentForm({
      justification: value,
    });
  }

  // ======================================
  // Convert Select Value
  // ======================================

  private toStringValue(
    value: CxpSelectValue
  ): string | null {

    return value === null ||
      value === undefined
      ? null
      : String(value);
  }

  // ======================================
  // Option Label Helper
  // ======================================

  getOptionLabel(
    options: CxpSelectOption[],
    value: CxpSelectValue
  ): string {

    if (
      value === null ||
      value === undefined
    ) {
      return 'Not selected';
    }

    return options.find(
      option =>
        String(option.value) === String(value)
    )?.label ?? 'Not selected';
  }

  // ======================================
  // Employment Status Label
  // Database-Driven Reference
  // ======================================

  getEmploymentStatusLabel(
    status: string
  ): string {

    return this.refState
      .employmentStatuses()
      .find(
        item => item.code === status
      )
      ?.name ?? status;
  }

  // ======================================
  // Eligibility Status Label
  // Database-Driven Reference
  // ======================================

  getEligibilityLabel(
    status: string | null
  ): string {

    if (!status) {
      return 'Not Verified';
    }

    return this.refState
      .rehireEligibilityStatuses()
      .find(
        item => item.code === status
      )
      ?.name ?? status;
  }

  // ======================================
  // Profile Verification
  // ======================================

  onProfileVerifiedChange(
    verified: boolean
  ): void {

    this.rehireService.setProfileVerified(
      verified
    );
  }

  // ======================================
  // Step Helpers
  // ======================================

  isFirstStep(): boolean {

    return this.rehireService.isFirstStep();
  }

  isLastStep(): boolean {

    return this.rehireService.isLastStep();
  }

  // ======================================
  // Previous Step
  // ======================================

  previous(): void {

    this.rehireService.previous();
  }

  // ======================================
  // Next Step
  // ======================================

  next(): void {

    this.rehireService.next();
  }

  // ======================================
  // Navigate To Step
  // ======================================

  goToStep(
    index: number
  ): void {

    this.rehireService.goToStep(index);
  }

  // ======================================
  // Submission Validation
  // ======================================

  canSubmit(): boolean {

    return this.rehireService.canSubmit();
  }

  // ======================================
  // Submit Rehire Request
  // ======================================

  submitRequest(): void {

    this.rehireService.submitRequest();
  }

  // ======================================
  // Recheck Eligibility
  // ======================================

  verifyEligibility(): void {

    this.rehireService.verifyEligibility();
  }

  // ======================================
  // Reset Wizard
  // ======================================

  reset(): void {

    this.rehireService.reset();
  }

  // ======================================
  // Back To Rehire Search
  // ======================================

  backToSearch(): void {

    void this.router.navigate([
      '/app',
      'rehiring',
      'search',
    ]);
  }
}

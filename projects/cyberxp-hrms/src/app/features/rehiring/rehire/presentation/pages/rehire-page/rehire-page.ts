
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
// Application Service
// ========================================

import {
  RehireService,
} from '../../../application/services/rehire.service';

// ========================================
// Application State
// ========================================

import {
  RehireState,
} from '../../../application/state/rehire.state';

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

  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  private readonly rehireService =
    inject(RehireService);

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
    }
  });

  // ======================================
  // Department Options
  // ======================================

  readonly departmentOptions: CxpSelectOption[] = [
    { value: 'HR', label: 'Human Resources' },
    { value: 'OPS', label: 'Operations' },
    { value: 'FIN', label: 'Finance' },
    { value: 'IT', label: 'Information Technology' },
    { value: 'ENG', label: 'Engineering' },
    { value: 'WH', label: 'Warehouse' },
    { value: 'ADMIN', label: 'Administration' },
  ];

  // ======================================
  // Position Options
  // ======================================

  readonly positionOptions: CxpSelectOption[] = [
    { value: 'HR_OFFICER', label: 'HR Officer' },
    { value: 'HR_ASSISTANT', label: 'HR Assistant' },
    { value: 'OPS_SUPERVISOR', label: 'Operations Supervisor' },
    { value: 'OPS_MANAGER', label: 'Operations Manager' },
    { value: 'ACCOUNTANT', label: 'Accountant' },
    { value: 'ACCOUNTING_CLERK', label: 'Accounting Clerk' },
    { value: 'SOFTWARE_DEV', label: 'Software Developer' },
    { value: 'PROJECT_ENGINEER', label: 'Project Engineer' },
    { value: 'WH_SUPERVISOR', label: 'Warehouse Supervisor' },
    { value: 'ADMIN_OFFICER', label: 'Administrative Officer' },
    { value: 'ADMIN_ASSISTANT', label: 'Administrative Assistant' },
  ];

  // ======================================
  // Work Location Options
  // ======================================

  readonly workLocationOptions: CxpSelectOption[] = [
    { value: 'BACOLOD', label: 'Bacolod Office' },
    { value: 'KABANKALAN', label: 'Kabankalan Office' },
    { value: 'CEBU', label: 'Cebu Office' },
    { value: 'ILOILO', label: 'Iloilo Office' },
    { value: 'MANILA', label: 'Manila Office' },
  ];

  // ======================================
  // Employment Type Options
  // ======================================

  readonly employmentTypeOptions: CxpSelectOption[] = [
    { value: 'REGULAR', label: 'Regular' },
    { value: 'PROBATIONARY', label: 'Probationary' },
    { value: 'CONTRACTUAL', label: 'Contractual' },
    { value: 'PROJECT_BASED', label: 'Project-Based' },
  ];

  // ======================================
  // Constructor
  // ======================================

  constructor() {

    // React to route parameter changes,
    // including component reuse.

    this.route.paramMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(params => {

        const personGuid =
          params.get('personGuid');

        if (personGuid) {
          this.rehireService.loadEmployee(
            personGuid
          );
        }
      });
  }

  // ======================================
  // Form Value Helpers
  // ======================================

  get department(): CxpSelectValue {
    return this.employmentForm().departmentId;
  }

  set department(value: CxpSelectValue) {
    this.rehireService.updateEmploymentForm({
      departmentId: this.toStringValue(value),
    });
  }

  get position(): CxpSelectValue {
    return this.employmentForm().positionId;
  }

  set position(value: CxpSelectValue) {
    this.rehireService.updateEmploymentForm({
      positionId: this.toStringValue(value),
    });
  }

  get workLocation(): CxpSelectValue {
    return this.employmentForm().workLocationId;
  }

  set workLocation(value: CxpSelectValue) {
    this.rehireService.updateEmploymentForm({
      workLocationId: this.toStringValue(value),
    });
  }

  get employmentType(): CxpSelectValue {
    return this.employmentForm().employmentType;
  }

  set employmentType(value: CxpSelectValue) {
    this.rehireService.updateEmploymentForm({
      employmentType: this.toStringValue(value),
    });
  }

  get startDate(): string {
    return this.employmentForm().startDate;
  }

  set startDate(value: string) {
    this.rehireService.updateEmploymentForm({
      startDate: value,
    });
  }

  get justification(): string {
    return this.employmentForm().justification;
  }

  set justification(value: string) {
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

    return value === null
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

    if (value === null) {
      return 'Not selected';
    }

    return options.find(
      option => option.value === value
    )?.label ?? 'Not selected';
  }

  // ======================================
  // Employment Status Label
  // ======================================

  getEmploymentStatusLabel(
    status: string
  ): string {

    switch (status) {
      case 'ACTIVE':
        return 'Active';
      case 'RESIGNED':
        return 'Resigned';
      case 'TERMINATED':
        return 'Terminated';
      case 'RETIRED':
        return 'Retired';
      case 'END_OF_CONTRACT':
        return 'End of Contract';
      default:
        return status;
    }
  }

  // ======================================
  // Eligibility Status Label
  // ======================================

  getEligibilityLabel(
    status: string | null
  ): string {

    switch (status) {
      case 'ELIGIBLE':
        return 'Eligible';
      case 'REVIEW_REQUIRED':
        return 'Review Required';
      case 'NOT_ELIGIBLE':
        return 'Not Eligible';
      default:
        return 'Not Verified';
    }
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

  goToStep(index: number): void {
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
  // Back To Search
  // ======================================

  backToSearch(): void {

    void this.router.navigate([
      '/app',
      'rehiring',
      'search',
    ]);
  }
}

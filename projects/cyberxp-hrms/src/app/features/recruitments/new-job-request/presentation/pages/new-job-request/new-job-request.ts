import {
  Component,
  inject,
  signal,
  computed,
  OnInit,
  DestroyRef,
  isDevMode,
} from '@angular/core';

import {
  Router,
} from '@angular/router';

import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import {
  takeUntilDestroyed,
} from '@angular/core/rxjs-interop';

// ========================================
// CyberXP UI
// ========================================

import {
  CxpButton,
  CxpInputSelect,
  CxpInputText,
} from 'cyberxp-ui';

import type {
  CxpSelectOption,
} from 'cyberxp-ui';

// ========================================
// Application Services
// ========================================

import {
  JobRequestReferenceService,
} from '../../../application/services/references/job-request-reference.service';

// ========================================
// Application State
// ========================================

import {
  JobRequestReferenceState,
} from '../../../application/states/references/job-request-reference.state';

// ========================================
// New Job Request Component
// ========================================

@Component({
  selector: 'new-job-request',
  standalone: true,

  imports: [
    ReactiveFormsModule,
    CxpInputText,
    CxpInputSelect,
    CxpButton,
  ],

  templateUrl: './new-job-request.html',
  styleUrl: './new-job-request.css',
})
export class NewJobRequest implements OnInit {

  // ========================================
  // Dependencies
  // ========================================

  private readonly router =
    inject(Router);

  private readonly destroyRef =
    inject(DestroyRef);

  private readonly referenceService =
    inject(JobRequestReferenceService);

  private readonly referenceState =
    inject(JobRequestReferenceState);

  // ========================================
  // Component State
  // ========================================

  readonly submitted = signal(false);

  readonly isSubmitting = signal(false);

  readonly successMessage = signal('');

  readonly errorMessage = signal('');

  // ========================================
  // Reference State
  // ========================================

  readonly referencesLoading =
    this.referenceState.loading;

  readonly referencesLoaded =
    this.referenceState.loaded;

  readonly referencesError =
    this.referenceState.error;

  // ========================================
  // Department References
  // ========================================

  readonly departmentOptions =
    computed<CxpSelectOption[]>(() =>

      this.referenceState.departments().map(
        department => ({
          value: String(department.id),
          label: department.name,
        })
      )

    );

  // ========================================
  // Position References
  // ========================================

  readonly positionOptions =
    computed<CxpSelectOption[]>(() =>

      this.referenceState.positions().map(
        position => ({
          value: String(position.id),
          label: position.name,
        })
      )

    );

  // ========================================
  // Request Type References
  // ========================================

  readonly requestTypeOptions =
    computed<CxpSelectOption[]>(() =>

      this.referenceState.jobRequestTypes().map(
        requestType => ({
          value: requestType.code,
          label: requestType.name,
        })
      )

    );

  // ========================================
  // Priority References
  // ========================================

  readonly priorityOptions =
    computed<CxpSelectOption[]>(() =>

      this.referenceState.priorityLevels().map(
        priority => ({
          value: priority.code,
          label: priority.name,
        })
      )

    );

  // ========================================
  // Reactive Form
  // ========================================

  readonly jobRequestForm = new FormGroup({

    departmentId: new FormControl<string | null>(
      null,
      Validators.required
    ),

    positionId: new FormControl<string | null>(
      null,
      Validators.required
    ),

    requestedHeadcount: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.pattern(/^[1-9]\d*$/),
      ],
    }),

    requiredDate: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
      ],
    }),

    requestType: new FormControl<string | null>(
      'ADDITIONAL_HEADCOUNT',
      Validators.required
    ),

    priority: new FormControl<string | null>(
      'MEDIUM',
      Validators.required
    ),

    justification: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(2000),
      ],
    }),

  });

  // ========================================
  // Lifecycle
  // ========================================

  ngOnInit(): void {

    this.loadReferences();

  }

  // ========================================
  // Load Job Request References
  // ========================================

  private loadReferences(): void {

    // ======================================
    // Temporary Company ID
    // Replace with authenticated company context
    // ======================================

    const companyId = 1;

    this.referenceService
      .loadReferences(companyId)
      .pipe(
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({

        // ==================================
        // References Loaded
        // ==================================

        next: () => {

          if (!isDevMode()) {
            return;
          }

          console.groupCollapsed(
            '%c[PAGE] New Job Request References',
            'color: #ff9800; font-weight: bold;'
          );

          console.log(
            'Company ID:',
            companyId
          );

          console.log(
            'Full References:',
            structuredClone(
              this.referenceState.references()
            )
          );

          // ==================================
          // Departments
          // ==================================

          console.log(
            'Departments:',
            this.referenceState.departments()
          );

          console.table(
            this.departmentOptions()
          );

          // ==================================
          // Positions
          // ==================================

          console.log(
            'Positions:',
            this.referenceState.positions()
          );

          console.table(
            this.positionOptions()
          );

          // ==================================
          // Request Types
          // ==================================

          console.log(
            'Job Request Types:',
            this.referenceState.jobRequestTypes()
          );

          console.table(
            this.requestTypeOptions()
          );

          // ==================================
          // Priority Levels
          // ==================================

          console.log(
            'Priority Levels:',
            this.referenceState.priorityLevels()
          );

          console.table(
            this.priorityOptions()
          );

          console.groupEnd();

        },

        // ==================================
        // Reference Loading Error
        // ==================================

        error: error => {

          this.errorMessage.set(
            'Unable to load job request references.'
          );

          if (isDevMode()) {

            console.error(
              '[PAGE] Failed to load job request references',
              error
            );

          }

        },

      });

  }

  // ========================================
  // Field Validation
  // ========================================

  isInvalid(
    field: keyof typeof this.jobRequestForm.controls
  ): boolean {

    const control =
      this.jobRequestForm.controls[field];

    return (
      control.invalid &&
      (control.touched || this.submitted())
    );
  }

  // ========================================
  // Submit Job Request
  // ========================================

  async submit(): Promise<void> {

    if (
      this.isSubmitting() ||
      this.referencesLoading()
    ) {
      return;
    }

    this.submitted.set(true);

    this.successMessage.set('');
    this.errorMessage.set('');

    // ======================================
    // Reference Validation
    // ======================================

    if (!this.referencesLoaded()) {

      this.errorMessage.set(
        'Job request references are not available.'
      );

      return;

    }

    // ======================================
    // Form Validation
    // ======================================

    if (this.jobRequestForm.invalid) {

      this.jobRequestForm.markAllAsTouched();

      this.errorMessage.set(
        'Please complete all required fields.'
      );

      return;
    }

    // ======================================
    // Prepare Request Data
    // ======================================

    const value =
      this.jobRequestForm.getRawValue();

    // ======================================
    // Validate Selected References
    // ======================================

    const validDepartment =
      this.departmentOptions().some(
        option => option.value === value.departmentId
      );

    const validPosition =
      this.positionOptions().some(
        option => option.value === value.positionId
      );

    const validRequestType =
      this.requestTypeOptions().some(
        option => option.value === value.requestType
      );

    const validPriority =
      this.priorityOptions().some(
        option => option.value === value.priority
      );

    if (
      !validDepartment ||
      !validPosition ||
      !validRequestType ||
      !validPriority
    ) {

      this.errorMessage.set(
        'Please select valid job request references.'
      );

      return;

    }

    // ======================================
    // Validate Justification
    // ======================================

    const justification =
      value.justification.trim();

    if (justification.length < 10) {

      this.errorMessage.set(
        'Please provide a meaningful justification.'
      );

      return;
    }

    // ======================================
    // Job Request Payload
    // ======================================

    const request = {

      departmentId:
        Number(value.departmentId),

      positionId:
        Number(value.positionId),

      requestedHeadcount:
        Number(value.requestedHeadcount),

      requiredDate:
        value.requiredDate,

      requestType:
        value.requestType,

      priority:
        value.priority,

      justification,

    };

    // ======================================
    // Temporary Preview Navigation
    // ======================================
    //
    // TODO:
    // Replace with JobRequestService.submit().
    //
    // Navigate to confirmation only after
    // successful backend persistence.
    //
    // Current implementation transfers
    // validated data through Router state.
    // No database request is made.

    this.isSubmitting.set(true);

    try {

      const navigated =
        await this.router.navigate(
          [
            '/app/recruitment/job-requisitions/confirmation'
          ],
          {
            state: {
              jobRequestPreview: request,
            },
          }
        );

      if (!navigated) {

        this.errorMessage.set(
          'Unable to open the confirmation page.'
        );

      }

    } catch (error) {

      console.error(
        'Job request navigation failed:',
        error
      );

      this.errorMessage.set(
        'Unable to open the confirmation page.'
      );

    } finally {

      this.isSubmitting.set(false);

    }
  }

  // ========================================
  // Reset Form
  // ========================================

  reset(): void {

    if (this.isSubmitting()) {
      return;
    }

    this.jobRequestForm.reset({

      departmentId: null,
      positionId: null,
      requestedHeadcount: '1',
      requiredDate: '',
      requestType: 'ADDITIONAL_HEADCOUNT',
      priority: 'MEDIUM',
      justification: '',

    });

    this.jobRequestForm.markAsPristine();
    this.jobRequestForm.markAsUntouched();

    this.submitted.set(false);

    this.successMessage.set('');
    this.errorMessage.set('');
  }

}
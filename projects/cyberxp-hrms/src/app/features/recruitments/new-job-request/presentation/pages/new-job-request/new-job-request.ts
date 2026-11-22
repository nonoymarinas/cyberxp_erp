
import {
  Component,
  inject,
  signal,
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
  CxpButton,
  CxpInputSelect,
  CxpInputText,
} from 'cyberxp-ui';

import type {
  CxpSelectOption,
} from 'cyberxp-ui';

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
export class NewJobRequest {

  // ========================================
  // Dependencies
  // ========================================

  private readonly router = inject(Router);

  // ========================================
  // Component State
  // ========================================

  readonly submitted = signal(false);

  readonly isSubmitting = signal(false);

  readonly successMessage = signal('');

  readonly errorMessage = signal('');

  // ========================================
  // Department References
  // Temporary Mock Data
  // ========================================

  readonly departmentOptions: CxpSelectOption[] = [
    {
      value: '1',
      label: 'Engineering',
    },
    {
      value: '2',
      label: 'Operations',
    },
    {
      value: '3',
      label: 'Human Resources',
    },
    {
      value: '4',
      label: 'Accounting',
    },
  ];

  // ========================================
  // Position References
  // Temporary Mock Data
  // ========================================

  readonly positionOptions: CxpSelectOption[] = [
    {
      value: '1',
      label: 'Civil Engineer',
    },
    {
      value: '2',
      label: 'Project Engineer',
    },
    {
      value: '3',
      label: 'Accountant',
    },
    {
      value: '4',
      label: 'HR Officer',
    },
  ];

  // ========================================
  // Request Type References
  // ========================================

  readonly requestTypeOptions: CxpSelectOption[] = [
    {
      value: 'ADDITIONAL',
      label: 'Additional Headcount',
    },
    {
      value: 'REPLACEMENT',
      label: 'Replacement Employee',
    },
    {
      value: 'PROJECT_BASED',
      label: 'Project-Based',
    },
  ];

  // ========================================
  // Priority References
  // ========================================

  readonly priorityOptions: CxpSelectOption[] = [
    {
      value: 'LOW',
      label: 'Low',
    },
    {
      value: 'NORMAL',
      label: 'Normal',
    },
    {
      value: 'HIGH',
      label: 'High',
    },
    {
      value: 'URGENT',
      label: 'Urgent',
    },
  ];

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
      'ADDITIONAL',
      Validators.required
    ),

    priority: new FormControl<string | null>(
      'NORMAL',
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

    if (this.isSubmitting()) {
      return;
    }

    this.submitted.set(true);

    this.successMessage.set('');
    this.errorMessage.set('');

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

    const justification =
      value.justification.trim();

    if (justification.length < 10) {

      this.errorMessage.set(
        'Please provide a meaningful justification.'
      );

      return;
    }

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
      requestType: 'ADDITIONAL',
      priority: 'NORMAL',
      justification: '',

    });

    this.jobRequestForm.markAsPristine();
    this.jobRequestForm.markAsUntouched();

    this.submitted.set(false);

    this.successMessage.set('');
    this.errorMessage.set('');
  }

}

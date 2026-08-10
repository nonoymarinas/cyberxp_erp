import { Component, OnInit, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import {
  CxpButton,
  CxpDisplayField,
  CxpIconUserCircle,
  CxpIconUserNav,
  CxpInputSelect,
  CxpInputText,
} from 'cyberxp-ui';

import type {
  CxpSelectOption,
  CxpSelectPrimitive,
} from 'cyberxp-ui';

import { EmployeeState } from '../../../state/employee-state.service';
import { PersonalInfoService } from '../../../business/services/personal-info.service';
import { UserAccessService } from '../../../../../core/authorization/services/user-access.services';

import {
  PersonalInformation,
  SavePersonalInfoRequest,
} from '../../../models/domain/personal-info.model';

@Component({
  selector: 'personal-info',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CxpButton,
    CxpDisplayField,
    CxpIconUserCircle,
    CxpIconUserNav,
    CxpInputSelect,
    CxpInputText,
  ],
  templateUrl: './personal-info.html',
  styleUrl: './personal-info.css',
})
export class PersonalInfo implements OnInit {
  private referencesLoaded = false;

  public readonly userAccessService = inject(UserAccessService);

  // ========================================
  // Permissions
  // ========================================

  private readonly viewPermission =
    'hrms.employee.personal-info.view';

  private readonly editPermission =
    'hrms.employee.personal-info.edit';

  get canView(): boolean {
    return this.userAccessService.hasPermission(
      this.viewPermission,
    );
  }

  get canEdit(): boolean {
    return this.userAccessService.hasPermission(
      this.editPermission,
    );
  }

  // ========================================
  // Reactive Form
  // ========================================

  readonly personalInfoForm = new FormGroup({
    firstName: new FormControl(
      {
        value: '',
        disabled: false,
      },
      {
        nonNullable: true,
        validators: [Validators.required],
      },
    ),

    middleName: new FormControl(
      {
        value: '',
        disabled: false,
      },
      {
        nonNullable: true,
      },
    ),

    lastName: new FormControl(
      {
        value: '',
        disabled: false,
      },
      {
        nonNullable: true,
        validators: [Validators.required],
      },
    ),

    suffixId: new FormControl<string | null>({
      value: null,
      disabled: false,
    }),

    dateOfBirth: new FormControl(
      {
        value: '',
        disabled: false,
      },
      {
        nonNullable: true,
        validators: [Validators.required],
      },
    ),

    genderId: new FormControl<string | null>(
      {
        value: null,
        disabled: false,
      },
      {
        validators: [Validators.required],
      },
    ),

    civilStatusId: new FormControl<string | null>(
      {
        value: null,
        disabled: false,
      },
      {
        validators: [Validators.required],
      },
    ),

    imageUrl: new FormControl<string | null>({
      value: null,
      disabled: false,
    }),
  });

  // ========================================
  // Reference Data
  // ========================================

  suffixOptions: CxpSelectOption[] = [];
  genderOptions: CxpSelectOption[] = [];
  civilStatusOptions: CxpSelectOption[] = [];

  // ========================================
  // Status
  // ========================================

  isLoading = false;
  isEditing = false;
  isSaving = false;

  successMessage = '';
  errorMessage = '';

  // ========================================
  // Original Employee Snapshot
  // ========================================

  private originalEmployee: PersonalInformation | null = null;

  // ========================================
  // Employee Data
  // ========================================

  employee: PersonalInformation = {
    employeeId: '',
    employeeGuid: null,
    firstName: '',
    middleName: '',
    lastName: '',
    suffixId: null,
    dateOfBirth: '',
    genderId: null,
    civilStatusId: null,
    imageUrl: null,
  };

  constructor(
    private readonly personalInfoService: PersonalInfoService,
    public readonly employeeState: EmployeeState,
  ) {}

  // ========================================
  // Init
  // ========================================

  ngOnInit(): void {
    this.personalInfoForm.disable();

    this.loadReferences();

    if (this.employeeState.employeeGuid) {
      this.loadPersonalInfo(
        this.employeeState.employeeGuid,
      );
    }
  }

  ngAfterViewInit(): void {
    queueMicrotask(() => {
      this.updateFormState();
    });
  }

  // ========================================
  // Reference Data
  // ========================================

  loadReferences(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.personalInfoService
      .getReferenceOptions()
      .subscribe({
        next: (options) => {
          this.suffixOptions =
            options.suffixOptions;

          this.genderOptions =
            options.genderOptions;

          this.civilStatusOptions =
            options.civilStatusOptions;

          this.referencesLoaded =
            this.suffixOptions.length > 0 &&
            this.genderOptions.length > 0 &&
            this.civilStatusOptions.length > 0;

          this.isLoading = false;

          queueMicrotask(() => {
            this.updateFormState();
          });
        },

        error: () => {
          this.referencesLoaded = false;
          this.isLoading = false;

          this.errorMessage =
            'Unable to load reference data.';

          this.personalInfoForm.disable();
        },
      });
  }

  // ========================================
  // Form State
  // ========================================

  private updateFormState(): void {
    if (
      this.referencesLoaded &&
      this.isEditing &&
      this.canEdit
    ) {
      this.personalInfoForm.enable();
      return;
    }

    this.personalInfoForm.disable();
  }

  // ========================================
  // Edit / Save Button
  // ========================================

  onEditSave(): void {
    if (!this.canEdit) {
      this.personalInfoForm.disable();
      this.isEditing = false;

      this.errorMessage =
        'You do not have permission to edit personal information.';

      return;
    }

    if (this.isEditing) {
      this.savePersonalInfo();
      return;
    }

    this.startEdit();
  }

  // ========================================
  // Start Edit
  // ========================================

  startEdit(): void {
    if (!this.canEdit) {
      this.personalInfoForm.disable();
      this.isEditing = false;

      this.errorMessage =
        'You do not have permission to edit personal information.';

      return;
    }

    if (!this.referencesLoaded) {
      this.personalInfoForm.disable();
      this.isEditing = false;

      this.errorMessage =
        'Reference data is not yet available.';

      return;
    }

    this.errorMessage = '';
    this.successMessage = '';

    this.isEditing = true;

    this.personalInfoForm.enable();
  }

  // ========================================
  // Cancel Edit
  // ========================================

  cancelEdit(): void {
    if (this.originalEmployee) {
      this.personalInfoForm.reset({
        firstName:
          this.originalEmployee.firstName,

        middleName:
          this.originalEmployee.middleName ?? '',

        lastName:
          this.originalEmployee.lastName,

        suffixId:
          this.originalEmployee.suffixId,

        dateOfBirth:
          this.originalEmployee.dateOfBirth ?? '',

        genderId:
          this.originalEmployee.genderId,

        civilStatusId:
          this.originalEmployee.civilStatusId,

        imageUrl:
          this.originalEmployee.imageUrl,
      });
    }

    this.personalInfoForm.markAsPristine();
    this.personalInfoForm.markAsUntouched();

    this.isEditing = false;

    this.personalInfoForm.disable();

    this.errorMessage = '';
    this.successMessage = '';
  }

  // ========================================
  // Save Personal Information
  // ========================================

  savePersonalInfo(): void {
    // Permission check
    if (!this.canEdit) {
      this.personalInfoForm.disable();
      this.isEditing = false;

      this.errorMessage =
        'You do not have permission to save personal information.';

      return;
    }

    // Prevent multiple save requests
    if (this.isSaving) {
      return;
    }

    // Validate form
    this.personalInfoForm.markAllAsTouched();

    if (this.personalInfoForm.invalid) {
      this.errorMessage =
        'Please fill in all required fields before saving.';

      return;
    }

    this.errorMessage = '';
    this.successMessage = '';
    this.isSaving = true;

    // Get all form values including disabled fields
    const formValue =
      this.personalInfoForm.getRawValue();

    // ========================================
    // Build Request
    // ========================================

    const request: SavePersonalInfoRequest = {
      employeeId:
        this.employeeState.employeeId,

      employeeGuid:
        this.employeeState.employeeGuid,

      firstName:
        formValue.firstName,

      middleName:
        formValue.middleName,

      lastName:
        formValue.lastName,

      suffixId:
        formValue.suffixId ?? '',

      dateOfBirth:
        formValue.dateOfBirth,

      genderId:
        formValue.genderId ?? '',

      civilStatusId:
        formValue.civilStatusId ?? '',

      imageUrl:
        formValue.imageUrl,
    };

    // ========================================
    // Call Service
    // ========================================

    this.personalInfoService
      .savePersonalInfo(request)
      .subscribe({
        next: (response) => {
          this.isSaving = false;

          if (!response.success) {
            this.errorMessage =
              response.message ??
              'Unable to save personal information.';

            return;
          }

          // ========================================
          // Update Employee
          // ========================================

          this.employee = response.data;

          // ========================================
          // Update Shared Employee State
          // ========================================

          this.employeeState.employeeId =
            response.data.employeeId;

          this.employeeState.employeeGuid =
            response.data.employeeGuid;

          // ========================================
          // Update Form
          // ========================================

          this.personalInfoForm.patchValue({
            firstName:
              response.data.firstName,

            middleName:
              response.data.middleName ?? '',

            lastName:
              response.data.lastName,

            suffixId:
              response.data.suffixId,

            dateOfBirth:
              response.data.dateOfBirth,

            genderId:
              response.data.genderId,

            civilStatusId:
              response.data.civilStatusId,

            imageUrl:
              response.data.imageUrl,
          });

          // ========================================
          // Update Original Snapshot
          // ========================================

          this.originalEmployee = {
            ...response.data,
          };

          // ========================================
          // Reset Form State
          // ========================================

          this.personalInfoForm.markAsPristine();
          this.personalInfoForm.markAsUntouched();

          // ========================================
          // Exit Edit Mode
          // ========================================

          this.isEditing = false;

          this.personalInfoForm.disable();

          // ========================================
          // Success Message
          // ========================================

          this.successMessage =
            response.message ??
            'Personal information saved successfully.';
        },

        error: (error) => {
          this.isSaving = false;

          this.errorMessage =
            'An unexpected error occurred while saving.';

          console.error(error);
        },
      });
  }

  // ========================================
  // Load Personal Information
  // ========================================

  private loadPersonalInfo(
    employeeGuid: string,
  ): void {
    this.personalInfoService
      .getPersonalInfo(employeeGuid)
      .subscribe({
        next: (employee) => {
          if (!employee) {
            this.isEditing = false;
            this.personalInfoForm.disable();
            return;
          }

          // Store employee
          this.employee = employee;

          // Update shared identifiers
          this.employeeState.employeeId =
            employee.employeeId;

          this.employeeState.employeeGuid =
            employee.employeeGuid;

          // Load values into form
          this.personalInfoForm.patchValue({
            firstName:
              employee.firstName,

            middleName:
              employee.middleName ?? '',

            lastName:
              employee.lastName,

            suffixId:
              employee.suffixId,

            dateOfBirth:
              employee.dateOfBirth,

            genderId:
              employee.genderId,

            civilStatusId:
              employee.civilStatusId,

            imageUrl:
              employee.imageUrl,
          });

          // Save original copy for Cancel
          this.originalEmployee = {
            ...employee,
          };

          this.personalInfoForm.markAsPristine();
          this.personalInfoForm.markAsUntouched();

          // Existing employee defaults to view mode
          this.isEditing = false;

          this.personalInfoForm.disable();
        },

        error: (error) => {
          this.errorMessage =
            'Unable to load personal information.';

          this.isEditing = false;
          this.personalInfoForm.disable();

          console.error(error);
        },
      });
  }

  // ========================================
  // Reference Label Helper
  // ========================================

  getReferenceLabel(
    options: CxpSelectOption[],
    selectedValue: CxpSelectPrimitive | null,
  ): string {
    if (selectedValue === null) {
      return '—';
    }

    return (
      options.find(
        (option) =>
          option.value === selectedValue,
      )?.label ?? '—'
    );
  }
}
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
import { EMPLOYEE_PERMISSIONS } from '../../../../../core/authorization/permissions/employee-permissions';

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

  private readonly userAccessService = inject(UserAccessService);

  readonly permissions = EMPLOYEE_PERMISSIONS.personalInfo;

  // ========================================
  // Permissions
  // ========================================

  get canCreate(): boolean {
    return this.userAccessService.hasPermission(
      this.permissions.create,
    );
  }

  get canRead(): boolean {
    return this.userAccessService.hasPermission(
      this.permissions.read,
    );
  }

  get canUpdate(): boolean {
    return this.userAccessService.hasPermission(
      this.permissions.update,
    );
  }

  get canDelete(): boolean {
    return this.userAccessService.hasPermission(
      this.permissions.delete,
    );
  }

  // ========================================
  // Employee State
  // ========================================

  get isNewEmployee(): boolean {
    return !this.employeeState.employeeGuid;
  }

  get canModify(): boolean {
    return this.isNewEmployee
      ? this.canCreate
      : this.canUpdate;
  }

  get canAccess(): boolean {
    if (this.isNewEmployee) {
      return this.canCreate || this.canRead;
    }

    return this.canRead;
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

    console.log('PersonalInfo Init');
    console.log('employeeGuid:', this.employeeState.employeeGuid);
    console.log('isNewEmployee:', this.isNewEmployee);
    console.log('canCreate:', this.canCreate);
    console.log('canRead:', this.canRead);
    console.log('canUpdate:', this.canUpdate);
    console.log('canModify:', this.canModify);

    this.loadReferences();

    if (this.employeeState.employeeGuid) {
      this.loadPersonalInfo(
        this.employeeState.employeeGuid,
      );
    }
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
          console.log(
            'Personal Info Reference Options:',
            options,
          );

          this.suffixOptions =
            options.suffixOptions ?? [];

          this.genderOptions =
            options.genderOptions ?? [];

          this.civilStatusOptions =
            options.civilStatusOptions ?? [];

          console.log(
            'Suffix Options:',
            this.suffixOptions,
          );

          console.log(
            'Gender Options:',
            this.genderOptions,
          );

          console.log(
            'Civil Status Options:',
            this.civilStatusOptions,
          );

          // ========================================
          // Suffix is optional.
          // Only required reference lists are checked.
          // ========================================

          this.referencesLoaded =
            this.genderOptions.length > 0 &&
            this.civilStatusOptions.length > 0;

          console.log(
            'referencesLoaded:',
            this.referencesLoaded,
          );

          this.isLoading = false;

          this.updateFormState();
        },

        error: (error) => {
          console.error(
            'Failed to load reference data:',
            error,
          );

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
    console.log(
      'updateFormState:',
      {
        referencesLoaded:
          this.referencesLoaded,
        isEditing:
          this.isEditing,
        canModify:
          this.canModify,
      },
    );

    if (
      this.referencesLoaded &&
      this.isEditing &&
      this.canModify
    ) {
      this.personalInfoForm.enable();
      return;
    }

    this.personalInfoForm.disable();
  }

  // ========================================
  // Add / Edit / Save
  // ========================================

  onEditSave(): void {
    console.log('onEditSave called');
    console.log('isEditing:', this.isEditing);
    console.log('isNewEmployee:', this.isNewEmployee);
    console.log('canCreate:', this.canCreate);
    console.log('canUpdate:', this.canUpdate);
    console.log('canModify:', this.canModify);
    console.log(
      'referencesLoaded:',
      this.referencesLoaded,
    );

    if (!this.canModify) {
      this.personalInfoForm.disable();
      this.isEditing = false;

      this.errorMessage = this.isNewEmployee
        ? 'You do not have permission to create personal information.'
        : 'You do not have permission to update personal information.';

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
    console.log('startEdit called');

    console.log({
      canCreate: this.canCreate,
      canUpdate: this.canUpdate,
      canModify: this.canModify,
      isNewEmployee: this.isNewEmployee,
      referencesLoaded: this.referencesLoaded,
      genderOptions: this.genderOptions,
      civilStatusOptions: this.civilStatusOptions,
      suffixOptions: this.suffixOptions,
    });

    if (!this.canModify) {
      this.personalInfoForm.disable();
      this.isEditing = false;

      this.errorMessage = this.isNewEmployee
        ? 'You do not have permission to create personal information.'
        : 'You do not have permission to update personal information.';

      return;
    }

    if (!this.referencesLoaded) {
      this.personalInfoForm.disable();
      this.isEditing = false;

      this.errorMessage =
        'Reference data is not yet available.';

      console.error(
        'Cannot enter edit mode because referencesLoaded is false.',
      );

      return;
    }

    this.errorMessage = '';
    this.successMessage = '';

    // ========================================
    // Switch UI to Edit Mode
    // ========================================

    this.isEditing = true;

    console.log(
      'isEditing changed to:',
      this.isEditing,
    );

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
    } else {
      this.personalInfoForm.reset({
        firstName: '',
        middleName: '',
        lastName: '',
        suffixId: null,
        dateOfBirth: '',
        genderId: null,
        civilStatusId: null,
        imageUrl: null,
      });
    }

    this.personalInfoForm.markAsPristine();
    this.personalInfoForm.markAsUntouched();

    this.isEditing = false;

    this.personalInfoForm.disable();

    this.errorMessage = '';
    this.successMessage = '';

    console.log(
      'Edit cancelled. isEditing:',
      this.isEditing,
    );
  }

  // ========================================
  // Save Personal Information
  // ========================================

  savePersonalInfo(): void {
    // ========================================
    // Permission Check
    // ========================================

    if (!this.canModify) {
      this.personalInfoForm.disable();
      this.isEditing = false;

      this.errorMessage = this.isNewEmployee
        ? 'You do not have permission to create personal information.'
        : 'You do not have permission to update personal information.';

      return;
    }

    // ========================================
    // Prevent Duplicate Requests
    // ========================================

    if (this.isSaving) {
      return;
    }

    // ========================================
    // Validation
    // ========================================

    this.personalInfoForm.markAllAsTouched();

    if (this.personalInfoForm.invalid) {
      this.errorMessage =
        'Please fill in all required fields before saving.';

      return;
    }

    this.errorMessage = '';
    this.successMessage = '';
    this.isSaving = true;

    // ========================================
    // Form Values
    // ========================================

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
        formValue.suffixId,

      dateOfBirth:
        formValue.dateOfBirth,

      genderId:
        formValue.genderId,

      civilStatusId:
        formValue.civilStatusId,

      imageUrl:
        formValue.imageUrl,
    };

    console.log(
      'Save Personal Info Request:',
      request,
    );

    // ========================================
    // Call Service
    // ========================================

    this.personalInfoService
      .savePersonalInfo(request)
      .subscribe({
        next: (response) => {
          this.isSaving = false;

          console.log(
            'Save Personal Info Response:',
            response,
          );

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
          // Original Snapshot
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
          // Success
          // ========================================

          this.successMessage =
            response.message ??
            'Personal information saved successfully.';
        },

        error: (error) => {
          this.isSaving = false;

          this.errorMessage =
            'An unexpected error occurred while saving.';

          console.error(
            'Failed to save personal information:',
            error,
          );
        },
      });
  }

  // ========================================
  // Load Personal Information
  // ========================================

  private loadPersonalInfo(
    employeeGuid: string,
  ): void {
    // ========================================
    // Permission
    // ========================================

    if (!this.canRead) {
      this.isEditing = false;

      this.personalInfoForm.disable();

      this.errorMessage =
        'You do not have permission to read personal information.';

      return;
    }

    this.personalInfoService
      .getPersonalInfo(employeeGuid)
      .subscribe({
        next: (employee) => {
          console.log(
            'Personal Info Loaded:',
            employee,
          );

          if (!employee) {
            this.isEditing = false;

            this.personalInfoForm.disable();

            return;
          }

          // ========================================
          // Store Employee
          // ========================================

          this.employee = employee;

          // ========================================
          // Shared State
          // ========================================

          this.employeeState.employeeId =
            employee.employeeId;

          this.employeeState.employeeGuid =
            employee.employeeGuid;

          // ========================================
          // Populate Form
          // ========================================

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

          // ========================================
          // Original Snapshot
          // ========================================

          this.originalEmployee = {
            ...employee,
          };

          this.personalInfoForm.markAsPristine();
          this.personalInfoForm.markAsUntouched();

          // ========================================
          // Existing Employee = View Mode
          // ========================================

          this.isEditing = false;

          this.personalInfoForm.disable();
        },

        error: (error) => {
          this.errorMessage =
            'Unable to load personal information.';

          this.isEditing = false;

          this.personalInfoForm.disable();

          console.error(
            'Failed to load personal information:',
            error,
          );
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
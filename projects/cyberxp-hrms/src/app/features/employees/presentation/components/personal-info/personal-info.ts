import {
  Component,
  OnInit,
  inject,
} from '@angular/core';

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

import {
  EmployeeState,
} from '../../../state/employee-state.service';

import {
  PersonalInfoService,
} from '../../../business/services/personal-info.service';

import {
  UserAccessService,
} from '../../../../../core/authorization/services/user-access.services';

import {
  EMPLOYEE_PERMISSIONS,
} from '../../../../../core/authorization/permissions/employee-permissions';

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
  // ========================================
  // Dependencies
  // ========================================

  private readonly userAccessService =
    inject(UserAccessService);

  private readonly personalInfoService =
    inject(PersonalInfoService);

  public readonly employeeState =
    inject(EmployeeState);

  // ========================================
  // Permissions
  // ========================================

  readonly permissions =
    EMPLOYEE_PERMISSIONS.personalInfo;

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
    return !this.employeeState.employeeGuid();
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
        validators: [
          Validators.required,
        ],
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
        validators: [
          Validators.required,
        ],
      },
    ),

    suffixId:
      new FormControl<string | null>({
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
        validators: [
          Validators.required,
        ],
      },
    ),

    genderId:
      new FormControl<string | null>(
        {
          value: null,
          disabled: false,
        },
        {
          validators: [
            Validators.required,
          ],
        },
      ),

    civilStatusId:
      new FormControl<string | null>(
        {
          value: null,
          disabled: false,
        },
        {
          validators: [
            Validators.required,
          ],
        },
      ),

    imageUrl:
      new FormControl<string | null>({
        value: null,
        disabled: false,
      }),
  });

  // ========================================
  // Reference Data
  // ========================================

  private referencesLoaded = false;

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

  private originalEmployee:
    PersonalInformation | null = null;

  // ========================================
  // Employee Data
  // ========================================

  employee: PersonalInformation = {
    employeeId: null,
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

  // ========================================
  // Init
  // ========================================

  ngOnInit(): void {
    this.personalInfoForm.disable();

    console.log(
      'PersonalInfo Init',
    );

    console.log(
      'Employee Data:',
      this.employeeState.employeeData(),
    );

    console.log(
      'Employee ID:',
      this.employeeState.employeeId(),
    );

    console.log(
      'Employee GUID:',
      this.employeeState.employeeGuid(),
    );

    console.log(
      'Is New Employee:',
      this.isNewEmployee,
    );

    console.log(
      'Can Create:',
      this.canCreate,
    );

    console.log(
      'Can Read:',
      this.canRead,
    );

    console.log(
      'Can Update:',
      this.canUpdate,
    );

    console.log(
      'Can Modify:',
      this.canModify,
    );

    // ========================================
    // Load References
    // ========================================

    this.loadReferences();

    // ========================================
    // Load From Employee State
    // ========================================

    this.loadPersonalInfo();
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
          // Suffix is Optional
          // ========================================

          this.referencesLoaded =
            this.genderOptions.length > 0 &&
            this.civilStatusOptions.length > 0;

          console.log(
            'References Loaded:',
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
      'Update Form State:',
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
  // Edit / Save
  // ========================================

  onEditSave(): void {
    console.log(
      'onEditSave called',
    );

    console.log(
      'isEditing:',
      this.isEditing,
    );

    console.log(
      'isNewEmployee:',
      this.isNewEmployee,
    );

    console.log(
      'canCreate:',
      this.canCreate,
    );

    console.log(
      'canUpdate:',
      this.canUpdate,
    );

    console.log(
      'canModify:',
      this.canModify,
    );

    console.log(
      'referencesLoaded:',
      this.referencesLoaded,
    );

    if (!this.canModify) {
      this.personalInfoForm.disable();

      this.isEditing = false;

      this.errorMessage =
        this.isNewEmployee
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
    console.log(
      'startEdit called',
    );

    console.log({
      canCreate:
        this.canCreate,

      canUpdate:
        this.canUpdate,

      canModify:
        this.canModify,

      isNewEmployee:
        this.isNewEmployee,

      referencesLoaded:
        this.referencesLoaded,

      genderOptions:
        this.genderOptions,

      civilStatusOptions:
        this.civilStatusOptions,

      suffixOptions:
        this.suffixOptions,
    });

    if (!this.canModify) {
      this.personalInfoForm.disable();

      this.isEditing = false;

      this.errorMessage =
        this.isNewEmployee
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
    // Save Snapshot
    // ========================================

    this.originalEmployee = {
      ...this.employee,
    };

    // ========================================
    // Enter Edit Mode
    // ========================================

    this.isEditing = true;

    this.personalInfoForm.enable();

    console.log(
      'isEditing changed to:',
      this.isEditing,
    );
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

    this.personalInfoForm
      .markAsPristine();

    this.personalInfoForm
      .markAsUntouched();

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
    // Permission
    // ========================================

    if (!this.canModify) {
      this.personalInfoForm.disable();

      this.isEditing = false;

      this.errorMessage =
        this.isNewEmployee
          ? 'You do not have permission to create personal information.'
          : 'You do not have permission to update personal information.';

      return;
    }

    // ========================================
    // Prevent Duplicate Save
    // ========================================

    if (this.isSaving) {
      return;
    }

    // ========================================
    // Validation
    // ========================================

    this.personalInfoForm
      .markAllAsTouched();

    if (
      this.personalInfoForm.invalid
    ) {
      this.errorMessage =
        'Please fill in all required fields before saving.';

      return;
    }

    this.errorMessage = '';
    this.successMessage = '';

    this.isSaving = true;

    // ========================================
    // Form Value
    // ========================================

    const formValue =
      this.personalInfoForm
        .getRawValue();

    // ========================================
    // Build Request
    // ========================================

    const request:
      SavePersonalInfoRequest = {

      employeeId:
        this.employeeState.employeeId(),

      employeeGuid:
        this.employeeState.employeeGuid(),

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
    // Save
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
          // EmployeeData Response
          // ========================================

          const personalInfo =
            response.data.personalInfo;

          console.log(
            'Saved Personal Info:',
            personalInfo,
          );

          // ========================================
          // EmployeeState Was Updated
          // By PersonalInfoService
          // ========================================

          console.log(
            'Employee State:',
            this.employeeState.employeeData(),
          );

          console.log(
            'Employee ID:',
            this.employeeState.employeeId(),
          );

          console.log(
            'Employee GUID:',
            this.employeeState.employeeGuid(),
          );

          // ========================================
          // Update Local Component
          // ========================================

          this.setPersonalInfo(
            personalInfo,
          );

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

  private loadPersonalInfo(): void {
    const personalInfo =
      this.employeeState
        .employeeData()
        ?.personalInfo;

    // ========================================
    // New Employee
    // ========================================

    if (!personalInfo) {
      console.log(
        'No Personal Info in EmployeeState.',
      );

      this.employee = {
        employeeId: null,
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

      this.originalEmployee = null;

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

      this.personalInfoForm
        .markAsPristine();

      this.personalInfoForm
        .markAsUntouched();

      this.isEditing = false;

      this.personalInfoForm.disable();

      return;
    }

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

    console.log(
      'Personal Info Loaded From EmployeeState:',
      personalInfo,
    );

    this.setPersonalInfo(
      personalInfo,
    );
  }

  // ========================================
  // Set Personal Information
  // ========================================

  private setPersonalInfo(
    personalInfo: PersonalInformation,
  ): void {
    // ========================================
    // Local Employee
    // ========================================

    this.employee = {
      ...personalInfo,
    };

    // ========================================
    // Populate Form
    // ========================================

    this.personalInfoForm.patchValue({
      firstName:
        personalInfo.firstName,

      middleName:
        personalInfo.middleName ?? '',

      lastName:
        personalInfo.lastName,

      suffixId:
        personalInfo.suffixId,

      dateOfBirth:
        personalInfo.dateOfBirth,

      genderId:
        personalInfo.genderId,

      civilStatusId:
        personalInfo.civilStatusId,

      imageUrl:
        personalInfo.imageUrl,
    });

    // ========================================
    // Original Snapshot
    // ========================================

    this.originalEmployee = {
      ...personalInfo,
    };

    // ========================================
    // Form State
    // ========================================

    this.personalInfoForm
      .markAsPristine();

    this.personalInfoForm
      .markAsUntouched();

    // ========================================
    // View Mode
    // ========================================

    this.isEditing = false;

    this.personalInfoForm.disable();
  }

  // ========================================
  // Reference Label Helper
  // ========================================

  getReferenceLabel(
    options: CxpSelectOption[],
    selectedValue:
      CxpSelectPrimitive | null,
  ): string {
    if (selectedValue === null) {
      return '—';
    }

    return (
      options.find(
        (option) =>
          option.value ===
          selectedValue,
      )?.label ?? '—'
    );
  }
}
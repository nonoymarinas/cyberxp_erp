
import {
  Component,
  DestroyRef,
  OnInit,
  inject,
} from '@angular/core';

import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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

import { EmployeeState } from
  '../../../../employees/state/employee-state.service';

import { PersonalInfoService } from
  '../../../../employees/business/services/personal-info.service';

import { PersonalInfoRefService } from
  '../../../../employees/business/services/personal-info-ref.service';

import { UserAccessService } from
  '../../../../../core/authorization/services/user-access.services';

import { EMPLOYEE_PERMISSIONS } from
  '../../../../../core/authorization/permissions/employee-permissions';

import {
  PersonalInfo,
  SavePersonalInfoRequest,
} from '../../../models/personal-info/personal-info.model';

import { NewEmployeeStateService } from
  '../../../state/new-employee-state.service';


@Component({
  selector: 'personal',
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

  templateUrl: './personal.html',
  styleUrl: './personal.css',

  // State service is provided by NewEmployeePage.
})
export class PersonalComponent implements OnInit {

  // ========================================
  // Dependencies
  // ========================================

  private readonly destroyRef =
    inject(DestroyRef);

  private readonly userAccessService =
    inject(UserAccessService);

  private readonly personalInfoService =
    inject(PersonalInfoService);

  private readonly personalInfoRefService =
    inject(PersonalInfoRefService);

  private readonly newEmployeeState =
    inject(NewEmployeeStateService);

  public readonly employeeState =
    inject(EmployeeState);


  // ========================================
  // Permissions
  // ========================================

  readonly permissions =
    EMPLOYEE_PERMISSIONS.personalInfo;

  get canCreate(): boolean {
    return this.userAccessService.hasPermission(
      this.permissions.create
    );
  }

  get canRead(): boolean {
    return this.userAccessService.hasPermission(
      this.permissions.read
    );
  }

  get canUpdate(): boolean {
    return this.userAccessService.hasPermission(
      this.permissions.update
    );
  }

  get canDelete(): boolean {
    return this.userAccessService.hasPermission(
      this.permissions.delete
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

    firstName: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),

    middleName: new FormControl('', {
      nonNullable: true,
    }),

    lastName: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),

    suffixId: new FormControl<string | null>(null),

    dateOfBirth: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),

    genderId: new FormControl<string | null>(
      null,
      Validators.required
    ),

    civilStatusId: new FormControl<string | null>(
      null,
      Validators.required
    ),

    imageUrl: new FormControl<string | null>(null),
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
  // Employee Data
  // ========================================

  private originalEmployee: PersonalInfo | null = null;

  employee: PersonalInfo = this.emptyPersonalInfo();


  // ========================================
  // Empty Personal Information
  // ========================================

  private emptyPersonalInfo(): PersonalInfo {
    return {
      employeeNumber: null,
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
  }


  // ========================================
  // Initialization
  // ========================================

  ngOnInit(): void {

    // Disable until reference data is ready.
    this.personalInfoForm.disable({
      emitEvent: false,
    });

    // Watch form changes and preserve draft.
    this.watchFormValidity();

    // Load employee or restore draft.
    this.loadPersonalInfo();

    // Load select reference options.
    this.loadReferences();
  }


  // ========================================
  // Watch Form Changes
  // ========================================

  private watchFormValidity(): void {

    this.personalInfoForm.valueChanges
      .pipe(
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => {

        if (!this.isNewEmployee) {
          return;
        }

        // Save draft even when incomplete.
        this.syncPersonalDraft();

        // Update form validity.
        this.syncWizardValidity();
      });
  }


  // ========================================
  // Save Personal Draft
  // ========================================

  private syncPersonalDraft(): void {

    if (!this.isNewEmployee) {
      return;
    }

    const value =
      this.personalInfoForm.getRawValue();

    const draft: PersonalInfo = {
      employeeNumber: null,
      employeeGuid: null,
      firstName: value.firstName,
      middleName: value.middleName,
      lastName: value.lastName,
      suffixId: value.suffixId,
      dateOfBirth: value.dateOfBirth,
      genderId: value.genderId,
      civilStatusId: value.civilStatusId,
      imageUrl: value.imageUrl,
    };

    this.newEmployeeState.setPersonalDraft(draft);
  }


  // ========================================
  // Restore Personal Draft
  // ========================================

  private restorePersonalDraft(): boolean {

    if (!this.isNewEmployee) {
      return false;
    }

    const draft =
      this.newEmployeeState.personalDraft();

    if (!draft) {
      return false;
    }

    this.employee = { ...draft };

    this.personalInfoForm.reset(
      {
        firstName: draft.firstName,
        middleName: draft.middleName ?? '',
        lastName: draft.lastName,
        suffixId: draft.suffixId,
        dateOfBirth: draft.dateOfBirth ?? '',
        genderId: draft.genderId,
        civilStatusId: draft.civilStatusId,
        imageUrl: draft.imageUrl,
      },
      {
        emitEvent: false,
      }
    );

    this.personalInfoForm.markAsPristine();
    this.personalInfoForm.markAsUntouched();

    this.isEditing = true;

    this.updateFormState();

    return true;
  }


  // ========================================
  // Synchronize Wizard Validity
  // ========================================

  private syncWizardValidity(): void {

    if (!this.isNewEmployee) {
      return;
    }

    const valid =
      this.referencesLoaded &&
      this.canModify &&
      this.personalInfoForm.enabled &&
      this.personalInfoForm.valid;

    this.newEmployeeState.setValid(
      'personal-info',
      valid
    );
  }


  // ========================================
  // Load Reference Data
  // ========================================

  loadReferences(): void {

    this.isLoading = true;
    this.errorMessage = '';

    this.personalInfoRefService
      .getReferenceOptions()
      .pipe(
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({

        next: options => {

          this.suffixOptions =
            options.suffixOptions ?? [];

          this.genderOptions =
            options.genderOptions ?? [];

          this.civilStatusOptions =
            options.civilStatusOptions ?? [];

          this.referencesLoaded =
            this.genderOptions.length > 0 &&
            this.civilStatusOptions.length > 0;

          this.isLoading = false;

          this.updateFormState();

          this.syncWizardValidity();
        },

        error: error => {

          console.error(
            'Failed to load reference data:',
            error
          );

          this.referencesLoaded = false;
          this.isLoading = false;

          this.errorMessage =
            'Unable to load reference data.';

          this.personalInfoForm.disable({
            emitEvent: false,
          });

          if (this.isNewEmployee) {
            this.newEmployeeState.setValid(
              'personal-info',
              false
            );
          }
        },
      });
  }


  // ========================================
  // Update Form State
  // ========================================

  private updateFormState(): void {

    if (
      this.referencesLoaded &&
      this.isEditing &&
      this.canModify
    ) {

      this.personalInfoForm.enable({
        emitEvent: false,
      });

      this.personalInfoForm.updateValueAndValidity({
        emitEvent: false,
      });

      return;
    }

    this.personalInfoForm.disable({
      emitEvent: false,
    });
  }


  // ========================================
  // Edit / Save Button
  // Existing Employee
  // ========================================

  onEditSave(): void {

    if (this.isNewEmployee) {
      return;
    }

    if (!this.canModify) {

      this.personalInfoForm.disable({
        emitEvent: false,
      });

      this.isEditing = false;

      this.errorMessage =
        'You do not have permission to update personal information.';

      return;
    }

    if (this.isEditing) {
      this.savePersonalInfo();
      return;
    }

    this.startEdit();
  }


  // ========================================
  // Start Editing
  // ========================================

  startEdit(): void {

    if (!this.canModify) {

      this.personalInfoForm.disable({
        emitEvent: false,
      });

      this.isEditing = false;

      this.errorMessage =
        this.isNewEmployee
          ? 'You do not have permission to create personal information.'
          : 'You do not have permission to update personal information.';

      return;
    }

    if (!this.referencesLoaded) {

      this.personalInfoForm.disable({
        emitEvent: false,
      });

      this.isEditing = false;

      this.errorMessage =
        'Reference data is not yet available.';

      return;
    }

    this.errorMessage = '';
    this.successMessage = '';

    this.originalEmployee = {
      ...this.employee,
    };

    this.isEditing = true;

    this.updateFormState();

    this.syncWizardValidity();
  }


  // ========================================
  // Cancel Editing
  // Existing Employee
  // ========================================

  cancelEdit(): void {

    if (this.isNewEmployee) {
      return;
    }

    if (this.originalEmployee) {

      this.personalInfoForm.reset(
        {
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
        },
        {
          emitEvent: false,
        }
      );
    }

    this.personalInfoForm.markAsPristine();
    this.personalInfoForm.markAsUntouched();

    this.isEditing = false;

    this.personalInfoForm.disable({
      emitEvent: false,
    });

    this.errorMessage = '';
    this.successMessage = '';
  }


  // ========================================
  // Save Personal Information
  // Existing Employee Only
  // ========================================

  savePersonalInfo(): void {

    if (this.isNewEmployee) {
      return;
    }

    if (!this.canModify) {

      this.personalInfoForm.disable({
        emitEvent: false,
      });

      this.isEditing = false;

      this.errorMessage =
        'You do not have permission to update personal information.';

      return;
    }

    if (this.isSaving) {
      return;
    }

    this.personalInfoForm.markAllAsTouched();

    if (this.personalInfoForm.invalid) {

      this.errorMessage =
        'Please fill in all required fields before saving.';

      return;
    }

    this.errorMessage = '';
    this.successMessage = '';
    this.isSaving = true;

    const value =
      this.personalInfoForm.getRawValue();

    const request: SavePersonalInfoRequest = {

      employeeGuid:
        this.employeeState.employeeGuid(),

      firstName: value.firstName,

      middleName: value.middleName,

      lastName: value.lastName,

      suffixId: value.suffixId,

      dateOfBirth: value.dateOfBirth,

      genderId: value.genderId,

      civilStatusId: value.civilStatusId,

      imageUrl: value.imageUrl,

      userId: null,
    };

    this.personalInfoService
      .savePersonalInfo(request)
      .pipe(
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({

        next: response => {

          this.isSaving = false;

          if (!response.success) {

            this.errorMessage =
              response.message ??
              'Unable to save personal information.';

            return;
          }

          const personalInfo =
            response.data.personalInfo;

          this.setPersonalInfo(personalInfo);

          this.successMessage =
            response.message ??
            'Personal information saved successfully.';
        },

        error: error => {

          this.isSaving = false;

          this.errorMessage =
            'An unexpected error occurred while saving.';

          console.error(
            'Failed to save personal information:',
            error
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

    // ======================================
    // New Employee
    // ======================================

    if (this.isNewEmployee) {

      // Try restoring the saved draft first.
      if (this.restorePersonalDraft()) {
        this.syncWizardValidity();
        return;
      }

      // No draft exists.
      // Initialize a blank form.
      this.employee =
        this.emptyPersonalInfo();

      this.originalEmployee = null;

      this.personalInfoForm.reset(
        {
          firstName: '',
          middleName: '',
          lastName: '',
          suffixId: null,
          dateOfBirth: '',
          genderId: null,
          civilStatusId: null,
          imageUrl: null,
        },
        {
          emitEvent: false,
        }
      );

      this.personalInfoForm.markAsPristine();
      this.personalInfoForm.markAsUntouched();

      // New employee starts in edit mode.
      this.isEditing = true;

      this.updateFormState();

      this.newEmployeeState.setValid(
        'personal-info',
        false
      );

      return;
    }

    // ======================================
    // Existing Employee
    // ======================================

    if (!this.canRead) {

      this.isEditing = false;

      this.personalInfoForm.disable({
        emitEvent: false,
      });

      this.errorMessage =
        'You do not have permission to read personal information.';

      return;
    }

    if (!personalInfo) {

      this.isEditing = false;

      this.personalInfoForm.disable({
        emitEvent: false,
      });

      this.errorMessage =
        'Employee personal information is unavailable.';

      return;
    }

    this.setPersonalInfo(personalInfo);
  }


  // ========================================
  // Set Existing Personal Information
  // ========================================

  private setPersonalInfo(
    personalInfo: PersonalInfo
  ): void {

    this.employee = {
      ...personalInfo,
    };

    this.personalInfoForm.patchValue(
      {
        firstName:
          personalInfo.firstName,

        middleName:
          personalInfo.middleName ?? '',

        lastName:
          personalInfo.lastName,

        suffixId:
          personalInfo.suffixId,

        dateOfBirth:
          personalInfo.dateOfBirth ?? '',

        genderId:
          personalInfo.genderId,

        civilStatusId:
          personalInfo.civilStatusId,

        imageUrl:
          personalInfo.imageUrl,
      },
      {
        emitEvent: false,
      }
    );

    this.originalEmployee = {
      ...personalInfo,
    };

    this.personalInfoForm.markAsPristine();
    this.personalInfoForm.markAsUntouched();

    this.isEditing = false;

    this.personalInfoForm.disable({
      emitEvent: false,
    });
  }


  // ========================================
  // Reference Label Helper
  // ========================================

  getReferenceLabel(
    options: CxpSelectOption[],
    selectedValue: CxpSelectPrimitive | null
  ): string {

    if (selectedValue === null) {
      return '—';
    }

    return (
      options.find(
        option =>
          option.value === selectedValue
      )?.label ?? '—'
    );
  }
}

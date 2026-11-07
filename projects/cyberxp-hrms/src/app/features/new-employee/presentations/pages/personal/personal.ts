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

import { EmployeeState } from '../../../../employees/state/employee-state.service';

import { PersonalInfoService } from '../../../../employees/business/services/personal-info.service';

import { PersonalInfoRefService } from '../../../../employees/business/services/personal-info-ref.service';

import { UserAccessService } from '../../../../../core/authorization/services/user-access.services';

import { EMPLOYEE_PERMISSIONS } from '../../../../../core/authorization/permissions/employee-permissions';

import {
  PersonalInfo,
  SavePersonalInfoRequest,
} from '../../../models/personal-info/personal-info.model';

import { NewEmployeeStateService } from '../../../business/sevices/new-employee-state.service';



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

  // IMPORTANT:
  // Do NOT provide NewEmployeeStateService here.
  // It must come from NewEmployeePage.
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
        validators: [
          Validators.required,
        ],
      },
    ),

    genderId: new FormControl<string | null>(
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

    civilStatusId: new FormControl<string | null>(
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

    imageUrl: new FormControl<string | null>({
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

  private originalEmployee: PersonalInfo | null =
    null;


  // ========================================
  // Employee Data
  // ========================================

  employee: PersonalInfo = {

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


  // ========================================
  // Init
  // ========================================

  ngOnInit(): void {

    // Start disabled while reference
    // data is loading.
    this.personalInfoForm.disable({
      emitEvent: false,
    });


    // Listen to every form value change.
    this.watchFormValidity();


    // Load Personal Info state first.
    this.loadPersonalInfo();


    // Load reference/select data.
    this.loadReferences();
  }


  // ========================================
  // Watch Form Validity
  // ========================================

  private watchFormValidity(): void {

    this.personalInfoForm.valueChanges
      .pipe(
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => {

        if (!this.isNewEmployee) {
          return;
        }

        this.syncWizardValidity();
      });
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
      valid,
    );


    // Temporary debugging.
    // Remove these logs after testing.
    console.log(
      'Personal form valid:',
      this.personalInfoForm.valid,
    );

    console.log(
      'Personal wizard valid:',
      valid,
    );

    console.log({
      firstName:
        this.personalInfoForm.controls.firstName.valid,

      middleName:
        this.personalInfoForm.controls.middleName.valid,

      lastName:
        this.personalInfoForm.controls.lastName.valid,

      suffixId:
        this.personalInfoForm.controls.suffixId.valid,

      dateOfBirth:
        this.personalInfoForm.controls.dateOfBirth.valid,

      genderId:
        this.personalInfoForm.controls.genderId.valid,

      civilStatusId:
        this.personalInfoForm.controls.civilStatusId.valid,

      imageUrl:
        this.personalInfoForm.controls.imageUrl.valid,
    });
  }


  // ========================================
  // Reference Data
  // ========================================

  loadReferences(): void {

    this.isLoading = true;

    this.errorMessage = '';


    this.personalInfoRefService
      .getReferenceOptions()
      .subscribe({

        next: (options) => {

          this.suffixOptions =
            options.suffixOptions ?? [];

          this.genderOptions =
            options.genderOptions ?? [];

          this.civilStatusOptions =
            options.civilStatusOptions ?? [];


          // Suffix is optional.
          // Gender and Civil Status
          // reference data are required.
          this.referencesLoaded =
            this.genderOptions.length > 0 &&
            this.civilStatusOptions.length > 0;


          this.isLoading = false;


          this.updateFormState();


          // Synchronize after enabling
          // the form.
          this.syncWizardValidity();
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


          this.personalInfoForm.disable({
            emitEvent: false,
          });


          if (this.isNewEmployee) {

            this.newEmployeeState.setValid(
              'personal-info',
              false,
            );
          }
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
  // Edit / Save
  // Existing Employee
  // ========================================

  onEditSave(): void {

    // New Employee is controlled by
    // Previous / Next in the parent.
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
  // Start Edit
  // Existing Employee
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


    this.personalInfoForm.enable({
      emitEvent: false,
    });


    this.personalInfoForm.updateValueAndValidity({
      emitEvent: false,
    });
  }


  // ========================================
  // Cancel Edit
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
        },
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
  // Existing Employee
  // ========================================

  savePersonalInfo(): void {

    // New Employee does not save
    // Personal Info directly here.
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


    const formValue =
      this.personalInfoForm.getRawValue();


    const request: SavePersonalInfoRequest = {

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

      userId: null,
    };


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


          const personalInfo =
            response.data.personalInfo;


          this.setPersonalInfo(
            personalInfo,
          );


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

      this.employee = {

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
        },
      );


      this.personalInfoForm.markAsPristine();

      this.personalInfoForm.markAsUntouched();


      // New Employee opens immediately
      // in create/edit mode.
      this.isEditing = true;


      // At this point reference data may
      // not be loaded yet.
      this.updateFormState();


      // New Personal Info starts invalid.
      this.newEmployeeState.setValid(
        'personal-info',
        false,
      );


      return;
    }


    // ========================================
    // Existing Employee
    // ========================================

    if (!this.canRead) {

      this.isEditing = false;


      this.personalInfoForm.disable({
        emitEvent: false,
      });


      this.errorMessage =
        'You do not have permission to read personal information.';

      return;
    }


    this.setPersonalInfo(
      personalInfo,
    );
  }


  // ========================================
  // Set Personal Information
  // Existing Employee
  // ========================================

  private setPersonalInfo(
    personalInfo: PersonalInfo,
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
          personalInfo.dateOfBirth,

        genderId:
          personalInfo.genderId,

        civilStatusId:
          personalInfo.civilStatusId,

        imageUrl:
          personalInfo.imageUrl,
      },
      {
        emitEvent: false,
      },
    );


    this.originalEmployee = {
      ...personalInfo,
    };


    this.personalInfoForm.markAsPristine();

    this.personalInfoForm.markAsUntouched();


    // Existing Employee starts
    // in display/view mode.
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
    selectedValue: CxpSelectPrimitive | null,
  ): string {

    if (selectedValue === null) {
      return '—';
    }


    return (
      options.find(
        option =>
          option.value === selectedValue,
      )?.label ?? '—'
    );
  }
}
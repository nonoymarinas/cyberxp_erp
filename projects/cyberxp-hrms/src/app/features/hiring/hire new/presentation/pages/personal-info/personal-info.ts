
import {
  Component,
  DestroyRef,
  OnInit,
  computed,
  effect,
  inject,
  untracked,
} from '@angular/core';

import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import {
  takeUntilDestroyed,
} from '@angular/core/rxjs-interop';

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
// Models
// ========================================

import {
  PersonalInfo,
} from '../../../domain/models/personal-info/personal-info.model';

import {
  ReferenceItem,
} from '../../../../../../shared/models/reference-item.model';

// ========================================
// Application Services
// ========================================

import {
  NewEmployeeRefService,
} from '../../../../../../core/application/services/new-employee-ref.service';

// ========================================
// Application State
// ========================================

import {
  NewEmployeeStateService,
} from '../../../application/state/new-employee-state.service';

import {
  NewEmployeeRefStateService,
} from '../../../../../../core/application/states/new-employee-ref-state.service';

// ========================================
// Component
// ========================================

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
export class PersonalInfoComponent implements OnInit {

  // ========================================
  // Dependencies
  // ========================================

  private readonly destroyRef =
    inject(DestroyRef);

  private readonly userAccessService =
    inject(UserAccessService);

  private readonly newEmployeeRefService =
    inject(NewEmployeeRefService);

  // Public for Angular template access.
  readonly newEmployeeState =
    inject(NewEmployeeStateService);

  readonly newEmployeeRefState =
    inject(NewEmployeeRefStateService);

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
    return false;
  }

  get canDelete(): boolean {
    return false;
  }

  // ========================================
  // Employee Mode
  // ========================================

  readonly isNewEmployee = true;

  get canModify(): boolean {
    return this.canCreate;
  }

  get canAccess(): boolean {
    return this.canCreate;
  }

  // ========================================
  // Person Match Screening
  // ========================================

  readonly isScreeningLocked = computed(() =>
    this.newEmployeeState.hasPossibleMatch()
  );

  readonly isCheckingPersonMatch =
    this.newEmployeeState.isPersonMatchChecking;

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

    suffixId: new FormControl<string | null>(
      null
    ),

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

    imageUrl: new FormControl<string | null>(
      null
    ),
  });

  // ========================================
  // Reference State
  // ========================================

  readonly references =
    this.newEmployeeRefState.references;

  readonly referencesLoading =
    this.newEmployeeRefState.isLoading;

  readonly referencesError =
    this.newEmployeeRefState.errorMessage;

  // ========================================
  // Reference Options
  // ========================================

  readonly suffixOptions = computed<CxpSelectOption[]>(
    () => this.toSelectOptions(
      this.newEmployeeRefState.suffixes()
    )
  );

  readonly genderOptions = computed<CxpSelectOption[]>(
    () => this.toSelectOptions(
      this.newEmployeeRefState.genders()
    )
  );

  readonly civilStatusOptions = computed<CxpSelectOption[]>(
    () => this.toSelectOptions(
      this.newEmployeeRefState.civilStatuses()
    )
  );

  // ========================================
  // Component Status
  // ========================================

  isLoading = false;

  isEditing = true;

  isSaving = false;

  successMessage = '';

  errorMessage = '';

  // ========================================
  // Personal Information
  // ========================================

  employee: PersonalInfo =
    this.emptyPersonalInfo();

  // ========================================
  // Constructor
  // ========================================

  constructor() {

    // ======================================
    // Screening Lock Effect
    // ======================================

    effect(() => {

      this.isScreeningLocked();
      this.isCheckingPersonMatch();

      untracked(() => {
        this.updateFormState();
        this.syncWizardValidity();
      });
    });

    // ======================================
    // Reference State Effect
    // ======================================

    effect(() => {

      this.newEmployeeRefState.references();

      untracked(() => {
        this.updateFormState();
        this.syncWizardValidity();
      });
    });
  }

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

    this.personalInfoForm.disable({
      emitEvent: false,
    });

    this.watchFormValidity();

    this.loadPersonalInfo();

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

        if (
          this.isScreeningLocked() ||
          this.isCheckingPersonMatch()
        ) {
          return;
        }

        this.syncPersonalDraft();

        this.syncWizardValidity();
      });
  }

  // ========================================
  // Synchronize Personal Draft
  // ========================================

  private syncPersonalDraft(): void {

    if (
      this.isScreeningLocked() ||
      this.isCheckingPersonMatch()
    ) {
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

    // Identity changes are handled by
    // NewEmployeeStateService.

    this.newEmployeeState.setPersonalDraft(
      draft
    );
  }

  // ========================================
  // Restore Personal Draft
  // ========================================

  private restorePersonalDraft(): boolean {

    const draft =
      this.newEmployeeState.personalDraft();

    if (!draft) {
      return false;
    }

    this.employee = {
      ...this.emptyPersonalInfo(),
      ...draft,
    };

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

    return true;
  }

  // ========================================
  // Synchronize Wizard Validity
  // ========================================

  private syncWizardValidity(): void {

    // Preserve screening state while locked.

    if (
      this.isScreeningLocked() ||
      this.isCheckingPersonMatch()
    ) {
      return;
    }

    const valid =
      this.canModify &&
      this.hasRequiredReferences() &&
      this.personalInfoForm.enabled &&
      this.personalInfoForm.valid;

    this.newEmployeeState.setValid(
      'personal-info',
      valid
    );
  }

  // ========================================
  // Required Reference Check
  // ========================================

  private hasRequiredReferences(): boolean {

    return (
      this.newEmployeeRefState.genders().length > 0 &&
      this.newEmployeeRefState.civilStatuses().length > 0
    );
  }

  // ========================================
  // Load References
  // ========================================

  loadReferences(): void {

    this.isLoading = true;
    this.errorMessage = '';

    this.newEmployeeRefService
      .getReferences()
      .pipe(
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({

        next: () => {

          this.isLoading = false;

          this.updateFormState();

          this.syncWizardValidity();
        },

        error: (error: unknown) => {

          console.error(
            'Failed to load New Employee references:',
            error
          );

          this.isLoading = false;

          this.errorMessage =
            error instanceof Error
              ? error.message
              : 'Unable to load employee references.';

          this.updateFormState();

          if (
            !this.isScreeningLocked() &&
            !this.isCheckingPersonMatch()
          ) {
            this.newEmployeeState.setValid(
              'personal-info',
              false
            );
          }
        },
      });
  }

  // ========================================
  // Reference Item to Select Options
  // ========================================

  private toSelectOptions(
    items: readonly ReferenceItem<string>[]
  ): CxpSelectOption[] {

    return items.map(item => ({
      value: item.id,
      label: item.name,
      disabled: item.disabled ?? false,
    }));
  }

  // ========================================
  // Update Form State
  // ========================================

  private updateFormState(): void {

    // ======================================
    // Screening Lock
    // ======================================

    if (
      this.isScreeningLocked() ||
      this.isCheckingPersonMatch()
    ) {

      this.personalInfoForm.disable({
        emitEvent: false,
      });

      return;
    }

    // ======================================
    // References and Permissions
    // ======================================

    if (
      this.canModify &&
      this.isEditing &&
      this.hasRequiredReferences()
    ) {

      this.personalInfoForm.enable({
        emitEvent: false,
      });

      this.personalInfoForm.updateValueAndValidity({
        emitEvent: false,
      });

      return;
    }

    // ======================================
    // Disable Form
    // ======================================

    this.personalInfoForm.disable({
      emitEvent: false,
    });
  }

  // ========================================
  // Start Editing
  // ========================================

  startEdit(): void {

    if (
      this.isScreeningLocked() ||
      this.isCheckingPersonMatch()
    ) {

      this.errorMessage =
        'Personal information is locked during screening.';

      return;
    }

    if (!this.canModify) {

      this.errorMessage =
        'You do not have permission to create personal information.';

      return;
    }

    if (!this.hasRequiredReferences()) {

      this.errorMessage =
        'Reference data is not yet available.';

      return;
    }

    this.errorMessage = '';
    this.successMessage = '';

    this.isEditing = true;

    this.updateFormState();

    this.syncWizardValidity();
  }

  // ========================================
  // Load Personal Information
  // ========================================

  private loadPersonalInfo(): void {

    if (this.restorePersonalDraft()) {
      this.syncWizardValidity();
      return;
    }

    this.employee =
      this.emptyPersonalInfo();

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

    this.isEditing = true;

    this.newEmployeeState.setValid(
      'personal-info',
      false
    );
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

    return options.find(
      option => option.value === selectedValue
    )?.label ?? '—';
  }
}

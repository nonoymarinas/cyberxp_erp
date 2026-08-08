import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  CxpButton,
  CxpDisplayField,
  CxpIconUserCircle,
  CxpIconUserNav,
  CxpInputSelect,
  CxpInputText,
} from 'cyberxp-ui';
import { EmployeeState } from '../../../state/employee-state.service';
import type { CxpSelectOption, CxpSelectPrimitive } from 'cyberxp-ui';
import { PersonalInfoService } from '../../../business/services/personal-info.service';
import {
  PersonalInformation,
  PersonalInfoForm,
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

  // reactive forms
  readonly personalInfoForm = new FormGroup<PersonalInfoForm>({
    firstName: new FormControl(
      { value: '', disabled: false },
      {
        nonNullable: true,
        validators: [Validators.required],
      },
    ),

    middleName: new FormControl(
      { value: '', disabled: false },
      {
        nonNullable: true,
      },
    ),

    lastName: new FormControl(
      { value: '', disabled: false },
      {
        nonNullable: true,
        validators: [Validators.required],
      },
    ),

    suffixId: new FormControl<string | null>({ value: null, disabled: false }),

    dateOfBirth: new FormControl(
      { value: '', disabled: false },
      {
        nonNullable: true,
        validators: [Validators.required],
      },
    ),

    genderId: new FormControl<string | null>(
      { value: null, disabled: false },
      {
        validators: [Validators.required],
      },
    ),

    civilStatusId: new FormControl<string | null>(
      { value: null, disabled: false },
      {
        validators: [Validators.required],
      },
    ),

    imageUrl: new FormControl<string | null>({ value: null, disabled: false }),
  });

  // reference data
  suffixOptions: CxpSelectOption[] = [];
  genderOptions: CxpSelectOption[] = [];
  civilStatusOptions: CxpSelectOption[] = [];

  // status
  isLoading = false;
  isEditing = true;

  // State
  private originalEmployee: PersonalInformation | null = null;

  isSaving = false;
  successMessage = '';
  errorMessage = '';

  // employee data
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

  // inject data from service
  constructor(
    private readonly personalInfoService: PersonalInfoService,
    public readonly employeeState: EmployeeState,
  ) {}

  // start init
  ngOnInit(): void {
     if (this.employeeState.employeeGuid) {
      this.loadPersonalInfo(this.employeeState.employeeGuid);
    }
    this.personalInfoForm.disable();
    this.loadReferences();
  }

  ngAfterViewInit(): void {
    queueMicrotask(() => {
      this.updateFormState();
    });
  }

  // reference data
  loadReferences(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.personalInfoService.getReferenceOptions().subscribe({
      next: (options) => {
        this.suffixOptions = options.suffixOptions;
        this.genderOptions = options.genderOptions;
        this.civilStatusOptions = options.civilStatusOptions;

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
        this.errorMessage = 'Unable to load reference data.';
        this.personalInfoForm.disable();
      },
    });
  }

  private updateFormState(): void {
    if (this.referencesLoaded && this.isEditing) {
      this.personalInfoForm.enable();
      return;
    }

    this.personalInfoForm.disable();
  }

  onEditSave(): void {
    if (this.isEditing) {
      this.savePersonalInfo();
      return;
    }
    this.startEdit();
  }

  startEdit(): void {
    // this.loadEmployeeIntoForm();
    this.personalInfoForm.enable();
    this.isEditing = true;
  }

  cancelEdit(): void {
  if (!this.originalEmployee) {
    return;
  }

  this.personalInfoForm.reset({
    firstName: this.originalEmployee.firstName,
    middleName: this.originalEmployee.middleName ?? '',
    lastName: this.originalEmployee.lastName,

    suffixId: this.originalEmployee.suffixId,
    dateOfBirth: this.originalEmployee.dateOfBirth ?? '',
    genderId: this.originalEmployee.genderId,
    civilStatusId: this.originalEmployee.civilStatusId,
    imageUrl: this.originalEmployee.imageUrl,
  });

  this.personalInfoForm.markAsPristine();
  this.personalInfoForm.markAsUntouched();

  this.isEditing = false;
}

  // save personal info
  savePersonalInfo(): void {
    // 1. Validate the form before saving
    this.personalInfoForm.markAllAsTouched();
    if (this.personalInfoForm.invalid) {
      alert('Please fill in all required fields before saving.');
      return;
    }
    // 2. Get form data value
    const formValue = this.personalInfoForm.getRawValue();

    // 3. Load to the request model
    const request: SavePersonalInfoRequest = {
      employeeId: this.employeeState.employeeId,
      employeeGuid: this.employeeState.employeeId,

      firstName: formValue.firstName,
      middleName: formValue.middleName,
      lastName: formValue.lastName,

      suffixId: formValue.suffixId ?? '',
      dateOfBirth: formValue.dateOfBirth,
      genderId: formValue.genderId ?? '',
      civilStatusId: formValue.civilStatusId ?? '',
      imageUrl: formValue.imageUrl,
    };

    // 4. Call Service
    this.personalInfoService.savePersonalInfo(request).subscribe({
      next: (response) => {
        console.log(response);
        this.isSaving = false;

        if (!response.success) {
          this.errorMessage = response.message ?? 'Unable to save personal information.';
          return;
        }
        // update employee for value of display mode later
        this.employee = response.data;

        // Store returned identifiers
        this.employeeState.employeeId = response.data.employeeId;
        this.employeeState.employeeGuid = response.data.employeeGuid;

        // 2. Update the form with the saved data
        this.personalInfoForm.patchValue({
          firstName: response.data.firstName,
          middleName: response.data.middleName ?? '',
          lastName: response.data.lastName,
          suffixId: response.data.suffixId,
          dateOfBirth: response.data.dateOfBirth,
          genderId: response.data.genderId,
          civilStatusId: response.data.civilStatusId,
          imageUrl: response.data.imageUrl,
        });

        // 3. The form now matches the database
        this.personalInfoForm.markAsPristine();

        // Exit edit mode (optional)
        this.isEditing = false;

        // Success message
        this.successMessage = response.message ?? 'Personal information saved successfully.';
      },

      error: (error) => {
        this.isSaving = false;
        this.errorMessage = 'An unexpected error occurred while saving.';
        console.error(error);
      },
    });

    this.personalInfoForm.disable();
    this.isEditing = false;
  }

 private loadPersonalInfo(employeeGuid: string): void {
  this.personalInfoService.getPersonalInfo(employeeGuid).subscribe({
    next: (employee) => {
      if (!employee) {
        return;
      }

      this.personalInfoForm.patchValue({
        firstName: employee.firstName,
        middleName: employee.middleName ?? '',
        lastName: employee.lastName,
        suffixId: employee.suffixId,
        dateOfBirth: employee.dateOfBirth,
        genderId: employee.genderId,
        civilStatusId: employee.civilStatusId,
        imageUrl: employee.imageUrl,
      });

      this.originalEmployee = employee;

      this.personalInfoForm.markAsPristine();
      this.personalInfoForm.markAsUntouched();

      this.isEditing = false;
    },
  });
}

  // private loadEmployeeIntoForm(): void {
  //   this.personalInfoForm.patchValue({
  //     firstName: this.employee.firstName,
  //     middleName: this.employee.middleName ?? '',
  //     lastName: this.employee.lastName,
  //     suffixId: this.employee.suffixId,
  //     dateOfBirth: this.employee.dateOfBirth,
  //     genderId: this.employee.genderId,
  //     civilStatusId: this.employee.civilStatusId,
  //     imageUrl: this.employee.imageUrl,
  //   });
  // }

  getReferenceLabel(options: CxpSelectOption[], selectedValue: CxpSelectPrimitive | null): string {
    if (selectedValue === null) {
      return '—';
    }

    return options.find((option) => option.value === selectedValue)?.label ?? '—';
  }
}

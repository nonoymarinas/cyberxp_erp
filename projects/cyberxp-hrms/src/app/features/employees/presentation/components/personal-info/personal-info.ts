import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  CxpButton,
  CxpDisplayField,
  CxpIconUserCircle,
  CxpIconUserNav,
  CxpInputSelect,
  CxpInputText,
} from 'cyberxp-ui';

import type { CxpSelectOption, CxpSelectPrimitive } from 'cyberxp-ui';

import { PersonalInfoService } from '../../../business/services/personal-info.service';

interface EmployeeBasicInfo {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;

  suffixId: string | number | null;
  dateOfBirth: string;

  genderId: string | number | null;
  civilStatusId: string | number | null;

  imageUrl: string | null;
}

// interface
interface PersonalInfoForm {
  firstName: FormControl<string>;
  middleName: FormControl<string>;
  lastName: FormControl<string>;

  suffixId: FormControl<string | number | null>;
  dateOfBirth: FormControl<string>;

  genderId: FormControl<string | number | null>;
  civilStatusId: FormControl<string | number | null>;

  imageUrl: FormControl<string | null>;
}

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
  errorMessage = '';
  isEditing = true;

  // employee data
  employee: EmployeeBasicInfo = {
    id: '',
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
  constructor(private readonly personalInfoService: PersonalInfoService) {}

  // start init
   ngOnInit(): void {
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
    this.loadEmployeeIntoForm();

    this.personalInfoForm.enable();
    this.isEditing = true;
  }

  cancelEdit(): void {
    this.loadEmployeeIntoForm();

    this.personalInfoForm.disable();
    this.isEditing = false;
  }

  savePersonalInfo(): void {
    this.personalInfoForm.markAllAsTouched();

    if (this.personalInfoForm.invalid) {
      return;
    }

    const formValue = this.personalInfoForm.getRawValue();

    this.employee = {
      ...this.employee,
      ...formValue,
    };

    this.personalInfoForm.disable();
    this.isEditing = false;

    console.log('Saved employee:', formValue);
  }

  private loadEmployeeIntoForm(): void {
    this.personalInfoForm.patchValue({
      firstName: this.employee.firstName,
      middleName: this.employee.middleName,
      lastName: this.employee.lastName,
      suffixId: this.employee.suffixId,
      dateOfBirth: this.employee.dateOfBirth,
      genderId: this.employee.genderId,
      civilStatusId: this.employee.civilStatusId,
      imageUrl: this.employee.imageUrl,
    });
  }

  getReferenceLabel(options: CxpSelectOption[], selectedValue: CxpSelectPrimitive | null): string {
    if (selectedValue === null) {
      return '—';
    }

    return options.find((option) => option.value === selectedValue)?.label ?? '—';
  }
}

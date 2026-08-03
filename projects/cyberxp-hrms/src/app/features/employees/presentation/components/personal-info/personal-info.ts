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
  readonly personalInfoForm = new FormGroup<PersonalInfoForm>({
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
    }),

    genderId: new FormControl<string | null>(null, {
      validators: [Validators.required],
    }),

    civilStatusId: new FormControl<string | null>(null, {
      validators: [Validators.required],
    }),

    imageUrl: new FormControl<string | null>(null),
  });

  private enableDisableControls(isDataAvailable: boolean): void {
    const controls = this.personalInfoForm.controls;

    if (isDataAvailable) {
      controls.suffixId.enable();
      controls.genderId.enable();
      controls.civilStatusId.enable();
      return;
    }

    controls.suffixId.disable();
    controls.genderId.disable();
    controls.civilStatusId.disable();
  }

  suffixOptions: CxpSelectOption[] = [];
  genderOptions: CxpSelectOption[] = [];
  civilStatusOptions: CxpSelectOption[] = [];

  isLoading = false;
  errorMessage = '';

  isEditing = true;

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

  editEmployee: EmployeeBasicInfo = {
    ...this.employee,
  };

  constructor(private readonly personalInfoService: PersonalInfoService) {}

  ngOnInit(): void {
    this.loadReferences();
    this.enableDisableControls(false);
  }

  loadReferences(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.personalInfoService.getReferenceOptions().subscribe({
      next: (options) => {
        this.suffixOptions = options.suffixOptions;
        this.genderOptions = options.genderOptions;
        this.civilStatusOptions = options.civilStatusOptions;
        this.isLoading = false;

        // Enable or disable the controls based on the availability of reference data
        const isDataAvailable =
          this.suffixOptions.length > 0 &&
          this.genderOptions.length > 0 &&
          this.civilStatusOptions.length > 0;

        this.enableDisableControls(isDataAvailable);
        this.isLoading = false;
      },

      error: (error: unknown) => {
        console.error('Failed to load personal information references:', error);

        this.errorMessage = 'Unable to load reference data.';
        this.isLoading = false;
      },
    });
  }

  onEditSave(): void {
    if (this.isEditing) {
      this.savePersonalInfo();
      return;
    }

    this.startEdit();
  }

  startEdit(): void {
    this.editEmployee = {
      ...this.employee,
    };

    this.isEditing = true;
  }

  cancelEdit(): void {
    this.editEmployee = {
      ...this.employee,
    };

    this.isEditing = false;
  }

  savePersonalInfo(): void {
    this.employee = {
      ...this.editEmployee,
    };

    this.isEditing = false;

    // console.log('Saved employee basic information:', this.employee);
    console.log(this.personalInfoForm.value);
  }

  getReferenceLabel(options: CxpSelectOption[], selectedValue: CxpSelectPrimitive | null): string {
    if (selectedValue === null) {
      return '—';
    }

    return options.find((option) => option.value === selectedValue)?.label ?? '—';
  }
}

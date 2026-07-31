import { Component, OnInit } from '@angular/core';

import {
  CxpButton,
  CxpDisplayField,
  CxpIconUserCircle,
  CxpIconUserNav,
  CxpInputSelect,
  CxpInputText,
  CxpTextCapitalizePipe,
} from 'cyberxp-ui';

import type { CxpSelectOption, CxpSelectPrimitive } from 'cyberxp-ui';

import { PersonalInfoService } from '../../../business/services/personal-info.service';
import { PersonalInfoReference } from '../../../models/references/personal-info-reference.model';

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

@Component({
  selector: 'personal-info',
  standalone: true,
  imports: [
    CxpButton,
    CxpDisplayField,
    CxpIconUserCircle,
    CxpIconUserNav,
    CxpInputSelect,
    CxpInputText,
    CxpTextCapitalizePipe,
  ],
  templateUrl: './personal-info.html',
  styleUrl: './personal-info.css',
})
export class PersonalInfo implements OnInit {
  references: PersonalInfoReference | null = null;

  suffixOptions: CxpSelectOption[] = [];
  genderOptions: CxpSelectOption[] = [];
  civilStatusOptions: CxpSelectOption[] = [];

  isLoading = false;
  errorMessage = '';

  isEditing = true;

  employee: EmployeeBasicInfo = {
    id: '',
    firstName: 'Feliciano',
    middleName: 'Marinas',
    lastName: 'Marinias',
    suffixId: null,
    dateOfBirth: '1979-01-01',
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
  }

  loadReferences(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.personalInfoService.getReferences().subscribe({
      next: (references) => {
        this.references = references;

        // No mapping required because
        // ReferenceItem and CxpSelectOption
        // now share the same structure.
        this.suffixOptions = references.suffixes;
        this.genderOptions = references.genders;
        this.civilStatusOptions = references.civilStatuses;
        console.log(this.suffixOptions);
        console.log(this.genderOptions);
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

    console.log('Saved employee basic information:', this.employee);
  }

  getReferenceLabel(options: CxpSelectOption[], selectedValue: CxpSelectPrimitive | null): string {
    if (selectedValue === null) {
      return '—';
    }

    return options.find((option) => option.value === selectedValue)?.label ?? '—';
  }
}

import { Component } from '@angular/core';
import {
  CxpButton,
  CxpDisplayField,
  CxpIconUserCircle,
  CxpIconUserNav,
  CxpInputSelect,
  CxpInputText,
} from 'cyberxp-ui';

interface ReferenceOption {
  id: number;
  value: string;
  label: string;
}

interface EmployeeBasicInfo {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  suffixId: number | null;
  dateOfBirth: string;
  genderId: number | null;
  civilStatusId: number | null;
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
  ],
  templateUrl: './personal-info.html',
  styleUrl: './personal-info.css',
})
export class PersonalInfo {
  isEditing = true;

  readonly suffixOptions: ReferenceOption[] = [
    {
      id: 1,
      value: 'jr',
      label: 'Jr.',
    },
    {
      id: 2,
      value: 'sr',
      label: 'Sr.',
    },
    {
      id: 3,
      value: 'ii',
      label: 'II',
    },
    {
      id: 4,
      value: 'iii',
      label: 'III',
    },
    {
      id: 5,
      value: 'iv',
      label: 'IV',
    },
  ];

  readonly genderOptions: ReferenceOption[] = [
    {
      id: 1,
      value: 'male',
      label: 'Male',
    },
    {
      id: 2,
      value: 'female',
      label: 'Female',
    },
    {
      id: 3,
      value: 'prefer-not-to-say',
      label: 'Prefer not to say',
    },
  ];

  readonly civilStatusOptions: ReferenceOption[] = [
    {
      id: 1,
      value: 'single',
      label: 'Single',
    },
    {
      id: 2,
      value: 'married',
      label: 'Married',
    },
    {
      id: 3,
      value: 'widowed',
      label: 'Widowed',
    },
    {
      id: 4,
      value: 'separated',
      label: 'Separated',
    },
    {
      id: 5,
      value: 'divorced',
      label: 'Divorced',
    },
  ];

  employee: EmployeeBasicInfo = {
    id: 1001,
    firstName: 'Feliciano',
    middleName: 'Marinas',
    lastName: 'Marinias',
    suffixId: 1,
    dateOfBirth: '1979-01-01',
    genderId: 1,
    civilStatusId: 2,
    imageUrl: null,
  };

  editEmployee: EmployeeBasicInfo = {
    ...this.employee,
  };

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

    console.log(
      'Saved employee basic information:',
      this.employee,
    );
  }

  getReferenceLabel(
    options: ReferenceOption[],
    selectedId: number | null,
  ): string {
    if (selectedId === null) {
      return '—';
    }

    return (
      options.find((option) => option.id === selectedId)?.label ??
      '—'
    );
  }
}
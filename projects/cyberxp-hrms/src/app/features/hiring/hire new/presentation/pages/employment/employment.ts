import { Component } from '@angular/core';
import {
  CxpButton,
  CxpDisplayField,
  CxpIconAddressNav,
  CxpInputSelect,
  CxpInputText,
} from 'cyberxp-ui';

export interface EmployeeEmployment {
  department: string;
  position: string;
  employmentType: string;
  employmentStatus: string;
  dateHired: string;
  workLocation: string;
}

@Component({
  selector: 'ams-employment',
  standalone: true,
  imports: [
    CxpButton,
    CxpDisplayField,
    CxpIconAddressNav,
    CxpInputSelect,
    CxpInputText,
  ],
  templateUrl: './employment.html',
  styleUrl: './employment.css',
})
export class EmploymentComponent {
  isEditing = false;

  employment: EmployeeEmployment = {
    department: 'Information Technology',
    position: 'Software Developer',
    employmentType: 'Full-Time',
    employmentStatus: 'Regular',
    dateHired: 'January 15, 2024',
    workLocation: 'Kabankalan Main Office',
  };

  private originalEmployment: EmployeeEmployment = {
    ...this.employment,
  };

  startEdit(): void {
    this.originalEmployment = {
      ...this.employment,
    };

    this.isEditing = true;
  }

  cancelEdit(): void {
    this.employment = {
      ...this.originalEmployment,
    };

    this.isEditing = false;
  }

  saveEmployment(): void {
    this.originalEmployment = {
      ...this.employment,
    };

    this.isEditing = false;

    console.log('Saved employment details:', this.employment);
  }
}

import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';

import { FormsModule } from '@angular/forms';

type RehireStep =
  | 'eligibility'
  | 'profile'
  | 'employment'
  | 'review';

interface RehireEmployee {
  personGuid: string;
  employeeNumber: string;
  firstName: string;
  middleName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  civilStatus: string;
  email: string;
  mobile: string;
  address: string;
  emergencyContact: string;
  previousDepartment: string;
  previousPosition: string;
  previousHireDate: string;
  separationDate: string;
  separationReason: string;
  employmentStatus: string;
  blocklisted: boolean;
  eligible: boolean;
}

@Component({
  selector: 'cxp-rehire-page',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './rehire-page.html',
  styleUrl: './rehire-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RehirePageComponent {

  // Temporary hardcoded employee data
  readonly employee: RehireEmployee = {
    personGuid: '550e8400-e29b-41d4-a716-446655440000',
    employeeNumber: 'EMP000001',
    firstName: 'Juan',
    middleName: 'Santos',
    lastName: 'Dela Cruz',
    dateOfBirth: '1988-05-15',
    gender: 'Male',
    civilStatus: 'Married',
    email: 'juan.delacruz@example.com',
    mobile: '09171234567',
    address: 'Bacolod City, Negros Occidental',
    emergencyContact: 'Maria Dela Cruz - 09179876543',
    previousDepartment: 'Operations',
    previousPosition: 'Warehouse Supervisor',
    previousHireDate: '2020-01-15',
    separationDate: '2024-08-31',
    separationReason: 'Voluntary Resignation',
    employmentStatus: 'Separated',
    blocklisted: false,
    eligible: true,
  };

  readonly steps: {
    id: RehireStep;
    label: string;
  }[] = [
    { id: 'eligibility', label: 'Eligibility' },
    { id: 'profile', label: 'Profile' },
    { id: 'employment', label: 'Employment' },
    { id: 'review', label: 'Review' },
  ];

  readonly currentStepIndex = signal(0);
  readonly profileVerified = signal(false);
  readonly submitted = signal(false);

  // New employment form data
  department = '';
  position = '';
  employmentType = 'Regular';
  workLocation = '';
  startDate = '';
  justification = '';

  readonly currentStep = computed(
    () => this.steps[this.currentStepIndex()].id
  );

  readonly isFirstStep = computed(
    () => this.currentStepIndex() === 0
  );

  readonly isLastStep = computed(
    () => this.currentStepIndex() === this.steps.length - 1
  );

  readonly fullName = computed(
    () =>
      `${this.employee.firstName} ${this.employee.middleName} ${this.employee.lastName}`
  );

  canProceed(): boolean {
    switch (this.currentStep()) {
      case 'eligibility':
        return this.employee.eligible && !this.employee.blocklisted;

      case 'profile':
        return this.profileVerified();

      case 'employment':
        return !!(
          this.department.trim() &&
          this.position.trim() &&
          this.workLocation.trim() &&
          this.startDate &&
          this.justification.trim()
        );

      case 'review':
        return this.employee.eligible &&
          this.profileVerified();

      default:
        return false;
    }
  }

  next(): void {
    if (!this.canProceed()) return;

    if (this.isLastStep()) {
      this.submit();
      return;
    }

    this.currentStepIndex.update(index => index + 1);
  }

  previous(): void {
    if (this.isFirstStep()) return;

    this.currentStepIndex.update(index => index - 1);
  }

  goToStep(index: number): void {
    if (index < 0 || index >= this.steps.length) return;

    // Only allow returning to completed steps
    if (index <= this.currentStepIndex()) {
      this.currentStepIndex.set(index);
    }
  }

  private submit(): void {
    // UI testing only
    this.submitted.set(true);
  }

  reset(): void {
    this.currentStepIndex.set(0);
    this.profileVerified.set(false);
    this.submitted.set(false);

    this.department = '';
    this.position = '';
    this.employmentType = 'Regular';
    this.workLocation = '';
    this.startDate = '';
    this.justification = '';
  }
}

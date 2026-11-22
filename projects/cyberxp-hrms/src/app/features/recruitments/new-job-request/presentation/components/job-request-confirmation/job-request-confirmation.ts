
import {
  Component,
  inject,
} from '@angular/core';

import {
  Router,
} from '@angular/router';

import {
  CxpButton,
} from 'cyberxp-ui';

// ========================================
// Job Request Preview Model
// ========================================

interface JobRequestPreview {
  departmentId: number;
  positionId: number;
  requestedHeadcount: number;
  requiredDate: string;
  requestType: string | null;
  priority: string | null;
  justification: string;
}

// ========================================
// Job Request Confirmation
// ========================================

@Component({
  selector: 'job-request-confirmation',
  standalone: true,

  imports: [
    CxpButton,
  ],

  templateUrl: './job-request-confirmation.html',
  styleUrl: './job-request-confirmation.css',
})
export class JobRequestConfirmation {

  // ======================================
  // Dependencies
  // ======================================

  private readonly router = inject(Router);

  // ======================================
  // Navigation State
  // ======================================

  readonly request: JobRequestPreview | null =
    this.readRequest();

  // ======================================
  // Temporary Department References
  // ======================================

  private readonly departments: Record<number, string> = {
    1: 'Engineering',
    2: 'Operations',
    3: 'Human Resources',
    4: 'Accounting',
  };

  // ======================================
  // Temporary Position References
  // ======================================

  private readonly positions: Record<number, string> = {
    1: 'Civil Engineer',
    2: 'Project Engineer',
    3: 'Accountant',
    4: 'HR Officer',
  };

  // ======================================
  // Read Navigation State
  // ======================================

  private readRequest(): JobRequestPreview | null {

    const state: unknown =
      this.router.getCurrentNavigation()?.extras.state
      ?? history.state;

    if (
      typeof state !== 'object' ||
      state === null ||
      !('jobRequestPreview' in state)
    ) {
      return null;
    }

    const request = state.jobRequestPreview;

    if (
      typeof request !== 'object' ||
      request === null ||
      !('departmentId' in request) ||
      !('positionId' in request) ||
      !('requestedHeadcount' in request) ||
      !('requiredDate' in request) ||
      !('requestType' in request) ||
      !('priority' in request) ||
      !('justification' in request)
    ) {
      return null;
    }

    return request as JobRequestPreview;
  }

  // ======================================
  // Department Name
  // ======================================

  get departmentName(): string {

    if (!this.request) {
      return '—';
    }

    return this.departments[
      this.request.departmentId
    ] ?? 'Unknown Department';
  }

  // ======================================
  // Position Name
  // ======================================

  get positionName(): string {

    if (!this.request) {
      return '—';
    }

    return this.positions[
      this.request.positionId
    ] ?? 'Unknown Position';
  }

  // ======================================
  // Request Type Label
  // ======================================

  get requestTypeLabel(): string {

    switch (this.request?.requestType) {

      case 'ADDITIONAL':
        return 'Additional Headcount';

      case 'REPLACEMENT':
        return 'Replacement Employee';

      case 'PROJECT_BASED':
        return 'Project-Based';

      default:
        return '—';
    }
  }

  // ======================================
  // Priority Label
  // ======================================

  get priorityLabel(): string {

    switch (this.request?.priority) {

      case 'LOW':
        return 'Low';

      case 'NORMAL':
        return 'Normal';

      case 'HIGH':
        return 'High';

      case 'URGENT':
        return 'Urgent';

      default:
        return '—';
    }
  }

  // ======================================
  // New Request
  // ======================================

  newRequest(): void {

    void this.router.navigate([
      '/app/recruitment/job-requisitions/new'
    ]);

  }

}

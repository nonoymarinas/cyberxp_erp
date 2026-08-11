import {
  ChangeDetectorRef,
  Component,
  OnInit,
  inject,
} from '@angular/core';

import { RouterLink } from '@angular/router';

import {
  CxpButton,
  CxpIconUserCircle,
  CxpInputSearch,
} from 'cyberxp-ui';

import { EmployeeListService } from '../../../business/services/employee-list.service';
import { EmployeeItem } from '../../../models/domain/employee-list.model';

import { UserAccessService } from '../../../../../core/authorization/services/user-access.services';
import { EMPLOYEE_PERMISSIONS } from '../../../../../core/authorization/permissions/employee-permissions';

@Component({
  selector: 'cxp-new-employee',
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css',
  imports: [
    CxpIconUserCircle,
    CxpInputSearch,
    CxpButton,
    RouterLink,
  ],
})
export class EmployeeListPage implements OnInit {
  private readonly employeeListService = inject(EmployeeListService);
  private readonly cdr = inject(ChangeDetectorRef);

  readonly userAccessService = inject(UserAccessService);
  readonly permissions = EMPLOYEE_PERMISSIONS;

  employees: EmployeeItem[] = [];

  isLoading = false;
  errorMessage = '';

  // ========================================
  // Permission Helpers
  // ========================================

  get canReadEmployee(): boolean {
    return this.userAccessService.hasPermission(
      this.permissions.employee.read,
    );
  }

  get canCreateEmployee(): boolean {
    return this.userAccessService.hasPermission(
      this.permissions.employee.create,
    );
  }

  get canUpdateEmployee(): boolean {
    return this.userAccessService.hasPermission(
      this.permissions.employee.update,
    );
  }

  get canDeleteEmployee(): boolean {
    return this.userAccessService.hasPermission(
      this.permissions.employee.delete,
    );
  }

  // ========================================
  // Init
  // ========================================

  ngOnInit(): void {
    if (this.canReadEmployee) {
      this.loadEmployees();
    }
  }

  // ========================================
  // Load Employees
  // ========================================

  private loadEmployees(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.employeeListService.getEmployees().subscribe({
      next: (response) => {
        this.employees = response.data ?? [];

        this.isLoading = false;

        console.log('Employees loaded:', this.employees);
        console.log('Employee count:', this.employees.length);

        this.cdr.detectChanges();
      },

      error: (error) => {
        console.error('Failed to load employees:', error);

        this.errorMessage = 'Failed to load employees.';
        this.isLoading = false;

        this.cdr.detectChanges();
      },
    });
  }
}
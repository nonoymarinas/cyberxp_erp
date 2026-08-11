import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import {
  CxpButton,
  CxpIconUserCircle,
  CxpInputSearch,
} from 'cyberxp-ui';

import { EmployeeListService } from '../../../business/services/employee-list.service';
import { EmployeeItem } from '../../../models/domain/employee-list.model';

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

  employees: EmployeeItem[] = [];

  isLoading = false;
  errorMessage = '';

  // ========================================
  // Init
  // ========================================

  ngOnInit(): void {
    this.loadEmployees();
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
      },

      error: (error) => {
        console.error('Failed to load employees:', error);

        this.errorMessage = 'Failed to load employees.';
        this.isLoading = false;
      },
    });
  }
}
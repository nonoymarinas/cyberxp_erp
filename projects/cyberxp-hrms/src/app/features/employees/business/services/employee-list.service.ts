import { Injectable, inject } from '@angular/core';
import { Observable, of, tap } from 'rxjs';

import { EmployeeListDataAccess } from '../../data/data-access/employeelist.data-access';

import {
  EmployeeListApiResponse,
} from '../../models/domain/employee-list.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeListService {
  private readonly dataAccess = inject(EmployeeListDataAccess);

  private employeeListCache: EmployeeListApiResponse | null = null;

  // ========================================
  // Get Employees
  // ========================================

  getEmployees(): Observable<EmployeeListApiResponse> {
    if (this.employeeListCache !== null) {
      return of(this.employeeListCache);
    }

    return this.refreshEmployees();
  }

  // ========================================
  // Refresh Employees
  // ========================================

  refreshEmployees(): Observable<EmployeeListApiResponse> {
    return this.dataAccess.getEmployees().pipe(
      tap((response) => {
        this.employeeListCache = response;
      }),
    );
  }

  // ========================================
  // Get Cached Employees
  // ========================================

  getCachedEmployees(): EmployeeListApiResponse | null {
    return this.employeeListCache;
  }

  // ========================================
  // Clear Cache
  // ========================================

  clearCache(): void {
    this.employeeListCache = null;
  }
}
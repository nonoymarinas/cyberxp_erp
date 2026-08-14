import { Injectable, inject } from '@angular/core';
import { map, Observable, tap } from 'rxjs';

import { EmployeeListApi } from '../api/employee-list.api';

import {
  EmployeeItem,
  EmployeeItemDto,
  EmployeeListApiResponse,
} from '../../models/domain/employee-list.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeListDataAccess {
  private readonly api = inject(EmployeeListApi);

  // ========================================
  // Get Employees
  // ========================================

  getEmployees(): Observable<EmployeeListApiResponse> {
    return this.api.getEmployees().pipe(

      // Raw data from API
      tap((response) => {
        console.log('Employee API Response:', response);
        console.log('Employee API Data:', response.data);
      }),

      // Map API DTO -> Application Model
      map((response) => ({
        success: response.success,
        message: response.message,
        errorCode: response.errorCode,
        data: response.data.map((employee) =>
          this.mapEmployee(employee),
        ),
      })),

      // Mapped data
      tap((response) => {
        console.log('Mapped Employee Response:', response);
        console.log('Mapped Employees:', response.data);
      }),
    );
  }

  // ========================================
  // Map API DTO -> Application Model
  // ========================================

  private mapEmployee(
    employee: EmployeeItemDto,
  ): EmployeeItem {
    return {
      publicId: employee.publicId,
      firstName: employee.firstName,
      middleName: employee.middleName,
      lastName: employee.lastName,
      username: employee.username,
      employeeNumber: employee.employeeNumber,
      employeeImg: employee.employeeImg,
      hiredDate: employee.hiredDate,
      positionName: employee.positionName,
      departmentName: employee.departmentName,
      employmentStatusName:
        employee.employmentStatusName,
      managerName: employee.managerName,
      createdAt: employee.createdAt,
    };
  }
}
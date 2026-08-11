import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeListApiResponseDto } from '../../models/domain/employee-list.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeListApi {
  private readonly http = inject(HttpClient);

  private readonly apiUrl =
    'https://api-hrms-employee-dev.azurewebsites.net/api/v1/employees';

  // ========================================
  // Get Employees
  // ========================================

  getEmployees(): Observable<EmployeeListApiResponseDto> {
    return this.http.get<EmployeeListApiResponseDto>(
      this.apiUrl,
    );
  }
}
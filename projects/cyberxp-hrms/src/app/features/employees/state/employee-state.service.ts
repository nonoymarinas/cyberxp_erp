import { Injectable } from '@angular/core';

@Injectable()
export class EmployeeState {
  employeeGuid: string | null = null;
  employeeId: string | null = null;
}
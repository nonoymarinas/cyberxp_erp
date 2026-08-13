import {
  computed,
  Injectable,
  signal,
} from '@angular/core';

import {
  EmployeeData,
} from '../models/domain/employee.domain.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeState {
  // ========================================
  // Employee Data
  // ========================================

  private readonly _employeeData =
    signal<EmployeeData | null>(null);

  readonly employeeData =
    this._employeeData.asReadonly();

  // ========================================
  // Employee ID
  // ========================================

  readonly employeeId = computed(
    () =>
      this._employeeData()
        ?.personalInfo
        ?.employeeId ?? null,
  );

  // ========================================
  // Employee GUID
  // ========================================

  readonly employeeGuid = computed(
    () =>
      this._employeeData()
        ?.personalInfo
        ?.employeeGuid ?? null,
  );

  // ========================================
  // Set Employee Data
  // ========================================

  setEmployeeData(
    data: EmployeeData,
  ): void {
    this._employeeData.set(data);
  }

  // ========================================
  // Update Employee Data
  // ========================================

  updateEmployeeData(
    updater: (
      current: EmployeeData,
    ) => EmployeeData,
  ): void {
    const current =
      this._employeeData();

    if (!current) {
      return;
    }

    this._employeeData.set(
      updater(current),
    );
  }

  // ========================================
  // Clear Employee Data
  // ========================================

  clearEmployeeData(): void {
    this._employeeData.set(null);
  }
}
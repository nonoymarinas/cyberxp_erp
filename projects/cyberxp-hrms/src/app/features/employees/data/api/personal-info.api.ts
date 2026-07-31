import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

export interface EmployeeReferenceDto {
  PublicId: string;
  ReferenceName: string;
}

export interface EmployeeReferenceDataDto {
  Genders: EmployeeReferenceDto[];
  CivilStatuses: EmployeeReferenceDto[];
  Suffixes: EmployeeReferenceDto[];
  Departments: EmployeeReferenceDto[];
  Positions: EmployeeReferenceDto[];
  EmploymentStatuses: EmployeeReferenceDto[];
  AddressTypes: EmployeeReferenceDto[];
  ContactMediumTypes: EmployeeReferenceDto[];
  ContactContextTypes: EmployeeReferenceDto[];
  Branches: EmployeeReferenceDto[];
}

export interface EmployeeReferenceResponseDto {
  Success: boolean;
  Message: string | null;
  ErrorCode: string | null;
  Data: EmployeeReferenceDataDto;
}

@Injectable({
  providedIn: 'root',
})
export class EmployeeReferenceApi {
  private readonly http = inject(HttpClient);

  private readonly endpoint =
    'https://api-hrms-employee-dev.azurewebsites.net/api/v1/employees/references';

  getReferences(): Observable<EmployeeReferenceResponseDto> {
    return this.http.get<EmployeeReferenceResponseDto>(this.endpoint);
  }
}
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiResponse } from '../../../../shared/models/api-response.model';

export interface EmployeeReferenceDto {
  publicId: string;
  referenceName: string;
}

export interface EmployeeReferenceDataDto {
  genders: EmployeeReferenceDto[];
  civilStatuses: EmployeeReferenceDto[];
  suffixes: EmployeeReferenceDto[];
  departments: EmployeeReferenceDto[];
  positions: EmployeeReferenceDto[];
  employmentStatuses: EmployeeReferenceDto[];
  addressTypes: EmployeeReferenceDto[];
  contactMediumTypes: EmployeeReferenceDto[];
  contactContextTypes: EmployeeReferenceDto[];
  branches: EmployeeReferenceDto[];
}

export type EmployeeReferenceResponseDto = ApiResponse<EmployeeReferenceDataDto>;

export interface PersonalInfoDto {
  employeeNumber: string | null;
  employeeGuid: string | null;
  firstName: string;
  middleName: string | null;
  lastName: string;
  suffixId: string | null;
  dateOfBirth: string;
  genderId: string | null;
  civilStatusId: string | null;
  imageUrl: string | null;
}


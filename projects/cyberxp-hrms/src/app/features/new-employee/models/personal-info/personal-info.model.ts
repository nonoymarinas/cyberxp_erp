import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiResponse } from '../../../../shared/models/api-response.model';

export interface PersonalInfo {
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

export type SavePersonalInfoResponse = ApiResponse<PersonalInfo>;

//for form data
export interface PersonalInfoForm {
  firstName: FormControl<string>;
  middleName: FormControl<string>;
  lastName: FormControl<string>;
  suffixId: FormControl<string | null>;
  dateOfBirth: FormControl<string>;
  genderId: FormControl<string | null>;
  civilStatusId: FormControl<string | null>;
  imageUrl: FormControl<string | null>;
}
//for parameter request
export interface SavePersonalInfoRequest {
  employeeGuid: string | null;
  firstName: string;
  middleName: string | null;
  lastName: string;
  suffixId: string | null;
  dateOfBirth: string | null;
  genderId: string | null;
  civilStatusId: string | null;
  imageUrl: string | null;
  userId:string | null;
}

export interface PersonalRefItemDto {
  publicId: string;
  referenceName: string;
}

export interface EmployeeReferenceDataDto {
  genders: PersonalRefItemDto[];
  civilStatuses: PersonalRefItemDto[];
  suffixes: PersonalRefItemDto[];
  departments: PersonalRefItemDto[];
  positions: PersonalRefItemDto[];
  employmentStatuses: PersonalRefItemDto[];
  addressTypes: PersonalRefItemDto[];
  contactMediumTypes: PersonalRefItemDto[];
  contactContextTypes: PersonalRefItemDto[];
  branches: PersonalRefItemDto[];
}

export type PersonalInfoRefResponseDto = ApiResponse<EmployeeReferenceDataDto>;


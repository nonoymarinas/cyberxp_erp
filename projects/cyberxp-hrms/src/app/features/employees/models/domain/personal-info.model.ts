import { CreatePersonalInfo } from './create-personal-info.model';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiResponse } from '../../../../shared/models/api-response.model';

export interface PersonalInf extends CreatePersonalInfo {
  id: string | null;
  employeeNumber: string | null;
}

export interface PersonalInformation {
  employeeId: string | null;
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

export type SavePersonalInfoResponse = ApiResponse<PersonalInformation>;

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

export interface SavePersonalInfoRequest {
  employeeId: string | null;
  employeeGuid: string | null;

  firstName: string;
  middleName: string | null;
  lastName: string;

  suffixId: string | null;
  dateOfBirth: string | null;
  genderId: string | null;
  civilStatusId: string | null;

  imageUrl: string | null;
}

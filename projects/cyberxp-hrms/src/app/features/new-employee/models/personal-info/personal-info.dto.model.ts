import { ApiResponse } from '../../../../shared/models/api-response.model';

export interface EmployeeReferenceDto {
  publicId: string;
  referenceName: string;
}

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

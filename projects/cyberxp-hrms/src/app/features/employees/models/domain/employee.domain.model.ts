import { ApiResponse } from '../../../../shared/models/api-response.model';

export interface PersonalInfo {
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

export interface EmployeeAddress {
  countryId: number | null;

  // Philippine only
  regionId: number | null;
  provinceId: number | null;
  cityId: number | null;
  barangayId: number | null;

  // Foreign
  foreignStateProvinceRegion: string;
  foreignCity: string;

  // Common
  addressLine1: string;
  addressLine2: string;
  zipCode: string;
}


export interface EmployeeData {
  personalInfo: PersonalInfo;
  // address:EmployeeAddressDto[]
}

export type EmployeeDataResponse = ApiResponse<EmployeeData>;


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

export interface EmployeeAddress {
  addressId: string;
  scopeId: string | null;

  countryId: number | null;

  regionId: number | null;
  provinceId: number | null;
  cityId: number | null;
  barangayId: number | null;

  internationalRegion: string | null;
  internationalStates: string | null;
  internationalProvince: string | null;
  internationalCity: string | null;
  internationalSuburb: string | null;

  addressLine1: string | null;
  addressLine2: string | null;

  zipCode: string;

  isPresent: boolean | null;
}


export interface EmployeeData {
  personalInfo: PersonalInfo;
  // address:EmployeeAddressDto[]
}

export type EmployeeDataResponse = ApiResponse<EmployeeData>;


import { ApiResponse } from '../../../../shared/models/api-response.model';

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

export type EmployeeAddreResponse = ApiResponse<EmployeeAddress[]>;

export interface SaveAddressRequest {
  employeeGuid: string;
  addressId: string | null;
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

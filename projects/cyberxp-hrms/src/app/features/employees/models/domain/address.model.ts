import { ApiResponse } from '../../../../shared/models/api-response.model';

export interface EmployeeAddress {
  addressId: string;
  scopeId: string | null;

  countryId: number | null;

  regionId: number | null;
  provinceId: number | null;
  cityId: number | null;
  barangayId: number | null;

  foreignStateProvinceRegion: string | null;

  foreignCity: string | null;

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

  foreignStateProvinceRegion: string | null;
  foreignCity: string | null;

  addressLine1: string | null;
  addressLine2: string | null;

  zipCode: string;

  isPresent: boolean | null;
}

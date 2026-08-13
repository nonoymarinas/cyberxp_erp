import { ApiResponse } from '../../../../shared/models/api-response.model';

export interface Country {
  id: number;
  countryName: string;
}

export interface Region {
  id: number;
  countryId: number;
  regionName: string;
}

export interface Province {
  id: number;
  regionId: number;
  provinceName: string;
}

export interface City {
  id: number;
  provinceId: number;
  cityOrMunicipalName: string;
}

export interface AddressReferences {
  countries: Country[];
  regions: Region[];
  provinces: Province[];
  cities: City[];
}

export type AddressesReferencesResponse = ApiResponse<AddressReferences>;

export interface Barangay {
  id: number;
  cityId: number;
  barangayName: string;
}

export type BarangaysResponse = ApiResponse<Barangay[]>;

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

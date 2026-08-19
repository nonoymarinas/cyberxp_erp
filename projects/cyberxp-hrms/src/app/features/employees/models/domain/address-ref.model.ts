import { ApiResponse } from '../../../../shared/models/api-response.model';

export interface AddressScope {
  id: string ;
  scopeName: string;
  code: string | null;
}

export interface Country {
  id: number;
  countryName: string;
  code: string | null;
}

export interface Region {
  id: number;
  countryId: number;
  regionName: string;
  code: string | null;
}

export interface Province {
  id: number;
  regionId: number;
  provinceName: string;
  code: string | null;
}

export interface City {
  id: number;
  provinceId: number;
  cityOrMunicipalName: string;
  code: string | null;
}

export interface AddressReferences {
  addressScopes: AddressScope[];
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
  code: string | null;
}

export type BarangaysResponse = ApiResponse<Barangay[]>;

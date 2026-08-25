import { ApiResponse } from '../../../../shared/models/api-response.model';

export interface AddressScopeDto {
  id: string ;
  scopeName: string;
  code: string | null;
}

export interface CountryDto {
  id: number;
  countryName: string;
  code: string | null;
}

export interface RegionDto {
  id: number;
  countryId: number;
  regionName: string;
  code: string | null;
}

export interface ProvinceDto {
  id: number;
  regionId: number;
  provinceName: string;
  code: string | null;
}

export interface CityDto {
  id: number;
  provinceId: number;
  cityOrMunicipalName: string;
  code: string | null;
}


export interface AddressRefDto {
  countries: CountryDto[];
  regions: RegionDto[];
  provinces: ProvinceDto[];
  cities: CityDto[];
  addressScopes:AddressScopeDto[];
}

export type AddressRefResponseDto = ApiResponse<AddressRefDto>;

export interface BarangayDto {
  id: number;
  cityId: number;
  barangayName: string;
  code: string | null;
}

export type BarangaysRefResponseDto = ApiResponse<BarangayDto[]>;

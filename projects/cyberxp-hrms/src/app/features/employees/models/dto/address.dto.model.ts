import { ApiResponse } from '../../../../shared/models/api-response.model';

export interface CountryDto {
  id: number;
  countryName: string;
}

export interface RegionDto {
  id: number;
  countryId: number;
  regionName: string;
}

export interface ProvinceDto {
  id: number;
  regionId: number;
  provinceName: string;
}

export interface CityDto {
  id: number;
  provinceId: number;
  cityOrMunicipalName: string;
}

export interface AddressReferencesDto {
  countries: CountryDto[];
  regions: RegionDto[];
  provinces: ProvinceDto[];
  cities: CityDto[];
}

export type AddressReferencesResponseDto = ApiResponse<AddressReferencesDto>;

export interface BarangayDto {
  id: number;
  cityId: number;
  barangayName: string;
}

export type BarangaysResponseDto = ApiResponse<BarangayDto[]>;

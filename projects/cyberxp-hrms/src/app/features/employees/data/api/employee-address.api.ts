
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

// ========================================
// Country
// ========================================

export interface CountryDto {
  Id: number;
  CountryName: string;
}

// ========================================
// Region
// ========================================

export interface RegionDto {
  Id: number;
  CountryId: number;
  RegionName: string;
}

// ========================================
// Province
// ========================================

export interface ProvinceDto {
  Id: number;
  RegionId: number;
  ProvinceName: string;
}

// ========================================
// City / Municipality
// ========================================

export interface CityDto {
  Id: number;
  ProvinceId: number;
  CityOrMunicipalName: string;
}

// ========================================
// Address Reference Data
// ========================================

export interface AddressReferenceDataDto {
  Countries: CountryDto[];
  Regions: RegionDto[];
  Provinces: ProvinceDto[];
  Cities: CityDto[];
}

// ========================================
// Address Reference API Response
// ========================================

export interface AddressReferenceResponseDto {
  Success: boolean;
  Message: string | null;
  ErrorCode: string | null;
  Data: AddressReferenceDataDto;
}

// ========================================
// API
// ========================================

@Injectable({
  providedIn: 'root',
})
export class AddressReferenceApi {
  private readonly http = inject(HttpClient);

  private readonly endpoint =
    'https://api-hrms-employee-dev.azurewebsites.net/api/v1/address/references';

  getReferences(): Observable<AddressReferenceResponseDto> {
    return this.http.get<AddressReferenceResponseDto>(
      this.endpoint,
    );
  }
}


import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { AddressReferenceApi } from '../api/employee-address.api';

import {
  CountryDto,
  RegionDto,
  ProvinceDto,
  CityDto,
  BarangayDto,
} from '../../models/dto/address-ref.dto.model';

import {
  Country,
  Region,
  Province,
  City,
  Barangay,
  AddressesReferencesResponse,
  BarangaysResponse,
} from '../../models/domain/address-ref.model';

@Injectable({
  providedIn: 'root',
})
export class AddressRefDataAccess {
  private readonly api = inject(AddressReferenceApi);

  // ========================================
  // Get Address References
  // ========================================

  getReferences(): Observable<AddressesReferencesResponse> {
    return this.api.getReferences().pipe(
      map((response): AddressesReferencesResponse => ({
        ...response,

        data: {
          countries: this.mapCountries(
            response.data.countries,
          ),

          regions: this.mapRegions(
            response.data.regions,
          ),

          provinces: this.mapProvinces(
            response.data.provinces,
          ),

          cities: this.mapCities(
            response.data.cities,
          ),
          addressScopes:[],
        },
      })),
    );
  }

  // ========================================
  // Get Barangays By City
  // ========================================

  getBarangaysByCity(
    cityId: number,
  ): Observable<BarangaysResponse> {
    return this.api
      .getBarangaysByCity(cityId)
      .pipe(
        map(
          (response): BarangaysResponse => ({
            ...response,

            data: this.mapBarangays(
              response.data,
            ),
          }),
        ),
      );
  }

  // ========================================
  // Map Countries
  // ========================================

  private mapCountries(
    items: CountryDto[],
  ): Country[] {
    return items.map((item) => ({
      id: item.id,
      countryName: item.countryName,
      code:item.code,
    }));
  }

  // ========================================
  // Map Regions
  // ========================================

  private mapRegions(
    items: RegionDto[],
  ): Region[] {
    return items.map((item) => ({
      id: item.id,
      countryId: item.countryId,
      regionName: item.regionName,
      code:item.code,
    }));
  }

  // ========================================
  // Map Provinces
  // ========================================

  private mapProvinces(
    items: ProvinceDto[],
  ): Province[] {
    return items.map((item) => ({
      id: item.id,
      regionId: item.regionId,
      provinceName: item.provinceName,
      code:item.code,
    }));
  }

  // ========================================
  // Map Cities
  // ========================================

  private mapCities(
    items: CityDto[],
  ): City[] {
    return items.map((item) => ({
      id: item.id,
      provinceId: item.provinceId,
      cityOrMunicipalName:
        item.cityOrMunicipalName,
        code:item.code,
    }));
  }

  // ========================================
  // Map Barangays
  // ========================================

  private mapBarangays(
    items: BarangayDto[],
  ): Barangay[] {
    return items.map((item) => ({
      id: item.id,
      cityId: item.cityId,
      barangayName: item.barangayName,
      code:item.code,
    }));
  }
}
// address.data-access.ts

import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import {
  AddressReference,
  Country,
  Region,
  Province,
  City,
} from '../../../../shared/models/reference-address.model';

import {
  AddressReferenceApi,
  CountryDto,
  RegionDto,
  ProvinceDto,
  CityDto,
} from '../api/employee-address.api';

@Injectable({
  providedIn: 'root',
})
export class AddressDataAccess {
  private readonly api = inject(AddressReferenceApi);

  // ========================================
  // References
  // ========================================

  getReferences(): Observable<AddressReference> {
    return this.api.getReferences().pipe(
      map(
        (response): AddressReference => ({
          countries: this.mapCountries(
            response.Data.Countries,
          ),

          regions: this.mapRegions(
            response.Data.Regions,
          ),

          provinces: this.mapProvinces(
            response.Data.Provinces,
          ),

          cities: this.mapCities(
            response.Data.Cities,
          ),
        }),
      ),
    );
  }

  // ========================================
  // Country Mapper
  // ========================================

  private mapCountries(
    items: CountryDto[],
  ): Country[] {
    return items.map((item) => ({
      id: item.Id,
      countryName: item.CountryName,
    }));
  }

  // ========================================
  // Region Mapper
  // ========================================

  private mapRegions(
    items: RegionDto[],
  ): Region[] {
    return items.map((item) => ({
      id: item.Id,
      countryId: item.CountryId,
      regionName: item.RegionName,
    }));
  }

  // ========================================
  // Province Mapper
  // ========================================

  private mapProvinces(
    items: ProvinceDto[],
  ): Province[] {
    return items.map((item) => ({
      id: item.Id,
      regionId: item.RegionId,
      provinceName: item.ProvinceName,
    }));
  }

  // ========================================
  // City Mapper
  // ========================================

  private mapCities(
    items: CityDto[],
  ): City[] {
    return items.map((item) => ({
      id: item.Id,
      provinceId: item.ProvinceId,
      cityOrMunicipalName:
        item.CityOrMunicipalName,
    }));
  }
}
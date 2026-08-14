import { Injectable } from '@angular/core';
import {
  map,
  Observable,
  of,
  tap,
} from 'rxjs';

import {
  CxpSelectOption,
} from 'cyberxp-ui';

import {
  AddressRefDataAccess,
} from '../../data/data-access/address-ref.data-access';

import {
  AddressReferences,
  Country,
  Region,
  Province,
  City,
  BarangaysResponse,
} from '../../models/domain/address-ref.model';

// ========================================
// Reference Select Options
// ========================================

export interface AddressSelectOptionsReferences {
  countryOptions: CxpSelectOption[];
  regionOptions: CxpSelectOption[];
  provinceOptions: CxpSelectOption[];
  cityOptions: CxpSelectOption[];
}

@Injectable({
  providedIn: 'root',
})
export class AddressRefService {
  // ========================================
  // Reference Cache
  // ========================================

  private referencesCache:
    | AddressReferences
    | null = null;

  // ========================================
  // Temporary Address Scope Options
  // ========================================

  private readonly addressScopeOptions:
    CxpSelectOption[] = [
      {
        value: 1,
        label: 'HOME',
      },
      {
        value: 2,
        label: 'PROVINCIAL',
      },
    ];

  constructor(
    private readonly dataAccess:
      AddressRefDataAccess,
  ) {}

  // ========================================
  // Get References
  // ========================================

  getReferences():
    Observable<AddressReferences> {
    if (
      this.referencesCache !== null
    ) {
      return of(
        this.referencesCache,
      );
    }

    return this.refreshReferences();
  }

  // ========================================
  // Get Reference Options
  // ========================================

  getReferenceOptions():
    Observable<AddressSelectOptionsReferences> {
    return this.getReferences().pipe(
      map((references) =>
        this.toReferenceOptions(
          references,
        ),
      ),
    );
  }

  // ========================================
  // Get Address Scope Options
  // ========================================

  getAddressScopeOptions():
    CxpSelectOption[] {
    return this.addressScopeOptions;
  }

  // ========================================
  // Refresh References
  // ========================================

  refreshReferences():
    Observable<AddressReferences> {
    return this.dataAccess
      .getReferences()
      .pipe(
        map(
          (response) =>
            response.data,
        ),

        tap((references) => {
          this.referencesCache =
            references;

          console.log(
            'Address References:',
            references,
          );
        }),
      );
  }

  // ========================================
  // Get Barangays By City
  // ========================================

  getBarangaysByCity(
    cityId: number,
  ): Observable<BarangaysResponse> {
    return this.dataAccess
      .getBarangaysByCity(
        cityId,
      )
      .pipe(
        tap((response) => {
          console.log(
            'Barangays Response:',
            response,
          );

          console.log(
            'Barangays Data:',
            response.data,
          );

          console.log(
            'Barangays Success:',
            response.success,
          );

          console.log(
            'Barangays Message:',
            response.message,
          );

          console.log(
            'Barangays Error Code:',
            response.errorCode,
          );
        }),
      );
  }

  // ========================================
  // Clear References Cache
  // ========================================

  clearReferencesCache(): void {
    this.referencesCache = null;
  }

  // ========================================
  // Convert References To Select Options
  // ========================================

  private toReferenceOptions(
    references:
      AddressReferences,
  ): AddressSelectOptionsReferences {
    return {
      countryOptions:
        this.toCountryOptions(
          references.countries,
        ),

      regionOptions:
        this.toRegionOptions(
          references.regions,
        ),

      provinceOptions:
        this.toProvinceOptions(
          references.provinces,
        ),

      cityOptions:
        this.toCityOptions(
          references.cities,
        ),
    };
  }

  // ========================================
  // Country Options
  // ========================================

  private toCountryOptions(
    items: Country[],
  ): CxpSelectOption[] {
    return items.map(
      (item) => ({
        value:
          item.id,

        label:
          item.countryName
            .toUpperCase(),
      }),
    );
  }

  // ========================================
  // Region Options
  // ========================================

  private toRegionOptions(
    items: Region[],
  ): CxpSelectOption[] {
    return items.map(
      (item) => ({
        value:
          item.id,

        label:
          item.regionName
            .toUpperCase(),
      }),
    );
  }

  // ========================================
  // Province Options
  // ========================================

  private toProvinceOptions(
    items: Province[],
  ): CxpSelectOption[] {
    return items.map(
      (item) => ({
        value:
          item.id,

        label:
          item.provinceName
            .toUpperCase(),
      }),
    );
  }

  // ========================================
  // City Options
  // ========================================

  private toCityOptions(
    items: City[],
  ): CxpSelectOption[] {
    return items.map(
      (item) => ({
        value:
          item.id,

        label:
          item
            .cityOrMunicipalName
            .toUpperCase(),
      }),
    );
  }
}
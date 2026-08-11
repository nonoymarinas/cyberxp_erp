import { Injectable } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';

import { CxpSelectOption } from 'cyberxp-ui';

import { AddressDataAccess } from '../../data/data-access/employee-address.data-access';

import {
  AddressReference,
  Country,
  Region,
  Province,
  City,
} from '../../../../shared/models/reference-address.model';

export interface AddressSelectOptionsReferences {
  countryOptions: CxpSelectOption[];
  regionOptions: CxpSelectOption[];
  provinceOptions: CxpSelectOption[];
  cityOptions: CxpSelectOption[];
}

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  private referencesCache: AddressReference | null = null;

  constructor(
    private readonly dataAccess: AddressDataAccess,
  ) {}

  // ========================================
  // References
  // ========================================

  getReferences(): Observable<AddressReference> {
    if (this.referencesCache !== null) {
      return of(this.referencesCache);
    }

    return this.refreshReferences();
  }

  getReferenceOptions(): Observable<AddressSelectOptionsReferences> {
    return this.getReferences().pipe(
      map((references) =>
        this.toReferenceOptions(references),
      ),
    );
  }

  refreshReferences(): Observable<AddressReference> {
    return this.dataAccess.getReferences().pipe(
      tap((references) => {
        this.referencesCache = references;
      }),
    );
  }

  clearReferencesCache(): void {
    this.referencesCache = null;
  }

  // ========================================
  // Convert References to Select Options
  // ========================================

  private toReferenceOptions(
    references: AddressReference,
  ): AddressSelectOptionsReferences {
    return {
      countryOptions:
        this.toCountryOptions(references.countries),

      regionOptions:
        this.toRegionOptions(references.regions),

      provinceOptions:
        this.toProvinceOptions(references.provinces),

      cityOptions:
        this.toCityOptions(references.cities),
    };
  }

  // ========================================
  // Country Options
  // ========================================

  private toCountryOptions(
    items: Country[],
  ): CxpSelectOption[] {
    return items.map((item) => ({
      value: item.id,
      label: item.countryName.toUpperCase(),
    }));
  }

  // ========================================
  // Region Options
  // ========================================

  private toRegionOptions(
    items: Region[],
  ): CxpSelectOption[] {
    return items.map((item) => ({
      value: item.id,
      label: item.regionName.toUpperCase(),
    }));
  }

  // ========================================
  // Province Options
  // ========================================

  private toProvinceOptions(
    items: Province[],
  ): CxpSelectOption[] {
    return items.map((item) => ({
      value: item.id,
      label: item.provinceName.toUpperCase(),
    }));
  }

  // ========================================
  // City Options
  // ========================================

  private toCityOptions(
    items: City[],
  ): CxpSelectOption[] {
    return items.map((item) => ({
      value: item.id,
      label: item.cityOrMunicipalName.toUpperCase(),
    }));
  }
}
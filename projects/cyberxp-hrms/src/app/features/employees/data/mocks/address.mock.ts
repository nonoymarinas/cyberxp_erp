import { Injectable } from '@angular/core';
import {
  delay,
  Observable,
  of,
} from 'rxjs';

import {
  EmployeeAddressDto,
  SaveAddressRequestDto,
} from '../../models/dto/address.dto.model';

@Injectable({
  providedIn: 'root',
})
export class AddressMockApi {
  // ========================================
  // Mock Database
  // ========================================

  private address:
    EmployeeAddressDto | null = null;

  // ========================================
  // Get Address
  // ========================================

  getAddress():
    Observable<EmployeeAddressDto | null> {
    console.log(
      'MOCK API - GET ADDRESS:',
      this.address,
    );

    return of(
      this.address
        ? { ...this.address }
        : null,
    ).pipe(
      delay(300),
    );
  }

  // ========================================
  // Save Address
  // ========================================

  saveAddress(
    request: SaveAddressRequestDto,
  ): Observable<EmployeeAddressDto> {
    console.log(
      'MOCK API - SAVE ADDRESS REQUEST:',
      request,
    );

    // ========================================
    // Simulate Database Save
    // ========================================

    const savedAddress:
      EmployeeAddressDto = {
      countryId:
        request.countryId,

      regionId:
        request.regionId,

      provinceId:
        request.provinceId,

      cityId:
        request.cityId,

      barangayId:
        request.barangayId,

      foreignStateProvinceRegion:
        request.foreignStateProvinceRegion,

      foreignCity:
        request.foreignCity,

      addressLine1:
        request.addressLine1,

      addressLine2:
        request.addressLine2,

      zipCode:
        request.zipCode,

      scopeId:
        request.scopeId,

      isPresent:
        request.isPresent,
    };

    this.address =
      savedAddress;

    console.log(
      'MOCK API - SAVED ADDRESS:',
      this.address,
    );

    // ========================================
    // Simulate API Response
    // ========================================

    return of({
      ...savedAddress,
    }).pipe(
      delay(500),
    );
  }

  // ========================================
  // Clear Mock Address
  // ========================================

  clearAddress(): void {
    this.address = null;

    console.log(
      'MOCK API - ADDRESS CLEARED',
    );
  }
}
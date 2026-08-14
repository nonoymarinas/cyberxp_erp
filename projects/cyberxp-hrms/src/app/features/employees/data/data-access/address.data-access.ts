import { Injectable } from '@angular/core';

import {
  map,
  Observable,
  tap,
} from 'rxjs';

import {
  AddressMockApi,
} from '../mocks/address.mock';

import {
  EmployeeAddressDto,
  SaveAddressRequestDto,
} from '../../models/dto/address.dto.model';

import {
  EmployeeAddress,
  SaveAddressRequest,
} from '../../models/domain/address.model';

@Injectable({
  providedIn: 'root',
})
export class AddressDataAccess {
  constructor(
    private readonly mockApi:
      AddressMockApi,
  ) {}

  // ========================================
  // Get Address
  // ========================================

  getAddress():
    Observable<EmployeeAddress | null> {
    return this.mockApi
      .getAddress()
      .pipe(
        tap((dto) => {
          console.log(
            'DATA ACCESS - GET ADDRESS DTO:',
            dto,
          );
        }),

        map((dto) => {
          if (dto === null) {
            return null;
          }

          return this.toDomain(
            dto,
          );
        }),

        tap((address) => {
          console.log(
            'DATA ACCESS - GET ADDRESS DOMAIN:',
            address,
          );
        }),
      );
  }

  // ========================================
  // Save Address
  // ========================================

  saveAddress(
    request: SaveAddressRequest,
  ): Observable<EmployeeAddress> {
    console.log(
      'DATA ACCESS - SAVE DOMAIN REQUEST:',
      request,
    );

    // ========================================
    // Domain Request -> DTO Request
    // ========================================

    const requestDto:
      SaveAddressRequestDto =
        this.toSaveDto(
          request,
        );

    console.log(
      'DATA ACCESS - SAVE DTO REQUEST:',
      requestDto,
    );

    // ========================================
    // Mock API
    // ========================================

    return this.mockApi
      .saveAddress(
        requestDto,
      )
      .pipe(
        tap((dto) => {
          console.log(
            'DATA ACCESS - SAVE DTO RESPONSE:',
            dto,
          );
        }),

        // ========================================
        // DTO Response -> Domain
        // ========================================

        map((dto) =>
          this.toDomain(
            dto,
          ),
        ),

        tap((address) => {
          console.log(
            'DATA ACCESS - SAVE DOMAIN RESPONSE:',
            address,
          );
        }),
      );
  }

  // ========================================
  // Clear Mock Address
  // ========================================

  clearAddress(): void {
    this.mockApi
      .clearAddress();
  }

  // ========================================
  // DTO -> Domain
  // ========================================

  private toDomain(
    dto: EmployeeAddressDto,
  ): EmployeeAddress {
    return {
      countryId:
        dto.countryId,

      regionId:
        dto.regionId,

      provinceId:
        dto.provinceId,

      cityId:
        dto.cityId,

      barangayId:
        dto.barangayId,

      foreignStateProvinceRegion:
        dto.foreignStateProvinceRegion,

      foreignCity:
        dto.foreignCity,

      addressLine1:
        dto.addressLine1 ?? '',

      addressLine2:
        dto.addressLine2,

      zipCode:
        dto.zipCode || null,

      // DTO = string
      // Domain = number
      scopeId:
        dto.scopeId !== null
          ? Number(dto.scopeId)
          : null,

      // DTO nullable boolean
      // Domain boolean
      isPresent:
        dto.isPresent ?? false,
    };
  }

  // ========================================
  // Domain -> DTO
  // ========================================

  private toSaveDto(
    request: SaveAddressRequest,
  ): SaveAddressRequestDto {
    return {
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

      // Domain nullable
      // DTO string
      zipCode:
        request.zipCode ?? '',

      // Domain number
      // DTO string
      scopeId:
        request.scopeId !== null
          ? String(request.scopeId)
          : null,

      isPresent:
        request.isPresent,
    };
  }
}
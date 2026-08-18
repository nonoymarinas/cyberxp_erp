import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';

import { AddressMockApi } from '../mocks/address.mock';

import {
  EmployeeAddressDto,
  EmployeeAddreResponseDto,
} from '../../models/dto/address.dto.model';

import {
  EmployeeAddress,
  EmployeeAddreResponse,
  SaveAddressRequest,
} from '../../models/domain/address.model';

@Injectable({
  providedIn: 'root',
})
export class AddressDataAccess {
  // ========================================
  // API
  // ========================================

  private readonly api =
    inject(AddressMockApi);

  // ========================================
  // Get Addresses
  // ========================================

  getAddresses(
    employeeGuid: string,
  ): Observable<EmployeeAddreResponse> {
    return this.api
      .getAddresses(employeeGuid)
      .pipe(
        map(
          (
            response:
              EmployeeAddreResponseDto,
          ) => ({
            success:
              response.success,

            message:
              response.message,

            errorCode:
              response.errorCode,

            data:
              response.data.map(
                (
                  address,
                ) =>
                  this.mapAddress(
                    address,
                  ),
              ),
          }),
        ),
      );
  }

  // ========================================
  // Save Address
  // ========================================

  saveAddress(
    request: SaveAddressRequest,
  ): Observable<EmployeeAddreResponse> {
    return this.api
      .saveAddress(request)
      .pipe(
        map(
          (
            response:
              EmployeeAddreResponseDto,
          ) => ({
            success:
              response.success,

            message:
              response.message,

            errorCode:
              response.errorCode,

            data:
              response.data.map(
                (
                  address,
                ) =>
                  this.mapAddress(
                    address,
                  ),
              ),
          }),
        ),
      );
  }

  // ========================================
  // Delete Address
  // ========================================

  deleteAddress(
    employeeGuid: string,
    addressId: string,
  ): Observable<EmployeeAddreResponse> {
    return this.api
      .deleteAddress(
        employeeGuid,
        addressId,
      )
      .pipe(
        map(
          (
            response:
              EmployeeAddreResponseDto,
          ) => ({
            success:
              response.success,

            message:
              response.message,

            errorCode:
              response.errorCode,

            data:
              response.data.map(
                (
                  address,
                ) =>
                  this.mapAddress(
                    address,
                  ),
              ),
          }),
        ),
      );
  }

  // ========================================
  // DTO -> Domain
  // ========================================

  private mapAddress(
    dto: EmployeeAddressDto,
  ): EmployeeAddress {
    return {
      addressId:
        dto.addressId,

      scopeId:
        dto.scopeId,

      countryId:
        dto.countryId,

      // ======================================
      // Philippine Address
      // ======================================

      regionId:
        dto.regionId,

      provinceId:
        dto.provinceId,

      cityId:
        dto.cityId,

      barangayId:
        dto.barangayId,

      // ======================================
      // International Address
      // ======================================

      internationalRegion:
        dto.internationalRegion,

      internationalStates:
        dto.internationalStates,

      internationalProvince:
        dto.internationalProvince,

      internationalCity:
        dto.internationalCity,

      internationalSuburb:
        dto.internationalSuburb,

      // ======================================
      // Common Address
      // ======================================

      addressLine1:
        dto.addressLine1,

      addressLine2:
        dto.addressLine2,

      zipCode:
        dto.zipCode,

      isPresent:
        dto.isPresent,
    };
  }
}
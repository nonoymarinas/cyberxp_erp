import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';

import { AddressApi } from '../api/address.api';

import { EmployeeAddressDto, EmployeeAddreResponseDto } from '../../models/dto/address.dto.model';

import {
  EmployeeAddress,
  EmployeeAddreResponse as EmployeeAddresResponse,
  SaveAddressRequest,
} from '../../models/domain/address.model';

@Injectable({
  providedIn: 'root',
})
export class AddressDataAccess {
  // ========================================
  // API
  // ========================================

  private readonly api = inject(AddressApi);

  // ========================================
  // Get Addresses
  // ========================================

  getAddresses(employeeGuid: string): Observable<EmployeeAddresResponse> {
    return this.api.getAddresses(employeeGuid).pipe(
      map((response: EmployeeAddreResponseDto): EmployeeAddresResponse => ({
        success: response.success,
        message: response.message,
        errorCode: response.errorCode,
        data: response.data.map((dto) => this.mapAddress(dto)),
      })),
    );
  }

  // ========================================
  // Save Address
  // ========================================

  saveAddress(request: SaveAddressRequest): Observable<EmployeeAddresResponse> {
    return this.api.saveAddress(request).pipe(
      map((response: EmployeeAddreResponseDto): EmployeeAddresResponse => ({
        success: response.success,
        message: response.message,
        errorCode: response.errorCode,
        data: response.data.map((dto) => this.mapAddress(dto)),
      })),
    );
  }

  // ========================================
  // Delete Address
  // ========================================

  deleteAddress(employeeGuid: string, addressId: string): Observable<EmployeeAddresResponse> {
    return this.api.deleteAddress(employeeGuid, addressId).pipe(
      map((response: EmployeeAddreResponseDto): EmployeeAddresResponse => ({
        success: response.success,
        message: response.message,
        errorCode: response.errorCode,
        data: response.data.map((dto) => this.mapAddress(dto)),
      })),
    );
  }

  // ========================================
  // DTO -> Domain
  // ========================================

  private mapAddress(dto: EmployeeAddressDto): EmployeeAddress {
    return {
      addressId: dto.addressId,
      scopeId: dto.scopeId,
      countryId: dto.countryId,
      regionId: dto.regionId,
      provinceId: dto.provinceId,
      cityId: dto.cityId,
      barangayId: dto.barangayId,
      internationalRegion: dto.internationalRegion,
      internationalStates: dto.internationalStates,
      internationalProvince: dto.internationalProvince,
      internationalCity: dto.internationalCity,
      internationalSuburb: dto.internationalSuburb,
      addressLine1: dto.addressLine1,
      addressLine2: dto.addressLine2,
      zipCode: dto.zipCode,
      isPresent: dto.isPresent,
    };
  }
}

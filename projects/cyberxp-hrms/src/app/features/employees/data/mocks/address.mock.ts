import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import {
  EmployeeAddressDto,
  EmployeeAddreResponseDto,
} from '../../models/dto/address.dto.model';
import { SaveAddressRequest } from '../../models/domain/address.model';

@Injectable({
  providedIn: 'root',
})
export class AddressMockApi {
  private readonly addressesByEmployee =
    new Map<string, EmployeeAddressDto[]>();

  getAddresses(
    employeeGuid: string,
  ): Observable<EmployeeAddreResponseDto> {
    const addresses =
      this.addressesByEmployee.get(employeeGuid) ?? [];

    return of({
      success: true,
      message: 'Addresses retrieved successfully.',
      errorCode: null,
      data: [...addresses],
    });
  }

  saveAddress(
    request: SaveAddressRequest,
  ): Observable<EmployeeAddreResponseDto> {
    const currentAddresses =
      this.addressesByEmployee.get(request.employeeGuid) ?? [];

    if (request.addressId !== null) {
      const existingIndex = currentAddresses.findIndex(
        (address) => address.addressId === request.addressId,
      );

      if (existingIndex === -1) {
        return of({
          success: false,
          message: 'Address not found.',
          errorCode: 'ADDRESS_NOT_FOUND',
          data: [...currentAddresses],
        });
      }

      const updatedAddress: EmployeeAddressDto = {
        addressId: request.addressId,
        scopeId: request.scopeId,
        countryId: request.countryId,
        regionId: request.regionId,
        provinceId: request.provinceId,
        cityId: request.cityId,
        barangayId: request.barangayId,
        foreignStateProvinceRegion:
          request.foreignStateProvinceRegion,
        foreignCity: request.foreignCity,
        addressLine1: request.addressLine1,
        addressLine2: request.addressLine2,
        zipCode: request.zipCode,
        isPresent: request.isPresent,
      };

      const updatedAddresses = [...currentAddresses];
      updatedAddresses[existingIndex] = updatedAddress;

      this.addressesByEmployee.set(
        request.employeeGuid,
        updatedAddresses,
      );

      return of({
        success: true,
        message: 'Address updated successfully.',
        errorCode: null,
        data: [...updatedAddresses],
      });
    }

    const newAddress: EmployeeAddressDto = {
      addressId: crypto.randomUUID(),
      scopeId: request.scopeId,
      countryId: request.countryId,
      regionId: request.regionId,
      provinceId: request.provinceId,
      cityId: request.cityId,
      barangayId: request.barangayId,
      foreignStateProvinceRegion:
        request.foreignStateProvinceRegion,
      foreignCity: request.foreignCity,
      addressLine1: request.addressLine1,
      addressLine2: request.addressLine2,
      zipCode: request.zipCode,
      isPresent: request.isPresent,
    };

    const updatedAddresses = [
      ...currentAddresses,
      newAddress,
    ];

    this.addressesByEmployee.set(
      request.employeeGuid,
      updatedAddresses,
    );

    return of({
      success: true,
      message: 'Address saved successfully.',
      errorCode: null,
      data: [...updatedAddresses],
    });
  }

  deleteAddress(
    employeeGuid: string,
    addressId: string,
  ): Observable<EmployeeAddreResponseDto> {
    const currentAddresses =
      this.addressesByEmployee.get(employeeGuid) ?? [];

    const exists = currentAddresses.some(
      (address) => address.addressId === addressId,
    );

    if (!exists) {
      return of({
        success: false,
        message: 'Address not found.',
        errorCode: 'ADDRESS_NOT_FOUND',
        data: [...currentAddresses],
      });
    }

    const updatedAddresses = currentAddresses.filter(
      (address) => address.addressId !== addressId,
    );

    this.addressesByEmployee.set(
      employeeGuid,
      updatedAddresses,
    );

    return of({
      success: true,
      message: 'Address deleted successfully.',
      errorCode: null,
      data: [...updatedAddresses],
    });
  }

  clearAddresses(
    employeeGuid: string,
  ): void {
    this.addressesByEmployee.delete(employeeGuid);
  }

  clearAllAddresses(): void {
    this.addressesByEmployee.clear();
  }
}

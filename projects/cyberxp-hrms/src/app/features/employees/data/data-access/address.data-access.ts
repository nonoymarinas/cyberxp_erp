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
  private readonly api = inject(AddressMockApi);

  getAddresses(
    employeeGuid: string,
  ): Observable<EmployeeAddreResponse> {
    return this.api
      .getAddresses(employeeGuid)
      .pipe(
        map((response: EmployeeAddreResponseDto) => ({
          success: response.success,
          message: response.message,
          errorCode: response.errorCode,
          data: response.data.map((address) =>
            this.mapAddress(address),
          ),
        })),
      );
  }

  saveAddress(
    request: SaveAddressRequest,
  ): Observable<EmployeeAddreResponse> {
    return this.api
      .saveAddress(request)
      .pipe(
        map((response: EmployeeAddreResponseDto) => ({
          success: response.success,
          message: response.message,
          errorCode: response.errorCode,
          data: response.data.map((address) =>
            this.mapAddress(address),
          ),
        })),
      );
  }

  deleteAddress(
    employeeGuid: string,
    addressId: string,
  ): Observable<EmployeeAddreResponse> {
    return this.api
      .deleteAddress(employeeGuid, addressId)
      .pipe(
        map((response: EmployeeAddreResponseDto) => ({
          success: response.success,
          message: response.message,
          errorCode: response.errorCode,
          data: response.data.map((address) =>
            this.mapAddress(address),
          ),
        })),
      );
  }

  private mapAddress(
    dto: EmployeeAddressDto,
  ): EmployeeAddress {
    return {
      addressId: dto.addressId,
      scopeId: dto.scopeId,
      countryId: dto.countryId,
      regionId: dto.regionId,
      provinceId: dto.provinceId,
      cityId: dto.cityId,
      barangayId: dto.barangayId,
      foreignStateProvinceRegion: dto.foreignStateProvinceRegion,
      foreignCity: dto.foreignCity,
      addressLine1: dto.addressLine1,
      addressLine2: dto.addressLine2,
      zipCode: dto.zipCode,
      isPresent: dto.isPresent,
    };
  }
}

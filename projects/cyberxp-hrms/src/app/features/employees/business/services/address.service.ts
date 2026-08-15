import { Injectable, inject, signal } from '@angular/core';
import { map, Observable, tap } from 'rxjs';

import { AddressDataAccess } from '../../data/data-access/address.data-access';
import {
  EmployeeAddress,
  SaveAddressRequest,
} from '../../models/domain/address.model';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  private readonly dataAccess = inject(AddressDataAccess);

  private readonly _addresses = signal<EmployeeAddress[]>([]);
  readonly addresses = this._addresses.asReadonly();

  getAddresses(
    employeeGuid: string,
  ): Observable<EmployeeAddress[]> {
    return this.dataAccess
      .getAddresses(employeeGuid)
      .pipe(
        map((response) => {
          if (!response.success) {
            throw new Error(
              response.message ?? 'Unable to retrieve addresses.',
            );
          }

          return response.data;
        }),
        tap((addresses) => {
          this._addresses.set(addresses);
        }),
      );
  }

  saveAddress(
    request: SaveAddressRequest,
  ): Observable<EmployeeAddress[]> {
    return this.dataAccess
      .saveAddress(request)
      .pipe(
        map((response) => {
          if (!response.success) {
            throw new Error(
              response.message ?? 'Unable to save address.',
            );
          }

          return response.data;
        }),
        tap((addresses) => {
          this._addresses.set(addresses);
        }),
      );
  }

  deleteAddress(
    employeeGuid: string,
    addressId: string,
  ): Observable<EmployeeAddress[]> {
    return this.dataAccess
      .deleteAddress(employeeGuid, addressId)
      .pipe(
        map((response) => {
          if (!response.success) {
            throw new Error(
              response.message ?? 'Unable to delete address.',
            );
          }

          return response.data;
        }),
        tap((addresses) => {
          this._addresses.set(addresses);
        }),
      );
  }

  getCachedAddresses(): EmployeeAddress[] {
    return this._addresses();
  }

  getAddressById(
    addressId: string,
  ): EmployeeAddress | null {
    return (
      this._addresses().find(
        (address) => address.addressId === addressId,
      ) ?? null
    );
  }

  clearAddresses(): void {
    this._addresses.set([]);
  }
}

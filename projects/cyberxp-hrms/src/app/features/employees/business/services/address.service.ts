import { Injectable } from '@angular/core';
import {
  Observable,
  of,
  tap,
} from 'rxjs';

import {
  CxpSelectOption,
} from 'cyberxp-ui';

import {
  AddressDataAccess,
} from '../../data/data-access/address.data-access';

import {
  EmployeeAddress,
  SaveAddressRequest,
} from '../../models/domain/address.model';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  // ========================================
  // Address Cache
  // ========================================

  private addressCache:
    EmployeeAddress | null = null;

  /*
   * Distinguishes:
   *
   * false = address has not been loaded yet
   * true  = address has already been loaded
   *
   * addressCache can still be null when
   * the employee has no saved address.
   */
  private addressLoaded = false;

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

  // ========================================
  // Constructor
  // ========================================

  constructor(
    private readonly dataAccess:
      AddressDataAccess,
  ) {}

  // ========================================
  // Get Address
  // ========================================

  getAddress():
    Observable<EmployeeAddress | null> {
    // ========================================
    // Return Cache If Already Loaded
    // ========================================

    if (this.addressLoaded) {
      console.log(
        'SERVICE - ADDRESS FROM CACHE:',
        this.addressCache,
      );

      return of(
        this.addressCache,
      );
    }

    // ========================================
    // First Load
    // ========================================

    return this.refreshAddress();
  }

  // ========================================
  // Refresh Address
  // ========================================

  refreshAddress():
    Observable<EmployeeAddress | null> {
    return this.dataAccess
      .getAddress()
      .pipe(
        tap((address) => {
          this.addressCache =
            address;

          this.addressLoaded =
            true;

          console.log(
            'SERVICE - ADDRESS LOADED:',
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
      'SERVICE - SAVE ADDRESS REQUEST:',
      request,
    );

    return this.dataAccess
      .saveAddress(request)
      .pipe(
        tap((savedAddress) => {
          // ========================================
          // Update Cache From Save Response
          // ========================================

          this.addressCache =
            savedAddress;

          this.addressLoaded =
            true;

          console.log(
            'SERVICE - ADDRESS SAVED:',
            savedAddress,
          );

          console.log(
            'SERVICE - ADDRESS CACHE UPDATED:',
            this.addressCache,
          );
        }),
      );
  }

  // ========================================
  // Get Cached Address
  // ========================================

  getCachedAddress():
    EmployeeAddress | null {
    return this.addressCache;
  }

  // ========================================
  // Address Scope Options
  // ========================================

  getAddressScopeOptions():
    CxpSelectOption[] {
    /*
     * Return a copy so a component
     * cannot mutate the service array.
     */

    return [
      ...this.addressScopeOptions,
    ];
  }

  // ========================================
  // Clear Address Cache Only
  // ========================================

  clearAddressCache(): void {
    this.addressCache =
      null;

    this.addressLoaded =
      false;

    console.log(
      'SERVICE - ADDRESS CACHE CLEARED',
    );
  }

  // ========================================
  // Clear Mock Address + Cache
  // ========================================

  clearAddress(): void {
    this.dataAccess
      .clearAddress();

    this.addressCache =
      null;

    this.addressLoaded =
      false;

    console.log(
      'SERVICE - ADDRESS CLEARED',
    );
  }
}
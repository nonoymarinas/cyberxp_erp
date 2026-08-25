import { Component, Injector, OnInit, effect, inject } from '@angular/core';

import { CxpAddress, AddressSaveValue } from './components/cxp-address';

// import { EmployeeState } from '../../../../../features/';
import { EmployeeState } from '../../../../employees/state/employee-state.service';

import { AddressService } from '../../../../employees/business/services/address.service';

import { UserAccessService } from '../../../../../core/authorization/services/user-access.services';

import { EMPLOYEE_PERMISSIONS } from '../../../../../core/authorization/permissions/employee-permissions';

import {
  Address,
  SaveAddressRequest,
} from '../../../models/address/address.model';

@Component({
  selector: 'employee-address-container',
  standalone: true,

  imports: [CxpAddress],

  templateUrl: './address.html',
})
export class AddressComponent implements OnInit {
  // ========================================
  // Dependencies
  // ========================================

  private readonly employeeState = inject(EmployeeState);

  private readonly addressService = inject(AddressService);

  private readonly userAccessService = inject(UserAccessService);

  private readonly injector = inject(Injector);

  // ========================================
  // Permissions
  // ========================================

  readonly permissions = EMPLOYEE_PERMISSIONS.address;

  // ========================================
  // State
  // ========================================

  addresses: Address[] = [];

  isLoading = false;

  isSaving = false;

  errorMessage = '';

  successMessage = '';

  private loadedEmployeeGuid: string | null = null;

  // ========================================
  // Employee
  // ========================================
  testParent(): void {
    console.log('PARENT IS ACTIVE');
  }
  get employeeGuid(): string | null {
    return this.employeeState.employeeData()?.personalInfo.employeeGuid ?? null;
  }

  get hasEmployeeId(): boolean {
    return this.employeeGuid !== null;
  }

  // ========================================
  // Permissions
  // ========================================

  get canCreate(): boolean {
    return this.hasEmployeeId && this.userAccessService.hasPermission(this.permissions.create);
  }

  get canRead(): boolean {
    return this.hasEmployeeId && this.userAccessService.hasPermission(this.permissions.read);
  }

  get canUpdate(): boolean {
    return this.hasEmployeeId && this.userAccessService.hasPermission(this.permissions.update);
  }

  get canDelete(): boolean {
    return this.hasEmployeeId && this.userAccessService.hasPermission(this.permissions.delete);
  }

  // ========================================
  // Init
  // ========================================

  ngOnInit(): void {
    effect(
      () => {
        const employeeGuid = this.employeeGuid;

        this.handleEmployeeGuidChange(employeeGuid);
      },
      {
        injector: this.injector,
      },
    );
  }

  // ========================================
  // Employee Change
  // ========================================

  private handleEmployeeGuidChange(employeeGuid: string | null): void {
    // ======================================
    // No Employee
    // ======================================

    if (!employeeGuid) {
      this.loadedEmployeeGuid = null;

      this.addresses = [];

      this.isLoading = false;

      this.isSaving = false;

      this.errorMessage = '';

      this.successMessage = '';

      this.addressService.clearAddresses();

      return;
    }

    // ======================================
    // Already Loaded
    // ======================================

    if (this.loadedEmployeeGuid === employeeGuid) {
      return;
    }

    // ======================================
    // New Employee
    // ======================================

    this.loadedEmployeeGuid = employeeGuid;

    this.addresses = [];

    this.errorMessage = '';

    this.successMessage = '';

    this.loadAddresses();
  }

  // ========================================
  // Load Addresses
  // ========================================

  private loadAddresses(): void {
    const employeeGuid = this.employeeGuid;

    if (!employeeGuid) {
      return;
    }

    if (!this.canRead && !this.canCreate) {
      this.addresses = [];

      return;
    }

    this.isLoading = true;

    this.errorMessage = '';

    this.successMessage = '';

    this.addressService.getAddresses(employeeGuid).subscribe({
      next: (addresses: Address[]) => {
        this.addresses = addresses;

        this.isLoading = false;
      },

      error: (error: unknown) => {
        console.error('Failed to load employee addresses:', error);

        this.addresses = [];

        this.isLoading = false;

        this.errorMessage = 'Unable to load employee addresses.';
      },
    });
  }

  // ========================================
  // Save Address
  // ========================================

  onSaveAddress(address: AddressSaveValue): void {
    console.log('ADDRESS RECEIVED FROM CXP-ADDRESS:', address);
    const employeeGuid = this.employeeGuid;

    if (!employeeGuid) {
      this.errorMessage = 'Employee ID is not available.';

      return;
    }

    // ======================================
    // Determine Create / Update
    // ======================================

    const isCreating = address.addressId === null;

    // ======================================
    // Permissions
    // ======================================

    if (isCreating && !this.canCreate) {
      this.errorMessage = 'You do not have permission to create an address.';

      return;
    }

    if (!isCreating && !this.canUpdate) {
      this.errorMessage = 'You do not have permission to update this address.';

      return;
    }

    // ======================================
    // Request
    // ======================================

    const request: SaveAddressRequest = {
      employeeGuid,

      addressId: address.addressId,

      scopeId: address.scopeId,

      countryId: address.countryId,

      regionId: address.regionId,

      provinceId: address.provinceId,

      cityId: address.cityId,

      barangayId: address.barangayId,

      internationalRegion: address.internationalRegion,

      internationalStates: address.internationalStates,

      internationalProvince: address.internationalProvince,

      internationalCity: address.internationalCity,

      internationalSuburb: address.internationalSuburb,

      addressLine1: address.addressLine1,

      addressLine2: address.addressLine2,

      zipCode: address.zipCode,

      isPresent: address.isPresent,
    };

    // ======================================
    // Save
    // ======================================

    this.isSaving = true;

    this.errorMessage = '';

    this.successMessage = '';

    this.addressService.saveAddress(request).subscribe({
      next: (addresses: Address[]) => {
        this.addresses = addresses;

        this.isSaving = false;

        this.successMessage = isCreating
          ? 'Address saved successfully.'
          : 'Address updated successfully.';
      },

      error: (error: unknown) => {
        console.error('Failed to save employee address:', error);

        this.isSaving = false;

        this.errorMessage = isCreating ? 'Unable to save address.' : 'Unable to update address.';
      },
    });
  }

  // ========================================
  // Delete Address
  // ========================================

  onDeleteAddress(addressId: string): void {
    const employeeGuid = this.employeeGuid;

    if (!employeeGuid) {
      this.errorMessage = 'Employee ID is not available.';

      return;
    }

    // ======================================
    // Permission
    // ======================================

    if (!this.canDelete) {
      this.errorMessage = 'You do not have permission to delete this address.';

      return;
    }

    // ======================================
    // Delete
    // ======================================

    this.isSaving = true;

    this.errorMessage = '';

    this.successMessage = '';

    this.addressService.deleteAddress(employeeGuid, addressId).subscribe({
      next: (addresses: Address[]) => {
        this.addresses = addresses;

        this.isSaving = false;

        this.successMessage = 'Address deleted successfully.';
      },

      error: (error: unknown) => {
        console.error('Failed to delete employee address:', error);

        this.isSaving = false;

        this.errorMessage = 'Unable to delete address.';
      },
    });
  }
}

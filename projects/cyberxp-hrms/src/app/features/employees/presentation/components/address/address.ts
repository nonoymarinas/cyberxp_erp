import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import {
  CxpButton,
  CxpDisplayField,
  CxpIconAddressNav,
  CxpInputSelect,
  CxpInputText,
} from 'cyberxp-ui';

import type { CxpSelectOption, CxpSelectPrimitive } from 'cyberxp-ui';

import { EmployeeState } from '../../../state/employee-state.service';

import { AddressService } from '../../../business/services/address-references.service';

import { UserAccessService } from '../../../../../core/authorization/services/user-access.services';

import { EMPLOYEE_PERMISSIONS } from '../../../../../core/authorization/permissions/employee-permissions';

import {
  AddressReferences,
  EmployeeAddress,
  Region,
  Province,
  City,
} from '../../../models/domain/address.domain.model';

@Component({
  selector: 'employee-address',
  standalone: true,

  imports: [
    ReactiveFormsModule,

    CxpButton,
    CxpDisplayField,
    CxpIconAddressNav,
    CxpInputSelect,
    CxpInputText,
  ],

  templateUrl: './address.html',
  styleUrl: './address.css',
})
export class Address implements OnInit {
  private readonly userAccessService = inject(UserAccessService);

  private readonly addressService = inject(AddressService);

  readonly permissions = EMPLOYEE_PERMISSIONS.address;

  // ========================================
  // Reference State
  // ========================================

  private referencesLoaded = false;

  private addressReferences: AddressReferences | null = null;

  // ========================================
  // Address State
  // ========================================

  hasAddress = false;

  isLoading = false;

  isLoadingBarangays = false;

  isEditing = false;

  isSaving = false;

  successMessage = '';

  errorMessage = '';

  // ========================================
  // Select Options
  // ========================================

  countryOptions: CxpSelectOption[] = [];

  regionOptions: CxpSelectOption[] = [];

  provinceOptions: CxpSelectOption[] = [];

  cityOptions: CxpSelectOption[] = [];

  barangayOptions: CxpSelectOption[] = [];

  constructor(public readonly employeeState: EmployeeState) {}

  // ========================================
  // Permissions
  // ========================================

  get canCreate(): boolean {
    return this.userAccessService.hasPermission(this.permissions.create);
  }

  get canRead(): boolean {
    return this.userAccessService.hasPermission(this.permissions.read);
  }

  get canUpdate(): boolean {
    return this.userAccessService.hasPermission(this.permissions.update);
  }

  get canDelete(): boolean {
    return this.userAccessService.hasPermission(this.permissions.delete);
  }

  // ========================================
  // Can Modify
  // ========================================

  get canModify(): boolean {
    return this.hasAddress ? this.canUpdate : this.canCreate;
  }

  get canAccess(): boolean {
    if (!this.hasAddress) {
      return this.canCreate || this.canRead;
    }

    return this.canRead;
  }

  // ========================================
  // Reactive Form
  // ========================================

  readonly addressForm = new FormGroup({
    // ========================================
    // Country
    // ========================================

    countryId: new FormControl<number | null>(
      {
        value: null,
        disabled: false,
      },
      {
        validators: [Validators.required],
      },
    ),

    // ========================================
    // Philippine Address
    // ========================================

    regionId: new FormControl<number | null>({
      value: null,
      disabled: false,
    }),

    provinceId: new FormControl<number | null>({
      value: null,
      disabled: false,
    }),

    cityId: new FormControl<number | null>({
      value: null,
      disabled: false,
    }),

    barangayId: new FormControl<number | null>({
      value: null,
      disabled: false,
    }),

    // ========================================
    // Foreign Address
    // ========================================

    foreignStateProvinceRegion: new FormControl(
      {
        value: '',
        disabled: false,
      },
      {
        nonNullable: true,
      },
    ),

    foreignCity: new FormControl(
      {
        value: '',
        disabled: false,
      },
      {
        nonNullable: true,
      },
    ),

    // ========================================
    // Common Address
    // ========================================

    addressLine1: new FormControl(
      {
        value: '',
        disabled: false,
      },
      {
        nonNullable: true,
        validators: [Validators.required],
      },
    ),

    addressLine2: new FormControl(
      {
        value: '',
        disabled: false,
      },
      {
        nonNullable: true,
      },
    ),

    zipCode: new FormControl(
      {
        value: '',
        disabled: false,
      },
      {
        nonNullable: true,
      },
    ),
  });

  // ========================================
  // Country Selected
  // ========================================

  get hasCountrySelected(): boolean {
    return this.addressForm.controls.countryId.value !== null;
  }

  // ========================================
  // Philippines Selected
  // ========================================

  get isPhilippinesSelected(): boolean {
    const countryId = this.addressForm.controls.countryId.value;

    if (countryId === null || !this.addressReferences) {
      return false;
    }

    const country = this.addressReferences.countries.find((item) => item.id === countryId);

    return country?.countryName.trim().toLowerCase() === 'philippines';
  }

  // ========================================
  // Init
  // ========================================

  ngOnInit(): void {
    this.addressForm.disable();

    this.setupAddressChanges();

    this.loadReferences();
  }

  // ========================================
  // Load References
  // ========================================

  private loadReferences(): void {
    this.isLoading = true;

    this.errorMessage = '';

    this.addressService.getReferences().subscribe({
      next: (references) => {
        console.log('Address References:', references);

        this.addressReferences = references;

        this.countryOptions = references.countries.map((country) => ({
          value: country.id,

          label: country.countryName.toUpperCase(),
        }));

        this.regionOptions = [];

        this.provinceOptions = [];

        this.cityOptions = [];

        this.barangayOptions = [];

        this.referencesLoaded = this.countryOptions.length > 0;

        this.loadAddress();
      },

      error: (error) => {
        console.error('Failed to load address references:', error);

        this.referencesLoaded = false;

        this.isLoading = false;

        this.errorMessage = 'Unable to load address reference data.';

        this.addressForm.disable();
      },
    });
  }

  // ========================================
  // Load Employee Address
  // ========================================

  private loadAddress(): void {
    /*
     * Temporary until GET Employee Address
     * API is connected.
     */

    const address: EmployeeAddress | null = null;

    this.handleLoadedAddress(address);
  }

  // ========================================
  // Handle Loaded Address
  // ========================================

  private handleLoadedAddress(address: EmployeeAddress | null): void {
    // ========================================
    // No Existing Address
    // ========================================

    if (!address) {
      this.hasAddress = false;

      this.resetAddressForm();

      this.isEditing = true;

      this.addressForm.enable();

      this.updateAddressValidators();

      this.isLoading = false;

      return;
    }

    // ========================================
    // Existing Address
    // ========================================

    this.hasAddress = true;

    this.populateAddress(address);

    this.isEditing = false;

    this.addressForm.disable();

    this.isLoading = false;
  }

  // ========================================
  // Populate Existing Address
  // ========================================

  private populateAddress(address: EmployeeAddress): void {
    // ========================================
    // Set Country First
    // ========================================

    this.addressForm.controls.countryId.setValue(address.countryId, {
      emitEvent: false,
    });

    // ========================================
    // Philippine Address
    // ========================================

    if (this.isPhilippinesSelected) {
      this.populatePhilippineAddressOptions(address);

      this.addressForm.patchValue(
        {
          countryId: address.countryId,

          regionId: address.regionId,

          provinceId: address.provinceId,

          cityId: address.cityId,

          barangayId: address.barangayId,

          foreignStateProvinceRegion: '',

          foreignCity: '',

          addressLine1: address.addressLine1,

          addressLine2: address.addressLine2,

          zipCode: address.zipCode,
        },
        {
          emitEvent: false,
        },
      );

      // ========================================
      // Load Barangays For Existing City
      // ========================================

      if (address.cityId !== null) {
        this.loadBarangays(address.cityId, address.barangayId);
      }

      return;
    }

    // ========================================
    // Foreign Address
    // ========================================

    this.regionOptions = [];

    this.provinceOptions = [];

    this.cityOptions = [];

    this.barangayOptions = [];

    this.addressForm.patchValue(
      {
        countryId: address.countryId,

        regionId: null,

        provinceId: null,

        cityId: null,

        barangayId: null,

        foreignStateProvinceRegion: address.foreignStateProvinceRegion,

        foreignCity: address.foreignCity,

        addressLine1: address.addressLine1,

        addressLine2: address.addressLine2,

        zipCode: address.zipCode,
      },
      {
        emitEvent: false,
      },
    );
  }

  // ========================================
  // Populate Philippine Options
  // ========================================

  private populatePhilippineAddressOptions(address: EmployeeAddress): void {
    if (!this.addressReferences || address.countryId === null) {
      return;
    }

    // ========================================
    // Regions
    // ========================================

    const regions = this.addressReferences.regions.filter(
      (region) => region.countryId === address.countryId,
    );

    this.regionOptions = this.toRegionOptions(regions);

    // ========================================
    // Provinces
    // ========================================

    if (address.regionId !== null) {
      const provinces = this.addressReferences.provinces.filter(
        (province) => province.regionId === address.regionId,
      );

      this.provinceOptions = this.toProvinceOptions(provinces);
    } else {
      this.provinceOptions = [];
    }

    // ========================================
    // Cities
    // ========================================

    if (address.provinceId !== null) {
      const cities = this.addressReferences.cities.filter(
        (city) => city.provinceId === address.provinceId,
      );

      this.cityOptions = this.toCityOptions(cities);
    } else {
      this.cityOptions = [];
    }
  }

  // ========================================
  // Setup Address Changes
  // ========================================

  private setupAddressChanges(): void {
    this.addressForm.controls.countryId.valueChanges.subscribe((countryId) => {
      this.onCountryChange(countryId);
    });

    this.addressForm.controls.regionId.valueChanges.subscribe((regionId) => {
      this.onRegionChange(regionId);
    });

    this.addressForm.controls.provinceId.valueChanges.subscribe((provinceId) => {
      this.onProvinceChange(provinceId);
    });

    this.addressForm.controls.cityId.valueChanges.subscribe((cityId) => {
      this.onCityChange(cityId);
    });
  }

  // ========================================
  // Country Change
  // ========================================

  onCountryChange(countryId: number | null): void {
    if (!this.addressReferences) {
      return;
    }

    // ========================================
    // Clear Local Address
    // ========================================

    this.addressForm.patchValue(
      {
        regionId: null,

        provinceId: null,

        cityId: null,

        barangayId: null,
      },
      {
        emitEvent: false,
      },
    );

    // ========================================
    // Clear Foreign Location
    // ========================================

    this.addressForm.patchValue(
      {
        foreignStateProvinceRegion: '',

        foreignCity: '',
      },
      {
        emitEvent: false,
      },
    );

    this.regionOptions = [];

    this.provinceOptions = [];

    this.cityOptions = [];

    this.barangayOptions = [];

    // ========================================
    // No Country
    // ========================================

    if (countryId === null) {
      this.updateAddressValidators();

      return;
    }

    // ========================================
    // Philippines
    // ========================================

    if (this.isPhilippinesSelected) {
      this.loadAllPhilippineOptions();
    }

    this.updateAddressValidators();
  }

  // ========================================
  // Region Change
  // ========================================

  onRegionChange(regionId: number | null): void {
    if (!this.addressReferences || !this.isPhilippinesSelected) {
      return;
    }

    this.clearBarangay();

    // ========================================
    // Region Cleared
    // ========================================

    if (regionId === null) {
      this.addressForm.patchValue(
        {
          provinceId: null,

          cityId: null,

          barangayId: null,
        },
        {
          emitEvent: false,
        },
      );

      this.loadAllPhilippineOptions();

      return;
    }

    // ========================================
    // Region Selected
    // ========================================

    this.addressForm.patchValue(
      {
        provinceId: null,

        cityId: null,

        barangayId: null,
      },
      {
        emitEvent: false,
      },
    );

    // ========================================
    // Provinces Under Region
    // ========================================

    const provinces = this.addressReferences.provinces.filter(
      (province) => province.regionId === regionId,
    );

    this.provinceOptions = this.toProvinceOptions(provinces);

    // ========================================
    // Cities Under Region
    // ========================================

    const provinceIds = new Set(provinces.map((province) => province.id));

    const cities = this.addressReferences.cities.filter((city) => provinceIds.has(city.provinceId));

    this.cityOptions = this.toCityOptions(cities);
  }

  // ========================================
  // Province Change
  // ========================================

  onProvinceChange(provinceId: number | null): void {
    if (!this.addressReferences || !this.isPhilippinesSelected) {
      return;
    }

    // ========================================
    // Clear City + Barangay
    // ========================================

    this.addressForm.patchValue(
      {
        cityId: null,

        barangayId: null,
      },
      {
        emitEvent: false,
      },
    );

    this.barangayOptions = [];

    // ========================================
    // Province Cleared
    // ========================================

    if (provinceId === null) {
      const regionId = this.addressForm.controls.regionId.value;

      // ========================================
      // Region Selected
      // ========================================

      if (regionId !== null) {
        const provinces = this.addressReferences.provinces.filter(
          (province) => province.regionId === regionId,
        );

        this.provinceOptions = this.toProvinceOptions(provinces);

        const provinceIds = new Set(provinces.map((province) => province.id));

        const cities = this.addressReferences.cities.filter((city) =>
          provinceIds.has(city.provinceId),
        );

        this.cityOptions = this.toCityOptions(cities);

        return;
      }

      // ========================================
      // No Region
      // ========================================

      this.loadAllPhilippineOptions();

      return;
    }

    // ========================================
    // Find Province
    // ========================================

    const province = this.addressReferences.provinces.find((item) => item.id === provinceId);

    if (!province) {
      return;
    }

    // ========================================
    // Automatically Fill Region
    // ========================================

    this.addressForm.controls.regionId.setValue(province.regionId, {
      emitEvent: false,
    });

    // ========================================
    // Provinces Under Region
    // ========================================

    const provinces = this.addressReferences.provinces.filter(
      (item) => item.regionId === province.regionId,
    );

    this.provinceOptions = this.toProvinceOptions(provinces);

    // ========================================
    // Cities Under Province
    // ========================================

    const cities = this.addressReferences.cities.filter((city) => city.provinceId === provinceId);

    this.cityOptions = this.toCityOptions(cities);
  }

  // ========================================
  // City Change
  // ========================================

  onCityChange(cityId: number | null): void {
    if (!this.addressReferences || !this.isPhilippinesSelected) {
      return;
    }

    // ========================================
    // Clear Previous Barangay
    // ========================================

    this.clearBarangay();

    // ========================================
    // No City
    // ========================================

    if (cityId === null) {
      return;
    }

    // ========================================
    // Find Selected City
    // ========================================

    const city = this.addressReferences.cities.find((item) => item.id === cityId);

    if (!city) {
      return;
    }

    // ========================================
    // Current Province
    // ========================================

    const currentProvinceId = this.addressForm.controls.provinceId.value;

    // ========================================
    // No Province Selected
    //
    // Determine Province + Region
    // ========================================

    if (currentProvinceId === null) {
      const province = this.addressReferences.provinces.find((item) => item.id === city.provinceId);

      if (province) {
        // ========================================
        // Set Province
        // ========================================

        this.addressForm.controls.provinceId.setValue(province.id, {
          emitEvent: false,
        });

        // ========================================
        // Set Region
        // ========================================

        this.addressForm.controls.regionId.setValue(province.regionId, {
          emitEvent: false,
        });

        // ========================================
        // Province Options
        // ========================================

        const provinces = this.addressReferences.provinces.filter(
          (item) => item.regionId === province.regionId,
        );

        this.provinceOptions = this.toProvinceOptions(provinces);

        // ========================================
        // City Options
        // ========================================

        const cities = this.addressReferences.cities.filter(
          (item) => item.provinceId === province.id,
        );

        this.cityOptions = this.toCityOptions(cities);
      }
    }

    // ========================================
    // Load Barangays By City
    // ========================================

    this.loadBarangays(cityId);
  }

  // ========================================
  // Load Barangays
  // ========================================

  private loadBarangays(cityId: number, selectedBarangayId: number | null = null): void {
    this.isLoadingBarangays = true;

    this.barangayOptions = [];

    this.addressService.getBarangaysByCity(cityId).subscribe({
      next: (response) => {
        console.log('Barangay Response:', response);

        console.log('Barangay Success:', response.success);

        console.log('Barangay Message:', response.message);

        console.log('Barangay Error Code:', response.errorCode);

        // ========================================
        // API Business Failure
        // ========================================

        if (!response.success) {
          this.isLoadingBarangays = false;

          this.barangayOptions = [];

          this.errorMessage = response.message ?? 'Unable to load barangays.';

          return;
        }

        // ========================================
        // API Success
        // ========================================

        this.barangayOptions = response.data.map((barangay) => ({
          value: barangay.id,

          label: barangay.barangayName.toUpperCase(),
        }));

        // ========================================
        // Restore Existing Barangay
        // ========================================

        if (selectedBarangayId !== null) {
          this.addressForm.controls.barangayId.setValue(selectedBarangayId, {
            emitEvent: false,
          });
        }

        this.isLoadingBarangays = false;
      },

      // ========================================
      // HTTP / Network Error
      // ========================================

      error: (error) => {
        console.error('Failed to load barangays:', error);

        this.isLoadingBarangays = false;

        this.barangayOptions = [];

        this.addressForm.controls.barangayId.setValue(null, {
          emitEvent: false,
        });

        this.errorMessage = 'Unable to load barangays.';
      },
    });
  }

  // ========================================
  // Clear Barangay
  // ========================================

  private clearBarangay(): void {
    this.addressForm.controls.barangayId.setValue(null, {
      emitEvent: false,
    });

    this.barangayOptions = [];
  }

  // ========================================
  // Load All Philippine Options
  // ========================================

  private loadAllPhilippineOptions(): void {
    if (!this.addressReferences) {
      return;
    }

    const countryId = this.addressForm.controls.countryId.value;

    if (countryId === null) {
      this.regionOptions = [];

      this.provinceOptions = [];

      this.cityOptions = [];

      this.barangayOptions = [];

      return;
    }

    // ========================================
    // Regions
    // ========================================

    const regions = this.addressReferences.regions.filter(
      (region) => region.countryId === countryId,
    );

    this.regionOptions = this.toRegionOptions(regions);

    const regionIds = new Set(regions.map((region) => region.id));

    // ========================================
    // Provinces
    // ========================================

    const provinces = this.addressReferences.provinces.filter((province) =>
      regionIds.has(province.regionId),
    );

    this.provinceOptions = this.toProvinceOptions(provinces);

    const provinceIds = new Set(provinces.map((province) => province.id));

    // ========================================
    // Cities
    // ========================================

    const cities = this.addressReferences.cities.filter((city) => provinceIds.has(city.provinceId));

    this.cityOptions = this.toCityOptions(cities);

    // Barangays load only after City selection.

    this.barangayOptions = [];
  }

  // ========================================
  // Dynamic Validators
  // ========================================

  private updateAddressValidators(): void {
    const countryId = this.addressForm.controls.countryId.value;

    const regionControl = this.addressForm.controls.regionId;

    const provinceControl = this.addressForm.controls.provinceId;

    const cityControl = this.addressForm.controls.cityId;

    const barangayControl = this.addressForm.controls.barangayId;

    const foreignStateProvinceRegionControl = this.addressForm.controls.foreignStateProvinceRegion;

    const foreignCityControl = this.addressForm.controls.foreignCity;

    // ========================================
    // No Country
    // ========================================

    if (countryId === null) {
      regionControl.clearValidators();

      provinceControl.clearValidators();

      cityControl.clearValidators();

      barangayControl.clearValidators();

      foreignStateProvinceRegionControl.clearValidators();

      foreignCityControl.clearValidators();

      this.updateLocationValidity();

      return;
    }

    // ========================================
    // Philippines
    // ========================================

    if (this.isPhilippinesSelected) {
      regionControl.setValidators([Validators.required]);

      provinceControl.setValidators([Validators.required]);

      cityControl.setValidators([Validators.required]);

      barangayControl.setValidators([Validators.required]);

      foreignStateProvinceRegionControl.clearValidators();

      foreignCityControl.clearValidators();
    }

    // ========================================
    // Foreign
    // ========================================
    else {
      regionControl.clearValidators();

      provinceControl.clearValidators();

      cityControl.clearValidators();

      barangayControl.clearValidators();

      foreignStateProvinceRegionControl.setValidators([Validators.required]);

      foreignCityControl.setValidators([Validators.required]);
    }

    this.updateLocationValidity();
  }

  // ========================================
  // Update Validator State
  // ========================================

  private updateLocationValidity(): void {
    this.addressForm.controls.regionId.updateValueAndValidity({
      emitEvent: false,
    });

    this.addressForm.controls.provinceId.updateValueAndValidity({
      emitEvent: false,
    });

    this.addressForm.controls.cityId.updateValueAndValidity({
      emitEvent: false,
    });

    this.addressForm.controls.barangayId.updateValueAndValidity({
      emitEvent: false,
    });

    this.addressForm.controls.foreignStateProvinceRegion.updateValueAndValidity({
      emitEvent: false,
    });

    this.addressForm.controls.foreignCity.updateValueAndValidity({
      emitEvent: false,
    });
  }

  // ========================================
  // Region Options
  // ========================================

  private toRegionOptions(items: Region[]): CxpSelectOption[] {
    return items.map((item) => ({
      value: item.id,

      label: item.regionName.toUpperCase(),
    }));
  }

  // ========================================
  // Province Options
  // ========================================

  private toProvinceOptions(items: Province[]): CxpSelectOption[] {
    return items.map((item) => ({
      value: item.id,

      label: item.provinceName.toUpperCase(),
    }));
  }

  // ========================================
  // City Options
  // ========================================

  private toCityOptions(items: City[]): CxpSelectOption[] {
    return items.map((item) => ({
      value: item.id,

      label: item.cityOrMunicipalName.toUpperCase(),
    }));
  }

  // ========================================
  // Start Edit
  // ========================================

  startEdit(): void {
    if (!this.canModify) {
      this.errorMessage = this.hasAddress
        ? 'You do not have permission to update an address.'
        : 'You do not have permission to create an address.';

      return;
    }

    if (!this.referencesLoaded) {
      this.errorMessage = 'Address reference data is not yet available.';

      return;
    }

    this.errorMessage = '';

    this.successMessage = '';

    this.isEditing = true;

    this.addressForm.enable();

    this.updateAddressValidators();
  }

  // ========================================
  // Cancel Edit
  // ========================================

  cancelEdit(): void {
    // ========================================
    // Existing Address
    // ========================================

    if (this.hasAddress) {
      this.isEditing = false;

      this.addressForm.disable();

      this.errorMessage = '';

      this.successMessage = '';

      return;
    }

    // ========================================
    // New Address
    // ========================================

    this.resetAddressForm();

    this.isEditing = true;

    this.addressForm.enable();

    this.updateAddressValidators();

    this.errorMessage = '';

    this.successMessage = '';
  }

  // ========================================
  // Reset Address Form
  // ========================================

  private resetAddressForm(): void {
    this.addressForm.reset(
      {
        countryId: null,

        regionId: null,

        provinceId: null,

        cityId: null,

        barangayId: null,

        foreignStateProvinceRegion: '',

        foreignCity: '',

        addressLine1: '',

        addressLine2: '',

        zipCode: '',
      },
      {
        emitEvent: false,
      },
    );

    this.regionOptions = [];

    this.provinceOptions = [];

    this.cityOptions = [];

    this.barangayOptions = [];

    this.addressForm.markAsPristine();

    this.addressForm.markAsUntouched();
  }

  // ========================================
  // Save Address
  // ========================================

  saveAddress(): void {
    if (!this.canModify) {
      return;
    }

    // ========================================
    // Update Validators
    // ========================================

    this.updateAddressValidators();

    this.addressForm.markAllAsTouched();

    if (this.addressForm.invalid) {
      this.errorMessage = 'Please fill in all required address fields.';
      return;
    }

    this.isSaving = true;

    this.errorMessage = '';

    this.successMessage = '';

    const formValue = this.addressForm.getRawValue();

    // ========================================
    // Local Address - Philippines
    // ========================================

    if (this.isPhilippinesSelected) {
      const request = {
        countryId: formValue.countryId,

        regionId: formValue.regionId,

        provinceId: formValue.provinceId,

        cityId: formValue.cityId,

        barangayId: formValue.barangayId,

        addressLine1: formValue.addressLine1,

        addressLine2: formValue.addressLine2,

        zipCode: formValue.zipCode,
      };

      console.log('SAVE LOCAL ADDRESS REQUEST:', request);
    }

    // ========================================
    // Foreign Address
    // ========================================
    else {
      const request = {
        countryId: formValue.countryId,

        stateProvinceRegion: formValue.foreignStateProvinceRegion,

        city: formValue.foreignCity,

        addressLine1: formValue.addressLine1,

        addressLine2: formValue.addressLine2,

        zipCode: formValue.zipCode,
      };

      console.log('SAVE FOREIGN ADDRESS REQUEST:', request);
    }

    // ========================================
    // Temporary Mock Successful Save
    // ========================================

    this.hasAddress = true;

    this.isSaving = false;

    this.successMessage = 'Address saved successfully.';

    // ========================================
    // Switch To View Mode
    // ========================================

    this.isEditing = false;

    this.addressForm.disable();

    this.addressForm.markAsPristine();

    this.addressForm.markAsUntouched();
  }

  // ========================================
  // Reference Label
  // ========================================

  getReferenceLabel(options: CxpSelectOption[], selectedValue: CxpSelectPrimitive | null): string {
    if (selectedValue === null) {
      return '—';
    }

    return options.find((option) => option.value === selectedValue)?.label ?? '—';
  }
}

import { Component, OnInit, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import {
  CxpButton,
  CxpDisplayField,
  CxpIconUserNav,
  CxpInputSelect,
  CxpInputText,
} from 'cyberxp-ui';

import type {
  CxpSelectOption,
  CxpSelectPrimitive,
} from 'cyberxp-ui';

import { EmployeeState } from '../../../state/employee-state.service';
import { AddressService } from '../../../business/services/employee-address.service';

import { UserAccessService } from '../../../../../core/authorization/services/user-access.services';
import { EMPLOYEE_PERMISSIONS } from '../../../../../core/authorization/permissions/employee-permissions';

import {
  AddressReference,
  Region,
  Province,
  City,
} from '../../../../../shared/models/reference-address.model';

@Component({
  selector: 'employee-address',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CxpButton,
    CxpDisplayField,
    CxpIconUserNav,
    CxpInputSelect,
    CxpInputText,
  ],
  templateUrl: './address.html',
  styleUrl: './address.css',
})
export class Address implements OnInit {
  private referencesLoaded = false;

  private readonly userAccessService =
    inject(UserAccessService);

  private readonly addressService =
    inject(AddressService);

  readonly permissions =
    EMPLOYEE_PERMISSIONS.address;

  // ========================================
  // Permissions
  // ========================================

  get canCreate(): boolean {
    return this.userAccessService.hasPermission(
      this.permissions.create,
    );
  }

  get canRead(): boolean {
    return this.userAccessService.hasPermission(
      this.permissions.read,
    );
  }

  get canUpdate(): boolean {
    return this.userAccessService.hasPermission(
      this.permissions.update,
    );
  }

  get canDelete(): boolean {
    return this.userAccessService.hasPermission(
      this.permissions.delete,
    );
  }

  // ========================================
  // Employee State
  // ========================================

  get isNewEmployee(): boolean {
    return !this.employeeState.employeeGuid;
  }

  get canModify(): boolean {
    return this.isNewEmployee
      ? this.canCreate
      : this.canUpdate;
  }

  get canAccess(): boolean {
    if (this.isNewEmployee) {
      return this.canCreate || this.canRead;
    }

    return this.canRead;
  }

  // ========================================
  // Reactive Form
  // ========================================

  readonly addressForm = new FormGroup({
    countryId: new FormControl<number | null>(
      {
        value: null,
        disabled: false,
      },
      {
        validators: [Validators.required],
      },
    ),

    regionId: new FormControl<number | null>(
      {
        value: null,
        disabled: false,
      },
      {
        validators: [Validators.required],
      },
    ),

    provinceId: new FormControl<number | null>(
      {
        value: null,
        disabled: false,
      },
      {
        validators: [Validators.required],
      },
    ),

    cityId: new FormControl<number | null>(
      {
        value: null,
        disabled: false,
      },
      {
        validators: [Validators.required],
      },
    ),

    street: new FormControl(
      {
        value: '',
        disabled: false,
      },
      {
        nonNullable: true,
      },
    ),

    houseUnit: new FormControl(
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
  // Address References
  // ========================================

  private addressReferences: AddressReference | null =
    null;

  countryOptions: CxpSelectOption[] = [];

  regionOptions: CxpSelectOption[] = [];

  provinceOptions: CxpSelectOption[] = [];

  cityOptions: CxpSelectOption[] = [];

  // ========================================
  // Status
  // ========================================

  isLoading = false;

  isEditing = false;

  isSaving = false;

  successMessage = '';

  errorMessage = '';

  constructor(
    public readonly employeeState: EmployeeState,
  ) {}

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

  loadReferences(): void {
    this.isLoading = true;

    this.errorMessage = '';

    this.addressService
      .getReferences()
      .subscribe({
        next: (references) => {
          this.addressReferences =
            references;

          // ========================================
          // Countries
          // ========================================

          this.countryOptions =
            references.countries.map(
              (country) => ({
                value: country.id,
                label:
                  country.countryName.toUpperCase(),
              }),
            );

          // ========================================
          // Initially show ALL cities
          // ========================================

          this.cityOptions =
            this.toCityOptions(
              references.cities,
            );

          // Region and Province start empty
          this.regionOptions = [];

          this.provinceOptions = [];

          this.referencesLoaded =
            this.countryOptions.length > 0 &&
            this.cityOptions.length > 0;

          this.isLoading = false;

          this.updateFormState();
        },

        error: (error) => {
          this.referencesLoaded = false;

          this.isLoading = false;

          this.errorMessage =
            'Unable to load address reference data.';

          this.addressForm.disable();

          console.error(error);
        },
      });
  }

  // ========================================
  // Setup Cascading Changes
  // ========================================

  private setupAddressChanges(): void {
    this.addressForm.controls.countryId
      .valueChanges
      .subscribe((countryId) => {
        this.onCountryChange(
          countryId,
        );
      });

    this.addressForm.controls.regionId
      .valueChanges
      .subscribe((regionId) => {
        this.onRegionChange(
          regionId,
        );
      });

    this.addressForm.controls.provinceId
      .valueChanges
      .subscribe((provinceId) => {
        this.onProvinceChange(
          provinceId,
        );
      });

    this.addressForm.controls.cityId
      .valueChanges
      .subscribe((cityId) => {
        this.onCityChange(
          cityId,
        );
      });
  }

  // ========================================
  // Country Change
  // ========================================

  onCountryChange(
    countryId: number | null,
  ): void {
    if (!this.addressReferences) {
      return;
    }

    // ========================================
    // Clear downstream values
    // ========================================

    this.addressForm.controls.regionId.setValue(
      null,
      {
        emitEvent: false,
      },
    );

    this.addressForm.controls.provinceId.setValue(
      null,
      {
        emitEvent: false,
      },
    );

    this.addressForm.controls.cityId.setValue(
      null,
      {
        emitEvent: false,
      },
    );

    this.regionOptions = [];

    this.provinceOptions = [];

    // ========================================
    // No Country
    // Show All Cities
    // ========================================

    if (countryId === null) {
      this.cityOptions =
        this.toCityOptions(
          this.addressReferences.cities,
        );

      return;
    }

    // ========================================
    // Filter Regions by Country
    // ========================================

    const regions =
      this.addressReferences.regions.filter(
        (region) =>
          region.countryId === countryId,
      );

    this.regionOptions =
      this.toRegionOptions(
        regions,
      );

    // Province still empty,
    // therefore City still shows all cities
    this.cityOptions =
      this.toCityOptions(
        this.addressReferences.cities,
      );
  }

  // ========================================
  // Region Change
  // ========================================

  onRegionChange(
    regionId: number | null,
  ): void {
    if (!this.addressReferences) {
      return;
    }

    // ========================================
    // Clear downstream values
    // ========================================

    this.addressForm.controls.provinceId.setValue(
      null,
      {
        emitEvent: false,
      },
    );

    this.addressForm.controls.cityId.setValue(
      null,
      {
        emitEvent: false,
      },
    );

    this.provinceOptions = [];

    // ========================================
    // No Region
    // Show All Cities
    // ========================================

    if (regionId === null) {
      this.cityOptions =
        this.toCityOptions(
          this.addressReferences.cities,
        );

      return;
    }

    // ========================================
    // Filter Provinces by Region
    // ========================================

    const provinces =
      this.addressReferences.provinces.filter(
        (province) =>
          province.regionId === regionId,
      );

    this.provinceOptions =
      this.toProvinceOptions(
        provinces,
      );

    // Province is still empty.
    // Keep all cities available.
    this.cityOptions =
      this.toCityOptions(
        this.addressReferences.cities,
      );
  }

  // ========================================
  // Province Change
  // ========================================

  onProvinceChange(
    provinceId: number | null,
  ): void {
    if (!this.addressReferences) {
      return;
    }

    // ========================================
    // Clear City
    // ========================================

    this.addressForm.controls.cityId.setValue(
      null,
      {
        emitEvent: false,
      },
    );

    // ========================================
    // Province Empty
    // Show All Cities
    // ========================================

    if (provinceId === null) {
      this.cityOptions =
        this.toCityOptions(
          this.addressReferences.cities,
        );

      return;
    }

    // ========================================
    // Filter Cities by Province
    // ========================================

    const cities =
      this.addressReferences.cities.filter(
        (city) =>
          city.provinceId === provinceId,
      );

    this.cityOptions =
      this.toCityOptions(
        cities,
      );
  }

  // ========================================
  // City Change
  // ========================================

  onCityChange(
    cityId: number | null,
  ): void {
    if (
      cityId === null ||
      !this.addressReferences
    ) {
      return;
    }

    // ========================================
    // Only auto-fill location hierarchy
    // if Province is currently empty
    // ========================================

    const currentProvinceId =
      this.addressForm.controls.provinceId.value;

    if (currentProvinceId !== null) {
      return;
    }

    // ========================================
    // Find Selected City
    // ========================================

    const city =
      this.addressReferences.cities.find(
        (item) =>
          item.id === cityId,
      );

    if (!city) {
      return;
    }

    // ========================================
    // Find Province
    // ========================================

    const province =
      this.addressReferences.provinces.find(
        (item) =>
          item.id === city.provinceId,
      );

    if (!province) {
      return;
    }

    // ========================================
    // Find Region
    // ========================================

    const region =
      this.addressReferences.regions.find(
        (item) =>
          item.id === province.regionId,
      );

    if (!region) {
      return;
    }

    // ========================================
    // Find Country
    // ========================================

    const country =
      this.addressReferences.countries.find(
        (item) =>
          item.id === region.countryId,
      );

    if (!country) {
      return;
    }

    // ========================================
    // Populate Country
    // ========================================

    this.addressForm.controls.countryId.setValue(
      country.id,
      {
        emitEvent: false,
      },
    );

    // ========================================
    // Populate Region Options
    // ========================================

    const countryRegions =
      this.addressReferences.regions.filter(
        (item) =>
          item.countryId === country.id,
      );

    this.regionOptions =
      this.toRegionOptions(
        countryRegions,
      );

    // ========================================
    // Populate Region
    // ========================================

    this.addressForm.controls.regionId.setValue(
      region.id,
      {
        emitEvent: false,
      },
    );

    // ========================================
    // Populate Province Options
    // ========================================

    const regionProvinces =
      this.addressReferences.provinces.filter(
        (item) =>
          item.regionId === region.id,
      );

    this.provinceOptions =
      this.toProvinceOptions(
        regionProvinces,
      );

    // ========================================
    // Populate Province
    // ========================================

    this.addressForm.controls.provinceId.setValue(
      province.id,
      {
        emitEvent: false,
      },
    );

    // ========================================
    // Filter City Options to Province
    // ========================================

    const provinceCities =
      this.addressReferences.cities.filter(
        (item) =>
          item.provinceId === province.id,
      );

    this.cityOptions =
      this.toCityOptions(
        provinceCities,
      );

    // ========================================
    // Keep Selected City
    // ========================================

    this.addressForm.controls.cityId.setValue(
      city.id,
      {
        emitEvent: false,
      },
    );
  }

  // ========================================
  // Region Options
  // ========================================

  private toRegionOptions(
    items: Region[],
  ): CxpSelectOption[] {
    return items.map(
      (item) => ({
        value: item.id,
        label:
          item.regionName.toUpperCase(),
      }),
    );
  }

  // ========================================
  // Province Options
  // ========================================

  private toProvinceOptions(
    items: Province[],
  ): CxpSelectOption[] {
    return items.map(
      (item) => ({
        value: item.id,
        label:
          item.provinceName.toUpperCase(),
      }),
    );
  }

  // ========================================
  // City Options
  // ========================================

  private toCityOptions(
    items: City[],
  ): CxpSelectOption[] {
    return items.map(
      (item) => ({
        value: item.id,
        label:
          item.cityOrMunicipalName.toUpperCase(),
      }),
    );
  }

  // ========================================
  // Form State
  // ========================================

  private updateFormState(): void {
    if (
      this.referencesLoaded &&
      this.isEditing &&
      this.canModify
    ) {
      this.addressForm.enable();

      return;
    }

    this.addressForm.disable();
  }

  // ========================================
  // Add / Edit / Save
  // ========================================

  onEditSave(): void {
    if (!this.canModify) {
      this.addressForm.disable();

      this.isEditing = false;

      this.errorMessage =
        this.isNewEmployee
          ? 'You do not have permission to create an address.'
          : 'You do not have permission to update an address.';

      return;
    }

    if (this.isEditing) {
      this.saveAddress();

      return;
    }

    this.startEdit();
  }

  // ========================================
  // Start Edit
  // ========================================

  startEdit(): void {
    if (!this.canModify) {
      this.addressForm.disable();

      this.isEditing = false;

      this.errorMessage =
        this.isNewEmployee
          ? 'You do not have permission to create an address.'
          : 'You do not have permission to update an address.';

      return;
    }

    if (!this.referencesLoaded) {
      this.addressForm.disable();

      this.isEditing = false;

      this.errorMessage =
        'Address reference data is not yet available.';

      return;
    }

    this.errorMessage = '';

    this.successMessage = '';

    this.isEditing = true;

    this.addressForm.enable();
  }

  // ========================================
  // Cancel
  // ========================================

  cancelEdit(): void {
    this.addressForm.reset({
      countryId: null,
      regionId: null,
      provinceId: null,
      cityId: null,
      street: '',
      houseUnit: '',
      zipCode: '',
    });

    this.regionOptions = [];

    this.provinceOptions = [];

    // After cancel,
    // restore all cities
    if (this.addressReferences) {
      this.cityOptions =
        this.toCityOptions(
          this.addressReferences.cities,
        );
    } else {
      this.cityOptions = [];
    }

    this.addressForm.markAsPristine();

    this.addressForm.markAsUntouched();

    this.isEditing = false;

    this.addressForm.disable();

    this.errorMessage = '';

    this.successMessage = '';
  }

  // ========================================
  // Save Address
  // ========================================

  private saveAddress(): void {
    if (!this.canModify) {
      return;
    }

    this.addressForm.markAllAsTouched();

    if (this.addressForm.invalid) {
      this.errorMessage =
        'Please fill in all required address fields.';

      return;
    }

    this.errorMessage = '';

    /*
     * Address save API will be added later.
     */

    console.log(
      'Address form:',
      this.addressForm.getRawValue(),
    );
  }

  // ========================================
  // Reference Label Helper
  // ========================================

  getReferenceLabel(
    options: CxpSelectOption[],
    selectedValue: CxpSelectPrimitive | null,
  ): string {
    if (selectedValue === null) {
      return '—';
    }

    return (
      options.find(
        (option) =>
          option.value === selectedValue,
      )?.label ?? '—'
    );
  }
}
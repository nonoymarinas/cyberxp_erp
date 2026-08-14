import {
  Component,
  OnInit,
  inject,
} from '@angular/core';

import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import {
  CxpButton,
  CxpDisplayField,
  CxpIconAddressNav,
  CxpInputSelect,
  CxpInputText,
} from 'cyberxp-ui';

import type {
  CxpSelectOption,
  CxpSelectPrimitive,
} from 'cyberxp-ui';

import {
  EmployeeState,
} from '../../../state/employee-state.service';

import {
  AddressService,
} from '../../../business/services/address.service';

import {
  UserAccessService,
} from '../../../../../core/authorization/services/user-access.services';

import {
  EMPLOYEE_PERMISSIONS,
} from '../../../../../core/authorization/permissions/employee-permissions';

import {
  AddressReferences,
  Region,
  Province,
  City,
} from '../../../models/domain/address-ref.model';
import{AddressRefService} from '../../../business/services/address-ref.service'
import {
  EmployeeAddress,
  SaveAddressRequest,
} from '../../../models/domain/address.model';

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
export class AddressComponent
  implements OnInit {

  // ========================================
  // Services
  // ========================================

  private readonly userAccessService =
    inject(UserAccessService);

  private readonly addressRefService =
    inject(AddressRefService);

     private readonly addressService =
    inject(AddressService);

  readonly permissions =
    EMPLOYEE_PERMISSIONS.address;

  // ========================================
  // Reference State
  // ========================================

  private referencesLoaded = false;

  private addressReferences:
    AddressReferences | null = null;

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

  countryOptions:
    CxpSelectOption[] = [];

  regionOptions:
    CxpSelectOption[] = [];

  provinceOptions:
    CxpSelectOption[] = [];

  cityOptions:
    CxpSelectOption[] = [];

  barangayOptions:
    CxpSelectOption[] = [];

  addressScopeOptions:
    CxpSelectOption[] = [];

  constructor(
    public readonly employeeState:
      EmployeeState,
  ) {}

  // ========================================
  // Permissions
  // ========================================

  get canCreate(): boolean {
    return this.userAccessService
      .hasPermission(
        this.permissions.create,
      );
  }

  get canRead(): boolean {
    return this.userAccessService
      .hasPermission(
        this.permissions.read,
      );
  }

  get canUpdate(): boolean {
    return this.userAccessService
      .hasPermission(
        this.permissions.update,
      );
  }

  get canDelete(): boolean {
    return this.userAccessService
      .hasPermission(
        this.permissions.delete,
      );
  }

  // ========================================
  // Can Modify
  // ========================================

  get canModify(): boolean {
    return this.hasAddress
      ? this.canUpdate
      : this.canCreate;
  }

  get canAccess(): boolean {
    if (!this.hasAddress) {
      return (
        this.canCreate ||
        this.canRead
      );
    }

    return this.canRead;
  }

  // ========================================
  // Reactive Form
  // ========================================

  readonly addressForm =
    new FormGroup({
      // ========================================
      // Country
      // ========================================

      countryId:
        new FormControl<number | null>(
          {
            value: null,
            disabled: false,
          },
          {
            validators: [
              Validators.required,
            ],
          },
        ),

      // ========================================
      // Philippine Address
      // ========================================

      regionId:
        new FormControl<number | null>({
          value: null,
          disabled: false,
        }),

      provinceId:
        new FormControl<number | null>({
          value: null,
          disabled: false,
        }),

      cityId:
        new FormControl<number | null>({
          value: null,
          disabled: false,
        }),

      barangayId:
        new FormControl<number | null>({
          value: null,
          disabled: false,
        }),

      // ========================================
      // Foreign Address
      // ========================================

      foreignStateProvinceRegion:
        new FormControl<string | null>({
          value: null,
          disabled: false,
        }),

      foreignCity:
        new FormControl<string | null>({
          value: null,
          disabled: false,
        }),

      // ========================================
      // Common Address
      // ========================================

      addressLine1:
        new FormControl<string>(
          {
            value: '',
            disabled: false,
          },
          {
            nonNullable: true,
            validators: [
              Validators.required,
            ],
          },
        ),

      addressLine2:
        new FormControl<string | null>({
          value: null,
          disabled: false,
        }),

      zipCode:
        new FormControl<string | null>({
          value: null,
          disabled: false,
        }),

      // ========================================
      // Scope
      // ========================================

      scopeId:
        new FormControl<number | null>(
          {
            value: null,
            disabled: false,
          },
          {
            validators: [
              Validators.required,
            ],
          },
        ),

      // ========================================
      // Present Address
      // ========================================

      isPresent:
        new FormControl<boolean>(
          {
            value: false,
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

  get hasCountrySelected():
    boolean {
    return (
      this.addressForm
        .controls
        .countryId
        .value !== null
    );
  }

  // ========================================
  // Philippines Selected
  // ========================================

  get isPhilippinesSelected():
    boolean {

    const countryId =
      this.addressForm
        .controls
        .countryId
        .value;

    if (
      countryId === null ||
      !this.addressReferences
    ) {
      return false;
    }

    const country =
      this.addressReferences
        .countries
        .find(
          (item) =>
            item.id === countryId,
        );

    return (
      country
        ?.countryName
        .trim()
        .toLowerCase() ===
      'philippines'
    );
  }

  // ========================================
  // Init
  // ========================================

  ngOnInit(): void {
    this.addressForm.disable({
      emitEvent: false,
    });

    this.setupAddressChanges();

    this.loadReferences();
  }

  // ========================================
  // Load References
  // ========================================

  private loadReferences():
    void {

    this.isLoading = true;

    this.errorMessage = '';

    this.referencesLoaded =
      false;

    this.addressRefService
      .getReferences()
      .subscribe({
        next: (
          references:
            AddressReferences,
        ) => {
          console.log(
            'Address References:',
            references,
          );

          // ========================================
          // Store References
          // ========================================

          this.addressReferences =
            references;

          // ========================================
          // Country Options
          // ========================================

          this.countryOptions =
            references
              .countries
              .map(
                (country) => ({
                  value:
                    country.id,

                  label:
                    country
                      .countryName
                      .toUpperCase(),
                }),
              );

          // ========================================
          // Scope Options From Service
          // ========================================

          this.addressScopeOptions =
            this.addressRefService
              .getAddressScopeOptions();

          console.log(
            'Address Scope Options:',
            this.addressScopeOptions,
          );

          // ========================================
          // Reset Cascading Options
          // ========================================

          this.regionOptions = [];

          this.provinceOptions = [];

          this.cityOptions = [];

          this.barangayOptions = [];

          // ========================================
          // References Loaded
          // ========================================

          this.referencesLoaded =
            true;

          this.isLoading =
            false;

          // ========================================
          // Load Employee Address
          // ========================================

          this.loadAddress();
        },

        error: (
          error: unknown,
        ) => {
          console.error(
            'Failed to load address references:',
            error,
          );

          this.referencesLoaded =
            false;

          this.isLoading =
            false;

          this.addressReferences =
            null;

          this.countryOptions = [];

          this.regionOptions = [];

          this.provinceOptions = [];

          this.cityOptions = [];

          this.barangayOptions = [];

          this.addressScopeOptions =
            [];

          this.errorMessage =
            'Unable to load address reference data.';

          this.addressForm.disable({
            emitEvent: false,
          });
        },
      });
  }

  // ========================================
  // Load Employee Address
  // ========================================

  private loadAddress():
    void {

    this.addressService
      .getAddress()
      .subscribe({
        next: (
          address:
            EmployeeAddress | null,
        ) => {
          console.log(
            'COMPONENT - LOADED ADDRESS:',
            address,
          );

          this.handleLoadedAddress(
            address,
          );
        },

        error: (
          error: unknown,
        ) => {
          console.error(
            'Failed to load address:',
            error,
          );

          this.errorMessage =
            'Unable to load employee address.';

          this.hasAddress =
            false;

          this.isEditing =
            true;

          if (
            this.referencesLoaded &&
            this.canCreate
          ) {
            this.addressForm.enable({
              emitEvent: false,
            });
          }
        },
      });
  }

  // ========================================
  // Handle Loaded Address
  // ========================================

  private handleLoadedAddress(
    address:
      EmployeeAddress | null,
  ): void {

    // ========================================
    // No Existing Address
    // ========================================

    if (!address) {
      this.hasAddress =
        false;

      this.resetAddressForm();

      this.isEditing =
        true;

      if (
        this.referencesLoaded &&
        this.canCreate
      ) {
        this.addressForm.enable({
          emitEvent: false,
        });
      } else {
        this.addressForm.disable({
          emitEvent: false,
        });
      }

      this.updateAddressValidators();

      return;
    }

    // ========================================
    // Existing Address
    // ========================================

    this.hasAddress =
      true;

    this.populateAddress(
      address,
    );

    this.isEditing =
      false;

    this.addressForm.disable({
      emitEvent: false,
    });
  }

  // ========================================
  // Populate Existing Address
  // ========================================

  private populateAddress(
    address:
      EmployeeAddress,
  ): void {

    // ========================================
    // Set Country First
    // ========================================

    this.addressForm
      .controls
      .countryId
      .setValue(
        address.countryId,
        {
          emitEvent: false,
        },
      );

    // ========================================
    // Philippine Address
    // ========================================

    if (
      this.isPhilippinesSelected
    ) {
      this.populatePhilippineAddressOptions(
        address,
      );

      this.addressForm
        .patchValue(
          {
            countryId:
              address.countryId,

            regionId:
              address.regionId,

            provinceId:
              address.provinceId,

            cityId:
              address.cityId,

            barangayId:
              address.barangayId,

            foreignStateProvinceRegion:
              null,

            foreignCity:
              null,

            addressLine1:
              address.addressLine1,

            addressLine2:
              address.addressLine2,

            zipCode:
              address.zipCode,

            scopeId:
              address.scopeId,

            isPresent:
              address.isPresent,
          },
          {
            emitEvent: false,
          },
        );

      // ========================================
      // Load Barangay Options
      // ========================================

      if (
        address.cityId !== null
      ) {
        this.loadBarangays(
          address.cityId,
          address.barangayId,
        );
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

    this.addressForm
      .patchValue(
        {
          countryId:
            address.countryId,

          regionId:
            null,

          provinceId:
            null,

          cityId:
            null,

          barangayId:
            null,

          foreignStateProvinceRegion:
            address
              .foreignStateProvinceRegion,

          foreignCity:
            address.foreignCity,

          addressLine1:
            address.addressLine1,

          addressLine2:
            address.addressLine2,

          zipCode:
            address.zipCode,

          scopeId:
            address.scopeId,

          isPresent:
            address.isPresent,
        },
        {
          emitEvent: false,
        },
      );
  }

  // ========================================
  // Populate Philippine Options
  // ========================================

  private populatePhilippineAddressOptions(
    address:
      EmployeeAddress,
  ): void {

    if (
      !this.addressReferences ||
      address.countryId === null
    ) {
      return;
    }

    // ========================================
    // Regions
    // ========================================

    const regions =
      this.addressReferences
        .regions
        .filter(
          (region) =>
            region.countryId ===
            address.countryId,
        );

    this.regionOptions =
      this.toRegionOptions(
        regions,
      );

    // ========================================
    // Provinces
    // ========================================

    if (
      address.regionId !== null
    ) {
      const provinces =
        this.addressReferences
          .provinces
          .filter(
            (province) =>
              province.regionId ===
              address.regionId,
          );

      this.provinceOptions =
        this.toProvinceOptions(
          provinces,
        );
    } else {
      this.provinceOptions = [];
    }

    // ========================================
    // Cities
    // ========================================

    if (
      address.provinceId !== null
    ) {
      const cities =
        this.addressReferences
          .cities
          .filter(
            (city) =>
              city.provinceId ===
              address.provinceId,
          );

      this.cityOptions =
        this.toCityOptions(
          cities,
        );
    } else {
      this.cityOptions = [];
    }
  }

  // ========================================
  // Setup Address Changes
  // ========================================

  private setupAddressChanges():
    void {

    this.addressForm
      .controls
      .countryId
      .valueChanges
      .subscribe(
        (countryId) => {
          this.onCountryChange(
            countryId,
          );
        },
      );

    this.addressForm
      .controls
      .regionId
      .valueChanges
      .subscribe(
        (regionId) => {
          this.onRegionChange(
            regionId,
          );
        },
      );

    this.addressForm
      .controls
      .provinceId
      .valueChanges
      .subscribe(
        (provinceId) => {
          this.onProvinceChange(
            provinceId,
          );
        },
      );

    this.addressForm
      .controls
      .cityId
      .valueChanges
      .subscribe(
        (cityId) => {
          this.onCityChange(
            cityId,
          );
        },
      );
  }

  // ========================================
  // Country Change
  // ========================================

  onCountryChange(
    countryId:
      number | null,
  ): void {

    if (
      !this.addressReferences
    ) {
      return;
    }

    this.addressForm
      .patchValue(
        {
          regionId:
            null,

          provinceId:
            null,

          cityId:
            null,

          barangayId:
            null,
        },
        {
          emitEvent: false,
        },
      );

    this.addressForm
      .patchValue(
        {
          foreignStateProvinceRegion:
            null,

          foreignCity:
            null,
        },
        {
          emitEvent: false,
        },
      );

    this.regionOptions = [];

    this.provinceOptions = [];

    this.cityOptions = [];

    this.barangayOptions = [];

    if (
      countryId === null
    ) {
      this.updateAddressValidators();

      return;
    }

    if (
      this.isPhilippinesSelected
    ) {
      this.loadAllPhilippineOptions();
    }

    this.updateAddressValidators();
  }

  // ========================================
  // Region Change
  // ========================================

  onRegionChange(
    regionId:
      number | null,
  ): void {

    if (
      !this.addressReferences ||
      !this.isPhilippinesSelected
    ) {
      return;
    }

    this.clearBarangay();

    if (
      regionId === null
    ) {
      this.addressForm
        .patchValue(
          {
            provinceId:
              null,

            cityId:
              null,

            barangayId:
              null,
          },
          {
            emitEvent: false,
          },
        );

      this.loadAllPhilippineOptions();

      return;
    }

    this.addressForm
      .patchValue(
        {
          provinceId:
            null,

          cityId:
            null,

          barangayId:
            null,
        },
        {
          emitEvent: false,
        },
      );

    const provinces =
      this.addressReferences
        .provinces
        .filter(
          (province) =>
            province.regionId ===
            regionId,
        );

    this.provinceOptions =
      this.toProvinceOptions(
        provinces,
      );

    const provinceIds =
      new Set(
        provinces.map(
          (province) =>
            province.id,
        ),
      );

    const cities =
      this.addressReferences
        .cities
        .filter(
          (city) =>
            provinceIds.has(
              city.provinceId,
            ),
        );

    this.cityOptions =
      this.toCityOptions(
        cities,
      );
  }

  // ========================================
  // Province Change
  // ========================================

  onProvinceChange(
    provinceId:
      number | null,
  ): void {

    if (
      !this.addressReferences ||
      !this.isPhilippinesSelected
    ) {
      return;
    }

    this.addressForm
      .patchValue(
        {
          cityId:
            null,

          barangayId:
            null,
        },
        {
          emitEvent: false,
        },
      );

    this.barangayOptions = [];

    if (
      provinceId === null
    ) {
      const regionId =
        this.addressForm
          .controls
          .regionId
          .value;

      if (
        regionId !== null
      ) {
        const provinces =
          this.addressReferences
            .provinces
            .filter(
              (province) =>
                province.regionId ===
                regionId,
            );

        this.provinceOptions =
          this.toProvinceOptions(
            provinces,
          );

        const provinceIds =
          new Set(
            provinces.map(
              (province) =>
                province.id,
            ),
          );

        const cities =
          this.addressReferences
            .cities
            .filter(
              (city) =>
                provinceIds.has(
                  city.provinceId,
                ),
            );

        this.cityOptions =
          this.toCityOptions(
            cities,
          );

        return;
      }

      this.loadAllPhilippineOptions();

      return;
    }

    const province =
      this.addressReferences
        .provinces
        .find(
          (item) =>
            item.id ===
            provinceId,
        );

    if (!province) {
      return;
    }

    this.addressForm
      .controls
      .regionId
      .setValue(
        province.regionId,
        {
          emitEvent: false,
        },
      );

    const provinces =
      this.addressReferences
        .provinces
        .filter(
          (item) =>
            item.regionId ===
            province.regionId,
        );

    this.provinceOptions =
      this.toProvinceOptions(
        provinces,
      );

    const cities =
      this.addressReferences
        .cities
        .filter(
          (city) =>
            city.provinceId ===
            provinceId,
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
    cityId:
      number | null,
  ): void {

    if (
      !this.addressReferences ||
      !this.isPhilippinesSelected
    ) {
      return;
    }

    this.clearBarangay();

    if (
      cityId === null
    ) {
      return;
    }

    const city =
      this.addressReferences
        .cities
        .find(
          (item) =>
            item.id === cityId,
        );

    if (!city) {
      return;
    }

    const currentProvinceId =
      this.addressForm
        .controls
        .provinceId
        .value;

    if (
      currentProvinceId === null
    ) {
      const province =
        this.addressReferences
          .provinces
          .find(
            (item) =>
              item.id ===
              city.provinceId,
          );

      if (province) {
        this.addressForm
          .controls
          .provinceId
          .setValue(
            province.id,
            {
              emitEvent: false,
            },
          );

        this.addressForm
          .controls
          .regionId
          .setValue(
            province.regionId,
            {
              emitEvent: false,
            },
          );

        const provinces =
          this.addressReferences
            .provinces
            .filter(
              (item) =>
                item.regionId ===
                province.regionId,
            );

        this.provinceOptions =
          this.toProvinceOptions(
            provinces,
          );

        const cities =
          this.addressReferences
            .cities
            .filter(
              (item) =>
                item.provinceId ===
                province.id,
            );

        this.cityOptions =
          this.toCityOptions(
            cities,
          );
      }
    }

    this.loadBarangays(
      cityId,
    );
  }

  // ========================================
  // Load Barangays
  // ========================================

private loadBarangays(
  cityId: number,
  selectedBarangayId: number | null = null,
): void {
  this.isLoadingBarangays = true;

  console.log(
    'LOAD BARANGAYS - CITY ID:',
    cityId,
  );

  console.log(
    'LOAD BARANGAYS - SELECTED BARANGAY ID:',
    selectedBarangayId,
  );

  this.addressRefService
    .getBarangaysByCity(cityId)
    .subscribe({
      next: (response) => {
        console.log(
          'Barangay Response:',
          response,
        );

        if (!response.success) {
          this.isLoadingBarangays = false;

          this.errorMessage =
            response.message ??
            'Unable to load barangays.';

          return;
        }

        // ========================================
        // Build Barangay Options
        // ========================================

        this.barangayOptions =
          response.data.map(
            (barangay) => ({
              value: barangay.id,
              label:
                barangay.barangayName.toUpperCase(),
            }),
          );

        console.log(
          'BARANGAY OPTIONS:',
          this.barangayOptions,
        );

        // ========================================
        // Restore Selected Barangay
        // ========================================

        if (
          selectedBarangayId !== null
        ) {
          const barangayExists =
            this.barangayOptions.some(
              (option) =>
                String(option.value) ===
                String(selectedBarangayId),
            );

          console.log(
            'BARANGAY EXISTS:',
            barangayExists,
          );

          if (barangayExists) {
            this.addressForm
              .controls
              .barangayId
              .setValue(
                selectedBarangayId,
                {
                  emitEvent: false,
                },
              );
          }
        }

        console.log(
          'BARANGAY FORM VALUE:',
          this.addressForm
            .controls
            .barangayId
            .value,
        );

        this.isLoadingBarangays = false;
      },

      error: (error: unknown) => {
        console.error(
          'Failed to load barangays:',
          error,
        );

        this.isLoadingBarangays = false;

        this.errorMessage =
          'Unable to load barangays.';
      },
    });
}
  // ========================================
  // Clear Barangay
  // ========================================

  private clearBarangay():
    void {

    this.addressForm
      .controls
      .barangayId
      .setValue(
        null,
        {
          emitEvent: false,
        },
      );

    this.barangayOptions =
      [];
  }

  // ========================================
  // Load All Philippine Options
  // ========================================

  private loadAllPhilippineOptions():
    void {

    if (
      !this.addressReferences
    ) {
      return;
    }

    const countryId =
      this.addressForm
        .controls
        .countryId
        .value;

    if (
      countryId === null
    ) {
      this.regionOptions = [];

      this.provinceOptions = [];

      this.cityOptions = [];

      this.barangayOptions = [];

      return;
    }

    const regions =
      this.addressReferences
        .regions
        .filter(
          (region) =>
            region.countryId ===
            countryId,
        );

    this.regionOptions =
      this.toRegionOptions(
        regions,
      );

    const regionIds =
      new Set(
        regions.map(
          (region) =>
            region.id,
        ),
      );

    const provinces =
      this.addressReferences
        .provinces
        .filter(
          (province) =>
            regionIds.has(
              province.regionId,
            ),
        );

    this.provinceOptions =
      this.toProvinceOptions(
        provinces,
      );

    const provinceIds =
      new Set(
        provinces.map(
          (province) =>
            province.id,
        ),
      );

    const cities =
      this.addressReferences
        .cities
        .filter(
          (city) =>
            provinceIds.has(
              city.provinceId,
            ),
        );

    this.cityOptions =
      this.toCityOptions(
        cities,
      );

    this.barangayOptions = [];
  }

  // ========================================
  // Dynamic Validators
  // ========================================

  private updateAddressValidators():
    void {

    const countryId =
      this.addressForm
        .controls
        .countryId
        .value;

    const regionControl =
      this.addressForm
        .controls
        .regionId;

    const provinceControl =
      this.addressForm
        .controls
        .provinceId;

    const cityControl =
      this.addressForm
        .controls
        .cityId;

    const barangayControl =
      this.addressForm
        .controls
        .barangayId;

    const foreignStateProvinceRegionControl =
      this.addressForm
        .controls
        .foreignStateProvinceRegion;

    const foreignCityControl =
      this.addressForm
        .controls
        .foreignCity;

    const scopeControl =
      this.addressForm
        .controls
        .scopeId;

    scopeControl.setValidators([
      Validators.required,
    ]);

    if (
      countryId === null
    ) {
      regionControl
        .clearValidators();

      provinceControl
        .clearValidators();

      cityControl
        .clearValidators();

      barangayControl
        .clearValidators();

      foreignStateProvinceRegionControl
        .clearValidators();

      foreignCityControl
        .clearValidators();

      this.updateLocationValidity();

      return;
    }

    if (
      this.isPhilippinesSelected
    ) {
      regionControl
        .setValidators([
          Validators.required,
        ]);

      provinceControl
        .setValidators([
          Validators.required,
        ]);

      cityControl
        .setValidators([
          Validators.required,
        ]);

      barangayControl
        .setValidators([
          Validators.required,
        ]);

      foreignStateProvinceRegionControl
        .clearValidators();

      foreignCityControl
        .clearValidators();
    } else {
      regionControl
        .clearValidators();

      provinceControl
        .clearValidators();

      cityControl
        .clearValidators();

      barangayControl
        .clearValidators();

      foreignStateProvinceRegionControl
        .setValidators([
          Validators.required,
        ]);

      foreignCityControl
        .setValidators([
          Validators.required,
        ]);
    }

    this.updateLocationValidity();
  }

  // ========================================
  // Update Validator State
  // ========================================

  private updateLocationValidity():
    void {

    this.addressForm
      .controls
      .regionId
      .updateValueAndValidity({
        emitEvent: false,
      });

    this.addressForm
      .controls
      .provinceId
      .updateValueAndValidity({
        emitEvent: false,
      });

    this.addressForm
      .controls
      .cityId
      .updateValueAndValidity({
        emitEvent: false,
      });

    this.addressForm
      .controls
      .barangayId
      .updateValueAndValidity({
        emitEvent: false,
      });

    this.addressForm
      .controls
      .foreignStateProvinceRegion
      .updateValueAndValidity({
        emitEvent: false,
      });

    this.addressForm
      .controls
      .foreignCity
      .updateValueAndValidity({
        emitEvent: false,
      });

    this.addressForm
      .controls
      .scopeId
      .updateValueAndValidity({
        emitEvent: false,
      });
  }

  // ========================================
  // Region Options
  // ========================================

  private toRegionOptions(
    items:
      Region[],
  ): CxpSelectOption[] {

    return items.map(
      (item) => ({
        value:
          item.id,

        label:
          item
            .regionName
            .toUpperCase(),
      }),
    );
  }

  // ========================================
  // Province Options
  // ========================================

  private toProvinceOptions(
    items:
      Province[],
  ): CxpSelectOption[] {

    return items.map(
      (item) => ({
        value:
          item.id,

        label:
          item
            .provinceName
            .toUpperCase(),
      }),
    );
  }

  // ========================================
  // City Options
  // ========================================

  private toCityOptions(
    items:
      City[],
  ): CxpSelectOption[] {

    return items.map(
      (item) => ({
        value:
          item.id,

        label:
          item
            .cityOrMunicipalName
            .toUpperCase(),
      }),
    );
  }

  // ========================================
  // Start Edit
  // ========================================

  startEdit():
    void {

    if (
      !this.canModify
    ) {
      this.errorMessage =
        this.hasAddress
          ? 'You do not have permission to update an address.'
          : 'You do not have permission to create an address.';

      return;
    }

    if (
      !this.referencesLoaded
    ) {
      this.errorMessage =
        'Address reference data is not yet available.';

      return;
    }

    this.errorMessage = '';

    this.successMessage = '';

    // ========================================
    // Retrieve Saved Address
    // ========================================

    this.addressService
      .getAddress()
      .subscribe({
        next: (
          address:
            EmployeeAddress | null,
        ) => {
          console.log(
            'COMPONENT - EDIT ADDRESS:',
            address,
          );

          if (address) {
            this.populateAddress(
              address,
            );
          }

          this.isEditing =
            true;

          this.addressForm.enable({
            emitEvent: false,
          });

          this.updateAddressValidators();

          console.log(
            'FORM AFTER EDIT LOAD:',
            this.addressForm.getRawValue(),
          );
        },

        error: (
          error: unknown,
        ) => {
          console.error(
            'Failed to retrieve address for edit:',
            error,
          );

          this.errorMessage =
            'Unable to retrieve address.';
        },
      });
  }

  // ========================================
  // Cancel Edit
  // ========================================

  cancelEdit():
    void {

    // ========================================
    // Existing Address
    // ========================================

    if (
      this.hasAddress
    ) {
      this.addressService
        .getAddress()
        .subscribe({
          next: (
            address:
              EmployeeAddress | null,
          ) => {
            if (address) {
              this.populateAddress(
                address,
              );
            }

            this.isEditing =
              false;

            this.addressForm.disable({
              emitEvent: false,
            });

            this.errorMessage = '';

            this.successMessage = '';
          },

          error: (
            error: unknown,
          ) => {
            console.error(
              'Failed to restore address:',
              error,
            );

            this.errorMessage =
              'Unable to restore address.';
          },
        });

      return;
    }

    // ========================================
    // New Address
    // ========================================

    this.resetAddressForm();

    this.isEditing =
      true;

    if (
      this.referencesLoaded &&
      this.canCreate
    ) {
      this.addressForm.enable({
        emitEvent: false,
      });
    } else {
      this.addressForm.disable({
        emitEvent: false,
      });
    }

    this.updateAddressValidators();

    this.errorMessage = '';

    this.successMessage = '';
  }

  // ========================================
  // Reset Address Form
  // ========================================

  private resetAddressForm():
    void {

    this.addressForm
      .reset(
        {
          countryId:
            null,

          regionId:
            null,

          provinceId:
            null,

          cityId:
            null,

          barangayId:
            null,

          foreignStateProvinceRegion:
            null,

          foreignCity:
            null,

          addressLine1:
            '',

          addressLine2:
            null,

          zipCode:
            null,

          scopeId:
            null,

          isPresent:
            false,
        },
        {
          emitEvent: false,
        },
      );

    this.regionOptions = [];

    this.provinceOptions = [];

    this.cityOptions = [];

    this.barangayOptions = [];

    this.addressForm
      .markAsPristine();

    this.addressForm
      .markAsUntouched();
  }

  // ========================================
  // Save Address
  // ========================================

  saveAddress():
    void {

    if (
      !this.canModify
    ) {
      return;
    }

    this.updateAddressValidators();

    this.addressForm
      .markAllAsTouched();

    if (
      this.addressForm.invalid
    ) {
      this.errorMessage =
        'Please fill in all required address fields.';

      return;
    }

    this.isSaving =
      true;

    this.errorMessage = '';

    this.successMessage = '';

    const formValue =
      this.addressForm
        .getRawValue();

    const request:
      SaveAddressRequest = {
      countryId:
        formValue.countryId,

      regionId:
        this.isPhilippinesSelected
          ? formValue.regionId
          : null,

      provinceId:
        this.isPhilippinesSelected
          ? formValue.provinceId
          : null,

      cityId:
        this.isPhilippinesSelected
          ? formValue.cityId
          : null,

      barangayId:
        this.isPhilippinesSelected
          ? formValue.barangayId
          : null,

      foreignStateProvinceRegion:
        this.isPhilippinesSelected
          ? null
          : formValue
              .foreignStateProvinceRegion,

      foreignCity:
        this.isPhilippinesSelected
          ? null
          : formValue.foreignCity,

      addressLine1:
        formValue.addressLine1,

      addressLine2:
        formValue.addressLine2,

      zipCode:
        formValue.zipCode,

      scopeId:
        formValue.scopeId,

      isPresent:
        formValue.isPresent,
    };

    console.log(
      'COMPONENT - SAVE ADDRESS REQUEST:',
      request,
    );

    console.table(
      request,
    );

    // ========================================
    // Save Through Service
    // ========================================

    this.addressService
      .saveAddress(
        request,
      )
      .subscribe({
        next: (
          savedAddress:
            EmployeeAddress,
        ) => {
          console.log(
            'COMPONENT - SAVE ADDRESS RESPONSE:',
            savedAddress,
          );

          // ========================================
          // Populate From Saved Response
          // ========================================

          this.populateAddress(
            savedAddress,
          );

          this.hasAddress =
            true;

          this.isSaving =
            false;

          this.successMessage =
            'Address saved successfully.';

          // ========================================
          // View Mode
          // ========================================

          this.isEditing =
            false;

          this.addressForm.disable({
            emitEvent: false,
          });

          this.addressForm
            .markAsPristine();

          this.addressForm
            .markAsUntouched();

          console.log(
            'FORM AFTER SAVE:',
            this.addressForm.getRawValue(),
          );
        },

        error: (
          error: unknown,
        ) => {
          console.error(
            'Failed to save address:',
            error,
          );

          this.isSaving =
            false;

          this.errorMessage =
            'Unable to save address.';
        },
      });
  }

  // ========================================
  // Reference Label
  // ========================================

  getReferenceLabel(
    options:
      CxpSelectOption[],

    selectedValue:
      CxpSelectPrimitive | null,
  ): string {

    if (
      selectedValue === null ||
      selectedValue === undefined
    ) {
      return '—';
    }

    const option =
      options.find(
        (item) =>
          String(
            item.value,
          ) ===
          String(
            selectedValue,
          ),
      );

    return (
      option?.label ??
      '—'
    );
  }
}
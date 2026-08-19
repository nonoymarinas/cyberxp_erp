// import {
//   ChangeDetectorRef,
//   Component,
//   Injector,
//   OnInit,
//   effect,
//   inject,
// } from '@angular/core';

// import {
//   FormControl,
//   FormGroup,
//   ReactiveFormsModule,
//   Validators,
// } from '@angular/forms';

// import {
//   CxpAddressList,
//   CxpButton,
//   CxpDisplayField,
//   CxpIconAddressNav,
//   CxpInputSelect,
//   CxpInputText,
// } from 'cyberxp-ui';

// import type {
//   CxpSelectOption,
//   CxpSelectPrimitive,
// } from 'cyberxp-ui';

// import { EmployeeState } from '../../../state/employee-state.service';

// import { AddressService } from '../../../business/services/address.service';

// import { AddressRefService } from '../../../business/services/address-ref.service';

// import { UserAccessService } from '../../../../../core/authorization/services/user-access.services';

// import { EMPLOYEE_PERMISSIONS } from '../../../../../core/authorization/permissions/employee-permissions';

// import {
//   AddressReferences,
//   Region,
//   Province,
//   City,
// } from '../../../models/domain/address-ref.model';

// import {
//   EmployeeAddress,
// } from '../../../models/domain/address.model';

// @Component({
//   selector: 'employee-address',
//   standalone: true,

//   imports: [
//     ReactiveFormsModule,
//     CxpButton,
//     CxpDisplayField,
//     CxpIconAddressNav,
//     CxpInputSelect,
//     CxpInputText,
//     CxpAddressList,
//   ],

//   templateUrl: './address.html',
//   styleUrl: './address.css',
// })
// export class AddressComponent implements OnInit {
//   // ========================================
//   // Services
//   // ========================================

//   private readonly userAccessService =
//     inject(UserAccessService);

//   private readonly addressRefService =
//     inject(AddressRefService);

//   private readonly addressService =
//     inject(AddressService);

//   private readonly cdr =
//     inject(ChangeDetectorRef);

//   private readonly injector =
//     inject(Injector);

//   readonly permissions =
//     EMPLOYEE_PERMISSIONS.address;

//   // ========================================
//   // Reference State
//   // ========================================

//   private referencesLoaded = false;

//   private addressReferences:
//     AddressReferences | null = null;

//   private loadedEmployeeGuid:
//     string | null = null;

//   // ========================================
//   // Address State
//   // ========================================

//   hasAddress = false;

//   isLoading = false;

//   isLoadingBarangays = false;

//   isEditing = false;

//   isSaving = false;

//   successMessage = '';

//   errorMessage = '';

//   addresses: EmployeeAddress[] = [];

//   selectedAddress:
//     EmployeeAddress | null = null;

//   showAddressList = false;

//   // ========================================
//   // Select Options
//   // ========================================

//   countryOptions:
//     CxpSelectOption[] = [];

//   regionOptions:
//     CxpSelectOption[] = [];

//   provinceOptions:
//     CxpSelectOption[] = [];

//   cityOptions:
//     CxpSelectOption[] = [];

//   barangayOptions:
//     CxpSelectOption[] = [];

//   addressScopeOptions:
//     CxpSelectOption[] = [];

//   constructor(
//     public readonly employeeState: EmployeeState,
//   ) {}

//   // ========================================
//   // Employee State
//   // ========================================

//   get employeeGuid(): string | null {
//     return (
//       this.employeeState
//         .employeeData()
//         ?.personalInfo
//         .employeeGuid ??
//       null
//     );
//   }

//   get hasEmployeeId(): boolean {
//     return this.employeeGuid !== null;
//   }

//   // ========================================
//   // Permissions
//   // ========================================

//   get canCreate(): boolean {
//     return (
//       this.hasEmployeeId &&
//       this.userAccessService
//         .hasPermission(
//           this.permissions.create,
//         )
//     );
//   }

//   get canRead(): boolean {
//     return (
//       this.hasEmployeeId &&
//       this.userAccessService
//         .hasPermission(
//           this.permissions.read,
//         )
//     );
//   }

//   get canUpdate(): boolean {
//     return (
//       this.hasEmployeeId &&
//       this.userAccessService
//         .hasPermission(
//           this.permissions.update,
//         )
//     );
//   }

//   get canDelete(): boolean {
//     return (
//       this.hasEmployeeId &&
//       this.userAccessService
//         .hasPermission(
//           this.permissions.delete,
//         )
//     );
//   }

//   // ========================================
//   // Display State
//   // ========================================

//   get showMainBody(): boolean {
//     if (!this.hasEmployeeId) {
//       return false;
//     }

//     if (this.isEditing) {
//       return true;
//     }

//     if (!this.hasAddress) {
//       return true;
//     }

//     return (
//       this.selectedAddress !== null &&
//       !this.showAddressList
//     );
//   }

//   get addressToggleLabel(): string {
//     return this.showAddressList
//       ? 'Hide address'
//       : 'Show all address';
//   }

//   get canModify(): boolean {
//     return this.hasAddress
//       ? this.canUpdate
//       : this.canCreate;
//   }

//   get canAccess(): boolean {
//     if (!this.hasAddress) {
//       return (
//         this.canCreate ||
//         this.canRead
//       );
//     }

//     return this.canRead;
//   }

//   // ========================================
//   // Form
//   // ========================================

//   readonly addressForm =
//     new FormGroup({
//       // ======================================
//       // Country
//       // ======================================

//       countryId:
//         new FormControl<number | null>(
//           {
//             value: null,
//             disabled: false,
//           },
//           {
//             validators: [
//               Validators.required,
//             ],
//           },
//         ),

//       // ======================================
//       // Philippine Address
//       // ======================================

//       regionId:
//         new FormControl<number | null>({
//           value: null,
//           disabled: false,
//         }),

//       provinceId:
//         new FormControl<number | null>({
//           value: null,
//           disabled: false,
//         }),

//       cityId:
//         new FormControl<number | null>({
//           value: null,
//           disabled: false,
//         }),

//       barangayId:
//         new FormControl<number | null>({
//           value: null,
//           disabled: false,
//         }),

//       // ======================================
//       // International Address
//       // ======================================

//       internationalRegion:
//         new FormControl<string | null>({
//           value: null,
//           disabled: false,
//         }),

//       internationalStates:
//         new FormControl<string | null>({
//           value: null,
//           disabled: false,
//         }),

//       internationalProvince:
//         new FormControl<string | null>({
//           value: null,
//           disabled: false,
//         }),

//       internationalCity:
//         new FormControl<string | null>({
//           value: null,
//           disabled: false,
//         }),

//       internationalSuburb:
//         new FormControl<string | null>({
//           value: null,
//           disabled: false,
//         }),

//       // ======================================
//       // Common
//       // ======================================

//       addressLine1:
//         new FormControl<string>(
//           {
//             value: '',
//             disabled: false,
//           },
//           {
//             nonNullable: true,
//             validators: [
//               Validators.required,
//             ],
//           },
//         ),

//       addressLine2:
//         new FormControl<string | null>({
//           value: null,
//           disabled: false,
//         }),

//       zipCode:
//         new FormControl<string>(
//           {
//             value: '',
//             disabled: false,
//           },
//           {
//             nonNullable: true,
//           },
//         ),

//       // ======================================
//       // Scope
//       // ======================================

//       scopeId:
//         new FormControl<string | null>(
//           {
//             value: null,
//             disabled: false,
//           },
//           {
//             validators: [
//               Validators.required,
//             ],
//           },
//         ),

//       // ======================================
//       // Present
//       // ======================================

//       isPresent:
//         new FormControl<boolean>(
//           {
//             value: false,
//             disabled: false,
//           },
//           {
//             nonNullable: true,
//           },
//         ),
//     });

//   // ========================================
//   // Country State
//   // ========================================

//   get hasCountrySelected(): boolean {
//     return (
//       this.addressForm
//         .controls
//         .countryId
//         .value !== null
//     );
//   }

//   get isPhilippinesSelected(): boolean {
//     const countryId =
//       this.addressForm
//         .controls
//         .countryId
//         .value;

//     if (
//       countryId === null ||
//       !this.addressReferences
//     ) {
//       return false;
//     }

//     const country =
//       this.addressReferences
//         .countries
//         .find(
//           (item) =>
//             item.id === countryId,
//         );

//     return (
//       country
//         ?.countryName
//         .trim()
//         .toLowerCase() ===
//       'philippines'
//     );
//   }

//   // ========================================
//   // Init
//   // ========================================

//   ngOnInit(): void {
//     this.addressForm.disable({
//       emitEvent: false,
//     });

//     this.setupAddressChanges();

//     effect(
//       () => {
//         const employeeGuid =
//           this.employeeGuid;

//         this.handleEmployeeGuidChange(
//           employeeGuid,
//         );
//       },
//       {
//         injector: this.injector,
//       },
//     );
//   }

//   // ========================================
//   // Load References
//   // ========================================

//   private loadReferences(): void {
//     if (!this.hasEmployeeId) {
//       return;
//     }

//     this.isLoading = true;

//     this.errorMessage = '';

//     this.referencesLoaded = false;

//     this.addressRefService
//       .getReferences()
//       .subscribe({
//         next: (
//           references:
//             AddressReferences,
//         ) => {
//           this.addressReferences =
//             references;

//           this.countryOptions =
//             references
//               .countries
//               .map(
//                 (country) => ({
//                   value:
//                     country.id,

//                   label:
//                     country
//                       .countryName
//                       .toUpperCase(),
//                 }),
//               );

//           this.addressScopeOptions =
//             this.addressRefService
//               .getAddressScopeOptions();

//           this.regionOptions = [];
//           this.provinceOptions = [];
//           this.cityOptions = [];
//           this.barangayOptions = [];

//           this.referencesLoaded =
//             true;

//           this.isLoading = false;

//           this.loadAddresses();
//         },

//         error: (
//           error: unknown,
//         ) => {
//           console.error(
//             'Failed to load address references:',
//             error,
//           );

//           this.referencesLoaded =
//             false;

//           this.isLoading = false;

//           this.addressReferences =
//             null;

//           this.countryOptions = [];
//           this.regionOptions = [];
//           this.provinceOptions = [];
//           this.cityOptions = [];
//           this.barangayOptions = [];
//           this.addressScopeOptions =
//             [];

//           this.errorMessage =
//             'Unable to load address reference data.';

//           this.addressForm.disable({
//             emitEvent: false,
//           });
//         },
//       });
//   }

//   // ========================================
//   // Employee Change
//   // ========================================

//   private handleEmployeeGuidChange(
//     employeeGuid: string | null,
//   ): void {
//     if (!employeeGuid) {
//       this.loadedEmployeeGuid =
//         null;

//       this.resetAddressFeatureForNoEmployee();

//       return;
//     }

//     if (
//       this.loadedEmployeeGuid ===
//       employeeGuid
//     ) {
//       return;
//     }

//     this.loadedEmployeeGuid =
//       employeeGuid;

//     this.addresses = [];

//     this.hasAddress = false;

//     this.selectedAddress = null;

//     this.showAddressList = false;

//     this.isEditing = false;

//     this.isSaving = false;

//     this.successMessage = '';

//     this.errorMessage = '';

//     this.resetAddressForm();

//     this.addressForm.disable({
//       emitEvent: false,
//     });

//     if (this.referencesLoaded) {
//       this.loadAddresses();

//       return;
//     }

//     this.loadReferences();
//   }

//   // ========================================
//   // Reset Feature
//   // ========================================

//   private resetAddressFeatureForNoEmployee():
//     void {
//     this.addresses = [];

//     this.hasAddress = false;

//     this.selectedAddress = null;

//     this.showAddressList = false;

//     this.isEditing = false;

//     this.isSaving = false;

//     this.successMessage = '';

//     this.errorMessage = '';

//     this.resetAddressForm();

//     this.addressForm.disable({
//       emitEvent: false,
//     });

//     this.cdr.detectChanges();
//   }

//   // ========================================
//   // Load Addresses
//   // ========================================

//   private loadAddresses(): void {
//     const employeeGuid =
//       this.employeeGuid;

//     if (!employeeGuid) {
//       this.resetAddressFeatureForNoEmployee();

//       return;
//     }

//     this.addressService
//       .getAddresses(employeeGuid)
//       .subscribe({
//         next: (
//           addresses:
//             EmployeeAddress[],
//         ) => {
//           console.log(
//             'LOADED ADDRESSES:',
//             addresses,
//           );

//           this.handleLoadedAddresses(
//             addresses,
//           );
//         },

//         error: (
//           error: unknown,
//         ) => {
//           console.error(
//             'Failed to load addresses:',
//             error,
//           );

//           this.errorMessage =
//             'Unable to load employee addresses.';

//           this.handleLoadedAddresses(
//             [],
//           );
//         },
//       });
//   }

//   // ========================================
//   // Handle Addresses
//   // ========================================

//   private handleLoadedAddresses(
//     addresses: EmployeeAddress[],
//   ): void {
//     this.addresses = addresses;

//     this.hasAddress =
//       addresses.length > 0;

//     // ======================================
//     // No Address
//     // ======================================

//     if (!this.hasAddress) {
//       this.selectedAddress = null;

//       this.showAddressList = false;

//       this.resetAddressForm();

//       this.isEditing = true;

//       if (
//         this.referencesLoaded &&
//         this.canCreate
//       ) {
//         this.addressForm.enable({
//           emitEvent: false,
//         });
//       } else {
//         this.addressForm.disable({
//           emitEvent: false,
//         });
//       }

//       this.updateAddressValidators();

//       this.cdr.detectChanges();

//       return;
//     }

//     // ======================================
//     // Has Addresses
//     // ======================================

//     this.selectedAddress = null;

//     this.showAddressList = true;

//     this.isEditing = false;

//     this.addressForm.disable({
//       emitEvent: false,
//     });

//     this.cdr.detectChanges();
//   }

//   // ========================================
//   // Toggle Address List
//   // ========================================

//   toggleAddressList(): void {
//     if (!this.hasEmployeeId) {
//       return;
//     }

//     this.showAddressList =
//       !this.showAddressList;

//     if (
//       this.showAddressList
//     ) {
//       this.isEditing = false;
//     }
//   }

//   // ========================================
//   // Add Address
//   // ========================================

//   addAddress(): void {
//     if (!this.hasEmployeeId) {
//       this.errorMessage =
//         'Employee ID is not available.';

//       return;
//     }

//     if (!this.canCreate) {
//       this.errorMessage =
//         'You do not have permission to create an address.';

//       return;
//     }

//     if (!this.referencesLoaded) {
//       this.errorMessage =
//         'Address reference data is not yet available.';

//       return;
//     }

//     this.selectedAddress = null;

//     this.showAddressList = false;

//     this.resetAddressForm();

//     this.isEditing = true;

//     this.errorMessage = '';

//     this.successMessage = '';

//     this.addressForm.enable({
//       emitEvent: false,
//     });

//     this.updateAddressValidators();

//     this.cdr.detectChanges();
//   }

//   // ========================================
//   // Select Address
//   // ========================================

//   selectAddress(
//     address: EmployeeAddress,
//   ): void {
//     this.selectedAddress =
//       address;

//     this.populateAddress(
//       address,
//     );

//     this.isEditing = false;

//     this.addressForm.disable({
//       emitEvent: false,
//     });

//     this.showAddressList =
//       false;

//     this.errorMessage = '';

//     this.successMessage = '';

//     this.cdr.detectChanges();
//   }

//   // ========================================
//   // Populate Address
//   // ========================================

//   private populateAddress(
//     address: EmployeeAddress,
//   ): void {
//     this.addressForm
//       .controls
//       .countryId
//       .setValue(
//         address.countryId,
//         {
//           emitEvent: false,
//         },
//       );

//     // ======================================
//     // Philippines
//     // ======================================

//     if (
//       this.isPhilippinesSelected
//     ) {
//       this.populatePhilippineAddressOptions(
//         address,
//       );

//       this.addressForm.patchValue(
//         {
//           countryId:
//             address.countryId,

//           regionId:
//             address.regionId,

//           provinceId:
//             address.provinceId,

//           cityId:
//             address.cityId,

//           barangayId:
//             address.barangayId,

//           internationalRegion:
//             null,

//           internationalStates:
//             null,

//           internationalProvince:
//             null,

//           internationalCity:
//             null,

//           internationalSuburb:
//             null,

//           addressLine1:
//             address.addressLine1 ??
//             '',

//           addressLine2:
//             address.addressLine2,

//           zipCode:
//             address.zipCode ??
//             '',

//           scopeId:
//             address.scopeId,

//           isPresent:
//             address.isPresent ??
//             false,
//         },
//         {
//           emitEvent: false,
//         },
//       );

//       if (
//         address.cityId !== null
//       ) {
//         this.loadBarangays(
//           address.cityId,
//           address.barangayId,
//         );
//       }

//       return;
//     }

//     // ======================================
//     // International
//     // ======================================

//     this.regionOptions = [];

//     this.provinceOptions = [];

//     this.cityOptions = [];

//     this.barangayOptions = [];

//     this.addressForm.patchValue(
//       {
//         countryId:
//           address.countryId,

//         regionId: null,

//         provinceId: null,

//         cityId: null,

//         barangayId: null,

//         internationalRegion:
//           address.internationalRegion,

//         internationalStates:
//           address.internationalStates,

//         internationalProvince:
//           address.internationalProvince,

//         internationalCity:
//           address.internationalCity,

//         internationalSuburb:
//           address.internationalSuburb,

//         addressLine1:
//           address.addressLine1 ??
//           '',

//         addressLine2:
//           address.addressLine2,

//         zipCode:
//           address.zipCode ??
//           '',

//         scopeId:
//           address.scopeId,

//         isPresent:
//           address.isPresent ??
//           false,
//       },
//       {
//         emitEvent: false,
//       },
//     );
//   }

//   // ========================================
//   // Populate Philippine Options
//   // ========================================

//   private populatePhilippineAddressOptions(
//     address: EmployeeAddress,
//   ): void {
//     if (
//       !this.addressReferences ||
//       address.countryId === null
//     ) {
//       return;
//     }

//     const regions =
//       this.addressReferences
//         .regions
//         .filter(
//           (region) =>
//             region.countryId ===
//             address.countryId,
//         );

//     this.regionOptions =
//       this.toRegionOptions(
//         regions,
//       );

//     if (
//       address.regionId !== null
//     ) {
//       const provinces =
//         this.addressReferences
//           .provinces
//           .filter(
//             (province) =>
//               province.regionId ===
//               address.regionId,
//           );

//       this.provinceOptions =
//         this.toProvinceOptions(
//           provinces,
//         );
//     } else {
//       this.provinceOptions = [];
//     }

//     if (
//       address.provinceId !== null
//     ) {
//       const cities =
//         this.addressReferences
//           .cities
//           .filter(
//             (city) =>
//               city.provinceId ===
//               address.provinceId,
//           );

//       this.cityOptions =
//         this.toCityOptions(
//           cities,
//         );
//     } else {
//       this.cityOptions = [];
//     }
//   }

//   // ========================================
//   // Form Changes
//   // ========================================

//   private setupAddressChanges():
//     void {
//     this.addressForm
//       .controls
//       .countryId
//       .valueChanges
//       .subscribe(
//         (
//           countryId,
//         ) => {
//           this.onCountryChange(
//             countryId,
//           );
//         },
//       );

//     this.addressForm
//       .controls
//       .regionId
//       .valueChanges
//       .subscribe(
//         (
//           regionId,
//         ) => {
//           this.onRegionChange(
//             regionId,
//           );
//         },
//       );

//     this.addressForm
//       .controls
//       .provinceId
//       .valueChanges
//       .subscribe(
//         (
//           provinceId,
//         ) => {
//           this.onProvinceChange(
//             provinceId,
//           );
//         },
//       );

//     this.addressForm
//       .controls
//       .cityId
//       .valueChanges
//       .subscribe(
//         (
//           cityId,
//         ) => {
//           this.onCityChange(
//             cityId,
//           );
//         },
//       );
//   }

//   // ========================================
//   // Country Change
//   // ========================================

//   onCountryChange(
//     countryId: number | null,
//   ): void {
//     if (
//       !this.addressReferences
//     ) {
//       return;
//     }

//     this.addressForm.patchValue(
//       {
//         regionId: null,
//         provinceId: null,
//         cityId: null,
//         barangayId: null,

//         internationalRegion:
//           null,

//         internationalStates:
//           null,

//         internationalProvince:
//           null,

//         internationalCity:
//           null,

//         internationalSuburb:
//           null,
//       },
//       {
//         emitEvent: false,
//       },
//     );

//     this.regionOptions = [];

//     this.provinceOptions = [];

//     this.cityOptions = [];

//     this.barangayOptions = [];

//     if (countryId === null) {
//       this.updateAddressValidators();

//       return;
//     }

//     if (
//       this.isPhilippinesSelected
//     ) {
//       this.loadAllPhilippineOptions();
//     }

//     this.updateAddressValidators();
//   }

//   // ========================================
//   // Region Change
//   // ========================================

//   onRegionChange(
//     regionId: number | null,
//   ): void {
//     if (
//       !this.addressReferences ||
//       !this.isPhilippinesSelected
//     ) {
//       return;
//     }

//     this.clearBarangay();

//     if (regionId === null) {
//       this.addressForm.patchValue(
//         {
//           provinceId: null,
//           cityId: null,
//           barangayId: null,
//         },
//         {
//           emitEvent: false,
//         },
//       );

//       this.loadAllPhilippineOptions();

//       return;
//     }

//     this.addressForm.patchValue(
//       {
//         provinceId: null,
//         cityId: null,
//         barangayId: null,
//       },
//       {
//         emitEvent: false,
//       },
//     );

//     const provinces =
//       this.addressReferences
//         .provinces
//         .filter(
//           (province) =>
//             province.regionId ===
//             regionId,
//         );

//     this.provinceOptions =
//       this.toProvinceOptions(
//         provinces,
//       );

//     const provinceIds =
//       new Set(
//         provinces.map(
//           (province) =>
//             province.id,
//         ),
//       );

//     const cities =
//       this.addressReferences
//         .cities
//         .filter(
//           (city) =>
//             provinceIds.has(
//               city.provinceId,
//             ),
//         );

//     this.cityOptions =
//       this.toCityOptions(
//         cities,
//       );
//   }

//   // ========================================
//   // Province Change
//   // ========================================

//   onProvinceChange(
//     provinceId:
//       number | null,
//   ): void {
//     if (
//       !this.addressReferences ||
//       !this.isPhilippinesSelected
//     ) {
//       return;
//     }

//     this.addressForm.patchValue(
//       {
//         cityId: null,
//         barangayId: null,
//       },
//       {
//         emitEvent: false,
//       },
//     );

//     this.barangayOptions = [];

//     if (
//       provinceId === null
//     ) {
//       const regionId =
//         this.addressForm
//           .controls
//           .regionId
//           .value;

//       if (
//         regionId !== null
//       ) {
//         const provinces =
//           this.addressReferences
//             .provinces
//             .filter(
//               (province) =>
//                 province
//                   .regionId ===
//                 regionId,
//             );

//         this.provinceOptions =
//           this.toProvinceOptions(
//             provinces,
//           );

//         const provinceIds =
//           new Set(
//             provinces.map(
//               (province) =>
//                 province.id,
//             ),
//           );

//         const cities =
//           this.addressReferences
//             .cities
//             .filter(
//               (city) =>
//                 provinceIds.has(
//                   city.provinceId,
//                 ),
//             );

//         this.cityOptions =
//           this.toCityOptions(
//             cities,
//           );

//         return;
//       }

//       this.loadAllPhilippineOptions();

//       return;
//     }

//     const province =
//       this.addressReferences
//         .provinces
//         .find(
//           (item) =>
//             item.id === provinceId,
//         );

//     if (!province) {
//       return;
//     }

//     this.addressForm
//       .controls
//       .regionId
//       .setValue(
//         province.regionId,
//         {
//           emitEvent: false,
//         },
//       );

//     const provinces =
//       this.addressReferences
//         .provinces
//         .filter(
//           (item) =>
//             item.regionId ===
//             province.regionId,
//         );

//     this.provinceOptions =
//       this.toProvinceOptions(
//         provinces,
//       );

//     const cities =
//       this.addressReferences
//         .cities
//         .filter(
//           (city) =>
//             city.provinceId ===
//             provinceId,
//         );

//     this.cityOptions =
//       this.toCityOptions(
//         cities,
//       );
//   }

//   // ========================================
//   // City Change
//   // ========================================

//   onCityChange(
//     cityId: number | null,
//   ): void {
//     if (
//       !this.addressReferences ||
//       !this.isPhilippinesSelected
//     ) {
//       return;
//     }

//     this.clearBarangay();

//     if (cityId === null) {
//       return;
//     }

//     const city =
//       this.addressReferences
//         .cities
//         .find(
//           (item) =>
//             item.id === cityId,
//         );

//     if (!city) {
//       return;
//     }

//     const currentProvinceId =
//       this.addressForm
//         .controls
//         .provinceId
//         .value;

//     // Only automatically fill province/region
//     // when no province is already selected.
//     if (
//       currentProvinceId === null
//     ) {
//       const province =
//         this.addressReferences
//           .provinces
//           .find(
//             (item) =>
//               item.id ===
//               city.provinceId,
//           );

//       if (province) {
//         this.addressForm
//           .controls
//           .provinceId
//           .setValue(
//             province.id,
//             {
//               emitEvent: false,
//             },
//           );

//         this.addressForm
//           .controls
//           .regionId
//           .setValue(
//             province.regionId,
//             {
//               emitEvent: false,
//             },
//           );

//         const provinces =
//           this.addressReferences
//             .provinces
//             .filter(
//               (item) =>
//                 item.regionId ===
//                 province.regionId,
//             );

//         this.provinceOptions =
//           this.toProvinceOptions(
//             provinces,
//           );

//         const cities =
//           this.addressReferences
//             .cities
//             .filter(
//               (item) =>
//                 item.provinceId ===
//                 province.id,
//             );

//         this.cityOptions =
//           this.toCityOptions(
//             cities,
//           );
//       }
//     }

//     this.loadBarangays(
//       cityId,
//     );
//   }

//   // ========================================
//   // Barangays
//   // ========================================

//   private loadBarangays(
//     cityId: number,
//     selectedBarangayId:
//       number | null = null,
//   ): void {
//     this.isLoadingBarangays =
//       true;

//     this.barangayOptions = [];

//     this.addressRefService
//       .getBarangaysByCity(
//         cityId,
//       )
//       .subscribe({
//         next: (
//           response,
//         ) => {
//           if (!response.success) {
//             this.isLoadingBarangays =
//               false;

//             this.errorMessage =
//               response.message ??
//               'Unable to load barangays.';

//             this.cdr.detectChanges();

//             return;
//           }

//           this.barangayOptions =
//             response.data.map(
//               (barangay) => ({
//                 value:
//                   barangay.id,

//                 label:
//                   barangay
//                     .barangayName
//                     .toUpperCase(),
//               }),
//             );

//           if (
//             selectedBarangayId !==
//             null
//           ) {
//             const exists =
//               this.barangayOptions
//                 .some(
//                   (option) =>
//                     String(
//                       option.value,
//                     ) ===
//                     String(
//                       selectedBarangayId,
//                     ),
//                 );

//             if (exists) {
//               this.addressForm
//                 .controls
//                 .barangayId
//                 .setValue(
//                   selectedBarangayId,
//                   {
//                     emitEvent:
//                       false,
//                   },
//                 );
//             }
//           }

//           this.isLoadingBarangays =
//             false;

//           this.cdr.detectChanges();
//         },

//         error: (
//           error: unknown,
//         ) => {
//           console.error(
//             'Failed to load barangays:',
//             error,
//           );

//           this.isLoadingBarangays =
//             false;

//           this.errorMessage =
//             'Unable to load barangays.';

//           this.cdr.detectChanges();
//         },
//       });
//   }

//   private clearBarangay(): void {
//     this.addressForm
//       .controls
//       .barangayId
//       .setValue(
//         null,
//         {
//           emitEvent: false,
//         },
//       );

//     this.barangayOptions = [];
//   }

//   // ========================================
//   // Load All PH Options
//   // ========================================

//   private loadAllPhilippineOptions():
//     void {
//     if (
//       !this.addressReferences
//     ) {
//       return;
//     }

//     const countryId =
//       this.addressForm
//         .controls
//         .countryId
//         .value;

//     if (
//       countryId === null
//     ) {
//       this.regionOptions = [];
//       this.provinceOptions = [];
//       this.cityOptions = [];
//       this.barangayOptions = [];

//       return;
//     }

//     const regions =
//       this.addressReferences
//         .regions
//         .filter(
//           (region) =>
//             region.countryId ===
//             countryId,
//         );

//     this.regionOptions =
//       this.toRegionOptions(
//         regions,
//       );

//     const regionIds =
//       new Set(
//         regions.map(
//           (region) =>
//             region.id,
//         ),
//       );

//     const provinces =
//       this.addressReferences
//         .provinces
//         .filter(
//           (province) =>
//             regionIds.has(
//               province.regionId,
//             ),
//         );

//     this.provinceOptions =
//       this.toProvinceOptions(
//         provinces,
//       );

//     const provinceIds =
//       new Set(
//         provinces.map(
//           (province) =>
//             province.id,
//         ),
//       );

//     const cities =
//       this.addressReferences
//         .cities
//         .filter(
//           (city) =>
//             provinceIds.has(
//               city.provinceId,
//             ),
//         );

//     this.cityOptions =
//       this.toCityOptions(
//         cities,
//       );

//     this.barangayOptions = [];
//   }

//   // ========================================
//   // Validators
//   // ========================================

//   private updateAddressValidators():
//     void {
//     const countryId =
//       this.addressForm
//         .controls
//         .countryId
//         .value;

//     const regionControl =
//       this.addressForm
//         .controls
//         .regionId;

//     const provinceControl =
//       this.addressForm
//         .controls
//         .provinceId;

//     const cityControl =
//       this.addressForm
//         .controls
//         .cityId;

//     const barangayControl =
//       this.addressForm
//         .controls
//         .barangayId;

//     const internationalRegionControl =
//       this.addressForm
//         .controls
//         .internationalRegion;

//     const internationalStatesControl =
//       this.addressForm
//         .controls
//         .internationalStates;

//     const internationalProvinceControl =
//       this.addressForm
//         .controls
//         .internationalProvince;

//     const internationalCityControl =
//       this.addressForm
//         .controls
//         .internationalCity;

//     const internationalSuburbControl =
//       this.addressForm
//         .controls
//         .internationalSuburb;

//     const scopeControl =
//       this.addressForm
//         .controls
//         .scopeId;

//     scopeControl.setValidators([
//       Validators.required,
//     ]);

//     if (
//       countryId === null
//     ) {
//       regionControl
//         .clearValidators();

//       provinceControl
//         .clearValidators();

//       cityControl
//         .clearValidators();

//       barangayControl
//         .clearValidators();

//       internationalRegionControl
//         .clearValidators();

//       internationalStatesControl
//         .clearValidators();

//       internationalProvinceControl
//         .clearValidators();

//       internationalCityControl
//         .clearValidators();

//       internationalSuburbControl
//         .clearValidators();

//       this.updateLocationValidity();

//       return;
//     }

//     if (
//       this.isPhilippinesSelected
//     ) {
//       regionControl.setValidators([
//         Validators.required,
//       ]);

//       provinceControl.setValidators([
//         Validators.required,
//       ]);

//       cityControl.setValidators([
//         Validators.required,
//       ]);

//       barangayControl.setValidators([
//         Validators.required,
//       ]);

//       internationalRegionControl
//         .clearValidators();

//       internationalStatesControl
//         .clearValidators();

//       internationalProvinceControl
//         .clearValidators();

//       internationalCityControl
//         .clearValidators();

//       internationalSuburbControl
//         .clearValidators();
//     } else {
//       regionControl
//         .clearValidators();

//       provinceControl
//         .clearValidators();

//       cityControl
//         .clearValidators();

//       barangayControl
//         .clearValidators();

//       /*
//        * International fields are nullable
//        * in your new model, therefore they
//        * are not forced required here.
//        *
//        * If your API requires specific
//        * international fields, add
//        * Validators.required to them here.
//        */

//       internationalRegionControl
//         .clearValidators();

//       internationalStatesControl
//         .clearValidators();

//       internationalProvinceControl
//         .clearValidators();

//       internationalCityControl
//         .clearValidators();

//       internationalSuburbControl
//         .clearValidators();
//     }

//     this.updateLocationValidity();
//   }

//   private updateLocationValidity():
//     void {
//     this.addressForm
//       .controls
//       .regionId
//       .updateValueAndValidity({
//         emitEvent: false,
//       });

//     this.addressForm
//       .controls
//       .provinceId
//       .updateValueAndValidity({
//         emitEvent: false,
//       });

//     this.addressForm
//       .controls
//       .cityId
//       .updateValueAndValidity({
//         emitEvent: false,
//       });

//     this.addressForm
//       .controls
//       .barangayId
//       .updateValueAndValidity({
//         emitEvent: false,
//       });

//     this.addressForm
//       .controls
//       .internationalRegion
//       .updateValueAndValidity({
//         emitEvent: false,
//       });

//     this.addressForm
//       .controls
//       .internationalStates
//       .updateValueAndValidity({
//         emitEvent: false,
//       });

//     this.addressForm
//       .controls
//       .internationalProvince
//       .updateValueAndValidity({
//         emitEvent: false,
//       });

//     this.addressForm
//       .controls
//       .internationalCity
//       .updateValueAndValidity({
//         emitEvent: false,
//       });

//     this.addressForm
//       .controls
//       .internationalSuburb
//       .updateValueAndValidity({
//         emitEvent: false,
//       });

//     this.addressForm
//       .controls
//       .scopeId
//       .updateValueAndValidity({
//         emitEvent: false,
//       });
//   }

//   // ========================================
//   // Option Mapping
//   // ========================================

//   private toRegionOptions(
//     items: Region[],
//   ): CxpSelectOption[] {
//     return items.map(
//       (item) => ({
//         value: item.id,

//         label:
//           item.regionName
//             .toUpperCase(),
//       }),
//     );
//   }

//   private toProvinceOptions(
//     items: Province[],
//   ): CxpSelectOption[] {
//     return items.map(
//       (item) => ({
//         value: item.id,

//         label:
//           item.provinceName
//             .toUpperCase(),
//       }),
//     );
//   }

//   private toCityOptions(
//     items: City[],
//   ): CxpSelectOption[] {
//     return items.map(
//       (item) => ({
//         value: item.id,

//         label:
//           item
//             .cityOrMunicipalName
//             .toUpperCase(),
//       }),
//     );
//   }

//   // ========================================
//   // Start Edit
//   // ========================================

//   startEdit(): void {
//     if (!this.hasEmployeeId) {
//       this.errorMessage =
//         'Employee ID is not available.';

//       return;
//     }

//     if (!this.canUpdate) {
//       this.errorMessage =
//         'You do not have permission to update an address.';

//       return;
//     }

//     if (!this.referencesLoaded) {
//       this.errorMessage =
//         'Address reference data is not yet available.';

//       return;
//     }

//     if (
//       !this.selectedAddress
//     ) {
//       return;
//     }

//     this.errorMessage = '';

//     this.successMessage = '';

//     this.populateAddress(
//       this.selectedAddress,
//     );

//     this.isEditing = true;

//     this.showAddressList = false;

//     this.addressForm.enable({
//       emitEvent: false,
//     });

//     this.updateAddressValidators();

//     this.cdr.detectChanges();
//   }

//   // ========================================
//   // Cancel Edit
//   // ========================================

//   cancelEdit(): void {
//     this.errorMessage = '';

//     this.successMessage = '';

//     // Existing selected address
//     if (
//       this.hasAddress &&
//       this.selectedAddress
//     ) {
//       this.populateAddress(
//         this.selectedAddress,
//       );

//       this.isEditing = false;

//       this.addressForm.disable({
//         emitEvent: false,
//       });

//       this.cdr.detectChanges();

//       return;
//     }

//     // Adding new address while others exist
//     if (
//       this.hasAddress &&
//       !this.selectedAddress
//     ) {
//       this.resetAddressForm();

//       this.isEditing = false;

//       this.showAddressList = true;

//       this.addressForm.disable({
//         emitEvent: false,
//       });

//       this.cdr.detectChanges();

//       return;
//     }

//     // No existing address
//     this.resetAddressForm();

//     this.isEditing = true;

//     if (
//       this.referencesLoaded &&
//       this.canCreate &&
//       this.hasEmployeeId
//     ) {
//       this.addressForm.enable({
//         emitEvent: false,
//       });
//     } else {
//       this.addressForm.disable({
//         emitEvent: false,
//       });
//     }

//     this.updateAddressValidators();
//   }

//   // ========================================
//   // Reset Form
//   // ========================================

//   private resetAddressForm():
//     void {
//     this.addressForm.reset(
//       {
//         countryId: null,

//         regionId: null,

//         provinceId: null,

//         cityId: null,

//         barangayId: null,

//         internationalRegion:
//           null,

//         internationalStates:
//           null,

//         internationalProvince:
//           null,

//         internationalCity:
//           null,

//         internationalSuburb:
//           null,

//         addressLine1: '',

//         addressLine2: null,

//         zipCode: '',

//         scopeId: null,

//         isPresent: false,
//       },
//       {
//         emitEvent: false,
//       },
//     );

//     this.regionOptions = [];

//     this.provinceOptions = [];

//     this.cityOptions = [];

//     this.barangayOptions = [];

//     this.addressForm
//       .markAsPristine();

//     this.addressForm
//       .markAsUntouched();
//   }

//   // ========================================
//   // Save Address
//   // ========================================

//   saveAddress(): void {
//     const employeeGuid =
//       this.employeeGuid;

//     if (!employeeGuid) {
//       this.errorMessage =
//         'Employee ID is not available.';

//       return;
//     }

//     const addressId =
//       this.selectedAddress
//         ?.addressId ??
//       null;

//     const isCreating =
//       addressId === null;

//     if (
//       isCreating &&
//       !this.canCreate
//     ) {
//       this.errorMessage =
//         'You do not have permission to create an address.';

//       return;
//     }

//     if (
//       !isCreating &&
//       !this.canUpdate
//     ) {
//       this.errorMessage =
//         'You do not have permission to update this address.';

//       return;
//     }

//     this.updateAddressValidators();

//     this.addressForm
//       .markAllAsTouched();

//     if (
//       this.addressForm.invalid
//     ) {
//       this.errorMessage =
//         'Please fill in all required address fields.';

//       return;
//     }

//     this.isSaving = true;

//     this.errorMessage = '';

//     this.successMessage = '';

//     const formValue =
//       this.addressForm
//         .getRawValue();

//     const request = {
//       employeeGuid,

//       addressId,

//       scopeId:
//         formValue.scopeId,

//       countryId:
//         formValue.countryId,

//       regionId:
//         this.isPhilippinesSelected
//           ? formValue.regionId
//           : null,

//       provinceId:
//         this.isPhilippinesSelected
//           ? formValue.provinceId
//           : null,

//       cityId:
//         this.isPhilippinesSelected
//           ? formValue.cityId
//           : null,

//       barangayId:
//         this.isPhilippinesSelected
//           ? formValue.barangayId
//           : null,

//       internationalRegion:
//         this.isPhilippinesSelected
//           ? null
//           : formValue
//               .internationalRegion,

//       internationalStates:
//         this.isPhilippinesSelected
//           ? null
//           : formValue
//               .internationalStates,

//       internationalProvince:
//         this.isPhilippinesSelected
//           ? null
//           : formValue
//               .internationalProvince,

//       internationalCity:
//         this.isPhilippinesSelected
//           ? null
//           : formValue
//               .internationalCity,

//       internationalSuburb:
//         this.isPhilippinesSelected
//           ? null
//           : formValue
//               .internationalSuburb,

//       addressLine1:
//         formValue.addressLine1,

//       addressLine2:
//         formValue.addressLine2,

//       zipCode:
//         formValue.zipCode,

//       isPresent:
//         formValue.isPresent,
//     };

//     console.log(
//       'SAVE ADDRESS REQUEST:',
//       request,
//     );

//     this.addressService
//       .saveAddress(request)
//       .subscribe({
//         next: (
//           addresses:
//             EmployeeAddress[],
//         ) => {
//           this.addresses =
//             addresses;

//           this.hasAddress =
//             addresses.length >
//             0;

//           let savedAddress:
//             EmployeeAddress |
//             null = null;

//           if (
//             addressId !== null
//           ) {
//             savedAddress =
//               addresses.find(
//                 (address) =>
//                   address.addressId ===
//                   addressId,
//               ) ??
//               null;
//           } else {
//             savedAddress =
//               addresses[
//                 addresses.length -
//                   1
//               ] ??
//               null;
//           }

//           this.selectedAddress =
//             savedAddress;

//           if (savedAddress) {
//             this.populateAddress(
//               savedAddress,
//             );
//           }

//           this.showAddressList =
//             false;

//           this.isSaving = false;

//           this.isEditing = false;

//           this.successMessage =
//             isCreating
//               ? 'Address saved successfully.'
//               : 'Address updated successfully.';

//           this.addressForm.disable({
//             emitEvent: false,
//           });

//           this.addressForm
//             .markAsPristine();

//           this.addressForm
//             .markAsUntouched();

//           this.cdr.detectChanges();
//         },

//         error: (
//           error: unknown,
//         ) => {
//           console.error(
//             'Failed to save address:',
//             error,
//           );

//           this.isSaving = false;

//           this.errorMessage =
//             isCreating
//               ? 'Unable to save address.'
//               : 'Unable to update address.';
//         },
//       });
//   }

//   // ========================================
//   // Delete Address
//   // ========================================

//   deleteAddress(): void {
//     const employeeGuid =
//       this.employeeGuid;

//     const addressId =
//       this.selectedAddress
//         ?.addressId ??
//       null;

//     if (
//       !employeeGuid ||
//       !addressId
//     ) {
//       return;
//     }

//     if (!this.canDelete) {
//       this.errorMessage =
//         'You do not have permission to delete this address.';

//       return;
//     }

//     this.isSaving = true;

//     this.errorMessage = '';

//     this.successMessage = '';

//     this.addressService
//       .deleteAddress(
//         employeeGuid,
//         addressId,
//       )
//       .subscribe({
//         next: (
//           addresses:
//             EmployeeAddress[],
//         ) => {
//           this.addresses =
//             addresses;

//           this.hasAddress =
//             addresses.length >
//             0;

//           this.selectedAddress =
//             null;

//           this.isSaving = false;

//           this.resetAddressForm();

//           if (
//             this.hasAddress
//           ) {
//             this.isEditing =
//               false;

//             this.showAddressList =
//               true;

//             this.addressForm.disable({
//               emitEvent: false,
//             });
//           } else {
//             this.isEditing =
//               true;

//             this.showAddressList =
//               false;

//             if (
//               this.canCreate
//             ) {
//               this.addressForm.enable({
//                 emitEvent:
//                   false,
//               });
//             } else {
//               this.addressForm.disable({
//                 emitEvent:
//                   false,
//               });
//             }

//             this.updateAddressValidators();
//           }

//           this.successMessage =
//             'Address deleted successfully.';

//           this.cdr.detectChanges();
//         },

//         error: (
//           error: unknown,
//         ) => {
//           console.error(
//             'Failed to delete address:',
//             error,
//           );

//           this.isSaving =
//             false;

//           this.errorMessage =
//             'Unable to delete address.';
//         },
//       });
//   }

//   // ========================================
//   // Labels
//   // ========================================

//   getReferenceLabel(
//     options:
//       CxpSelectOption[],

//     selectedValue:
//       CxpSelectPrimitive |
//       null,
//   ): string {
//     if (
//       selectedValue === null ||
//       selectedValue === undefined
//     ) {
//       return '—';
//     }

//     const option =
//       options.find(
//         (item) =>
//           String(item.value) ===
//           String(
//             selectedValue,
//           ),
//       );

//     return (
//       option?.label ??
//       '—'
//     );
//   }

//   getAddressLabel(
//     address:
//       EmployeeAddress,
//   ): string {
//     const scope =
//       this.getReferenceLabel(
//         this.addressScopeOptions,
//         address.scopeId,
//       );

//     if (scope !== '—') {
//       return scope;
//     }

//     return address.isPresent
//       ? 'Present Address'
//       : 'Address';
//   }

//   // ========================================
//   // Complete Address
//   // ========================================

//   getCompleteAddress(
//     address:
//       EmployeeAddress,
//   ): string {
//     const parts:
//       string[] = [];

//     if (
//       address.addressLine1
//     ) {
//       parts.push(
//         address.addressLine1,
//       );
//     }

//     if (
//       address.addressLine2
//     ) {
//       parts.push(
//         address.addressLine2,
//       );
//     }

//     // ======================================
//     // Philippine
//     // ======================================

//     if (
//       this.isPhilippineAddress(
//         address,
//       )
//     ) {
//       if (
//         address.barangayId !==
//         null
//       ) {
//         /*
//          * Barangays are loaded by API,
//          * therefore only display it when
//          * currently available.
//          */
//         const barangay =
//           this.getReferenceLabel(
//             this.barangayOptions,
//             address.barangayId,
//           );

//         if (
//           barangay !== '—'
//         ) {
//           parts.push(
//             barangay,
//           );
//         }
//       }

//       const city =
//         this.getReferenceLabel(
//           this.getCityOptionsForAddress(
//             address,
//           ),
//           address.cityId,
//         );

//       const province =
//         this.getReferenceLabel(
//           this.getProvinceOptionsForAddress(
//             address,
//           ),
//           address.provinceId,
//         );

//       const region =
//         this.getReferenceLabel(
//           this.getRegionOptionsForAddress(
//             address,
//           ),
//           address.regionId,
//         );

//       if (city !== '—') {
//         parts.push(city);
//       }

//       if (
//         province !== '—'
//       ) {
//         parts.push(
//           province,
//         );
//       }

//       if (
//         region !== '—'
//       ) {
//         parts.push(
//           region,
//         );
//       }
//     }

//     // ======================================
//     // International
//     // ======================================

//     else {
//       if (
//         address
//           .internationalSuburb
//       ) {
//         parts.push(
//           address
//             .internationalSuburb,
//         );
//       }

//       if (
//         address
//           .internationalCity
//       ) {
//         parts.push(
//           address
//             .internationalCity,
//         );
//       }

//       if (
//         address
//           .internationalProvince
//       ) {
//         parts.push(
//           address
//             .internationalProvince,
//         );
//       }

//       if (
//         address
//           .internationalStates
//       ) {
//         parts.push(
//           address
//             .internationalStates,
//         );
//       }

//       if (
//         address
//           .internationalRegion
//       ) {
//         parts.push(
//           address
//             .internationalRegion,
//         );
//       }
//     }

//     if (
//       address.zipCode
//     ) {
//       parts.push(
//         address.zipCode,
//       );
//     }

//     const country =
//       this.getCountryName(
//         address.countryId,
//       );

//     if (country) {
//       parts.push(
//         country,
//       );
//     }

//     return parts.join(
//       ', ',
//     );
//   }

//   // ========================================
//   // Country Helpers
//   // ========================================

//   private getCountryName(
//     countryId:
//       number | null,
//   ): string {
//     if (
//       countryId === null ||
//       !this.addressReferences
//     ) {
//       return '';
//     }

//     return (
//       this.addressReferences
//         .countries
//         .find(
//           (country) =>
//             country.id ===
//             countryId,
//         )
//         ?.countryName ??
//       ''
//     );
//   }

//   private isPhilippineAddress(
//     address:
//       EmployeeAddress,
//   ): boolean {
//     return (
//       this.getCountryName(
//         address.countryId,
//       )
//         .trim()
//         .toLowerCase() ===
//       'philippines'
//     );
//   }

//   // ========================================
//   // Address-specific Options
//   // ========================================

//   private getRegionOptionsForAddress(
//     address:
//       EmployeeAddress,
//   ): CxpSelectOption[] {
//     if (
//       !this.addressReferences ||
//       address.countryId === null
//     ) {
//       return [];
//     }

//     return this.toRegionOptions(
//       this.addressReferences
//         .regions
//         .filter(
//           (region) =>
//             region.countryId ===
//             address.countryId,
//         ),
//     );
//   }

//   private getProvinceOptionsForAddress(
//     address:
//       EmployeeAddress,
//   ): CxpSelectOption[] {
//     if (
//       !this.addressReferences ||
//       address.regionId === null
//     ) {
//       return [];
//     }

//     return this.toProvinceOptions(
//       this.addressReferences
//         .provinces
//         .filter(
//           (province) =>
//             province.regionId ===
//             address.regionId,
//         ),
//     );
//   }

//   private getCityOptionsForAddress(
//     address:
//       EmployeeAddress,
//   ): CxpSelectOption[] {
//     if (
//       !this.addressReferences ||
//       address.provinceId ===
//         null
//     ) {
//       return [];
//     }

//     return this.toCityOptions(
//       this.addressReferences
//         .cities
//         .filter(
//           (city) =>
//             city.provinceId ===
//             address.provinceId,
//         ),
//     );
//   }
// }
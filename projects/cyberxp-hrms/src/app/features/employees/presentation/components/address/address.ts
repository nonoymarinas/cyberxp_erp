import { Component } from '@angular/core';

import {
  CxpButton,
  CxpDisplayField,
  CxpIconAddressNav,
  CxpInputSelect,
  CxpInputText,
} from 'cyberxp-ui';

import type {
  CxpSelectOption,
  CxpSelectValue,
} from 'cyberxp-ui';

/* ========================================
   Address reference interfaces
   ======================================== */

interface RegionOption extends CxpSelectOption {
  countryId: string | null;
}

interface ProvinceOption extends CxpSelectOption {
  regionId: string | null;
}

interface CityOption extends CxpSelectOption {
  provinceId: string | null;
}

interface BarangayOption extends CxpSelectOption {
  cityId: string | null;
}

/* ========================================
   Employee address
   ======================================== */

interface EmployeeAddress {
  id: string | null;
  employeeId: string | null;

  countryId: string | null;
  regionId: string | null;
  provinceId: string | null;
  cityId: string | null;
  barangayId: string | null;

  addressLine1: string | null;
  addressLine2: string | null;
}

/* ========================================
   Component
   ======================================== */

@Component({
  selector: 'ams-address',
  standalone: true,
  imports: [
    CxpButton,
    CxpDisplayField,
    CxpIconAddressNav,
    CxpInputSelect,
    CxpInputText,
  ],
  templateUrl: './address.html',
  styleUrl: './address.css',
})
export class Address {
  isEditing = false;

  /* ========================================
     Country options
     ======================================== */

  readonly countryOptions: CxpSelectOption[] = [
    {
      value: '1',
      label: 'Philippines',
    },
    {
      value: '2',
      label: 'United States',
    },
  ];

  /* ========================================
     Region options
     ======================================== */

  readonly regionOptions: RegionOption[] = [
    {
      value: '1',
      countryId: '1',
      label: 'Western Visayas',
    },
    {
      value: '2',
      countryId: '1',
      label: 'Central Visayas',
    },
    {
      value: '3',
      countryId: '1',
      label: 'National Capital Region',
    },
    {
      value: '4',
      countryId: '2',
      label: 'California',
    },
  ];

  /* ========================================
     Province options
     ======================================== */

  readonly provinceOptions: ProvinceOption[] = [
    {
      value: '1',
      regionId: '1',
      label: 'Negros Occidental',
    },
    {
      value: '2',
      regionId: '1',
      label: 'Iloilo',
    },
    {
      value: '3',
      regionId: '2',
      label: 'Cebu',
    },
  ];

  /* ========================================
     City / municipality options
     ======================================== */

  readonly cityOptions: CityOption[] = [
    {
      value: '1',
      provinceId: '1',
      label: 'Kabankalan City',
    },
    {
      value: '2',
      provinceId: '1',
      label: 'Bacolod City',
    },
    {
      value: '3',
      provinceId: '2',
      label: 'Iloilo City',
    },
    {
      value: '4',
      provinceId: '3',
      label: 'Cebu City',
    },
  ];

  /* ========================================
     Barangay options
     ======================================== */

  readonly barangayOptions: BarangayOption[] = [
    {
      value: '1',
      cityId: '1',
      label: 'Daan Banua',
    },
    {
      value: '2',
      cityId: '1',
      label: 'Talubangi',
    },
    {
      value: '3',
      cityId: '2',
      label: 'Mansilingan',
    },
  ];

  /* ========================================
     Saved address sample data
     ======================================== */

  address: EmployeeAddress = {
    id: '100',
    employeeId: '100',

    countryId: '1',
    regionId: '1',
    provinceId: '1',
    cityId: '1',
    barangayId: '1',

    addressLine1: '123 Sample Street',
    addressLine2: 'Sample Subdivision',
  };

  /* ========================================
     Editable address copy
     ======================================== */

  editAddress: EmployeeAddress = {
    ...this.address,
  };

  /* ========================================
     Filtered region options
     ======================================== */

  get filteredRegionOptions(): CxpSelectOption[] {
    if (this.editAddress.countryId === null) {
      return [];
    }

    return this.regionOptions.filter(
      (region) =>
        region.countryId === this.editAddress.countryId
    );
  }

  /* ========================================
     Filtered province options
     ======================================== */

  get filteredProvinceOptions(): CxpSelectOption[] {
    if (this.editAddress.regionId === null) {
      return [];
    }

    return this.provinceOptions.filter(
      (province) =>
        province.regionId === this.editAddress.regionId
    );
  }

  /* ========================================
     Filtered city options
     ======================================== */

  get filteredCityOptions(): CxpSelectOption[] {
    if (this.editAddress.provinceId === null) {
      return [];
    }

    return this.cityOptions.filter(
      (city) =>
        city.provinceId === this.editAddress.provinceId
    );
  }

  /* ========================================
     Filtered barangay options
     ======================================== */

  get filteredBarangayOptions(): CxpSelectOption[] {
    if (this.editAddress.cityId === null) {
      return [];
    }

    return this.barangayOptions.filter(
      (barangay) =>
        barangay.cityId === this.editAddress.cityId
    );
  }

  /* ========================================
     Edit / save actions
     ======================================== */

  onEditSave(): void {
    if (this.isEditing) {
      this.saveAddress();
      return;
    }

    this.startEdit();
  }

  startEdit(): void {
    this.editAddress = {
      ...this.address,
    };

    this.isEditing = true;
  }

  cancelEdit(): void {
    this.editAddress = {
      ...this.address,
    };

    this.isEditing = false;
  }

  saveAddress(): void {
    this.address = {
      ...this.editAddress,
    };

    this.isEditing = false;

    console.log(
      'Saved employee address:',
      this.address
    );
  }

  /* ========================================
     Cascading select events
     ======================================== */

  onCountryChange(value: CxpSelectValue): void {
    this.editAddress.countryId =
      this.toStringOrNull(value);

    this.editAddress.regionId = null;
    this.editAddress.provinceId = null;
    this.editAddress.cityId = null;
    this.editAddress.barangayId = null;
  }

  onRegionChange(value: CxpSelectValue): void {
    this.editAddress.regionId =
      this.toStringOrNull(value);

    this.editAddress.provinceId = null;
    this.editAddress.cityId = null;
    this.editAddress.barangayId = null;
  }

  onProvinceChange(value: CxpSelectValue): void {
    this.editAddress.provinceId =
      this.toStringOrNull(value);

    this.editAddress.cityId = null;
    this.editAddress.barangayId = null;
  }

  onCityChange(value: CxpSelectValue): void {
    this.editAddress.cityId =
      this.toStringOrNull(value);

    this.editAddress.barangayId = null;
  }

  onBarangayChange(value: CxpSelectValue): void {
    this.editAddress.barangayId =
      this.toStringOrNull(value);
  }

  /* ========================================
     Convert select value
     ======================================== */

  private toStringOrNull(
    value: CxpSelectValue
  ): string | null {
    if (
      value === null ||
      value === undefined ||
      value === ''
    ) {
      return null;
    }

    return String(value);
  }

  /* ========================================
     Display reference label
     ======================================== */

  getReferenceLabel(
    options: CxpSelectOption[],
    selectedValue: string | null
  ): string {
    if (selectedValue === null) {
      return '—';
    }

    return (
      options.find(
        (option) =>
          String(option.value) === selectedValue
      )?.label ?? '—'
    );
  }
}

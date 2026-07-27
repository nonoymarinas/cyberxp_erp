import { Component } from '@angular/core';

import {
  CxpButton,
  CxpDisplayField,
  CxpIconAddressNav,
  CxpInputSelect,
  CxpInputText,
  CxpSelectValue,
} from 'cyberxp-ui';

/* ========================================
   General reference option
   ======================================== */

interface ReferenceOption {
  id: number;
  value: number;
  label: string;
}

/* ========================================
   Address reference interfaces
   ======================================== */

interface RegionOption extends ReferenceOption {
  countryId: number;
}

interface ProvinceOption extends ReferenceOption {
  regionId: number;
}

interface CityOption extends ReferenceOption {
  provinceId: number;
}

interface BarangayOption extends ReferenceOption {
  cityId: number;
}

/* ========================================
   Employee address
   ======================================== */

interface EmployeeAddress {
  id: number;
  employeeId: number;

  countryId: number | null;
  regionId: number | null;
  provinceId: number | null;
  cityId: number | null;
  barangayId: number | null;

  addressLine1: string;
  addressLine2: string;
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

  readonly countryOptions: ReferenceOption[] = [
    {
      id: 1,
      value: 1,
      label: 'Philippines',
    },
    {
      id: 2,
      value: 2,
      label: 'United States',
    },
  ];

  /* ========================================
     Region options
     ======================================== */

  readonly regionOptions: RegionOption[] = [
    {
      id: 1,
      value: 1,
      countryId: 1,
      label: 'Western Visayas',
    },
    {
      id: 2,
      value: 2,
      countryId: 1,
      label: 'Central Visayas',
    },
    {
      id: 3,
      value: 3,
      countryId: 1,
      label: 'National Capital Region',
    },
    {
      id: 4,
      value: 4,
      countryId: 2,
      label: 'California',
    },
  ];

  /* ========================================
     Province options
     ======================================== */

  readonly provinceOptions: ProvinceOption[] = [
    {
      id: 1,
      value: 1,
      regionId: 1,
      label: 'Negros Occidental',
    },
    {
      id: 2,
      value: 2,
      regionId: 1,
      label: 'Iloilo',
    },
    {
      id: 3,
      value: 3,
      regionId: 1,
      label: 'Capiz',
    },
    {
      id: 4,
      value: 4,
      regionId: 2,
      label: 'Cebu',
    },
    {
      id: 5,
      value: 5,
      regionId: 2,
      label: 'Bohol',
    },
    {
      id: 6,
      value: 6,
      regionId: 4,
      label: 'Los Angeles County',
    },
  ];

  /* ========================================
     City / municipality options
     ======================================== */

  readonly cityOptions: CityOption[] = [
    {
      id: 1,
      value: 1,
      provinceId: 1,
      label: 'Kabankalan City',
    },
    {
      id: 2,
      value: 2,
      provinceId: 1,
      label: 'Bacolod City',
    },
    {
      id: 3,
      value: 3,
      provinceId: 1,
      label: 'Himamaylan City',
    },
    {
      id: 4,
      value: 4,
      provinceId: 2,
      label: 'Iloilo City',
    },
    {
      id: 5,
      value: 5,
      provinceId: 2,
      label: 'Pototan',
    },
    {
      id: 6,
      value: 6,
      provinceId: 4,
      label: 'Cebu City',
    },
    {
      id: 7,
      value: 7,
      provinceId: 4,
      label: 'Lapu-Lapu City',
    },
    {
      id: 8,
      value: 8,
      provinceId: 6,
      label: 'Los Angeles',
    },
  ];

  /* ========================================
     Barangay options
     ======================================== */

  readonly barangayOptions: BarangayOption[] = [
    {
      id: 1,
      value: 1,
      cityId: 1,
      label: 'Daan Banua',
    },
    {
      id: 2,
      value: 2,
      cityId: 1,
      label: 'Talubangi',
    },
    {
      id: 3,
      value: 3,
      cityId: 1,
      label: 'Hilamonan',
    },
    {
      id: 4,
      value: 4,
      cityId: 2,
      label: 'Barangay 1',
    },
    {
      id: 5,
      value: 5,
      cityId: 2,
      label: 'Barangay 2',
    },
    {
      id: 6,
      value: 6,
      cityId: 4,
      label: 'Jaro',
    },
    {
      id: 7,
      value: 7,
      cityId: 4,
      label: 'Mandurriao',
    },
    {
      id: 8,
      value: 8,
      cityId: 6,
      label: 'Lahug',
    },
  ];

  /* ========================================
     Saved address sample data
     ======================================== */

  address: EmployeeAddress = {
    id: 5001,
    employeeId: 1001,

    countryId: 1,
    regionId: 1,
    provinceId: 1,
    cityId: 1,
    barangayId: 1,

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

  get filteredRegionOptions(): ReferenceOption[] {
    if (this.editAddress.countryId === null) {
      return [];
    }

    return this.regionOptions.filter(
      (region) => region.countryId === this.editAddress.countryId,
    );
  }

  /* ========================================
     Filtered province options
     ======================================== */

  get filteredProvinceOptions(): ReferenceOption[] {
    if (this.editAddress.regionId === null) {
      return [];
    }

    return this.provinceOptions.filter(
      (province) => province.regionId === this.editAddress.regionId,
    );
  }

  /* ========================================
     Filtered city options
     ======================================== */

  get filteredCityOptions(): ReferenceOption[] {
    if (this.editAddress.provinceId === null) {
      return [];
    }

    return this.cityOptions.filter(
      (city) => city.provinceId === this.editAddress.provinceId,
    );
  }

  /* ========================================
     Filtered barangay options
     ======================================== */

  get filteredBarangayOptions(): ReferenceOption[] {
    if (this.editAddress.cityId === null) {
      return [];
    }

    return this.barangayOptions.filter(
      (barangay) => barangay.cityId === this.editAddress.cityId,
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

    console.log('Saved employee address:', this.address);
  }

  /* ========================================
     Cascading select events
     ======================================== */

  onCountryChange(value: CxpSelectValue): void {
    this.editAddress.countryId = this.toNumberOrNull(value);

    this.editAddress.regionId = null;
    this.editAddress.provinceId = null;
    this.editAddress.cityId = null;
    this.editAddress.barangayId = null;
  }

  onRegionChange(value: CxpSelectValue): void {
    this.editAddress.regionId = this.toNumberOrNull(value);

    this.editAddress.provinceId = null;
    this.editAddress.cityId = null;
    this.editAddress.barangayId = null;
  }

  onProvinceChange(value: CxpSelectValue): void {
    this.editAddress.provinceId = this.toNumberOrNull(value);

    this.editAddress.cityId = null;
    this.editAddress.barangayId = null;
  }

  onCityChange(value: CxpSelectValue): void {
    this.editAddress.cityId = this.toNumberOrNull(value);

    this.editAddress.barangayId = null;
  }

  onBarangayChange(value: CxpSelectValue): void {
    this.editAddress.barangayId = this.toNumberOrNull(value);
  }

  /* ========================================
     Convert select value
     ======================================== */

  private toNumberOrNull(value: CxpSelectValue): number | null {
    if (value === null || value === undefined || value === '') {
      return null;
    }

    const numericValue = Number(value);

    if (!Number.isFinite(numericValue)) {
      return null;
    }

    return numericValue;
  }

  /* ========================================
     Display reference label
     ======================================== */

  getReferenceLabel(
    options: ReferenceOption[],
    selectedId: number | null,
  ): string {
    if (selectedId === null) {
      return '—';
    }

    return options.find((option) => option.id === selectedId)?.label ?? '—';
  }
}
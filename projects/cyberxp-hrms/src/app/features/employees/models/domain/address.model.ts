export interface EmployeeAddress {
  countryId: number | null;

  regionId: number | null;
  provinceId: number | null;
  cityId: number | null;
  barangayId: number | null;

  foreignStateProvinceRegion:
    string | null;

  foreignCity:
    string | null;

  addressLine1: string;

  addressLine2:
    string | null;

  zipCode:
    string | null;

  scopeId:
    number | null;

  isPresent:
    boolean;
}

export interface SaveAddressRequest {
  countryId: number | null;

  regionId: number | null;
  provinceId: number | null;
  cityId: number | null;
  barangayId: number | null;

  foreignStateProvinceRegion:
    string | null;

  foreignCity:
    string | null;

  addressLine1: string;

  addressLine2:
    string | null;

  zipCode:
    string | null;

  scopeId:
    number | null;

  isPresent:
    boolean;
}
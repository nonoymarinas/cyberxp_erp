import { PersonalInfo } from '../personal-info/personal-info.model';
import { Address } from '../address/address.model';
import { Contact } from '../contacts/contact.model';
import { EmergencyContactPerson } from '../emergency-contacts/emergency-contact.model';
// new-employee.model.ts

export interface NewEmployee {
  employeeGuid: string | null;
  employeeNumber: string | null;
  personalInfo: PersonalInfo | null;
  addresses: Address[];
  contacts:Contact[]
  emergencyContactPerson: EmergencyContactPerson;
  employmentInformation: NewEmployeeEmployment | null;
  governmentInformation: NewEmployeeGovernmentInformation | null;
}

// ============================================================
// PERSONAL INFORMATION
// ============================================================

export interface NewEmployeePersonalInfo {
  firstName: string;
  middleName: string | null;
  lastName: string;

  suffixId: string | null;
  dateOfBirth: string;

  genderId: string | null;
  civilStatusId: string | null;

  imageUrl: string | null;
}

// ============================================================
// ADDRESS
// ============================================================

export interface NewEmployeeAddress {
  scopeId: string | null;

  countryId: number | null;
  regionId: number | null;
  provinceId: number | null;
  cityId: number | null;
  barangayId: number | null;

  internationalRegion: string | null;
  internationalStates: string | null;
  internationalProvince: string | null;
  internationalCity: string | null;
  internationalSuburb: string | null;

  addressLine1: string | null;
  addressLine2: string | null;

  zipCode: string | null;

  isPresent: boolean | null;
}

// ============================================================
// CONTACT
// ============================================================

export interface NewEmployeeContact {
  contactTypeId: string | null;
  contactScopeId: string | null;

  value: string | null;

  isPrimary: boolean | null;
}

// ============================================================
// EMERGENCY CONTACT
// ============================================================

export interface NewEmployeeEmergencyContact {
  firstName: string;
  middleName: string | null;
  lastName: string;

  relationshipId: string | null;

  contacts: NewEmployeeEmergencyContactContact[];

  addresses: NewEmployeeEmergencyContactAddress[];
}

export interface NewEmployeeEmergencyContactContact {
  contactTypeId: string | null;
  contactScopeId: string | null;

  value: string | null;

  isPrimary: boolean | null;
}

export interface NewEmployeeEmergencyContactAddress {
  scopeId: string | null;

  countryId: number | null;
  regionId: number | null;
  provinceId: number | null;
  cityId: number | null;
  barangayId: number | null;

  internationalRegion: string | null;
  internationalStates: string | null;
  internationalProvince: string | null;
  internationalCity: string | null;
  internationalSuburb: string | null;

  addressLine1: string | null;
  addressLine2: string | null;

  zipCode: string | null;
}

// ============================================================
// EMPLOYMENT
// ============================================================

export interface NewEmployeeEmployment {
  departmentId: string | null;
  positionId: string | null;

  employmentTypeId: string | null;
  employmentStatusId: string | null;

  workLocationId: string | null;

  dateHired: string | null;
}

// ============================================================
// GOVERNMENT INFORMATION
// ============================================================

export interface NewEmployeeGovernmentInformation {
  sssNumber: string | null;
  philHealthNumber: string | null;
  pagIbigNumber: string | null;
  tinNumber: string | null;
}

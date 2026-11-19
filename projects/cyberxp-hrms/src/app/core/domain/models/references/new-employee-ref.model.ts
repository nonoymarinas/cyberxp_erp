
import type {
  ApiResponse,
} from '../../../../shared/models/api-response.model';

import type {
  ReferenceItem,
} from '../../../../shared/models/reference-item.model';

// ========================================
// New Employee Reference Data Model
// ========================================

export interface NewEmployeeRefData {

  // ======================================
  // Personal Information
  // ======================================

  genders: ReferenceItem<string>[];
  civilStatuses: ReferenceItem<string>[];
  suffixes: ReferenceItem<string>[];

  // ======================================
  // Organization
  // ======================================

  departments: ReferenceItem<string>[];
  positions: ReferenceItem<string>[];

  // ======================================
  // Employment
  // ======================================

  employmentStatuses: ReferenceItem<string>[];
  employmentSeparationTypes: ReferenceItem<string>[];
  employmentClearanceStatuses: ReferenceItem<string>[];

  // ======================================
  // Address
  // ======================================

  addressTypes: ReferenceItem<string>[];

  // ======================================
  // Contacts
  // ======================================

  contactTypes: ReferenceItem<string>[];
  contactScopes: ReferenceItem<string>[];

  // ======================================
  // Person Matching
  // ======================================

  workFlowStatuses: ReferenceItem<string>[];
  personMatchDecisionTypes: ReferenceItem<string>[];

  // ======================================
  // Person Restrictions
  // ======================================

  personRestrictionStatuses: ReferenceItem<string>[];

  // ======================================
  // Rehire
  // ======================================

  rehireRequestStatuses: ReferenceItem<string>[];
  rehireEligibilityStatuses: ReferenceItem<string>[];
}

// ========================================
// New Employee Reference API Response
// ========================================

export type NewEmployeeRefApiResponse =
  ApiResponse<NewEmployeeRefData>;

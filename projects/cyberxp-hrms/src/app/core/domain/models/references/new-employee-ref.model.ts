
import type {
  ApiResponse,
} from '../../../../shared/models/api-response.model';

import type {
  ReferenceItem,
} from '../../../../shared/models/reference-item.model';

/* ========================================
   New Employee Reference Data Model
   ======================================== */

export interface NewEmployeeRefData {

  // ======================================
  // Personal Information References
  // ======================================

  genders: ReferenceItem<string>[];
  civilStatuses: ReferenceItem<string>[];
  suffixes: ReferenceItem<string>[];

  // ======================================
  // Employment References
  // ======================================

  departments: ReferenceItem<string>[];
  positions: ReferenceItem<string>[];
  employmentStatuses: ReferenceItem<string>[];
  branches: ReferenceItem<string>[];

  // ======================================
  // Employment Separation References
  // ======================================

  employmentSeparationTypes: ReferenceItem<string>[];
  employmentClearanceStatuses: ReferenceItem<string>[];

  // ======================================
  // Address References
  // ======================================

  addressTypes: ReferenceItem<string>[];

  // ======================================
  // Contact References
  // ======================================

  contactMediumTypes: ReferenceItem<string>[];
  contactContextTypes: ReferenceItem<string>[];

  // ======================================
  // Person Match References
  // ======================================

  personMatchLevels: ReferenceItem<string>[];
  workFlowStatuses: ReferenceItem<string>[];
  matchDecisionTypes: ReferenceItem<string>[];

  // ======================================
  // Person Restriction References
  // ======================================

  personRestrictionTypes: ReferenceItem<string>[];
  personRestrictionStatuses: ReferenceItem<string>[];

  // ======================================
  // Rehire References
  // ======================================

  rehireRequestStatuses: ReferenceItem<string>[];
  rehireEligibilityStatuses: ReferenceItem<string>[];
}

/* ========================================
   New Employee Reference API Response
   ======================================== */

export type NewEmployeeRefApiResponse =
  ApiResponse<NewEmployeeRefData>;

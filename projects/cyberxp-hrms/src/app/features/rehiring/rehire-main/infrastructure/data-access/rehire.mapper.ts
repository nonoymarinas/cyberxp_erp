
/* ========================================
   Rehire Mapper
   ======================================== */

// ========================================
// Employee Application Models
// ========================================

import type {
  RehireEmployee,
  RehireEmployeeResult,
  RehireEmployeeResultData,
} from '../../domain/models/rehire-employee.model';

// ========================================
// Employee DTO Models
// ========================================

import type {
  RehireEmployeeDto,
  RehireEmployeeResultDto,
  RehireEmployeeApiResultDto,
} from '../../domain/models/rehire-employee.dto.model';

// ========================================
// Eligibility Application Models
// ========================================

import type {
  RehireEligibilityResult,
  RehireEligibilityResultData,
} from '../../domain/models/rehire-eligibility-result.model';

// ========================================
// Eligibility DTO Models
// ========================================

import type {
  RehireEligibilityResultDto,
  RehireEligibilityApiResultDto,
} from '../../domain/models/rehire-eligibility-result.dto.model';

// ========================================
// Rehire Submission Application Models
// ========================================

import type {
  RehireResult,
  RehireResultData,
} from '../../domain/models/rehire-result.model';

// ========================================
// Rehire Submission DTO Models
// ========================================

import type {
  RehireResultDto,
  RehireApiResultDto,
} from '../../domain/models/rehire-result.dto.model';

// ========================================
// Map Rehire Employee DTO
// ========================================

export function mapRehireEmployee(
  dto: RehireEmployeeDto
): RehireEmployee {

  return {

    // ==================================
    // Person Identity
    // ==================================

    personGuid: dto.personGuid,
    personNumber: dto.personNumber,
    employeeNumber: dto.employeeNumber,

    // ==================================
    // Personal Information
    // ==================================

    firstName: dto.firstName,
    middleName: dto.middleName,
    lastName: dto.lastName,
    fullName: dto.fullName,

    dateOfBirth: dto.dateOfBirth,
    imageUrl: dto.imageUrl,

    gender: dto.gender,
    civilStatus: dto.civilStatus,

    // ==================================
    // Contact Information
    // ==================================

    email: dto.email,
    mobile: dto.mobile,
    address: dto.address,
    emergencyContact: dto.emergencyContact,

    // ==================================
    // Employment Status
    // ==================================

    employmentStatus: dto.employmentStatus,

    // ==================================
    // Previous Employment
    // ==================================

    previousEmploymentGuid:
      dto.previousEmploymentGuid,

    previousDepartment:
      dto.previousDepartment,

    previousPosition:
      dto.previousPosition,

    previousWorkLocation:
      dto.previousWorkLocation,

    previousEmploymentType:
      dto.previousEmploymentType,

    previousHireDate:
      dto.previousHireDate,

    // ==================================
    // Separation Information
    // ==================================

    separationDate:
      dto.separationDate,

    separationReason:
      dto.separationReason,

    clearanceStatus:
      dto.clearanceStatus,
  };
}

// ========================================
// Map Rehire Employee Result Data
// ========================================

export function mapRehireEmployeeResultData(
  dto: RehireEmployeeResultDto
): RehireEmployeeResultData {

  return {
    employee: mapRehireEmployee(
      dto.employee
    ),
  };
}

// ========================================
// Map Rehire Employee API Response
// ========================================

export function mapRehireEmployeeApiResponse(
  response: RehireEmployeeApiResultDto
): RehireEmployeeResult {

  if (!response.success || !response.data?.employee) {

    throw new Error(
      response.message ||
      'Unable to retrieve rehire employee.'
    );
  }

  return {
    ...response,
    data: mapRehireEmployeeResultData(
      response.data
    ),
  };
}

// ========================================
// Map Rehire Eligibility DTO
// ========================================

export function mapRehireEligibilityResultData(
  dto: RehireEligibilityResultDto
): RehireEligibilityResultData {

  return {

    // ==================================
    // Person and Employment
    // ==================================

    personGuid:
      dto.personGuid,

    employmentGuid:
      dto.employmentGuid,

    // ==================================
    // Eligibility Status
    // ==================================

    eligibilityStatus:
      dto.eligibilityStatus,

    // ==================================
    // Eligibility Verification
    // ==================================

    isBlocklisted:
      dto.isBlocklisted,

    clearanceStatus:
      dto.clearanceStatus,

    // ==================================
    // Eligibility Reasons
    // ==================================

    reasons: [...dto.reasons],

    // ==================================
    // Approval Requirements
    // ==================================

    requiresApproval:
      dto.requiresApproval,

    canProceed:
      dto.canProceed,

    // ==================================
    // Verification Timestamp
    // ==================================

    verifiedAt:
      dto.verifiedAt,
  };
}

// ========================================
// Map Rehire Eligibility API Response
// ========================================

export function mapRehireEligibilityApiResponse(
  response: RehireEligibilityApiResultDto
): RehireEligibilityResult {

  if (!response.success || !response.data) {

    throw new Error(
      response.message ||
      'Unable to verify rehire eligibility.'
    );
  }

  return {
    ...response,
    data: mapRehireEligibilityResultData(
      response.data
    ),
  };
}

// ========================================
// Map Rehire Submission DTO
// ========================================

export function mapRehireResultData(
  dto: RehireResultDto
): RehireResultData {

  return {

    // ==================================
    // Request Identification
    // ==================================

    rehireRequestGuid:
      dto.rehireRequestGuid,

    rehireRequestNumber:
      dto.rehireRequestNumber,

    // ==================================
    // Person and Employment
    // ==================================

    personGuid:
      dto.personGuid,

    previousEmploymentGuid:
      dto.previousEmploymentGuid,

    // ==================================
    // Request Status
    // ==================================

    status:
      dto.status,

    // ==================================
    // Request and Decision Dates
    // ==================================

    requestedAt:
      dto.requestedAt,

    approvedAt:
      dto.approvedAt,

    rejectedAt:
      dto.rejectedAt,

    // ==================================
    // Remarks
    // ==================================

    remarks:
      dto.remarks,
  };
}

// ========================================
// Map Rehire Submission API Response
// ========================================

export function mapRehireApiResponse(
  response: RehireApiResultDto
): RehireResult {

  if (!response.success || !response.data) {

    throw new Error(
      response.message ||
      'Unable to submit rehire request.'
    );
  }

  return {
    ...response,
    data: mapRehireResultData(
      response.data
    ),
  };
}


import {
  Observable,
  defer,
  of,
  delay,
  throwError,
} from 'rxjs';

// ========================================
// Rehire Domain Models
// ========================================

import type {
  RehireRequest,
} from '../../../../features/rehiring/rehire/domain/models/rehire-request.model';

import type {
  RehireEmployeeDto,
  RehireEmployeeResultDto,
  RehireEmployeeApiResultDto,
} from '../../../../features/rehiring/rehire/domain/models/rehire-employee.dto.model';

import type {
  RehireEligibilityResultDto,
  RehireEligibilityApiResultDto,
  RehireEligibilityStatusDto,
} from '../../../../features/rehiring/rehire/domain/models/rehire-eligibility-result.dto.model';

import type {
  RehireResultDto,
  RehireApiResultDto,
} from '../../../../features/rehiring/rehire/domain/models/rehire-result.dto.model';

// ========================================
// Shared Mock Repositories
// ========================================

import {
  findMockRehireCandidate,
  hasMockPendingRehireRequest,
  saveMockRehireRequest,
} from '../repository/rehire.mock-repository';

import type {
  MockRehireCandidateRecord,
} from '../repository/rehire.mock-repository';

import {
  findMockEmploymentByGuid,
} from '../repository/employment.mock-repository';

import type {
  MockRehireRequestRecord,
} from '../data/rehire-request.mock-data';

// ========================================
// Configuration
// ========================================

const MOCK_API_DELAY = 500;

// ========================================
// Build Full Name
// ========================================

function buildFullName(
  firstName: string,
  middleName: string,
  lastName: string
): string {

  return [
    firstName,
    middleName,
    lastName,
  ]
    .filter(Boolean)
    .join(' ');
}

// ========================================
// Validate Person GUID
// ========================================

function validatePersonGuid(
  personGuid: string
): string | null {

  if (
    typeof personGuid !== 'string' ||
    !personGuid.trim()
  ) {
    return 'Person GUID is required.';
  }

  return null;
}

// ========================================
// Map Candidate To Employee DTO
// ========================================

function mapRehireEmployeeDto(
  candidate: MockRehireCandidateRecord
): RehireEmployeeDto {

  const {
    person,
    profile,
    employment,
    separation,
  } = candidate;

  if (!employment) {
    throw new Error(
      'No previous employment record found.'
    );
  }

  return {
    // ====================================
    // Person Identity
    // ====================================

    personGuid: person.personGuid,
    personNumber: person.personNumber,
    employeeNumber: employment.employeeNumber,

    firstName: person.firstName,
    middleName: person.middleName,
    lastName: person.lastName,

    fullName: buildFullName(
      person.firstName,
      person.middleName,
      person.lastName
    ),

    dateOfBirth: person.dateOfBirth,
    imageUrl: person.imageUrl,

    // ====================================
    // Profile Information
    // ====================================

    gender: profile?.gender ?? null,
    civilStatus: profile?.civilStatus ?? null,

    email: profile?.email ?? null,
    mobile: profile?.mobile ?? null,

    address: profile?.address ?? null,
    emergencyContact:
      profile?.emergencyContact ?? null,

    // ====================================
    // Previous Employment
    // ====================================

    employmentStatus: employment.status,

    previousDepartment:
      employment.departmentName,

    previousPosition:
      employment.positionName,

    previousWorkLocation:
      employment.workLocationName,

    previousEmploymentType:
      employment.employmentType,

    previousHireDate:
      employment.hireDate,

    // ====================================
    // Separation
    // ====================================

    separationDate:
      separation?.effectiveDate ??
      employment.separationDate,

    separationReason:
      separation?.reason ??
      employment.separationReason,

    clearanceStatus:
      separation?.clearanceStatus ?? null,
  };
}

// ========================================
// Evaluate Rehire Eligibility
// ========================================

function evaluateRehireEligibility(
  candidate: MockRehireCandidateRecord
): RehireEligibilityResultDto {

  const {
    person,
    employment,
    separation,
    restrictions,
    isBlocklisted,
    hasActiveEmployment,
    hasPendingRehireRequest,
  } = candidate;

  const reasons: string[] = [];

  let eligibilityStatus:
    RehireEligibilityStatusDto = 'ELIGIBLE';

  // ======================================
  // Check Previous Employment
  // ======================================

  if (!employment) {
    eligibilityStatus = 'NOT_ELIGIBLE';

    reasons.push(
      'No previous employment record exists.'
    );
  }

  // ======================================
  // Check Active Employment
  // ======================================

  if (hasActiveEmployment) {
    eligibilityStatus = 'NOT_ELIGIBLE';

    reasons.push(
      'Person currently has an active employment record.'
    );
  }

  // ======================================
  // Check Blocklist
  // ======================================

  if (isBlocklisted) {
    eligibilityStatus = 'NOT_ELIGIBLE';

    reasons.push(
      'Person has an active blocklist restriction.'
    );
  }

  // ======================================
  // Check Pending Rehire Request
  // ======================================

  if (hasPendingRehireRequest) {
    eligibilityStatus = 'NOT_ELIGIBLE';

    reasons.push(
      'A pending rehire request already exists.'
    );
  }

  // ======================================
  // Check Other Active Restrictions
  // ======================================

  const otherRestrictions = restrictions.filter(
    restriction =>
      restriction.restrictionType !== 'BLOCKLIST'
  );

  if (
    otherRestrictions.length > 0 &&
    eligibilityStatus !== 'NOT_ELIGIBLE'
  ) {
    eligibilityStatus = 'REVIEW_REQUIRED';

    reasons.push(
      'Active HR restrictions require review.'
    );
  }

  // ======================================
  // Check Separation Clearance
  // ======================================

  if (
    employment &&
    employment.status !== 'ACTIVE' &&
    !separation
  ) {
    eligibilityStatus = 'NOT_ELIGIBLE';

    reasons.push(
      'Previous employment separation record is missing.'
    );
  }

  if (
    separation &&
    separation.clearanceStatus !== 'CLEARED' &&
    eligibilityStatus === 'ELIGIBLE'
  ) {
    eligibilityStatus = 'REVIEW_REQUIRED';

    reasons.push(
      'Previous employment clearance is not complete.'
    );
  }

  // ======================================
  // Check Termination And Retirement
  // ======================================

  if (
    employment?.status === 'TERMINATED' ||
    employment?.status === 'RETIRED'
  ) {
    if (eligibilityStatus === 'ELIGIBLE') {
      eligibilityStatus = 'REVIEW_REQUIRED';
    }

    reasons.push(
      'Previous employment status requires management review.'
    );
  }

  // ======================================
  // Calculate Workflow Permissions
  // ======================================

  const canProceed =
    eligibilityStatus === 'ELIGIBLE';

  const requiresApproval =
    eligibilityStatus === 'REVIEW_REQUIRED';

  // ======================================
  // Build Eligibility DTO
  // ======================================

  return {
    personGuid: person.personGuid,

    employmentGuid:
      employment?.employmentGuid ?? '',

    eligibilityStatus,

    isBlocklisted,

    clearanceStatus:
      separation?.clearanceStatus ?? null,

    reasons,

    requiresApproval,
    canProceed,

    verifiedAt: new Date().toISOString(),
  };
}

// ========================================
// Get Rehire Employee Mock API
// ========================================

export function getRehireEmployeeMockApi(
  personGuid: string
): Observable<RehireEmployeeApiResultDto> {

  return defer(() => {

    // ======================================
    // Validate Person GUID
    // ======================================

    const validationError =
      validatePersonGuid(personGuid);

    if (validationError) {
      return throwError(() =>
        new Error(validationError)
      );
    }

    // ======================================
    // Find Rehire Candidate
    // ======================================

    const candidate =
      findMockRehireCandidate(personGuid);

    if (!candidate) {
      return throwError(() =>
        new Error(
          `Person not found: ${personGuid}`
        )
      );
    }

    // ======================================
    // Validate Employment
    // ======================================

    if (!candidate.employment) {
      return throwError(() =>
        new Error(
          'No previous employment record found.'
        )
      );
    }

    // ======================================
    // Map Employee DTO
    // ======================================

    const employee = mapRehireEmployeeDto(
      candidate
    );

    const data: RehireEmployeeResultDto = {
      employee,
    };

    // ======================================
    // Build API Response
    // ======================================

    const response: RehireEmployeeApiResultDto = {
      success: true,
      message: 'Rehire employee retrieved successfully.',
      errorCode: null,
      data,
    };

    return of(response);

  }).pipe(
    delay(MOCK_API_DELAY)
  );
}

// ========================================
// Check Rehire Eligibility Mock API
// ========================================

export function checkRehireEligibilityMockApi(
  personGuid: string
): Observable<RehireEligibilityApiResultDto> {

  return defer(() => {

    // ======================================
    // Validate Person GUID
    // ======================================

    const validationError =
      validatePersonGuid(personGuid);

    if (validationError) {
      return throwError(() =>
        new Error(validationError)
      );
    }

    // ======================================
    // Find Candidate
    // ======================================

    const candidate =
      findMockRehireCandidate(personGuid);

    if (!candidate) {
      return throwError(() =>
        new Error(
          `Person not found: ${personGuid}`
        )
      );
    }

    // ======================================
    // Evaluate Eligibility
    // ======================================

    const eligibility =
      evaluateRehireEligibility(candidate);

    // ======================================
    // Build API Response
    // ======================================

    const response: RehireEligibilityApiResultDto = {
      success: true,
      message: 'Rehire eligibility verification completed.',
      errorCode: null,
      data: eligibility,
    };

    return of(response);

  }).pipe(
    delay(MOCK_API_DELAY)
  );
}

// ========================================
// Validate Rehire Request
// ========================================

function validateRehireRequest(
  request: RehireRequest
): string | null {

  if (!request.personGuid?.trim()) {
    return 'Person GUID is required.';
  }

  if (!request.previousEmploymentGuid?.trim()) {
    return 'Previous employment GUID is required.';
  }

  if (!request.departmentId?.trim()) {
    return 'Department is required.';
  }

  if (!request.positionId?.trim()) {
    return 'Position is required.';
  }

  if (!request.workLocationId?.trim()) {
    return 'Work location is required.';
  }

  if (!request.employmentType?.trim()) {
    return 'Employment type is required.';
  }

  if (
    !request.startDate ||
    !/^\d{4}-\d{2}-\d{2}$/.test(request.startDate) ||
    Number.isNaN(
      Date.parse(`${request.startDate}T00:00:00Z`)
    )
  ) {
    return 'A valid employment start date is required.';
  }

  if (!request.profileVerified) {
    return 'Employee profile must be verified.';
  }

  if (
    !request.justification?.trim() ||
    request.justification.trim().length < 10
  ) {
    return 'Rehire justification must contain at least 10 characters.';
  }

  return null;
}

// ========================================
// Generate Mock Rehire Request Identity
// ========================================

function generateMockRehireIdentity(): {
  rehireRequestGuid: string;
  rehireRequestNumber: string;
} {

  const uniqueId = crypto.randomUUID();

  const number = Date.now().toString();

  return {
    rehireRequestGuid: uniqueId,
    rehireRequestNumber: `RHR${number}`,
  };
}

// ========================================
// Submit Rehire Mock API
// ========================================

export function submitRehireMockApi(
  request: RehireRequest
): Observable<RehireApiResultDto> {

  return defer(() => {

    // ======================================
    // Validate Request
    // ======================================

    const validationError =
      validateRehireRequest(request);

    if (validationError) {
      return throwError(() =>
        new Error(validationError)
      );
    }

    // ======================================
    // Find Candidate
    // ======================================

    const candidate =
      findMockRehireCandidate(
        request.personGuid
      );

    if (!candidate) {
      return throwError(() =>
        new Error(
          'Selected person does not exist.'
        )
      );
    }

    // ======================================
    // Verify Previous Employment
    // ======================================

    const previousEmployment =
      findMockEmploymentByGuid(
        request.previousEmploymentGuid
      );

    if (
      !previousEmployment ||
      previousEmployment.personGuid !==
        request.personGuid
    ) {
      return throwError(() =>
        new Error(
          'Previous employment does not belong to the selected person.'
        )
      );
    }

    if (
      candidate.employment?.employmentGuid !==
      request.previousEmploymentGuid
    ) {
      return throwError(() =>
        new Error(
          'Previous employment is not the latest employment record.'
        )
      );
    }

    // ======================================
    // Recheck Eligibility
    // ======================================

    const eligibility =
      evaluateRehireEligibility(candidate);

    if (!eligibility.canProceed) {
      return throwError(() =>
        new Error(
          `Rehire request cannot proceed: ${eligibility.reasons.join(' ')}`
        )
      );
    }

    // ======================================
    // Prevent Duplicate Pending Requests
    // ======================================

    if (
      hasMockPendingRehireRequest(
        request.personGuid
      )
    ) {
      return throwError(() =>
        new Error(
          'A pending rehire request already exists.'
        )
      );
    }

    // ======================================
    // Generate Request Identity
    // ======================================

    const identity =
      generateMockRehireIdentity();

    const requestedAt =
      new Date().toISOString();

    // ======================================
    // Build Mock Request Record
    // ======================================

    const mockRecord: MockRehireRequestRecord = {
      rehireRequestGuid:
        identity.rehireRequestGuid,

      rehireRequestNumber:
        identity.rehireRequestNumber,

      personGuid: request.personGuid,

      previousEmploymentGuid:
        request.previousEmploymentGuid,

      departmentId: request.departmentId,
      positionId: request.positionId,
      workLocationId: request.workLocationId,

      employmentType: request.employmentType,
      startDate: request.startDate,

      profileVerified:
        request.profileVerified,

      justification:
        request.justification.trim(),

      status: 'PENDING_APPROVAL',

      requestedAt,
      approvedAt: null,
      rejectedAt: null,

      remarks: null,
    };

    // ======================================
    // Save Mock Rehire Request
    // ======================================

    const saved =
      saveMockRehireRequest(mockRecord);

    // ======================================
    // Map Result DTO
    // ======================================

    const data: RehireResultDto = {
      rehireRequestGuid:
        saved.rehireRequestGuid,

      rehireRequestNumber:
        saved.rehireRequestNumber,

      personGuid: saved.personGuid,

      previousEmploymentGuid:
        saved.previousEmploymentGuid,

      status: saved.status,

      requestedAt: saved.requestedAt,
      approvedAt: saved.approvedAt,
      rejectedAt: saved.rejectedAt,

      remarks: saved.remarks,
    };

    // ======================================
    // Build API Response
    // ======================================

    const response: RehireApiResultDto = {
      success: true,
      message: 'Rehire request submitted successfully.',
      errorCode: null,
      data,
    };

    return of(response);

  }).pipe(
    delay(MOCK_API_DELAY)
  );
}


import {
  Observable,
  defer,
  of,
  delay,
  throwError,
} from 'rxjs';

// ========================================
// Request Model
// ========================================

import type {
  RehireSearchRequest,
} from '../../../../features/rehiring/search/domain/models/rehire-search-request.model';

// ========================================
// Result DTO Models
// ========================================

import type {
  RehireSearchEmployeeDto,
  RehireSearchResultDto,
  RehireSearchApiResultDto,
} from '../../../../features/rehiring/search/domain/models/rehire-search-result.dto.model';

// ========================================
// Shared Mock Repository
// ========================================

import {
  searchMockFormerEmployees,
} from '../repository/rehire-search.mock-repository';

import type {
  MockFormerEmployeeRecord,
} from '../repository/rehire-search.mock-repository';

// ========================================
// Employment Mock Types
// ========================================

import type {
  MockEmploymentStatus,
} from '../data/employment.mock-data';

// ========================================
// Configuration
// ========================================

const MOCK_API_DELAY = 500;

const MAX_PAGE_SIZE = 100;

// ========================================
// Allowed Employment Status Filters
// ========================================

const ALLOWED_EMPLOYMENT_STATUSES = [
  'RESIGNED',
  'TERMINATED',
  'RETIRED',
  'END_OF_CONTRACT',
] as const satisfies readonly MockEmploymentStatus[];

// ========================================
// Employment Status Type Guard
// ========================================

function isFormerEmploymentStatus(
  value: string
): value is Exclude<MockEmploymentStatus, 'ACTIVE'> {

  return (
    ALLOWED_EMPLOYMENT_STATUSES as readonly string[]
  ).includes(value);
}

// ========================================
// Validate Search Request
// ========================================

function validateSearchRequest(
  request: RehireSearchRequest
): string | null {

  // ======================================
  // Validate Keyword
  // ======================================

  if (typeof request.keyword !== 'string') {
    return 'Search keyword must be a string.';
  }

  if (!request.keyword.trim()) {
    return 'Search keyword is required.';
  }

  // ======================================
  // Validate Pagination
  // ======================================

  if (
    !Number.isInteger(request.pageNumber) ||
    request.pageNumber < 1
  ) {
    return 'Page number must be at least 1.';
  }

  if (
    !Number.isInteger(request.pageSize) ||
    request.pageSize < 1 ||
    request.pageSize > MAX_PAGE_SIZE
  ) {
    return `Page size must be between 1 and ${MAX_PAGE_SIZE}.`;
  }

  // ======================================
  // Validate Employment Status
  // ======================================

  const status = request.employmentStatus;

  if (
    status != null &&
    status !== '' &&
    !isFormerEmploymentStatus(status)
  ) {
    return 'Invalid former employment status filter.';
  }

  return null;
}

// ========================================
// Map Repository Record To Employee DTO
// ========================================

function mapEmployeeDto(
  record: MockFormerEmployeeRecord
): RehireSearchEmployeeDto {

  const {
    person,
    employment,
    separation,
  } = record;

  // ======================================
  // Build Full Name
  // ======================================

  const fullName = [
    person.firstName,
    person.middleName,
    person.lastName,
  ]
    .filter(Boolean)
    .join(' ');

  // ======================================
  // Build Employee DTO
  // ======================================

  return {
    personGuid: person.personGuid,
    personNumber: person.personNumber,
    employeeNumber: employment.employeeNumber,

    fullName,
    dateOfBirth: person.dateOfBirth,
    imageUrl: person.imageUrl,

    departmentName: employment.departmentName,
    positionName: employment.positionName,
    workLocationName: employment.workLocationName,

    employmentStatus: employment.status,
    lastHireDate: employment.hireDate,

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
// Rehire Search Mock API
// ========================================

export function searchRehireMockApi(
  request: RehireSearchRequest
): Observable<RehireSearchApiResultDto> {

  return defer(() => {

    // ======================================
    // Validate Request
    // ======================================

    const validationError =
      validateSearchRequest(request);

    if (validationError) {
      return throwError(() =>
        new Error(validationError)
      );
    }

    // ======================================
    // Resolve Employment Status Filter
    // ======================================

    const status = request.employmentStatus;

    const employmentStatus: MockEmploymentStatus | null =
      status && isFormerEmploymentStatus(status)
        ? status
        : null;

    // ======================================
    // Search Shared Repository
    // ======================================

    const records = searchMockFormerEmployees(
      request.keyword.trim(),
      employmentStatus
    );

    // ======================================
    // Total Matching Records
    // Before Pagination
    // ======================================

    const totalRecords = records.length;

    // ======================================
    // Calculate Pagination
    // ======================================

    const startIndex =
      (request.pageNumber - 1) *
      request.pageSize;

    const endIndex =
      startIndex + request.pageSize;

    // ======================================
    // Get Current Page
    // ======================================

    const pagedRecords = records.slice(
      startIndex,
      endIndex
    );

    // ======================================
    // Map To DTO
    // ======================================

    const employees: RehireSearchEmployeeDto[] =
      pagedRecords.map(mapEmployeeDto);

    // ======================================
    // Build Result DTO
    // ======================================

    const data: RehireSearchResultDto = {
      totalRecords,
      employees,
    };

    // ======================================
    // Build API Response
    // ======================================

    const response: RehireSearchApiResultDto = {
      success: true,
      message: 'Rehire search completed successfully.',
      errorCode: null,
      data,
    };

    // ======================================
    // Return Observable
    // ======================================

    return of(response);

  }).pipe(
    delay(MOCK_API_DELAY)
  );
}

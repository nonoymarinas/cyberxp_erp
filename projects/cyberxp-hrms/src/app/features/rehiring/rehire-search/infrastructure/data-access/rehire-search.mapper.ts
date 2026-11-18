
import type {
  RehireSearchApiResultDto,
  RehireSearchResultDto,
  RehireSearchEmployeeDto,
} from '../../domain/models/rehire-search-result.dto.model';

import type {
  RehireSearchResult,
  RehireSearchResultData,
  RehireSearchEmployee,
} from '../../domain/models/rehire-search-result.model';

/* ========================================
   Rehire Search Mapper
   ======================================== */

// ========================================
// Map Employee DTO
// ========================================

export function mapRehireSearchEmployee(
  dto: RehireSearchEmployeeDto
): RehireSearchEmployee {

  return {

    // ====================================
    // Person Identity
    // ====================================

    personGuid: dto.personGuid,
    personNumber: dto.personNumber,
    employeeNumber: dto.employeeNumber,

    fullName: dto.fullName,
    dateOfBirth: dto.dateOfBirth,
    imageUrl: dto.imageUrl,

    // ====================================
    // Previous Employment
    // ====================================

    departmentName: dto.departmentName,
    positionName: dto.positionName,
    workLocationName: dto.workLocationName,

    employmentStatus: dto.employmentStatus,
    lastHireDate: dto.lastHireDate,

    // ====================================
    // Employment Separation
    // ====================================

    separationDate: dto.separationDate,
    separationReason: dto.separationReason,
    clearanceStatus: dto.clearanceStatus,
  };
}

// ========================================
// Map Result Data
// ========================================

export function mapRehireSearchResultData(
  dto: RehireSearchResultDto
): RehireSearchResultData {

  return {
    totalRecords: dto.totalRecords,

    employees: dto.employees.map(
      mapRehireSearchEmployee
    ),
  };
}

// ========================================
// Map API Response
// ========================================

export function mapRehireSearchApiResponse(
  response: RehireSearchApiResultDto
): RehireSearchResult {

  // ======================================
  // Validate API Response
  // ======================================

  if (!response.success || !response.data) {

    throw new Error(
      response.message ||
      'Rehire search failed.'
    );
  }

  // ======================================
  // Map Response
  // ======================================

  return {
    success: response.success,
    message: response.message,
    errorCode: response.errorCode,

    data: mapRehireSearchResultData(
      response.data
    ),
  };
}

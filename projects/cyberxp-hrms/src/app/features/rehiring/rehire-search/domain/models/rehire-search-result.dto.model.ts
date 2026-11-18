
import type {
  ApiResponse,
} from '../../../../../shared/models/api-response.model';

/* ========================================
   Rehire Search Employee DTO
   ======================================== */

export interface RehireSearchEmployeeDto {

  // ======================================
  // Person Identity
  // ======================================

  personGuid: string;
  personNumber: string;
  employeeNumber: string;

  fullName: string;
  dateOfBirth: string;
  imageUrl: string | null;

  // ======================================
  // Previous Employment
  // ======================================

  departmentName: string | null;
  positionName: string | null;
  workLocationName: string | null;

  // Database-defined employment status code.
  // Reference details are loaded separately
  // through NewEmployeeRefStateService.

  employmentStatus: string;

  lastHireDate: string;

  // ======================================
  // Employment Separation
  // ======================================

  separationDate: string | null;
  separationReason: string | null;
  clearanceStatus: string | null;
}

/* ========================================
   Rehire Search Result DTO
   ======================================== */

export interface RehireSearchResultDto {
  totalRecords: number;
  employees: RehireSearchEmployeeDto[];
}

/* ========================================
   Rehire Search API Result DTO
   ======================================== */

export type RehireSearchApiResultDto =
  ApiResponse<RehireSearchResultDto>;

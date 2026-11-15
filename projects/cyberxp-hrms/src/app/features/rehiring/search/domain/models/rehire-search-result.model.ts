
import type {
  ApiResponse,
} from '../../../../../shared/models/api-response.model';

/* ========================================
   Rehire Search Employee Model
   ======================================== */

export interface RehireSearchEmployee {

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

  departmentName: string;
  positionName: string;
  workLocationName: string;

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
   Rehire Search Result Data
   ======================================== */

export interface RehireSearchResultData {
  totalRecords: number;
  employees: RehireSearchEmployee[];
}

/* ========================================
   Rehire Search Result Model
   ======================================== */

export type RehireSearchResult =
  ApiResponse<RehireSearchResultData>;

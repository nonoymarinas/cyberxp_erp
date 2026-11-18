
import type {
  ApiResponse,
} from '../../../../../shared/models/api-response.model';

/* ========================================
   Rehire Employee Model
   ======================================== */

export interface RehireEmployee {

  // ======================================
  // Person Identity
  // ======================================

  personGuid: string;
  personNumber: string;
  employeeNumber: string;

  // ======================================
  // Personal Information
  // ======================================

  firstName: string;
  middleName: string;
  lastName: string;
  fullName: string;

  dateOfBirth: string;
  imageUrl: string | null;

  gender: string | null;
  civilStatus: string | null;

  // ======================================
  // Contact Information
  // ======================================

  email: string | null;
  mobile: string | null;
  address: string | null;
  emergencyContact: string | null;

  // ======================================
  // Employment Status
  // ======================================

  employmentStatus: string;

  // ======================================
  // Previous Employment
  // ======================================

  previousEmploymentGuid: string;

  previousDepartment: string;
  previousPosition: string;
  previousWorkLocation: string;
  previousEmploymentType: string;

  previousHireDate: string;

  // ======================================
  // Separation Information
  // ======================================

  separationDate: string | null;
  separationReason: string | null;
  clearanceStatus: string | null;
}

/* ========================================
   Rehire Employee Result Data
   ======================================== */

export interface RehireEmployeeResultData {

  employee: RehireEmployee;
}

/* ========================================
   Rehire Employee Result
   ======================================== */

export type RehireEmployeeResult =
  ApiResponse<RehireEmployeeResultData>;

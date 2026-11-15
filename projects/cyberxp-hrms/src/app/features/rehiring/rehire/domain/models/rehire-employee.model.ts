
import type {
  ApiResponse,
} from '../../../../../shared/models/api-response.model';

/* ========================================
   Rehire Employee Model
   ======================================== */

export interface RehireEmployee {
  personGuid: string;
  personNumber: string;
  employeeNumber: string;

  firstName: string;
  middleName: string;
  lastName: string;
  fullName: string;

  dateOfBirth: string;
  imageUrl: string | null;

  gender: string | null;
  civilStatus: string | null;

  email: string | null;
  mobile: string | null;
  address: string | null;
  emergencyContact: string | null;

  employmentStatus: string;

  previousDepartment: string;
  previousPosition: string;
  previousWorkLocation: string;
  previousEmploymentType: string;

  previousHireDate: string;

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

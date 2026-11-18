
import type {
  ApiResponse,
} from '../../../../../shared/models/api-response.model';

/* ========================================
   Rehire Result Data
   ======================================== */

export interface RehireResultData {

  // ======================================
  // Rehire Request Identification
  // ======================================

  rehireRequestGuid: string;
  rehireRequestNumber: string;

  // ======================================
  // Person and Employment
  // ======================================

  personGuid: string;
  previousEmploymentGuid: string;

  // ======================================
  // Rehire Request Status
  // ======================================

  // Database-driven reference code.
  // Examples:
  // PENDING_APPROVAL
  // APPROVED
  // REJECTED
  // CANCELLED

  status: string;

  // ======================================
  // Request and Decision Dates
  // ======================================

  requestedAt: string;
  approvedAt: string | null;
  rejectedAt: string | null;

  // ======================================
  // Remarks
  // ======================================

  remarks: string | null;
}

/* ========================================
   Rehire Result
   ======================================== */

export type RehireResult =
  ApiResponse<RehireResultData>;

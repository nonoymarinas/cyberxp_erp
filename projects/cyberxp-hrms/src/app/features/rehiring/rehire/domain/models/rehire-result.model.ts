
import type {
  ApiResponse,
} from '../../../../../shared/models/api-response.model';

/* ========================================
   Rehire Request Status
   ======================================== */

export type RehireRequestStatus =
  | 'PENDING_APPROVAL'
  | 'APPROVED'
  | 'REJECTED'
  | 'CANCELLED';

/* ========================================
   Rehire Result Data
   ======================================== */

export interface RehireResultData {
  rehireRequestGuid: string;
  rehireRequestNumber: string;

  personGuid: string;
  previousEmploymentGuid: string;

  status: RehireRequestStatus;

  requestedAt: string;
  approvedAt: string | null;
  rejectedAt: string | null;

  remarks: string | null;
}

/* ========================================
   Rehire Result
   ======================================== */

export type RehireResult =
  ApiResponse<RehireResultData>;


import type {
  ApiResponse,
} from '../../../../../shared/models/api-response.model';

/* ========================================
   Rehire Request Status DTO
   ======================================== */

export type RehireRequestStatusDto =
  | 'PENDING_APPROVAL'
  | 'APPROVED'
  | 'REJECTED'
  | 'CANCELLED';

/* ========================================
   Rehire Result DTO
   ======================================== */

export interface RehireResultDto {
  rehireRequestGuid: string;
  rehireRequestNumber: string;

  personGuid: string;
  previousEmploymentGuid: string;

  status: RehireRequestStatusDto;

  requestedAt: string;
  approvedAt: string | null;
  rejectedAt: string | null;

  remarks: string | null;
}

/* ========================================
   Rehire API Result DTO
   ======================================== */

export type RehireApiResultDto =
  ApiResponse<RehireResultDto>;

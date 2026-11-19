import { ApiResponse } from '../../../../../../shared/models/api-response.model';

import {
  PersonEmploymentStatus,
  PersonResolutionAction,
} from './person-match-resolution-type-ref.model';

export interface PersonMatchResolutionDto {
  screeningId: string;

  personGuid: string;

  personNumber: string;

  fullName: string;

  employmentStatus: PersonEmploymentStatus;

  isBlocklisted: boolean;

  allowedActions: PersonResolutionAction[];
}

// ========================================
// API Response DTO
// ========================================

export type PersonMatchResolutionApiResponseDto = ApiResponse<PersonMatchResolutionDto>;

import { ApiResponse } from '../../../../../../../shared/models/api-response.model';

/* ========================================
   Person Match Result
   ======================================== */

export interface PersonMatchDto {
  personGuid: string;
  personNumber: string;

  firstName: string;
  middleName: string | null;
  lastName: string;
  dateOfBirth: string;

  personMatchScore: number;
  personMatchLevel: string;
  personMatchMethod: string;

  imageUrl?: string;
}

export type PersonMatchApiResponseDto = ApiResponse<PersonMatchDto[]>;

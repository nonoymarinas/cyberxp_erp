import { PersonMatchDto } from './person-match.dto.model';
import { ApiResponse } from '../../../../../../../shared/models/api-response.model';

export interface PersonMatchResultDto {
  workflowStatus: string;
  workflowStatusCode: string;
  hasPossibleMatch: boolean;
  hasBlocklistMatch: boolean;
  totalMatches: number;
  matches: PersonMatchDto[];
}

export type PersonMatchApiResponseDto = ApiResponse<PersonMatchResultDto>;

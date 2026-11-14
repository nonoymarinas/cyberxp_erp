import { PersonMatch } from './person-match.model';
import { ApiResponse } from '../../../../../shared/models/api-response.model';
import { PersonMatchStatus } from './person-match.model';

export interface PersonMatchResponseDto {
  status: PersonMatchStatus;
  hasPossibleMatch: boolean;
  hasBlocklistMatch: boolean;
  totalMatches: number;
  matches: PersonMatch[];
}

export type PersonMatchApiResponseDto = ApiResponse<PersonMatchResponseDto>;

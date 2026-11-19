import { PersonMatch } from './person-match.model';

import { ApiResponse } from '../../../../../../shared/models/api-response.model';

// ========================================
// Person Match Result
// ========================================

export interface PersonMatchResult {
  workflowStatus: string;
  workflowStatusCode: string;

  hasPossibleMatch: boolean;
  hasBlocklistMatch: boolean;

  totalMatches: number;
  matches: PersonMatch[];
}

// ========================================
// Person Match API Response
// ========================================

export type PersonMatchResultApiResponse = ApiResponse<PersonMatchResult>;

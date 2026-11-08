import { ApiResponse } from '../../../../shared/models/api-response.model';

//employee pre-screening

export type EmployeeMatchMethod =
  | 'EXACT'
  | 'FUZZY'
  | 'LEVENSHTEIN'
  | 'PHONETIC';

export interface EmployeePreScreenRequest {
  firstName: string;
  middleName: string | null;
  lastName: string;
  dateOfBirth: string; // YYYY-MM-DD
  limit?: number;
}

export interface EmployeeMatchDto {
  employeeId: number;
  employeeGuid?: string;
  employeeNumber?: string;

  firstName: string;
  middleName: string | null;
  lastName: string;
  fullName: string;

  dateOfBirth: string;
  photoUrl: string | null;

  employmentStatus: string;
  isBlocklisted: boolean;

  matchMethods: EmployeeMatchMethod[];
  nameSimilarity: number;
  dobMatches: boolean;
}

export interface EmployeePreScreenResponse {
  hasPossibleMatch: boolean;
  hasPossibleBlocklistMatch: boolean;
  totalMatches: number;
  matches: EmployeeMatchDto[];
}

export type EmployeeMatchResponseDto = ApiResponse<EmployeePreScreenResponse>;


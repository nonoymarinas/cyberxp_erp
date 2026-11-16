
export type PersonEmploymentStatus =
  | 'ACTIVE'
  | 'INACTIVE'
  | 'RESIGNED'
  | 'TERMINATED'
  | 'RETIRED'
  | 'NONE';

export type PersonResolutionAction =
  | 'VIEW_EMPLOYEE'
  | 'REHIRE'
  | 'REACTIVATE'
  | 'HIRE_EXISTING'
  | 'BLOCKLIST_REVIEW';

export interface PersonMatchResolution {
  screeningId: string;
  personGuid: string;
  personNumber: string;
  fullName: string;
  employmentStatus: PersonEmploymentStatus;
  isBlocklisted: boolean;
  allowedActions: PersonResolutionAction[];
}

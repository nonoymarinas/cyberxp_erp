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
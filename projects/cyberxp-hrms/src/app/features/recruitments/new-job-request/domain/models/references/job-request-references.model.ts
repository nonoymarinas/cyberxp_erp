import { ApiResponse } from '../../../../../../shared/models/api-response.model';
import { DepartmentReference } from './department-reference.model';
import { PositionReference } from './position-reference.model';
import { JobRequestTypeReference } from './job-request-type-reference.model';
import { PriorityLevelReference } from './priority-level-reference.model';


export interface JobRequestReferences {
  positions: PositionReference[];
  departments: DepartmentReference[];
  priorityLevels: PriorityLevelReference[];
  jobRequestTypes: JobRequestTypeReference[];
}

export type JobRequestReferencesApiResponse = ApiResponse<JobRequestReferences>
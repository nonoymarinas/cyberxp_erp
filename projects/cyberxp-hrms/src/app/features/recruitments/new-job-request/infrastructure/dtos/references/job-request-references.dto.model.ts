import { ApiResponse } from '../../../../../../shared/models/api-response.model';
import { DepartmentReferenceDto } from './department-reference.dto.model';
import { PositionReferenceDto } from './position-reference.dto.model';
import { JobRequestTypeReferenceDto } from './job-request-type-reference.dto.model';
import { PriorityLevelReferenceDto } from './priority-level-reference.dto.model';


export interface JobRequestReferencesDto {
  positions: PositionReferenceDto[];
  departments: DepartmentReferenceDto[];
  priorityLevels: PriorityLevelReferenceDto[];
  jobRequestTypes: JobRequestTypeReferenceDto[];
}

export type JobRequestReferencesApiResponseDto = ApiResponse<JobRequestReferencesDto>
import { ApiResponse } from '../../../../shared/models/api-response.model';

export interface EmploymentInfo {
  dateHired: string | null;
  employmentTypeId: string | null;
  employmentStatusId: string | null;
  departmentId: string | null;
  positionId: string | null;
  workLocationId: string | null;
  managerId: string | null;
}

export type EmploymentInfoResponse = ApiResponse<EmploymentInfo[]>;

export interface SaveEmploymentInfoRequest {
  employeeGuid: string;
  dateHired: string | null;
  employmentTypeId: string | null;
  employmentStatusId: string | null;
  departmentId: string | null;
  positionId: string | null;
  workLocationId: string | null;
  managerId: string | null;
}

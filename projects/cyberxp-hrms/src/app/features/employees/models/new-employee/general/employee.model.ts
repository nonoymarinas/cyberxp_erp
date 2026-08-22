import { ApiResponse } from '../../../../../shared/models/api-response.model';
import { PersonalInfo } from '../personal-info/personal-info.model';

export interface EmployeeData {
  personalInfo: PersonalInfo;
  // address:EmployeeAddressDto[]
}

export type EmployeeDataResponse = ApiResponse<EmployeeData>;


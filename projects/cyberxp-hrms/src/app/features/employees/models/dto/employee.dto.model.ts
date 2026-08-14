import { ApiResponse } from '../../../../shared/models/api-response.model';
import { PersonalInfoDto } from './personal-info.dto.model';
import { EmployeeAddressDto } from './address.dto.model';

export interface EmployeeDataDto {
  personalInfo: PersonalInfoDto;
  address:EmployeeAddressDto[]
}

export type EmployeeDataResponseDto = ApiResponse<EmployeeDataDto>;


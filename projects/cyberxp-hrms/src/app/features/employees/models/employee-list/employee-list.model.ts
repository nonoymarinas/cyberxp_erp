import { ApiResponse } from '../../../../shared/models/api-response.model';
// ========================================
// Application / Domain Model
// ========================================

export interface EmployeeItemDto {
  publicId: string;
  firstName: string;
  middleName: string | null;
  lastName: string;
  username: string;
  employeeNumber: string;
  employeeImg: string | null;
  hiredDate: string;
  positionName: string;
  departmentName: string;
  employmentStatusName: string;
  managerName: string;
  createdAt: string;
}


export type EmployeeListApiResponseDto = ApiResponse<EmployeeItemDto[]>;


export interface EmployeeItem {
  publicId: string;
  firstName: string;
  middleName: string | null;
  lastName: string;
  username: string;
  employeeNumber: string;
  employeeImg: string | null;
  hiredDate: string;
  positionName: string;
  departmentName: string;
  employmentStatusName: string;
  managerName: string;
  createdAt: string;
}
export type EmployeeListApiResponse = ApiResponse<EmployeeItem[]>;
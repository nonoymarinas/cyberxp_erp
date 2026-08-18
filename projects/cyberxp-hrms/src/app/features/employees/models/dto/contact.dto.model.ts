import { ApiResponse } from '../../../../shared/models/api-response.model';

export interface EmployeeContactDto {
  contactId:string |null
  contactTypeId: string | null;
  contactScopeId: string | null;
  value: string | null;
  isPrimary: boolean | null;
}
export type EmployeeContactResponseDto = ApiResponse<EmployeeContactDto[]>;


import { ApiResponse } from '../../../../shared/models/api-response.model';

export interface EmployeeContact {
  contactId: string | null;
  contactTypeId: string | null;
  contactScopeId: string | null;
  value: string | null;
  isPrimary: boolean | null;
}

export type EmployeeContactResponse = ApiResponse<EmployeeContact[]>;

export interface SaveContactRequest {
  employeeGuid: string;
  contactId:string |null
  contactTypeId: string | null;
  contactScopeId: string | null;
  value: string | null;
  isPrimary: boolean | null;
}

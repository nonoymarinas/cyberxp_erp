import { ApiResponse } from '../../../../../shared/models/api-response.model';

export interface Contact {
  contactId: string | null;
  contactTypeId: string | null;
  contactScopeId: string | null;
  value: string | null;
  isPrimary: boolean | null;
}

export type EmployeeContactResponse = ApiResponse<Contact[]>;

export interface SaveContactRequest {
  employeeGuid: string;
  contactId:string |null
  contactTypeId: string | null;
  contactScopeId: string | null;
  value: string | null;
  isPrimary: boolean | null;
}

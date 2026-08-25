import { ApiResponse } from "../../../../shared/models/api-response.model";

export interface ContactTypeRef {
  id: string;
  typeName: string;
  code:string |null
}

export interface ContactScopeRef {
  id: string;
  scopeName: string;
  code:string |null
}

export interface ContactRef{
  contactType:ContactTypeRef[],
  contactScope:ContactScopeRef[],
}

export type ContactRefResponse = ApiResponse<ContactRef>
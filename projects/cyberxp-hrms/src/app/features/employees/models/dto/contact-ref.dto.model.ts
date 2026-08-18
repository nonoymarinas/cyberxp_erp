import { ApiResponse } from "../../../../shared/models/api-response.model";

export interface ContactTypeRefDto {
  id: string;
  typeName: string;
  code:string |null
}

export interface ContactScopeRefDto {
  id: string;
  scopeName: string;
  code:string |null
}

export interface ContactRefDto{
  contactType:ContactTypeRefDto[],
  contactScope:ContactScopeRefDto[],
}

export type ContactRefResponseDto = ApiResponse<ContactRefDto>
import { ApiResponse } from "../../../../shared/models/api-response.model";

export interface ContactTypeRefDto {
  id: number;
  code:string |null
  typeName: string;
}

export interface ContactScopeRefDto {
  id: number;
  code:string |null
  scopeName: string;
}

export interface ContactRefDto{
  contactType:ContactTypeRefDto[],
  contactScope:ContactScopeRefDto[],
}

export type ContactRefResponseDto = ApiResponse<ContactRefDto>
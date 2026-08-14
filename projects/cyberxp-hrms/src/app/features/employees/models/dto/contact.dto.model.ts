import { ApiResponse } from "../../../../shared/models/api-response.model";

export interface ContactDto {
  id: string;
  typeId: string;
  scopeId: string;
  value: string;
  isPrimary: boolean;
}

export type ContactResponseDto = ApiResponse<ContactDto[]>;

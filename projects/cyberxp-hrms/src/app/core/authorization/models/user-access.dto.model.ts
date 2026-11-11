// user-access.model.ts

import { ApiResponse } from '../../../shared/models/api-response.model';

export interface UserAccessDto {
  userId: string;
  username: string;
  displayName: string;
  roles: UserRoleDto[];
  permissions: UserPermissionDto[];
}

export interface UserRoleDto {
  id: string;
  code: string;
  name: string;
}

export interface UserPermissionDto {
  id: string;
  code: string;
  name: string;
  module: string;
  resource: string;
  action: string;
}

export type UserAccessApiResponseDto = ApiResponse<UserAccessDto>;

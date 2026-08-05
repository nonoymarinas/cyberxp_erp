// user-access.model.ts

export interface UserAccess {
  userId: string;
  username: string;
  displayName: string;
  roles: UserRole[];
  permissions: UserPermission[];
}

export interface UserRole {
  id: string;
  code: string;
  name: string;
}

export interface UserPermission {
  id: string;
  code: string;
  name: string;
  module: string;
  resource: string;
  action: string;
}

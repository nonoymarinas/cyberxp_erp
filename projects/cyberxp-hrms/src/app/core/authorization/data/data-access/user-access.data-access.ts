import { Injectable, inject } from '@angular/core';

import { Observable, map } from 'rxjs';

// ========================================
// Application Models
// ========================================

import { UserAccess } from '../../models/user-access.model';

// ========================================
// Mock API
// ========================================

import { UserAccessMockApi } from '../mock/user-access.mock';

// ========================================
// Data Access
// ========================================

@Injectable({
  providedIn: 'root',
})
export class UserAccessDataAccess {
  // ========================================
  // Dependencies
  // ========================================

  private readonly mockApi = inject(UserAccessMockApi);

  // ========================================
  // Get User Access
  // ========================================

  getUserAccess(userId: string): Observable<UserAccess | null> {
    return this.mockApi.getUserAccess(userId).pipe(
      map((response) => {
        // ==================================
        // Validate API Response
        // ==================================

        if (!response.success) {
          if (response.errorCode === 'USER_NOT_FOUND') {
            return null;
          }

          throw new Error(response.message ?? 'Failed to retrieve user access.');
        }

        if (!response.data) {
          throw new Error('User access response contains no data.');
        }

        // ==================================
        // Map DTO to Application Model
        // ==================================

        const data = response.data;

        const userAccess: UserAccess = {
          userId: data.userId,

          username: data.username,

          displayName: data.displayName,

          roles: data.roles.map((role) => ({
            id: role.id,
            code: role.code,
            name: role.name,
          })),

          permissions: data.permissions.map((permission) => ({
            id: permission.id,
            code: permission.code,
            name: permission.name,
            module: permission.module,
            resource: permission.resource,
            action: permission.action,
          })),
        };

        return userAccess;
      }),
    );
  }
}

import { Injectable } from '@angular/core';

import { Observable, defer, of, delay } from 'rxjs';

// ========================================
// DTO Models
// ========================================

import { UserAccessDto, UserAccessApiResponseDto } from '../../models/user-access.dto.model';

// ========================================
// Mock Data
// ========================================

import { USER_PERMISSIONS_MOCK } from './user-permissions';

import { USER_ROLES_MOCK } from './user-roles';

// ========================================
// Configuration
// ========================================

const MOCK_API_DELAY = 500;

// ========================================
// Mock API
// ========================================

@Injectable({
  providedIn: 'root',
})
export class UserAccessMockApi {
  // ========================================
  // Get User Access
  // ========================================

  getUserAccess(userId: string): Observable<UserAccessApiResponseDto> {
    return defer(() => {
      // ======================================
      // Validate Mock User
      // ======================================

      if (userId !== 'EMP00000001') {
        const response: UserAccessApiResponseDto = {
          success: false,
          message: 'User not found.',
          errorCode: 'USER_NOT_FOUND',
          data: null as unknown as UserAccessDto,
        };

        return of(response);
      }

      // ======================================
      // Build User Access DTO
      // ======================================

      const data: UserAccessDto = {
        userId,
        username: 'fmarinas',
        displayName: 'Feliciano Marinas Jr.',
        roles: USER_ROLES_MOCK.filter((role) => role.code === 'hrms.admin').map((role) => ({
          id: role.id,
          code: role.code,
          name: role.name,
        })),
        permissions: USER_PERMISSIONS_MOCK.map((permission) => ({
          id: permission.id,
          code: permission.code,
          name: permission.name,
          module: permission.module,
          resource: permission.resource,
          action: permission.action,
        })),
      };

      // ======================================
      // Build API Response
      // ======================================

      const response: UserAccessApiResponseDto = {
        success: true,
        message: 'User access retrieved successfully.',
        errorCode: null,
        data,
      };

      return of(response);
    }).pipe(delay(MOCK_API_DELAY));
  }
}

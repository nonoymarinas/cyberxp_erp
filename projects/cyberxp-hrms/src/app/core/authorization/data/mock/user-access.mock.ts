
import { Injectable } from '@angular/core';

import { UserAccess } from '../../models/user-access.model';
import { USER_PERMISSIONS_MOCK } from './user-permissions';
import { USER_ROLES_MOCK } from './user-roles';

@Injectable({
  providedIn: 'root',
})
export class UserAccessMockApi {

  getUserAccess(userId: string): UserAccess | null {
    if (userId !== 'EMP00000001') {
      return null;
    }

    return {
      userId,
      username: 'fmarinas',
      displayName: 'Feliciano Marinas Jr.',
      roles: [USER_ROLES_MOCK[0]],
      permissions: USER_PERMISSIONS_MOCK,
    };
  }
}

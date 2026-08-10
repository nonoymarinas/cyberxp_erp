import { Observable, of ,tap} from 'rxjs';
import { inject, Injectable } from '@angular/core';

import { UserAccess } from '../../models/user-access.model';
import { UserAccessMockApi } from '../mock/user-access.mock';

@Injectable({
  providedIn: 'root',
})
export class UserAccessDataAccess {
  private readonly mockApi = inject(UserAccessMockApi);

  // getUserAccess(userId: string): Observable<UserAccess | null> {
  //   return of(this.mockApi.getUserAccess(userId));
  // }

  getUserAccess(userId: string): Observable<UserAccess | null> {
  return of(this.mockApi.getUserAccess(userId)).pipe(
    tap(data => {
      console.log('User access retrieved:', data);
    })
  );
}
}

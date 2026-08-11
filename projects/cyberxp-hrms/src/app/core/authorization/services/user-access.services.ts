import { Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { UserAccess } from '../models/user-access.model';
import { UserAccessDataAccess } from '../data/data-access/user-access.data-access';

@Injectable({
  providedIn: 'root',
})
export class UserAccessService {
  private readonly _userAccess = signal<UserAccess | null>(null);

  readonly userAccess = this._userAccess.asReadonly();

  constructor(private readonly dataAccess: UserAccessDataAccess) {}

  getUserAccess(userId: string): Observable<UserAccess | null> {
    return this.dataAccess.getUserAccess(userId).pipe(
      tap((access) => {
        this._userAccess.set(access);
      }),
    );
  }

  clearUserAccess(): void {
    this._userAccess.set(null);
  }

  hasPermission(code: string): boolean {
    return this._userAccess()?.permissions.some((permission) => permission.code === code) ?? false;
  }
}

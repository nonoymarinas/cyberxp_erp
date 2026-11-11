import { Injectable, inject, signal, computed } from '@angular/core';

import { Observable, tap, catchError, finalize, throwError } from 'rxjs';

// ========================================
// Application Models
// ========================================

import { UserAccess } from '../models/user-access.model';

// ========================================
// Data Access
// ========================================

import { UserAccessDataAccess } from '../data/data-access/user-access.data-access';

// ========================================
// User Access Service
// ========================================

@Injectable({
  providedIn: 'root',
})
export class UserAccessService {
  // ========================================
  // Dependencies
  // ========================================

  private readonly dataAccess = inject(UserAccessDataAccess);

  // ========================================
  // User Access State
  // ========================================

  private readonly _userAccess = signal<UserAccess | null>(null);

  readonly userAccess = this._userAccess.asReadonly();

  // ========================================
  // Loading State
  // ========================================

  private readonly _isLoading = signal(false);

  readonly isLoading = this._isLoading.asReadonly();

  // ========================================
  // Permission Cache
  // ========================================

  readonly permissionCodes = computed(
    () => new Set(this._userAccess()?.permissions.map((permission) => permission.code) ?? []),
  );

  // ========================================
  // Role Cache
  // ========================================

  readonly roleCodes = computed(
    () => new Set(this._userAccess()?.roles.map((role) => role.code) ?? []),
  );

  // ========================================
  // Get User Access
  // ========================================

  getUserAccess(userId: string): Observable<UserAccess | null> {
    this._isLoading.set(true);

    // Clear previous cached access
    this._userAccess.set(null);

    return this.dataAccess.getUserAccess(userId).pipe(
      tap((access) => {
        this._userAccess.set(access);
      }),

      catchError((error) => {
        this._userAccess.set(null);
        return throwError(() => error);
      }),

      finalize(() => {
        this._isLoading.set(false);
      }),
    );
  }

  // ========================================
  // Check Permission
  // ========================================

  hasPermission(code: string): boolean {
    if (!code?.trim()) {
      return false;
    }

    return this.permissionCodes().has(code);
  }

  // ========================================
  // Check Role
  // ========================================

  hasRole(code: string): boolean {
    if (!code?.trim()) {
      return false;
    }

    return this.roleCodes().has(code);
  }

  // ========================================
  // Clear User Access
  // ========================================

  clearUserAccess(): void {
    this._userAccess.set(null);
  }
}

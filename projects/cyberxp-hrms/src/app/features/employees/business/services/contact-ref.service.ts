import { Injectable, inject } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';

import { CxpSelectOption } from 'cyberxp-ui';

import { ContactRefDataAccess } from '../../data/data-access/contact-ref.data-access';

import {
  ContactRef,
  ContactScopeRef,
  ContactTypeRef,
} from '../../models/domain/contact-ref.model';

export interface ContactSelectOptions {
  contactTypeOptions: CxpSelectOption[];
  contactScopeOptions: CxpSelectOption[];
}

@Injectable({
  providedIn: 'root',
})
export class ContactRefService {
  // ========================================
  // Dependencies
  // ========================================

  private readonly dataAccess =
    inject(ContactRefDataAccess);

  // ========================================
  // Cache
  // ========================================

  private referencesCache:
    ContactRef | null = null;

  // ========================================
  // Get References
  // ========================================

  getReferences(): Observable<ContactRef> {
    if (this.referencesCache !== null) {
      return of(this.referencesCache);
    }

    return this.refreshReferences();
  }

  // ========================================
  // Refresh References
  // ========================================

  refreshReferences(): Observable<ContactRef> {
    return this.dataAccess
      .getReferences()
      .pipe(
        map((response) => {
          if (!response.success) {
            throw new Error(
              response.message ??
                'Unable to retrieve contact references.',
            );
          }

          return response.data;
        }),

        tap((references) => {
          this.referencesCache =
            references;
        }),
      );
  }

  // ========================================
  // Get Select Options
  // ========================================

  getReferenceOptions():
    Observable<ContactSelectOptions> {
    return this.getReferences()
      .pipe(
        map((references) => ({
          contactTypeOptions:
            this.toContactTypeOptions(
              references.contactType,
            ),

          contactScopeOptions:
            this.toContactScopeOptions(
              references.contactScope,
            ),
        })),
      );
  }

  // ========================================
  // Contact Type Options
  // ========================================

  private toContactTypeOptions(
    items: ContactTypeRef[],
  ): CxpSelectOption[] {
    return items.map((item) => ({
      value: item.id,
      label: item.typeName,
    }));
  }

  // ========================================
  // Contact Scope Options
  // ========================================

  private toContactScopeOptions(
    items: ContactScopeRef[],
  ): CxpSelectOption[] {
    return items.map((item) => ({
      value: item.id,
      label: item.scopeName,
    }));
  }

  // ========================================
  // Cached References
  // ========================================

  getCachedReferences():
    ContactRef | null {
    return this.referencesCache;
  }

  // ========================================
  // Clear Cache
  // ========================================

  clearReferencesCache(): void {
    this.referencesCache = null;
  }
}
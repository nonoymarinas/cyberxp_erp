import {
  Injectable,
  inject,
  signal,
} from '@angular/core';

import {
  map,
  Observable,
  tap,
} from 'rxjs';

import {
  ContactDataAccess,
} from '../../data/data-access/contact.data-access';

import {
  EmployeeContact,
  SaveContactRequest,
} from '../../models/domain/contact.model';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  // ========================================
  // Dependencies
  // ========================================

  private readonly dataAccess =
    inject(ContactDataAccess);

  // ========================================
  // Contact State
  // ========================================

  private readonly _contacts =
    signal<EmployeeContact[]>([]);

  readonly contacts =
    this._contacts.asReadonly();

  // ========================================
  // Get Contacts
  // ========================================

  getContacts(
    employeeGuid: string,
  ): Observable<EmployeeContact[]> {
    return this.dataAccess
      .getContacts(employeeGuid)
      .pipe(
        map((response) => {
          if (!response.success) {
            throw new Error(
              response.message ??
                'Unable to retrieve contacts.',
            );
          }

          return response.data;
        }),

        tap((contacts) => {
          this.setContacts(
            contacts,
          );
        }),
      );
  }

  // ========================================
  // Save Contact
  // ========================================

  saveContact(
    request: SaveContactRequest,
  ): Observable<EmployeeContact[]> {
    return this.dataAccess
      .saveContact(request)
      .pipe(
        map((response) => {
          if (!response.success) {
            throw new Error(
              response.message ??
                'Unable to save contact.',
            );
          }

          return response.data;
        }),

        tap((contacts) => {
          this.setContacts(
            contacts,
          );
        }),
      );
  }

  // ========================================
  // Delete Contact
  // ========================================

  deleteContact(
    employeeGuid: string,
    contactId: string,
  ): Observable<EmployeeContact[]> {
    return this.dataAccess
      .deleteContact(
        employeeGuid,
        contactId,
      )
      .pipe(
        map((response) => {
          if (!response.success) {
            throw new Error(
              response.message ??
                'Unable to delete contact.',
            );
          }

          return response.data;
        }),

        tap((contacts) => {
          this.setContacts(
            contacts,
          );
        }),
      );
  }

  // ========================================
  // Set Contacts
  // ========================================

  private setContacts(
    contacts: EmployeeContact[],
  ): void {
    this._contacts.set(
      contacts,
    );
  }

  // ========================================
  // Cached Contacts
  // ========================================

  getCachedContacts():
    EmployeeContact[] {
    return this._contacts();
  }

  // ========================================
  // Get Contact By ID
  // ========================================

  getContactById(
    contactId: string,
  ): EmployeeContact | null {
    return (
      this._contacts().find(
        (contact) =>
          contact.contactId ===
          contactId,
      ) ?? null
    );
  }

  // ========================================
  // Has Contacts
  // ========================================

  hasContacts(): boolean {
    return (
      this._contacts().length > 0
    );
  }

  // ========================================
  // Primary Contact
  // ========================================

  getPrimaryContact():
    EmployeeContact | null {
    return (
      this._contacts().find(
        (contact) =>
          contact.isPrimary ===
          true,
      ) ?? null
    );
  }

  // ========================================
  // Contacts By Type
  // ========================================

  getContactsByType(
    contactTypeId: string,
  ): EmployeeContact[] {
    return this._contacts().filter(
      (contact) =>
        contact.contactTypeId ===
        contactTypeId,
    );
  }

  // ========================================
  // Contacts By Scope
  // ========================================

  getContactsByScope(
    contactScopeId: string,
  ): EmployeeContact[] {
    return this._contacts().filter(
      (contact) =>
        contact.contactScopeId ===
        contactScopeId,
    );
  }

  // ========================================
  // Clear
  // ========================================

  clearContacts(): void {
    this._contacts.set([]);
  }
}
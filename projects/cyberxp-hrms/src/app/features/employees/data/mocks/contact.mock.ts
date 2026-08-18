import { Injectable } from '@angular/core';
import {
  delay,
  Observable,
  of,
} from 'rxjs';

import {
  EmployeeContactDto,
  EmployeeContactResponseDto,
} from '../../models/dto/contact.dto.model';

import {
  SaveContactRequest,
} from '../../models/domain/contact.model';

@Injectable({
  providedIn: 'root',
})
export class ContactMockApi {
  // ========================================
  // Mock Database
  // ========================================

  private readonly contactsByEmployee =
    new Map<string, EmployeeContactDto[]>();

  // ========================================
  // Get Contacts
  // ========================================

  getContacts(
    employeeGuid: string,
  ): Observable<EmployeeContactResponseDto> {
    const contacts =
      this.contactsByEmployee.get(
        employeeGuid,
      ) ?? [];

    return of({
      success: true,
      message: 'Contacts retrieved successfully.',
      errorCode: null,
      data: [...contacts],
    }).pipe(
      delay(1000),
    );
  }

  // ========================================
  // Save Contact
  // null contactId = create
  // contactId      = update
  // ========================================

  saveContact(
    request: SaveContactRequest,
  ): Observable<EmployeeContactResponseDto> {
    const currentContacts =
      this.contactsByEmployee.get(
        request.employeeGuid,
      ) ?? [];

    // ======================================
    // Update
    // ======================================

    if (request.contactId !== null) {
      const existingIndex =
        currentContacts.findIndex(
          (contact) =>
            contact.contactId ===
            request.contactId,
        );

      if (existingIndex === -1) {
        return of({
          success: false,
          message: 'Contact not found.',
          errorCode: 'CONTACT_NOT_FOUND',
          data: [...currentContacts],
        }).pipe(
          delay(1000),
        );
      }

      const updatedContact:
        EmployeeContactDto = {
          contactId:
            request.contactId,

          contactTypeId:
            request.contactTypeId,

          contactScopeId:
            request.contactScopeId,

          value:
            request.value,

          isPrimary:
            request.isPrimary,
        };

      const updatedContacts = [
        ...currentContacts,
      ];

      updatedContacts[existingIndex] =
        updatedContact;

      this.contactsByEmployee.set(
        request.employeeGuid,
        updatedContacts,
      );

      return of({
        success: true,
        message: 'Contact updated successfully.',
        errorCode: null,
        data: [...updatedContacts],
      }).pipe(
        delay(1000),
      );
    }

    // ======================================
    // Create
    // ======================================

    const newContact:
      EmployeeContactDto = {
        contactId:
          crypto.randomUUID(),

        contactTypeId:
          request.contactTypeId,

        contactScopeId:
          request.contactScopeId,

        value:
          request.value,

        isPrimary:
          request.isPrimary,
      };

    const updatedContacts = [
      ...currentContacts,
      newContact,
    ];

    this.contactsByEmployee.set(
      request.employeeGuid,
      updatedContacts,
    );

    return of({
      success: true,
      message: 'Contact saved successfully.',
      errorCode: null,
      data: [...updatedContacts],
    }).pipe(
      delay(1000),
    );
  }

  // ========================================
  // Delete Contact
  // ========================================

  deleteContact(
    employeeGuid: string,
    contactId: string,
  ): Observable<EmployeeContactResponseDto> {
    const currentContacts =
      this.contactsByEmployee.get(
        employeeGuid,
      ) ?? [];

    const exists =
      currentContacts.some(
        (contact) =>
          contact.contactId ===
          contactId,
      );

    if (!exists) {
      return of({
        success: false,
        message: 'Contact not found.',
        errorCode: 'CONTACT_NOT_FOUND',
        data: [...currentContacts],
      }).pipe(
        delay(1000),
      );
    }

    const updatedContacts =
      currentContacts.filter(
        (contact) =>
          contact.contactId !==
          contactId,
      );

    this.contactsByEmployee.set(
      employeeGuid,
      updatedContacts,
    );

    return of({
      success: true,
      message: 'Contact deleted successfully.',
      errorCode: null,
      data: [...updatedContacts],
    }).pipe(
      delay(1000),
    );
  }

  // ========================================
  // Get Contact By ID
  // ========================================

  getContactById(
    employeeGuid: string,
    contactId: string,
  ): Observable<EmployeeContactDto | null> {
    const contacts =
      this.contactsByEmployee.get(
        employeeGuid,
      ) ?? [];

    const contact =
      contacts.find(
        (item) =>
          item.contactId === contactId,
      ) ?? null;

    return of(contact).pipe(
      delay(1000),
    );
  }

  // ========================================
  // Clear Employee Contacts
  // ========================================

  clearContacts(
    employeeGuid: string,
  ): void {
    this.contactsByEmployee.delete(
      employeeGuid,
    );
  }

  // ========================================
  // Clear All Mock Contacts
  // ========================================

  clearAllContacts(): void {
    this.contactsByEmployee.clear();
  }
}
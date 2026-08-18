import { Injectable, inject } from '@angular/core';
import {
  map,
  Observable,
} from 'rxjs';

import {
  ContactMockApi,
} from '../mocks/contact.mock';

import {
  EmployeeContactDto,
  EmployeeContactResponseDto,
} from '../../models/dto/contact.dto.model';

import {
  EmployeeContact,
  EmployeeContactResponse,
  SaveContactRequest,
} from '../../models/domain/contact.model';

@Injectable({
  providedIn: 'root',
})
export class ContactDataAccess {
  // ========================================
  // API
  // ========================================

  private readonly api =
    inject(ContactMockApi);

  // ========================================
  // Get Contacts
  // ========================================

  getContacts(
    employeeGuid: string,
  ): Observable<EmployeeContactResponse> {
    return this.api
      .getContacts(employeeGuid)
      .pipe(
        map(
          (
            response:
              EmployeeContactResponseDto,
          ): EmployeeContactResponse => ({
            success:
              response.success,

            message:
              response.message,

            errorCode:
              response.errorCode,

            data:
              response.data.map(
                (dto) =>
                  this.mapContact(dto),
              ),
          }),
        ),
      );
  }

  // ========================================
  // Save Contact
  // ========================================

  saveContact(
    request: SaveContactRequest,
  ): Observable<EmployeeContactResponse> {
    return this.api
      .saveContact(request)
      .pipe(
        map(
          (
            response:
              EmployeeContactResponseDto,
          ): EmployeeContactResponse => ({
            success:
              response.success,

            message:
              response.message,

            errorCode:
              response.errorCode,

            data:
              response.data.map(
                (dto) =>
                  this.mapContact(dto),
              ),
          }),
        ),
      );
  }

  // ========================================
  // Delete Contact
  // ========================================

  deleteContact(
    employeeGuid: string,
    contactId: string,
  ): Observable<EmployeeContactResponse> {
    return this.api
      .deleteContact(
        employeeGuid,
        contactId,
      )
      .pipe(
        map(
          (
            response:
              EmployeeContactResponseDto,
          ): EmployeeContactResponse => ({
            success:
              response.success,

            message:
              response.message,

            errorCode:
              response.errorCode,

            data:
              response.data.map(
                (dto) =>
                  this.mapContact(dto),
              ),
          }),
        ),
      );
  }

  // ========================================
  // DTO -> Domain
  // ========================================

  private mapContact(
    dto: EmployeeContactDto,
  ): EmployeeContact {
    return {
      contactId:
        dto.contactId,

      contactTypeId:
        dto.contactTypeId,

      contactScopeId:
        dto.contactScopeId,

      value:
        dto.value,

      isPrimary:
        dto.isPrimary,
    };
  }
}
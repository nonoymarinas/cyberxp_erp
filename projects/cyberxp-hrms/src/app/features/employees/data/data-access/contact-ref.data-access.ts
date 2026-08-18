import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';

import { ContactRefMockApi } from '../mocks/contact-ref.mock';

import {
  ContactRefResponseDto,
} from '../../models/dto/contact-ref.dto.model';

import {
  ContactRefResponse,
} from '../../models/domain/contact-ref.model';

@Injectable({
  providedIn: 'root',
})
export class ContactRefDataAccess {
  private readonly api =
    inject(ContactRefMockApi);

  // ========================================
  // Get References
  // ========================================

  getReferences(): Observable<ContactRefResponse> {
    return this.api
      .getReferences()
      .pipe(
        map(
          (
            response:
              ContactRefResponseDto,
          ): ContactRefResponse => ({
            success:
              response.success,

            message:
              response.message,

            errorCode:
              response.errorCode,

            data: {
              contactType:
                response.data.contactType.map(
                  (item) => ({
                    id: item.id,
                    typeName:
                      item.typeName,
                    code: item.code,
                  }),
                ),

              contactScope:
                response.data.contactScope.map(
                  (item) => ({
                    id: item.id,
                    scopeName:
                      item.scopeName,
                    code: item.code,
                  }),
                ),
            },
          }),
        ),
      );
  }
}
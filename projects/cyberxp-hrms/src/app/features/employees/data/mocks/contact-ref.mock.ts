import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';

import {
  ContactRefResponseDto,
  ContactScopeRefDto,
  ContactTypeRefDto,
} from '../../models/dto/contact-ref.dto.model';

@Injectable({
  providedIn: 'root',
})
export class ContactRefMockApi {
  // ========================================
  // Contact Types
  // ========================================

  private readonly contactType: ContactTypeRefDto[] = [
    {
      id: '1',
      typeName: 'Mobile',
      code: 'MOBILE',
    },
    {
      id: '2',
      typeName: 'Landline',
      code: 'LANDLINE',
    },
    {
      id: '3',
      typeName: 'Email',
      code: 'EMAIL',
    },
    {
      id: '4',
      typeName: 'Messenger',
      code: 'MESSENGER',
    },
    {
      id: '5',
      typeName: 'WhatsApp',
      code: 'WHATSAPP',
    },
    {
      id: '6',
      typeName: 'Viber',
      code: 'VIBER',
    },
    {
      id: '7',
      typeName: 'Telegram',
      code: 'TELEGRAM',
    },
    {
      id: '8',
      typeName: 'Facebook',
      code: 'FACEBOOK',
    },
    {
      id: '9',
      typeName: 'Instagram',
      code: 'INSTAGRAM',
    },
    {
      id: '10',
      typeName: 'LinkedIn',
      code: 'LINKEDIN',
    },
    {
      id: '11',
      typeName: 'Other',
      code: 'OTHER',
    },
  ];

  // ========================================
  // Contact Scopes
  // ========================================

  private readonly contactScope: ContactScopeRefDto[] = [
    {
      id: '1',
      scopeName: 'Personal',
      code: 'PERSONAL',
    },
    {
      id: '2',
      scopeName: 'Work',
      code: 'WORK',
    },
    {
      id: '3',
      scopeName: 'Home',
      code: 'HOME',
    },
    {
      id: '4',
      scopeName: 'Office',
      code: 'OFFICE',
    },
    {
      id: '5',
      scopeName: 'Business',
      code: 'BUSINESS',
    },
    {
      id: '6',
      scopeName: 'Emergency',
      code: 'EMERGENCY',
    },
    {
      id: '7',
      scopeName: 'Other',
      code: 'OTHER',
    },
  ];

  // ========================================
  // Get References
  // ========================================

  getReferences(): Observable<ContactRefResponseDto> {
    return of({
      success: true,
      message: 'Contact references retrieved successfully.',
      errorCode: null,

      data: {
        contactType: [...this.contactType],
        contactScope: [...this.contactScope],
      },
    }).pipe(
      delay(1000),
    );
  }
}
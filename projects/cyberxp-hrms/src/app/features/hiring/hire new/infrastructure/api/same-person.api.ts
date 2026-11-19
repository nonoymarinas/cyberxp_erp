
import {
  Injectable,
  inject,
} from '@angular/core';

import {
  Observable,
  defer,
  of,
  throwError,
} from 'rxjs';

// ========================================
// Request Model
// ========================================

import type {
  SamePersonRequest,
} from '../../domain/models/same-person/same-person-request.model';

// ========================================
// DTO
// ========================================

import type {
  SamePersonDetailsApiResponseDto,
} from '../../domain/models/same-person/same-person-details.dto.model';

// ========================================
// Mock Repository
// ========================================

import {
  SamePersonMockRepository,
} from '../../../../../core/infrastructure/mock/repository/same-person-repo/same-person.mock-repository';

// ========================================
// Same Person API
// ========================================

@Injectable({
  providedIn: 'root',
})
export class SamePersonApi {

  // ========================================
  // Dependencies
  // ========================================

  private readonly repository =
    inject(SamePersonMockRepository);

  // ========================================
  // Get Same Person Details
  // ========================================

  getDetails(
    request: SamePersonRequest
  ): Observable<SamePersonDetailsApiResponseDto> {

    return defer(() => {

      // ======================================
      // Validate Request
      // ======================================

      const personGuid =
        request.personGuid?.trim();

      if (!personGuid) {

        return throwError(() =>
          new Error(
            'Person GUID is required.'
          )
        );
      }

      // ======================================
      // Retrieve Existing Person Details
      // ======================================

      const details =
        this.repository.findByPersonGuid(
          personGuid
        );

      // ======================================
      // Person Not Found
      // ======================================

      if (!details) {

        return throwError(() =>
          new Error(
            `Existing person not found: ${personGuid}`
          )
        );
      }

      // ======================================
      // Successful API Response
      // ======================================

      const response: SamePersonDetailsApiResponseDto = {
        success: true,
        message: 'Same Person details retrieved successfully.',
        errorCode: null,
        data: details,
      };

      return of(response);

    });
  }
}


import {
  Injectable,
  inject,
} from '@angular/core';

import {
  HttpClient,
} from '@angular/common/http';

import {
  Observable,
  defer,
  of,
  delay,
} from 'rxjs';

// ========================================
// Environment
// ========================================

import {
  environment,
} from '../../../../../../environments/environment';

// ========================================
// Request Model
// ========================================

import type {
  PersonMatchResolutionRequest,
} from '../../domain/models/person-match-resolution/person-match-resolution-request.model';

// ========================================
// API Response DTO
// ========================================

import type {
  PersonMatchResolutionApiResponseDto,
} from '../../domain/models/person-match-resolution/person-match-resolution.dto.model';

// ========================================
// Mock Repository
// ========================================

import {
  PersonMatchResolutionMockRepository,
} from '../../../../../core/infrastructure/mock/repository/person-match-resolution-repo/person-match-resolution.mock-repository';

// ========================================
// API
// ========================================

@Injectable({
  providedIn: 'root',
})
export class PersonMatchResolutionApi {

  // ========================================
  // Dependencies
  // ========================================

  private readonly http =
    inject(HttpClient);

  private readonly mockRepository =
    inject(PersonMatchResolutionMockRepository);

  // ========================================
  // Mock API Configuration
  // ========================================

  private readonly USE_MOCK_API = true;

  // ========================================
  // Get Person Match Resolution
  // ========================================

  getResolution(
    request: PersonMatchResolutionRequest
  ): Observable<PersonMatchResolutionApiResponseDto> {

    // ======================================
    // Mock API
    // ======================================

    if (this.USE_MOCK_API) {

      return defer(() => {

        const resolution =
          this.mockRepository.getResolution(
            request
          );

        const response:
          PersonMatchResolutionApiResponseDto = {

          success: true,

          message:
            'Person match resolution retrieved successfully.',

          errorCode: null,

          data: resolution,
        };

        return of(response);

      }).pipe(
        delay(300)
      );
    }

    // ======================================
    // Real REST API
    // ======================================

    const screeningId =
      encodeURIComponent(request.screeningId);

    const personGuid =
      encodeURIComponent(request.personGuid);

    const url =
      `${environment.api.baseUrl}` +
      `/person-match/screenings/${screeningId}` +
      `/persons/${personGuid}/resolution`;

    return this.http.get<PersonMatchResolutionApiResponseDto>(
      url
    );
  }
}


import {
  HttpClient,
} from '@angular/common/http';

import {
  Injectable,
  inject,
} from '@angular/core';

import {
  Observable,
  defer,
  delay,
  of,
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

import {
  PersonMatchDecisionRequest,
} from '../../domain/models/person-match-decision/person-match-decision-request.model';

// ========================================
// Response DTO
// ========================================

import {
  PersonMatchDecisionApiResponseDto,
} from '../../domain/models/person-match-decision/person-match-decision.dto.model';

// ========================================
// Mock Repository
// ========================================

import {
  PersonMatchDecisionMockRepository,
} from '../../../../../core/infrastructure/mock/repository/person-match-decision-repo/person-match-decision.mock-repository';

// ========================================
// Configuration
// ========================================

const USE_MOCK_API = true;

const MOCK_DELAY_MS = 300;

// ========================================
// Person Match Decision API
// ========================================

@Injectable({
  providedIn: 'root',
})
export class PersonMatchDecisionApi {

  // ========================================
  // Dependencies
  // ========================================

  private readonly http =
    inject(HttpClient);

  private readonly mockRepository =
    inject(PersonMatchDecisionMockRepository);

  // ========================================
  // API Endpoint
  // ========================================

  private readonly endpoint =
    `${environment.api.baseUrl}/person-match/decisions`;

  // ========================================
  // Submit Person Match Decision
  // ========================================

  submitDecision(
    request: PersonMatchDecisionRequest
  ): Observable<PersonMatchDecisionApiResponseDto> {

    if (!USE_MOCK_API) {

      return this.http.post<PersonMatchDecisionApiResponseDto>(
        this.endpoint,
        request
      );
    }

    // ======================================
    // Mock API
    // ======================================

    return defer(() => {

      // Temporary mock reviewer.
      // Replace with authenticated identity
      // when integrating the real backend.

      const decidedBy = 'EMP00000001';

      const decision =
        this.mockRepository.createDecision(
          request,
          decidedBy
        );

      const response: PersonMatchDecisionApiResponseDto = {
        success: true,
        message: 'Person match decision saved successfully.',
        errorCode: null,
        data: {
          decisionGuid: decision.decisionGuid,
          screeningId: decision.screeningId,
          personGuid: decision.personGuid,
          decisionCode: decision.decisionCode,
          remarks: decision.remarks,
          decidedBy: decision.decidedBy,
          decidedAt: decision.decidedAt,
        },
      };

      return of(response);

    }).pipe(
      delay(MOCK_DELAY_MS)
    );
  }
}

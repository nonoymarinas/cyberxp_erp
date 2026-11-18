
import {
  Injectable,
} from '@angular/core';

import {
  Observable,
  defer,
  of,
  delay,
  throwError,
} from 'rxjs';

// ========================================
// DTO Models
// ========================================

import type {
  RehireEligibilityApiResultDto,
} from '../../domain/models/rehire-eligibility-result.dto.model';

// ========================================
// Rehire Eligibility API
// ========================================

@Injectable({
  providedIn: 'root',
})
export class RehireEligibilityApi {

  // ======================================
  // Verify Rehire Eligibility
  // ======================================

  verifyEligibility(
    personGuid: string,
    employmentGuid: string
  ): Observable<RehireEligibilityApiResultDto> {

    return defer(() => {

      // ==================================
      // Validate Input
      // ==================================

      if (
        !personGuid.trim() ||
        !employmentGuid.trim()
      ) {
        return throwError(() => new Error(
          'Person GUID and employment GUID are required.'
        ));
      }

      // ==================================
      // Repository Not Yet Connected
      // ==================================

      return throwError(() => new Error(
        'Rehire eligibility repository is not connected.'
      ));
    });
  }
}

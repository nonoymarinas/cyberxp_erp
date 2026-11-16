
import {
  Injectable,
  inject,
} from '@angular/core';

import {
  Observable,
} from 'rxjs';

import {
  PersonMatchDataAccess,
} from '../../infrastructure/data-access/person-match.data-access';

import {
  PersonMatchRequest,
} from '../../domain/models/shared/person-match/person-match-request.model';

import {
  PersonMatchApiResponse,
} from '../../domain/models/shared/person-match/person-match-result.model';

import {
  PersonMatchResolution,
} from '../../domain/models/shared/person-match-resolution/person-match-resolution.model';

@Injectable({
  providedIn: 'root',
})
export class PersonMatchService {

  private readonly dataAccess =
    inject(PersonMatchDataAccess);

  // ========================================
  // Check Existing Person
  // ========================================

  checkExistingPerson(
    request: PersonMatchRequest
  ): Observable<PersonMatchApiResponse> {

    return this.dataAccess.checkExistingPerson(
      request
    );
  }

  // ========================================
  // Get Person Match Resolution
  // ========================================

  getResolution(
    personGuid: string
  ): Observable<PersonMatchResolution> {

    return this.dataAccess.getResolution(
      personGuid
    );
  }
}

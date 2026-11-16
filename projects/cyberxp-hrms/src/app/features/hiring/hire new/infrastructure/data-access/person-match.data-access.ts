
import {
  Injectable,
  inject,
} from '@angular/core';

import {
  Observable,
  map,
} from 'rxjs';

import {
  PersonMatchApi,
} from '../api/person-match.api';

import {
  PersonMatchRequest,
} from '../../domain/models/shared/person-match/person-match-request.model';

import {
  PersonMatchApiResponse,
} from '../../domain/models/shared/person-match/person-match-result.model';

import {
  PersonMatchResolution,
} from '../../domain/models/shared/person-match-resolution/person-match-resolution.model';

import {
  mapPersonMatchApiResult,
} from './person-match.mapper';

@Injectable({
  providedIn: 'root',
})
export class PersonMatchDataAccess {

  private readonly api =
    inject(PersonMatchApi);

  // ========================================
  // Check Existing Person
  // ========================================

  checkExistingPerson(
    request: PersonMatchRequest
  ): Observable<PersonMatchApiResponse> {

    return this.api
      .checkExistingPerson(request)
      .pipe(
        map(mapPersonMatchApiResult)
      );
  }

  // ========================================
  // Get Resolution
  // ========================================

  getResolution(
    personGuid: string
  ): Observable<PersonMatchResolution> {

    return this.api.getResolution(
      personGuid
    );
  }
}

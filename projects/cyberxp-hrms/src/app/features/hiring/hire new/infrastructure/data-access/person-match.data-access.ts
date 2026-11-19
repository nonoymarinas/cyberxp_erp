
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
} from '../../domain/models/person-match/person-match-request.model';

import {
  PersonMatchApiResponse,
} from '../../domain/models/person-match/person-match.model';

import {
  mapPersonMatchApiResponse,
} from './person-match.mapper';

// ========================================
// Person Match Data Access
// ========================================

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

    return this.api.checkExistingPerson(request).pipe(
      map(mapPersonMatchApiResponse)
    );
  }
}

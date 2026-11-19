
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
} from '../../domain/models/person-match/person-match-request.model';

import {
  PersonMatchApiResponse,
} from '../../domain/models/person-match/person-match.model';

// ========================================
// Person Match Service
// ========================================

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
}

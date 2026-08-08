// personal-info.data-access.ts

import { inject, Injectable } from '@angular/core';
import { map, Observable, of, delay } from 'rxjs';

import { ReferenceItem } from '../../../../shared/models/reference-item.model';
import { PersonalInfoReference } from '../../models/references/personal-info-reference.model';
import { EmployeeReferenceApi, EmployeeReferenceDto } from '../api/personal-info.api';
import { savePersonalInfoMock, getPersonalInfoMock } from '../mocks/personal-info.mock';
import {
  PersonalInformation,
  SavePersonalInfoRequest,
  SavePersonalInfoResponse,
} from '../../models/domain/personal-info.model';
@Injectable({
  providedIn: 'root',
})
export class PersonalInfoDataAccess {
  private readonly api = inject(EmployeeReferenceApi);

  getReferences(): Observable<PersonalInfoReference> {
    return this.api.getReferences().pipe(
      map((response) => ({
        genders: this.mapReferenceItems(response.Data.Genders),
        civilStatuses: this.mapReferenceItems(response.Data.CivilStatuses),
        suffixes: this.mapReferenceItems(response.Data.Suffixes),
      })),
    );
  }

  // savePersonalInfo(request: SavePersonalInfoRequest): Observable<SavePersonalInfoResponse> {
  //   return this.api.savePersonalInfo(request);
  // }

  savePersonalInfo(request: SavePersonalInfoRequest): Observable<SavePersonalInfoResponse> {
    const response = savePersonalInfoMock(request);
    return of(response).pipe(delay(1000));
  }

  getPersonalInfo(employeeGuid: string): Observable<PersonalInformation | null> {
    return of(getPersonalInfoMock(employeeGuid));
  }
  
  private mapReferenceItems(items: EmployeeReferenceDto[]): ReferenceItem<string>[] {
    return items.map((item) => ({
      value: item.PublicId,
      label: item.ReferenceName.toUpperCase(),
    }));
  }
}

// personal-info.data-access.ts

import { inject, Injectable } from '@angular/core';
import { map, Observable, of, delay,tap } from 'rxjs';

import { ReferenceItem } from '../../../../shared/models/reference-item.model';
import { PersonalInfoReference } from '../../models/references/personal-info-reference.model';
import { EmployeeReferenceApi } from '../api/personal-info.api';
import { EmployeeReferenceDto } from '../../models/domain/personal-info.model';
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
    // Raw API response
    tap((response) => {
      console.log('Personal Info References API Response:', response);
      console.log('References API Data:', response.data);
    }),

    // Map API -> Application Model
    map((response) => ({
      genders: this.mapReferenceItems(response.data.genders),
      civilStatuses: this.mapReferenceItems(
        response.data.civilStatuses,
      ),
      suffixes: this.mapReferenceItems(response.data.suffixes),
    })),

    // Mapped references
    tap((references) => {
      console.log('Mapped Personal Info References:', references);
      console.log('Genders:', references.genders);
      console.log('Civil Statuses:', references.civilStatuses);
      console.log('Suffixes:', references.suffixes);
    }),
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
      value: item.publicId,
      label: item.referenceName.toUpperCase(),
    }));
  }
}

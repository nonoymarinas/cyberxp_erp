// personal-info.data-access.ts

import { inject, Injectable } from '@angular/core';
import { map, Observable, of, delay, tap } from 'rxjs';
import { ReferenceItem } from '../../../../shared/models/reference-item.model';
import { PersonalInfoRefs } from '../../models/new-employee/personal-info/personal-info-ref.model';
import { PersonalInfoRefApi } from '../api/personal-info-ref.api';
import { ReferenceItemDto } from '../../../../shared/models/reference-item.dto.model';

@Injectable({
  providedIn: 'root',
})
export class PersonalInfoRefDataAccess {
  private readonly api = inject(PersonalInfoRefApi);

  getReferences(): Observable<PersonalInfoRefs> {
    return this.api.getReferences().pipe(
      // Raw API response
      tap((response) => {
        console.log('Personal Info References API Response:', response);
        console.log('References API Data:', response.data);
      }),

      // Map API -> Application Model
      map((response) => ({
        genders: this.mapReferenceItems(response.data.genders),
        civilStatuses: this.mapReferenceItems(response.data.civilStatuses),
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

  private mapReferenceItems(items: ReferenceItemDto[]): ReferenceItem<string>[] {
    return items.map((item) => ({
      id: item.publicId,
      name: item.referenceName.toUpperCase(),
      code: null,
      disabled:false
    }));
  }
}

// personal-info.data-access.ts

import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { ReferenceItem } from '../../../../shared/models/reference-item.model';
import { PersonalInfoReference } from '../../models/references/personal-info-reference.model';
import {
  EmployeeReferenceApi,
  EmployeeReferenceDto,
} from '../api/personal-info.api';

@Injectable({
  providedIn: 'root',
})
export class PersonalInfoDataAccess {
  private readonly api = inject(EmployeeReferenceApi);

  getReferences(): Observable<PersonalInfoReference> {
    return this.api.getReferences().pipe(
      map((response) => ({
        genders: this.mapReferenceItems(
          response.Data.Genders,
        ),
        civilStatuses: this.mapReferenceItems(
          response.Data.CivilStatuses,
        ),
        suffixes: this.mapReferenceItems(
          response.Data.Suffixes,
        ),
      })),
    );
  }

  private mapReferenceItems(
    items: EmployeeReferenceDto[],
  ): ReferenceItem<string>[] {
    return items.map((item) => ({
      value: item.PublicId,
      label: item.ReferenceName.toUpperCase(),
    }));
  }
}
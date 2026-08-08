import { Injectable } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';

import { CxpSelectOption } from 'cyberxp-ui';

import { PersonalInfoDataAccess } from '../../data/data-access/personal-info.data-access';
import { PersonalInfoReference } from '../../models/references/personal-info-reference.model';
import {
  SavePersonalInfoRequest,
  SavePersonalInfoResponse,
  PersonalInformation,
  PersonalInfo,
} from '../../models/domain/personal-info.model';
import { ReferenceItem } from '../../../../shared/models/reference-item.model';

export interface CxpSelectOptionsReferences {
  suffixOptions: CxpSelectOption[];
  genderOptions: CxpSelectOption[];
  civilStatusOptions: CxpSelectOption[];
}

@Injectable({
  providedIn: 'root',
})
export class PersonalInfoService {
  private personalInfoCache: PersonalInformation | null = null;
  private referencesCache: PersonalInfoReference | null = null;

  constructor(private readonly dataAccess: PersonalInfoDataAccess) {}

  //references
  getReferences(): Observable<PersonalInfoReference> {
    if (this.referencesCache !== null) {
      return of(this.referencesCache);
    }

    return this.refreshReferences();
  }

  getReferenceOptions(): Observable<CxpSelectOptionsReferences> {
    return this.getReferences().pipe(map((references) => this.toReferenceOptions(references)));
  }

  refreshReferences(): Observable<PersonalInfoReference> {
    return this.dataAccess.getReferences().pipe(
      tap((references) => {
        this.referencesCache = references;
      }),
    );
  }

  clearReferencesCache(): void {
    this.referencesCache = null;
  }
  private toReferenceOptions(references: PersonalInfoReference): CxpSelectOptionsReferences {
    return {
      suffixOptions: this.toSelectOptions(references.suffixes),
      genderOptions: this.toSelectOptions(references.genders),
      civilStatusOptions: this.toSelectOptions(references.civilStatuses),
    };
  }

  private toSelectOptions(items: ReferenceItem<string>[]): CxpSelectOption[] {
    return items.map((item) => ({
      value: item.value,
      label: item.label,
      disabled: item.disabled,
    }));
  }

  // personal information
  savePersonalInfo(request: SavePersonalInfoRequest): Observable<SavePersonalInfoResponse> {
    return this.dataAccess.savePersonalInfo(request).pipe(
      tap((response) => {
        if (response.success) {
          this.personalInfoCache = response.data;
        }
      }),
    );
  }

  getPersonalInfo(employeeGuid: string): Observable<PersonalInformation | null> {
    if (this.personalInfoCache && this.personalInfoCache.employeeGuid === employeeGuid) {
      return of(this.personalInfoCache);
    }

    return this.dataAccess.getPersonalInfo(employeeGuid).pipe(
      tap((employee: PersonalInformation | null) => {
        this.personalInfoCache = employee;
      }),
    );
  }

  clearEmployeeCache(): void {
    this.personalInfoCache = null;
  }
}

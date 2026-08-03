import { Injectable } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';

import { CxpSelectOption } from 'cyberxp-ui';

import { PersonalInfoDataAccess } from '../../data/data-access/personal-info.data-access';
import { PersonalInfoReference } from '../../models/references/personal-info-reference.model';
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
  private referencesCache: PersonalInfoReference | null = null;

  constructor(
    private readonly dataAccess: PersonalInfoDataAccess,
  ) {}

  getReferences(): Observable<PersonalInfoReference> {
    if (this.referencesCache !== null) {
      return of(this.referencesCache);
    }

    return this.refreshReferences();
  }

  getReferenceOptions(): Observable<CxpSelectOptionsReferences> {
    return this.getReferences().pipe(
      map((references) =>
        this.toReferenceOptions(references),
      ),
    );
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

  private toReferenceOptions(
    references: PersonalInfoReference,
  ): CxpSelectOptionsReferences {
    return {
      suffixOptions: this.toSelectOptions(
        references.suffixes,
      ),
      genderOptions: this.toSelectOptions(
        references.genders,
      ),
      civilStatusOptions: this.toSelectOptions(
        references.civilStatuses,
      ),
    };
  }

  private toSelectOptions(
    items: ReferenceItem<string>[],
  ): CxpSelectOption[] {
    return items.map((item) => ({
      value: item.value,
      label: item.label,
      disabled: item.disabled,
    }));
  }
}
import { Injectable, inject } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import { CxpSelectOption } from 'cyberxp-ui';
import { PersonalInfoRefDataAccess } from '../../data/data-access/personal-info-ref.data-access';
import { PersonalInfoRefs as PersonalInfoRefs } from '../../models/new-employee/personal-info/personal-info-ref.model';
import { ReferenceItem } from '../../../../shared/models/reference-item.model';

export interface CxpSelectOptionsRefs {
  suffixOptions: CxpSelectOption[];
  genderOptions: CxpSelectOption[];
  civilStatusOptions: CxpSelectOption[];
}

@Injectable({
  providedIn: 'root',
})
export class PersonalInfoRefService {
  private readonly dataAccess = inject(PersonalInfoRefDataAccess);
  private referencesCache: PersonalInfoRefs | null = null;


  getReferences(): Observable<PersonalInfoRefs> {
    if (this.referencesCache !== null) {
      return of(this.referencesCache);
    }

    return this.refreshReferences();
  }

  getReferenceOptions(): Observable<CxpSelectOptionsRefs> {
    return this.getReferences().pipe(map((references) => this.mapToReferenceOptions(references)));
  }

  refreshReferences(): Observable<PersonalInfoRefs> {
    return this.dataAccess.getReferences().pipe(
      tap((references) => {
        this.referencesCache = references;
      }),
    );
  }

  clearReferencesCache(): void {
    this.referencesCache = null;
  }

  private mapToReferenceOptions(references: PersonalInfoRefs): CxpSelectOptionsRefs {
    return {
      suffixOptions: this.toSelectOptions(references.suffixes),

      genderOptions: this.toSelectOptions(references.genders),

      civilStatusOptions: this.toSelectOptions(references.civilStatuses),
    };
  }

  private toSelectOptions(items: ReferenceItem<string>[]): CxpSelectOption[] {
    return items.map((item) => ({
      value: item.id,
      label: item.name,
      disabled: item.disabled,
    }));
  }
}

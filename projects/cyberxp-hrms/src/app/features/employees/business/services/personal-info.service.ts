import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { PersonalInfoReference } from '../../models/references/personal-info-reference.model';
import { PersonalInfoDataAccess } from '../../data/data-access/personal-info.data-access';

@Injectable({
  providedIn: 'root',
})
export class PersonalInfoService {
  private referencesCache: PersonalInfoReference | null = null;

  constructor(
    private readonly dataAccess: PersonalInfoDataAccess
  ) {}

  getReferences(): Observable<PersonalInfoReference> {
    if (this.referencesCache !== null) {
      return of(this.referencesCache);
    }

    return this.refreshReferences();
  }

  refreshReferences(): Observable<PersonalInfoReference> {
    return this.dataAccess.getReferences().pipe(
      tap((references) => {
        this.referencesCache = references;
      })
    );
  }

  clearReferencesCache(): void {
    this.referencesCache = null;
  }
}
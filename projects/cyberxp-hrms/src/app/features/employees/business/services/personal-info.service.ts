import { Injectable, inject } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import { CxpSelectOption } from 'cyberxp-ui';
import { PersonalInfoDataAccess } from '../../data/data-access/personalinfo.data-access';
import { PersonalInfoReference } from '../../models/references/personal-info-reference.model';
import { SavePersonalInfoRequest } from '../../models/domain/personal-info.model';
import { ReferenceItem } from '../../../../shared/models/reference-item.model';
import { EmployeeDataResponse } from '../../models/domain/employee.model';
import { EmployeeState } from '../../state/employee-state.service';

export interface CxpSelectOptionsReferences {
  suffixOptions: CxpSelectOption[];
  genderOptions: CxpSelectOption[];
  civilStatusOptions: CxpSelectOption[];
}

@Injectable({
  providedIn: 'root',
})
export class PersonalInfoService {
  private readonly dataAccess = inject(PersonalInfoDataAccess);

  private readonly employeeState = inject(EmployeeState);

  private referencesCache: PersonalInfoReference | null = null;

  // ========================================
  // References
  // ========================================

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

  // ========================================
  // Save Personal Information
  // ========================================

  savePersonalInfo(request: SavePersonalInfoRequest): Observable<EmployeeDataResponse> {
    return this.dataAccess.savePersonalInfo(request).pipe(
      tap((response) => {
        console.log('SERVICE RESPONSE:', response);

        console.log('RESPONSE EMPLOYEE ID:', response.data?.personalInfo?.employeeNumber);

        if (!response.success) {
          return;
        }

        this.employeeState.setEmployeeData(response.data);

        console.log('STATE DATA:', this.employeeState.employeeData());

        console.log('STATE EMPLOYEE ID:', this.employeeState.employeeNumber());
      }),
    );
  }

  // ========================================
  // Reference Mapping
  // ========================================

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
}

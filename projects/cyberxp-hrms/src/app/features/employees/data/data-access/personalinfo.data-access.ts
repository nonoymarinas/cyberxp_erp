// personal-info.data-access.ts

import { inject, Injectable } from '@angular/core';
import { map, Observable, of, delay, tap } from 'rxjs';

import { ReferenceItem } from '../../../../shared/models/reference-item.model';
import { PersonalInfoReference } from '../../models/references/personal-info-reference.model';
import { EmployeeReferenceApi } from '../api/personal-info.api';
import { EmployeeReferenceDto } from '../../models/domain/personal-info.model';
import {  getPersonalInfoMock } from '../mocks/personal-info.mock';
import {
  SavePersonalInfoRequest as PersonalInfoRequest,
} from '../../models/domain/personal-info.model';
import { EmployeeDataResponse,PersonalInfo } from '../../models/domain/employee.model';
import { PersonalInfoDto } from '../../models/dto/personal-info.dto.model';

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

  savePersonalInfo(
  request: PersonalInfoRequest,
): Observable<EmployeeDataResponse> {
  return this.api
    .savePersonalInfo(request)
    .pipe(
      map((response) => ({
        success: response.success,
        message: response.message,
        errorCode: response.errorCode,

        data: {
          personalInfo: this.mapPersonalInfo(
            response.data.personalInfo,
          ),
        },
      })),

      tap((response) => {
        console.log(
          'Mapped Employee Data:',
          response,
        );

        console.log(
          'Mapped Personal Info:',
          response.data.personalInfo,
        );
      }),
    );
}

  
  private mapPersonalInfo(dto: PersonalInfoDto): PersonalInfo {
    return {
      employeeNumber: dto.employeeNumber,
      employeeGuid: dto.employeeGuid,
      firstName: dto.firstName,
      middleName: dto.middleName,
      lastName: dto.lastName,
      suffixId: dto.suffixId,
      dateOfBirth: dto.dateOfBirth,
      genderId: dto.genderId,
      civilStatusId: dto.civilStatusId,
      imageUrl: dto.imageUrl,
    };
  }

  getPersonalInfo(employeeGuid: string): Observable<PersonalInfo | null> {
    return of(getPersonalInfoMock(employeeGuid));
  }

  private mapReferenceItems(items: EmployeeReferenceDto[]): ReferenceItem<string>[] {
    return items.map((item) => ({
      value: item.publicId,
      label: item.referenceName.toUpperCase(),
    }));
  }
}

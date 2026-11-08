// personal-info.data-access.ts

import { inject, Injectable } from '@angular/core';
import { map, Observable, of, delay, tap } from 'rxjs';

import { ReferenceItem } from '../../../../shared/models/reference-item.model';
import { PersonalInfoRefs } from '../../models/new-employee/personal-info/personal-info-ref.model';
import { PersonalInfoApi } from '../api/personal-info.api';
import { ReferenceItemDto } from '../../../../shared/models/reference-item.dto.model';
import {  getPersonalInfoMock } from '../mocks/personal-info.mock';
import {
  SavePersonalInfoRequest as PersonalInfoRequest,
} from '../../models/new-employee/personal-info/personal-info.model';
import { EmployeeDataResponse } from '../../models/new-employee/general/employee.model';
import { PersonalInfoDto } from '../../models/new-employee/personal-info/personal-info.dto.model';
import { PersonalInfo } from '../../models/new-employee/personal-info/personal-info.model';

@Injectable({
  providedIn: 'root',
})
export class PersonalInfoDataAccess {
  private readonly api = inject(PersonalInfoApi);

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

  private mapReferenceItems(items: ReferenceItemDto[]): ReferenceItem<string>[] {
    return items.map((item) => ({
      id: item.publicId,
      name: item.referenceName.toUpperCase(),
      code:null,
      disabled:false
    }));
  }
}

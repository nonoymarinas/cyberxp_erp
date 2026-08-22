import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import {
  PersonalInfoRefResponseDto,
  SavePersonalInfoRequest as PersonalInfoRequest,
  SavePersonalInfoResponse,
} from '../../models/new-employee/personal-info/personal-info.model';
import { EmployeeDataResponseDto } from '../../models/new-employee/general/employee.dto.model';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PersonalInfoApi {
  private readonly http = inject(HttpClient);

  private readonly endpoint = `${environment.api.baseUrl}/employees/references`;

  private readonly personalInfoEndpoint = `${environment.api.baseUrl}/employees/personal-info`;

  savePersonalInfo(request: PersonalInfoRequest): Observable<EmployeeDataResponseDto> {
    return this.http.post<EmployeeDataResponseDto>(`${this.personalInfoEndpoint}`, request).pipe(
      tap((response) => {
        console.log('SAVE PERSONAL INFO RESPONSE:', response);
        console.log('RETURN DATA:', response.data);
      }),
    );
  }
}

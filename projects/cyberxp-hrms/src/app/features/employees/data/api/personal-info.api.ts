import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import {
  EmployeeReferenceResponseDto,
  SavePersonalInfoRequest as PersonalInfoRequest,
  SavePersonalInfoResponse,
} from '../../models/domain/personal-info.model';
import { EmployeeDataResponseDto } from '../../models/dto/employee.dto.model';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmployeeReferenceApi {
  private readonly http = inject(HttpClient);

  private readonly endpoint =
    `${environment.api.baseUrl}/employees/references`;

  private readonly personalInfoEndpoint =
    `${environment.api.baseUrl}/employees/personal-info`;

  getReferences(): Observable<EmployeeReferenceResponseDto> {
    return this.http.get<EmployeeReferenceResponseDto>(this.endpoint);
  }

  savePersonalInfo(request: PersonalInfoRequest): Observable<EmployeeDataResponseDto> {
    return this.http.post<EmployeeDataResponseDto>(`${this.personalInfoEndpoint}`, request).pipe(
      tap((response) => {
        console.log('SAVE PERSONAL INFO RESPONSE:', response);
        console.log('RETURN DATA:', response.data);
      }),
    );
  }

}

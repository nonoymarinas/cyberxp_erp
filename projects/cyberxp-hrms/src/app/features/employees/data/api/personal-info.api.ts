import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable,tap } from 'rxjs';
import {
  EmployeeReferenceResponseDto,
  SavePersonalInfoRequest,
  SavePersonalInfoResponse,
} from '../../models/domain/personal-info.model';
import { EmployeeDataResponseDto } from '../../models/dto/employee.dto.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeReferenceApi {
  private readonly http = inject(HttpClient);

  private readonly endpoint =
    'https://api-hrms-employee-dev.azurewebsites.net/api/v1/employees/references';

  private readonly personalInfoEndpoint =
    'https://api-hrms-employee-dev.azurewebsites.net/api/v1/employees';

  getReferences(): Observable<EmployeeReferenceResponseDto> {
    return this.http.get<EmployeeReferenceResponseDto>(this.endpoint);
  }

  savePersonalInfo(request: SavePersonalInfoRequest): Observable<EmployeeDataResponseDto> {
    return this.http.post<EmployeeDataResponseDto>(
      `${this.personalInfoEndpoint}`,
      request,
    ) .pipe(
      tap((response) => {
        console.log('SAVE PERSONAL INFO RESPONSE:', response);
        console.log('RETURN DATA:', response.data);
      }),
    );
  }
}

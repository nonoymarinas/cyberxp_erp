import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import {
  EmployeeReferenceResponseDto,
  SavePersonalInfoRequest,
  SavePersonalInfoResponse,

} from '../../models/domain/personal-info.model';


@Injectable({
  providedIn: 'root',
})
export class EmployeeReferenceApi {
  private readonly http = inject(HttpClient);

  private readonly endpoint =
    'https://api-hrms-employee-dev.azurewebsites.net/api/v1/employees/references';

  getReferences(): Observable<EmployeeReferenceResponseDto> {
    return this.http.get<EmployeeReferenceResponseDto>(this.endpoint);
  }

  savePersonalInfo(request: SavePersonalInfoRequest): Observable<SavePersonalInfoResponse> {
    return this.http.post<SavePersonalInfoResponse>(this.endpoint, request);
  }
}

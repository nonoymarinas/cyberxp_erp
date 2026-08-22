import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { PersonalInfoRefResponseDto } from '../../models/new-employee/personal-info/personal-info.model';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PersonalInfoRefApi {
  private readonly http = inject(HttpClient);

  private readonly endpoint = `${environment.api.baseUrl}/employees/references`;

  getReferences(): Observable<PersonalInfoRefResponseDto> {
    return this.http.get<PersonalInfoRefResponseDto>(this.endpoint);
  }
}

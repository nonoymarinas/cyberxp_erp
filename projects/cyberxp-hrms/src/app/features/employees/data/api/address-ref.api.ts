import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../../../environments/environment';

import {
  AddressRefResponseDto,
  BarangaysRefResponseDto,
} from '../../models/dto/address-ref.dto.model';

@Injectable({
  providedIn: 'root',
})
export class AddressReferenceApi {
  private readonly http = inject(HttpClient);

  private readonly referencesEndpoint =
     `${environment.api.baseUrl}/address/references`;

  private readonly barangaysEndpoint =
    `${environment.api.baseUrl}/address/references/barangays`;

  // ========================================
  // Get Address References
  // ========================================

  getReferences(): Observable<AddressRefResponseDto> {
    console.log(this.barangaysEndpoint)
    console.log(this.referencesEndpoint)
    return this.http
      .get<AddressRefResponseDto>(
        this.referencesEndpoint,
      )
      .pipe(
        tap((response) => {
          console.log(
            'RAW ADDRESS API RESPONSE:',
            response,
          );

          console.log(
            'RAW ADDRESS DATA:',
            response.data,
          );
        }),
      );
  }

  // ========================================
  // Get Barangays By City
  // ========================================

  getBarangaysByCity(
  cityId: number,
): Observable<BarangaysRefResponseDto> {
  return this.http
    .get<BarangaysRefResponseDto>(
      `${this.barangaysEndpoint}/${cityId}`,
    )
    .pipe(
      tap((response) => {
        console.log(
          'RAW BARANGAY API RESPONSE:',
          response,
        );

        console.log(
          'RAW BARANGAY DATA:',
          response.data,
        );
      }),
    );
}
}
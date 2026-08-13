import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';

import {
  AddressReferencesResponseDto,
  BarangaysResponseDto,
} from '../../models/dto/address.dto.model';

@Injectable({
  providedIn: 'root',
})
export class AddressReferenceApi {
  private readonly http = inject(HttpClient);

  private readonly referencesEndpoint =
    'https://api-hrms-employee-dev.azurewebsites.net/api/v1/address/references';

  private readonly barangaysEndpoint =
    'https://api-hrms-employee-dev.azurewebsites.net/api/v1/address/references/barangays';

  // ========================================
  // Get Address References
  // ========================================

  getReferences(): Observable<AddressReferencesResponseDto> {
    return this.http
      .get<AddressReferencesResponseDto>(
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
): Observable<BarangaysResponseDto> {
  return this.http
    .get<BarangaysResponseDto>(
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
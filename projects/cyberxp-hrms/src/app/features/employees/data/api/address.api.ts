import { HttpClient } from '@angular/common/http';

import { Injectable, inject } from '@angular/core';

import { Observable,tap } from 'rxjs';

import { environment } from '../../../../../environments/environment';

import { EmployeeAddreResponseDto } from '../../models/dto/address.dto.model';

import { SaveAddressRequest } from '../../models/domain/address.model';

@Injectable({
  providedIn: 'root',
})
export class AddressApi {
  // ========================================
  // Dependencies
  // ========================================

  private readonly http = inject(HttpClient);

  // ========================================
  // Endpoint
  // ========================================

  private readonly endpoint = `${environment.api.baseUrl}/employees/address`;

  // ========================================
  // Get Addresses
  //
  // GET:
  // /address/{employeeGuid}
  // ========================================

  getAddresses(employeeGuid: string): Observable<EmployeeAddreResponseDto> {
    return this.http.get<EmployeeAddreResponseDto>(`${this.endpoint}/${employeeGuid}`);
  }

  // ========================================
  // Save Address
  //
  // POST:
  // /address
  //
  // addressId = null
  //   -> Create
  //
  // addressId != null
  //   -> Update
  // ========================================

  saveAddress(request: SaveAddressRequest): Observable<EmployeeAddreResponseDto> {
    return this.http.post<EmployeeAddreResponseDto>(this.endpoint, request).pipe(
      tap((response) => {
        console.log('SAVE ADDRESS RESPONSE:', response);
      }),
    );
  }

  // ========================================
  // Delete Address
  //
  // DELETE:
  // /address/{employeeGuid}/{addressId}
  // ========================================

  deleteAddress(employeeGuid: string, addressId: string): Observable<EmployeeAddreResponseDto> {
    return this.http.delete<EmployeeAddreResponseDto>(
      `${this.endpoint}/${addressId}`,
    );
  }
}

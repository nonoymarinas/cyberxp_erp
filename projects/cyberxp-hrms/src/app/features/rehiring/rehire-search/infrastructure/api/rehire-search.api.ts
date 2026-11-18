
import { Injectable } from '@angular/core';
import { Observable, defer, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import type {
  RehireSearchRequest,
} from '../../domain/models/rehire-search-request.model';

import type {
  RehireSearchApiResultDto,
  RehireSearchEmployeeDto,
} from '../../domain/models/rehire-search-result.dto.model';

import {
  searchMockFormerEmployees,
} from '../../../../../core/infrastructure/mock/repository/person-rehire-repo/rehire-search.mock-repository';

/* ========================================
   Rehire Search API
   ======================================== */

@Injectable({
  providedIn: 'root',
})
export class RehireSearchApi {

  // ======================================
  // Search Employees
  // ======================================

  search(
    request: RehireSearchRequest
  ): Observable<RehireSearchApiResultDto> {

    return defer(() => {

      // ==================================
      // Search Mock Repository
      // ==================================

      const records = searchMockFormerEmployees(
        request.keyword,
        request.employmentStatus
      );

      // ==================================
      // Pagination
      // ==================================

      const pageNumber = Math.max(
        1,
        Math.trunc(request.pageNumber || 1)
      );

      const pageSize = Math.min(
        100,
        Math.max(
          1,
          Math.trunc(request.pageSize || 20)
        )
      );

      const startIndex =
        (pageNumber - 1) * pageSize;

      const pagedRecords = records.slice(
        startIndex,
        startIndex + pageSize
      );

      // ==================================
      // Map Repository Records to DTO
      // ==================================

      const employees: RehireSearchEmployeeDto[] =
        pagedRecords.map(record => {

          const {
            person,
            employment,
            separation,
          } = record;

          return {
            personGuid: person.personGuid,
            personNumber: person.personNumber,
            employeeNumber:
              employment.employeeNumber,

            fullName: [
              person.firstName,
              person.middleName,
              person.lastName,
            ]
              .filter(Boolean)
              .join(' '),

            dateOfBirth: person.dateOfBirth,
            imageUrl: person.imageUrl,

            departmentName:
              employment.departmentName,

            positionName:
              employment.positionName,

            workLocationName:
              employment.workLocationName,

            employmentStatus:
              employment.status,

            lastHireDate:
              employment.hireDate,

            separationDate:
              employment.separationDate,

            separationReason:
              employment.separationReason,

            // Clearance must come from an
            // authoritative clearance record.
            // Do not assume that separation
            // automatically means clearance.
            clearanceStatus: null,
          };
        });

      // ==================================
      // API Response
      // ==================================

      const response: RehireSearchApiResultDto = {
        success: true,
        message: 'Rehire search completed.',
        errorCode: null,
        data: {
          totalRecords: records.length,
          employees,
        },
      };

      return of(response).pipe(
        delay(300)
      );
    });
  }
}

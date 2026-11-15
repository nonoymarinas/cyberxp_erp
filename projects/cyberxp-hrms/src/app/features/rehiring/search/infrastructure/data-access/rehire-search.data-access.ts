
import {
  Injectable,
} from '@angular/core';

import {
  Observable,
  map,
  throwError,
} from 'rxjs';

// ========================================
// Request Model
// ========================================

import type {
  RehireSearchRequest,
} from '../../domain/models/rehire-search-request.model';

// ========================================
// Application Result Models
// ========================================

import type {
  RehireSearchEmployee,
  RehireSearchResultData,
  RehireSearchResult,
} from '../../domain/models/rehire-search-result.model';

// ========================================
// API Result DTO Models
// ========================================

import type {
  RehireSearchEmployeeDto,
  RehireSearchResultDto,
} from '../../domain/models/rehire-search-result.dto.model';

// ========================================
// Shared Mock API
// ========================================

import {
  searchRehireMockApi,
} from '../../../../../core/infrastructure/mock/api/rehire-search.mock-api';

/* ========================================
   Rehire Search Data Access
   ======================================== */

@Injectable({
  providedIn: 'root',
})
export class RehireSearchDataAccess {

  /* ======================================
     Search Former Employees
     ====================================== */

  search(
    request: RehireSearchRequest
  ): Observable<RehireSearchResult> {

    return searchRehireMockApi(request).pipe(
      map(response => {

        // ==================================
        // Validate API Response
        // ==================================

        if (!response.success) {
          throw new Error(
            response.message ||
            'Rehire search failed.'
          );
        }

        if (!response.data) {
          throw new Error(
            'Rehire search returned no data.'
          );
        }

        // ==================================
        // Map DTO To Application Result
        // ==================================

        const data = this.mapResultData(
          response.data
        );

        // ==================================
        // Preserve API Response Structure
        // ==================================

        const result: RehireSearchResult = {
          success: response.success,
          message: response.message,
          errorCode: response.errorCode,
          data,
        };

        return result;
      })
    );
  }

  /* ======================================
     Map Result Data
     ====================================== */

  private mapResultData(
    dto: RehireSearchResultDto
  ): RehireSearchResultData {

    return {
      totalRecords: dto.totalRecords,

      employees: dto.employees.map(
        employee => this.mapEmployee(employee)
      ),
    };
  }

  /* ======================================
     Map Employee DTO
     ====================================== */

  private mapEmployee(
    dto: RehireSearchEmployeeDto
  ): RehireSearchEmployee {

    return {
      // ==================================
      // Person Identity
      // ==================================

      personGuid: dto.personGuid,
      personNumber: dto.personNumber,
      employeeNumber: dto.employeeNumber,

      fullName: dto.fullName,
      dateOfBirth: dto.dateOfBirth,
      imageUrl: dto.imageUrl,

      // ==================================
      // Previous Employment
      // ==================================

      departmentName: dto.departmentName,
      positionName: dto.positionName,
      workLocationName: dto.workLocationName,

      employmentStatus: dto.employmentStatus,
      lastHireDate: dto.lastHireDate,

      // ==================================
      // Employment Separation
      // ==================================

      separationDate: dto.separationDate,
      separationReason: dto.separationReason,
      clearanceStatus: dto.clearanceStatus,
    };
  }
}


import {
  Injectable,
} from '@angular/core';

import {
  Observable,
  map,
} from 'rxjs';

// ========================================
// Request Model
// ========================================

import type {
  RehireRequest,
} from '../../domain/models/rehire-request.model';

// ========================================
// Employee Application Models
// ========================================

import type {
  RehireEmployee,
  RehireEmployeeResult,
  RehireEmployeeResultData,
} from '../../domain/models/rehire-employee.model';

// ========================================
// Employee DTO Models
// ========================================

import type {
  RehireEmployeeDto,
  RehireEmployeeResultDto,
} from '../../domain/models/rehire-employee.dto.model';

// ========================================
// Eligibility Application Models
// ========================================

import type {
  RehireEligibilityResult,
  RehireEligibilityResultData,
} from '../../domain/models/rehire-eligibility-result.model';

// ========================================
// Eligibility DTO Models
// ========================================

import type {
  RehireEligibilityResultDto,
} from '../../domain/models/rehire-eligibility-result.dto.model';

// ========================================
// Submission Application Models
// ========================================

import type {
  RehireResult,
  RehireResultData,
} from '../../domain/models/rehire-result.model';

// ========================================
// Submission DTO Models
// ========================================

import type {
  RehireResultDto,
} from '../../domain/models/rehire-result.dto.model';

// ========================================
// Centralized Mock API
// ========================================

import {
  getRehireEmployeeMockApi,
  checkRehireEligibilityMockApi,
  submitRehireMockApi,
} from '../../../../../core/infrastructure/mock/api/rehire.mock-api';

/* ========================================
   Rehire Data Access
   ======================================== */

@Injectable({
  providedIn: 'root',
})
export class RehireDataAccess {

  // ======================================
  // Get Selected Rehire Employee
  // ======================================

  getEmployee(
    personGuid: string
  ): Observable<RehireEmployeeResult> {

    return getRehireEmployeeMockApi(personGuid).pipe(
      map(response => {

        // ==================================
        // Validate API Response
        // ==================================

        if (!response.success) {
          throw new Error(
            response.message ||
            'Unable to retrieve employee.'
          );
        }

        if (!response.data?.employee) {
          throw new Error(
            'Employee data was not returned.'
          );
        }

        // ==================================
        // Map DTO To Application Result
        // ==================================

        const data = this.mapEmployeeResult(
          response.data
        );

        // ==================================
        // Preserve API Response Structure
        // ==================================

        const result: RehireEmployeeResult = {
          success: response.success,
          message: response.message,
          errorCode: response.errorCode,
          data,
        };

        return result;
      })
    );
  }

  // ======================================
  // Check Rehire Eligibility
  // ======================================

  checkEligibility(
    personGuid: string
  ): Observable<RehireEligibilityResult> {

    return checkRehireEligibilityMockApi(personGuid).pipe(
      map(response => {

        // ==================================
        // Validate API Response
        // ==================================

        if (!response.success) {
          throw new Error(
            response.message ||
            'Unable to verify rehire eligibility.'
          );
        }

        if (!response.data) {
          throw new Error(
            'Eligibility data was not returned.'
          );
        }

        // ==================================
        // Map DTO To Application Result
        // ==================================

        const data = this.mapEligibilityResult(
          response.data
        );

        // ==================================
        // Preserve API Response Structure
        // ==================================

        const result: RehireEligibilityResult = {
          success: response.success,
          message: response.message,
          errorCode: response.errorCode,
          data,
        };

        return result;
      })
    );
  }

  // ======================================
  // Submit Rehire Request
  // ======================================

  submit(
    request: RehireRequest
  ): Observable<RehireResult> {

    return submitRehireMockApi(request).pipe(
      map(response => {

        // ==================================
        // Validate API Response
        // ==================================

        if (!response.success) {
          throw new Error(
            response.message ||
            'Unable to submit rehire request.'
          );
        }

        if (!response.data) {
          throw new Error(
            'Rehire submission result was not returned.'
          );
        }

        // ==================================
        // Map DTO To Application Result
        // ==================================

        const data = this.mapRehireResult(
          response.data
        );

        // ==================================
        // Preserve API Response Structure
        // ==================================

        const result: RehireResult = {
          success: response.success,
          message: response.message,
          errorCode: response.errorCode,
          data,
        };

        return result;
      })
    );
  }

  // ======================================
  // Map Employee Result DTO
  // ======================================

  private mapEmployeeResult(
    dto: RehireEmployeeResultDto
  ): RehireEmployeeResultData {

    return {
      employee: this.mapEmployee(
        dto.employee
      ),
    };
  }

  // ======================================
  // Map Employee DTO
  // ======================================

  private mapEmployee(
    dto: RehireEmployeeDto
  ): RehireEmployee {

    return {
      // ==================================
      // Person Identity
      // ==================================

      personGuid: dto.personGuid,
      personNumber: dto.personNumber,
      employeeNumber: dto.employeeNumber,

      firstName: dto.firstName,
      middleName: dto.middleName,
      lastName: dto.lastName,
      fullName: dto.fullName,

      dateOfBirth: dto.dateOfBirth,
      imageUrl: dto.imageUrl,

      // ==================================
      // Profile Information
      // ==================================

      gender: dto.gender,
      civilStatus: dto.civilStatus,

      email: dto.email,
      mobile: dto.mobile,
      address: dto.address,
      emergencyContact: dto.emergencyContact,

      // ==================================
      // Previous Employment
      // ==================================

      employmentStatus: dto.employmentStatus,

      previousDepartment: dto.previousDepartment,
      previousPosition: dto.previousPosition,
      previousWorkLocation: dto.previousWorkLocation,
      previousEmploymentType: dto.previousEmploymentType,
      previousHireDate: dto.previousHireDate,

      // ==================================
      // Separation
      // ==================================

      separationDate: dto.separationDate,
      separationReason: dto.separationReason,
      clearanceStatus: dto.clearanceStatus,
    };
  }

  // ======================================
  // Map Eligibility Result DTO
  // ======================================

  private mapEligibilityResult(
    dto: RehireEligibilityResultDto
  ): RehireEligibilityResultData {

    return {
      personGuid: dto.personGuid,
      employmentGuid: dto.employmentGuid,

      eligibilityStatus: dto.eligibilityStatus,

      isBlocklisted: dto.isBlocklisted,
      clearanceStatus: dto.clearanceStatus,

      reasons: [...dto.reasons],

      requiresApproval: dto.requiresApproval,
      canProceed: dto.canProceed,

      verifiedAt: dto.verifiedAt,
    };
  }

  // ======================================
  // Map Rehire Submission Result DTO
  // ======================================

  private mapRehireResult(
    dto: RehireResultDto
  ): RehireResultData {

    return {
      rehireRequestGuid: dto.rehireRequestGuid,
      rehireRequestNumber: dto.rehireRequestNumber,

      personGuid: dto.personGuid,
      previousEmploymentGuid:
        dto.previousEmploymentGuid,

      status: dto.status,

      requestedAt: dto.requestedAt,
      approvedAt: dto.approvedAt,
      rejectedAt: dto.rejectedAt,

      remarks: dto.remarks,
    };
  }
}

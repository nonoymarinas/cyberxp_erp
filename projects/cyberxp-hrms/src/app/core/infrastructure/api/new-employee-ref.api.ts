
import {
  HttpClient,
} from '@angular/common/http';

import {
  Injectable,
  inject,
} from '@angular/core';

import {
  Observable,
  map,
} from 'rxjs';

import type {
  NewEmployeeRefApiResponseDto,
} from '../../domain/models/references/new-employee-ref.dto.model';

import {
  environment,
} from '../../../../environments/environment';

// ========================================
// Workflow Status Reference
// ========================================

import {
  getMockWorkFlowStatuses,
} from '../mock/repository/reference-repo/work-flow-status-ref.mock-repository';

// ========================================
// Person Match Decision Reference
// ========================================

import {
  getMockPersonMatchDecisionTypes,
} from '../mock/repository/reference-repo/person-match-decision-type-ref.mock-repository';

// ========================================
// Rehire Request Status Reference
// ========================================

import {
  getActiveMockRehireRequestStatuses,
} from '../mock/repository/reference-repo/rehire-request-status-ref.mock-repository';

// ========================================
// Rehire Eligibility Status Reference
// ========================================

import {
  getActiveMockRehireEligibilityStatuses,
} from '../mock/repository/reference-repo/rehire-eligibility-status-ref.mock-repository';

// ========================================
// Employment Separation Type Reference
// ========================================

import {
  getActiveMockEmploymentSeparationTypes,
} from '../mock/repository/reference-repo/employment-separation-type-ref.mock-repository';

// ========================================
// Employment Clearance Status Reference
// ========================================

import {
  getActiveMockEmploymentClearanceStatuses,
} from '../mock/repository/reference-repo/employment-clearance-status-ref.mock-repository';

// ========================================
// Person Restriction Type Reference
// ========================================

import {
  getActiveMockPersonRestrictionTypes,
} from '../mock/repository/reference-repo/person-restriction-type-ref.mock-repository';

// ========================================
// Person Restriction Status Reference
// ========================================

import {
  getActiveMockPersonRestrictionStatuses,
} from '../mock/repository/reference-repo/person-restriction-status-ref.mock-repository';

/* ========================================
   New Employee Reference API
   ======================================== */

@Injectable({
  providedIn: 'root',
})
export class NewEmployeeRefApi {

  // ======================================
  // Dependencies
  // ======================================

  private readonly http =
    inject(HttpClient);

  private readonly endpoint =
    `${environment.api.baseUrl}/employees/references`;

  // ======================================
  // Get References
  // ======================================

  getReferences(): Observable<NewEmployeeRefApiResponseDto> {

    return this.http
      .get<NewEmployeeRefApiResponseDto>(
        this.endpoint
      )
      .pipe(

        map(response => {

          // ==================================
          // Validate API Response
          // ==================================

          if (!response.success || !response.data) {
            return response;
          }

          // ==================================
          // Existing Mock References
          // ==================================

          const workFlowStatuses =
            getMockWorkFlowStatuses();

          const matchDecisionTypes =
            getMockPersonMatchDecisionTypes();

          // ==================================
          // Rehire Request Status References
          // ==================================

          const rehireRequestStatuses =
            getActiveMockRehireRequestStatuses()
              .map(status => ({
                publicId: String(status.id),
                referenceName: status.name,
                code: status.code,
              }));

          // ==================================
          // Rehire Eligibility Status References
          // ==================================

          const rehireEligibilityStatuses =
            getActiveMockRehireEligibilityStatuses()
              .map(status => ({
                publicId: String(status.id),
                referenceName: status.name,
                code: status.code,
              }));

          // ==================================
          // Employment Separation Types
          // ==================================

          const employmentSeparationTypes =
            getActiveMockEmploymentSeparationTypes()
              .map(item => ({
                publicId: String(item.id),
                referenceName: item.name,
                code: item.code,
              }));

          // ==================================
          // Employment Clearance Statuses
          // ==================================

          const employmentClearanceStatuses =
            getActiveMockEmploymentClearanceStatuses()
              .map(item => ({
                publicId: String(item.id),
                referenceName: item.name,
                code: item.code,
              }));

          // ==================================
          // Person Restriction Types
          // ==================================

          const personRestrictionTypes =
            getActiveMockPersonRestrictionTypes()
              .map(item => ({
                publicId: String(item.id),
                referenceName: item.name,
                code: item.code,
              }));

          // ==================================
          // Person Restriction Statuses
          // ==================================

          const personRestrictionStatuses =
            getActiveMockPersonRestrictionStatuses()
              .map(item => ({
                publicId: String(item.id),
                referenceName: item.name,
                code: item.code,
              }));

          // ==================================
          // Merge Into API Response
          // ==================================

          return {
            ...response,

            data: {
              ...response.data,

              // ==================================
              // Existing References
              // ==================================

              workFlowStatuses,
              matchDecisionTypes,

              // ==================================
              // Rehire References
              // ==================================

              rehireRequestStatuses,
              rehireEligibilityStatuses,

              // ==================================
              // Employment Separation
              // ==================================

              employmentSeparationTypes,
              employmentClearanceStatuses,

              // ==================================
              // Person Restrictions
              // ==================================

              personRestrictionTypes,
              personRestrictionStatuses,
            },
          };

        })
      );
  }
}

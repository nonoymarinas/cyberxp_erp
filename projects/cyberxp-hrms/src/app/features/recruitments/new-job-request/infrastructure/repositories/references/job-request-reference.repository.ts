import {
  Injectable,
  inject,
  isDevMode,
} from '@angular/core';

import {
  Observable,
  map,
  tap,
} from 'rxjs';

// ========================================
// Domain Models
// ========================================

import type {
  JobRequestReferences,
} from '../../../domain/models/references/job-request-references.model';

// ========================================
// API
// ========================================

import {
  JobRequestReferenceApi,
} from '../../api/references/job-request-reference.api';

// ========================================
// Mapper
// ========================================

import {
  JobRequestReferenceMapper,
} from '../../mappers/references/job-request-reference.mapper';

// ========================================
// Job Request Reference Repository
// ========================================

@Injectable({
  providedIn: 'root',
})
export class JobRequestReferenceRepository {

  // ======================================
  // Dependencies
  // ======================================

  private readonly api =
    inject(JobRequestReferenceApi);

  // ======================================
  // Get References
  // ======================================

  getReferences(
    companyId: number
  ): Observable<JobRequestReferences> {

    return this.api
      .getReferences(companyId)
      .pipe(

        // ==================================
        // Validate and Map API Response
        // ==================================

        map(response => {

          if (
            !response.success ||
            !response.data
          ) {

            throw new Error(
              response.message ??
              'Failed to retrieve job request references.'
            );

          }

          return JobRequestReferenceMapper.map(
            response.data
          );

        }),

        // ==================================
        // Development Logging Only
        // ==================================

        tap(references => {

          if (!isDevMode()) {
            return;
          }

          console.groupCollapsed(
            '%c[REPOSITORY] Job Request References',
            'color: #4caf50; font-weight: bold;'
          );

          console.log(
            'Company ID:',
            companyId
          );

          console.log(
            'Mapped References:',
            structuredClone(references)
          );

          console.log(
            'Departments:',
            references.departments
          );

          console.log(
            'Positions:',
            references.positions
          );

          console.log(
            'Priority Levels:',
            references.priorityLevels
          );

          console.log(
            'Job Request Types:',
            references.jobRequestTypes
          );

          console.groupEnd();

        })
      );
  }
}
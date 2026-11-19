
import {
  Injectable,
  inject,
} from '@angular/core';

import {
  Observable,
  defer,
  finalize,
  map,
  of,
  shareReplay,
  tap,
} from 'rxjs';

import type {
  CxpSelectOption,
} from 'cyberxp-ui';

// ========================================
// Data Access
// ========================================

import {
  NewEmployeeRefDataAccess,
} from '../../infrastructure/data-access/new-employee-ref.data-access';

// ========================================
// Models
// ========================================

import type {
  NewEmployeeRefData,
} from '../../domain/models/references/new-employee-ref.model';

import type {
  ReferenceItem,
} from '../../../shared/models/reference-item.model';

// ========================================
// Reference State
// ========================================

import {
  NewEmployeeRefStateService,
} from '../states/new-employee-ref-state.service';

// ========================================
// Select Options
// ========================================

export interface NewEmployeeRefSelectOptions {

  // Personal Information

  suffixOptions: CxpSelectOption[];
  genderOptions: CxpSelectOption[];
  civilStatusOptions: CxpSelectOption[];

  // Employment

  departmentOptions: CxpSelectOption[];
  positionOptions: CxpSelectOption[];
  employmentStatusOptions: CxpSelectOption[];

  // Employment Separation

  employmentSeparationTypeOptions: CxpSelectOption[];
  employmentClearanceStatusOptions: CxpSelectOption[];

  // Address

  addressTypeOptions: CxpSelectOption[];

  // Contacts

  contactMediumTypeOptions: CxpSelectOption[];
  contactContextTypeOptions: CxpSelectOption[];

  // Person Restrictions

  personRestrictionStatusOptions: CxpSelectOption[];

  // Rehire

  rehireRequestStatusOptions: CxpSelectOption[];
  rehireEligibilityStatusOptions: CxpSelectOption[];
}

// ========================================
// Configuration
// ========================================

const REFERENCE_CACHE_TTL_MS =
  30 * 60 * 1000;

// ========================================
// New Employee Reference Service
// ========================================

@Injectable({
  providedIn: 'root',
})
export class NewEmployeeRefService {

  // ========================================
  // Dependencies
  // ========================================

  private readonly dataAccess =
    inject(NewEmployeeRefDataAccess);

  readonly state =
    inject(NewEmployeeRefStateService);

  // ========================================
  // In-Flight Request
  // ========================================

  private inFlightRequest:
    Observable<NewEmployeeRefData> | null = null;

  // ========================================
  // Cache Status
  // ========================================

  private isCacheValid(): boolean {

    const references =
      this.state.references();

    const lastUpdated =
      this.state.lastUpdated();

    if (
      references === null ||
      lastUpdated === null
    ) {
      return false;
    }

    return (
      Date.now() - lastUpdated <
      REFERENCE_CACHE_TTL_MS
    );
  }

  // ========================================
  // Get References
  // ========================================

  getReferences(): Observable<NewEmployeeRefData> {

    if (this.isCacheValid()) {
      return of(this.state.references()!);
    }

    if (this.inFlightRequest) {
      return this.inFlightRequest;
    }

    return this.fetchReferences();
  }

  // ========================================
  // Refresh References
  // ========================================

  refreshReferences(): Observable<NewEmployeeRefData> {

    if (this.inFlightRequest) {
      return this.inFlightRequest;
    }

    return this.fetchReferences();
  }

  // ========================================
  // Fetch References
  // ========================================

  private fetchReferences(): Observable<NewEmployeeRefData> {

    const request$ = defer(() => {

      this.state.setLoading(true);
      this.state.setError(null);

      return this.dataAccess.getReferences();

    }).pipe(

      // ==================================
      // Extract Application Data
      // ==================================

      map(response => {

        if (!response.success || !response.data) {
          throw new Error(
            response.message ||
            'Unable to retrieve employee references.'
          );
        }

        return response.data;
      }),

      // ==================================
      // Store Reference Data
      // ==================================

      tap(references => {
        this.state.setReferences(references);
      }),

      // ==================================
      // Handle Errors
      // ==================================

      tap({
        error: (error: unknown) => {

          this.state.setError(
            error instanceof Error
              ? error.message
              : 'Unable to load employee references.'
          );
        },
      }),

      // ==================================
      // Finalize Request
      // ==================================

      finalize(() => {

        this.state.setLoading(false);
        this.inFlightRequest = null;
      }),

      // ==================================
      // Share Concurrent Requests
      // ==================================

      shareReplay({
        bufferSize: 1,
        refCount: true,
      })
    );

    this.inFlightRequest = request$;

    return request$;
  }

  // ========================================
  // Get Select Options
  // ========================================

  getReferenceOptions():
    Observable<NewEmployeeRefSelectOptions> {

    return this.getReferences().pipe(
      map(references =>
        this.mapToSelectOptions(references)
      )
    );
  }

  // ========================================
  // Convert Reference Collections
  // ========================================

  private mapToSelectOptions(
    references: NewEmployeeRefData
  ): NewEmployeeRefSelectOptions {

    return {

      // ==================================
      // Personal Information
      // ==================================

      suffixOptions:
        this.toSelectOptions(references.suffixes),

      genderOptions:
        this.toSelectOptions(references.genders),

      civilStatusOptions:
        this.toSelectOptions(references.civilStatuses),

      // ==================================
      // Employment
      // ==================================

      departmentOptions:
        this.toSelectOptions(references.departments),

      positionOptions:
        this.toSelectOptions(references.positions),

      employmentStatusOptions:
        this.toSelectOptions(
          references.employmentStatuses
        ),

      // ==================================
      // Employment Separation
      // ==================================

      employmentSeparationTypeOptions:
        this.toCodeSelectOptions(
          references.employmentSeparationTypes
        ),

      employmentClearanceStatusOptions:
        this.toCodeSelectOptions(
          references.employmentClearanceStatuses
        ),

      // ==================================
      // Address
      // ==================================

      addressTypeOptions:
        this.toSelectOptions(references.addressTypes),

      // ==================================
      // Contacts
      // ==================================

      contactMediumTypeOptions:
        this.toSelectOptions(
          references.contactTypes
        ),

      contactContextTypeOptions:
        this.toSelectOptions(
          references.contactScopes
        ),

      // ==================================
      // Person Restrictions
      // ==================================

      personRestrictionStatusOptions:
        this.toCodeSelectOptions(
          references.personRestrictionStatuses
        ),

      // ==================================
      // Rehire
      // ==================================

      rehireRequestStatusOptions:
        this.toCodeSelectOptions(
          references.rehireRequestStatuses
        ),

      rehireEligibilityStatusOptions:
        this.toCodeSelectOptions(
          references.rehireEligibilityStatuses
        ),
    };
  }

  // ========================================
  // Reference Item To ID Select Option
  // ========================================

  private toSelectOptions(
    items: ReferenceItem<string>[]
  ): CxpSelectOption[] {

    return items.map(item => ({
      value: item.id,
      label: item.name,
      disabled: item.disabled ?? false,
    }));
  }

  // ========================================
  // Reference Item To Code Select Option
  // ========================================

  private toCodeSelectOptions(
    items: ReferenceItem<string>[]
  ): CxpSelectOption[] {

    return items
      .filter(
        item =>
          item.code !== null &&
          item.code !== undefined &&
          item.code.trim().length > 0
      )
      .map(item => ({
        value: item.code!,
        label: item.name,
        disabled: item.disabled ?? false,
      }));
  }

  // ========================================
  // Get Employment Status Code Options
  // ========================================

  getEmploymentStatusCodeOptions():
    Observable<CxpSelectOption[]> {

    return this.getReferences().pipe(
      map(references =>
        this.toCodeSelectOptions(
          references.employmentStatuses
        )
      )
    );
  }

  // ========================================
  // Get Employment Separation Type Options
  // ========================================

  getEmploymentSeparationTypeOptions():
    Observable<CxpSelectOption[]> {

    return this.getReferences().pipe(
      map(references =>
        this.toCodeSelectOptions(
          references.employmentSeparationTypes
        )
      )
    );
  }

  // ========================================
  // Get Employment Clearance Status Options
  // ========================================

  getEmploymentClearanceStatusOptions():
    Observable<CxpSelectOption[]> {

    return this.getReferences().pipe(
      map(references =>
        this.toCodeSelectOptions(
          references.employmentClearanceStatuses
        )
      )
    );
  }

  // ========================================
  // Get Person Restriction Status Options
  // ========================================

  getPersonRestrictionStatusOptions():
    Observable<CxpSelectOption[]> {

    return this.getReferences().pipe(
      map(references =>
        this.toCodeSelectOptions(
          references.personRestrictionStatuses
        )
      )
    );
  }

  // ========================================
  // Get Rehire Request Status Options
  // ========================================

  getRehireRequestStatusOptions():
    Observable<CxpSelectOption[]> {

    return this.getReferences().pipe(
      map(references =>
        this.toCodeSelectOptions(
          references.rehireRequestStatuses
        )
      )
    );
  }

  // ========================================
  // Get Rehire Eligibility Status Options
  // ========================================

  getRehireEligibilityStatusOptions():
    Observable<CxpSelectOption[]> {

    return this.getReferences().pipe(
      map(references =>
        this.toCodeSelectOptions(
          references.rehireEligibilityStatuses
        )
      )
    );
  }

  // ========================================
  // Clear Reference Cache
  // ========================================

  clearReferencesCache(): void {

    if (this.state.isLoading()) {
      return;
    }

    this.state.clearReferences();
  }
}

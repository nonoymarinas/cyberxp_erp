
import {
  Injectable,
  computed,
  signal,
} from '@angular/core';

// ========================================
// Models
// ========================================

import type {
  NewEmployeeRefData,
} from '../../domain/models/references/new-employee-ref.model';

// ========================================
// New Employee Reference State
// ========================================

@Injectable({
  providedIn: 'root',
})
export class NewEmployeeRefStateService {

  // ========================================
  // Reference Data
  // ========================================

  private readonly _references =
    signal<NewEmployeeRefData | null>(null);

  readonly references =
    this._references.asReadonly();

  // ========================================
  // Loading State
  // ========================================

  private readonly _isLoading =
    signal<boolean>(false);

  readonly isLoading =
    this._isLoading.asReadonly();

  // ========================================
  // Error State
  // ========================================

  private readonly _errorMessage =
    signal<string | null>(null);

  readonly errorMessage =
    this._errorMessage.asReadonly();

  // ========================================
  // Cache Timestamp
  // ========================================

  private readonly _lastUpdated =
    signal<number | null>(null);

  readonly lastUpdated =
    this._lastUpdated.asReadonly();

  // ========================================
  // Computed Cache Status
  // ========================================

  readonly hasReferences = computed(
    () => this._references() !== null
  );

  // ========================================
  // Personal Information References
  // ========================================

  readonly genders = computed(
    () => this._references()?.genders ?? []
  );

  readonly civilStatuses = computed(
    () => this._references()?.civilStatuses ?? []
  );

  readonly suffixes = computed(
    () => this._references()?.suffixes ?? []
  );

  // ========================================
  // Organization References
  // ========================================

  readonly departments = computed(
    () => this._references()?.departments ?? []
  );

  readonly positions = computed(
    () => this._references()?.positions ?? []
  );

  // ========================================
  // Employment References
  // ========================================

  readonly employmentStatuses = computed(
    () => this._references()?.employmentStatuses ?? []
  );

  // ========================================
  // Employment Separation References
  // ========================================

  readonly employmentSeparationTypes = computed(
    () => this._references()?.employmentSeparationTypes ?? []
  );

  readonly employmentClearanceStatuses = computed(
    () => this._references()?.employmentClearanceStatuses ?? []
  );

  // ========================================
  // Address References
  // ========================================

  readonly addressTypes = computed(
    () => this._references()?.addressTypes ?? []
  );

  // ========================================
  // Contact References
  // ========================================

  // Preserve existing application property names.
  // Map from the external API reference names.

  readonly contactMediumTypes = computed(
    () => this._references()?.contactTypes ?? []
  );

  readonly contactContextTypes = computed(
    () => this._references()?.contactScopes ?? []
  );

  // ========================================
  // Workflow Status References
  // ========================================

  readonly workFlowStatuses = computed(
    () => this._references()?.workFlowStatuses ?? []
  );

  // ========================================
  // Person Match Decision References
  // ========================================

  readonly matchDecisionTypes = computed(
    () => this._references()?.personMatchDecisionTypes ?? []
  );

  // ========================================
  // Person Restriction Status References
  // ========================================

  readonly personRestrictionStatuses = computed(
    () => this._references()?.personRestrictionStatuses ?? []
  );

  // ========================================
  // Rehire Request Status References
  // ========================================

  readonly rehireRequestStatuses = computed(
    () => this._references()?.rehireRequestStatuses ?? []
  );

  // ========================================
  // Rehire Eligibility Status References
  // ========================================

  readonly rehireEligibilityStatuses = computed(
    () => this._references()?.rehireEligibilityStatuses ?? []
  );

  // ========================================
  // Set References
  // ========================================

  setReferences(
    references: NewEmployeeRefData
  ): void {

    this._references.set(references);

    this._lastUpdated.set(Date.now());

    this._errorMessage.set(null);
  }

  // ========================================
  // Set Loading
  // ========================================

  setLoading(
    loading: boolean
  ): void {

    this._isLoading.set(loading);
  }

  // ========================================
  // Set Error
  // ========================================

  setError(
    message: string | null
  ): void {

    this._errorMessage.set(message);
  }

  // ========================================
  // Clear References
  // ========================================

  clearReferences(): void {

    this._references.set(null);

    this._lastUpdated.set(null);

    this._errorMessage.set(null);
  }

  // ========================================
  // Reset State
  // ========================================

  reset(): void {

    this._references.set(null);

    this._isLoading.set(false);

    this._errorMessage.set(null);

    this._lastUpdated.set(null);
  }
}

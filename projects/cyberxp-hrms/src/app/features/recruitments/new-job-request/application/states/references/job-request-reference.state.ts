import {
  Injectable,
  signal,
  computed,
} from '@angular/core';

// ========================================
// Domain Models
// ========================================

import type {
  JobRequestReferences,
} from '../../../domain/models/references/job-request-references.model';

// ========================================
// Job Request Reference State
// ========================================

@Injectable({
  providedIn: 'root',
})
export class JobRequestReferenceState {

  // ======================================
  // Private State
  // ======================================

  private readonly _references =
    signal<JobRequestReferences | null>(null);

  private readonly _loading =
    signal<boolean>(false);

  private readonly _error =
    signal<string | null>(null);

  private readonly _companyId =
    signal<number | null>(null);

  // ======================================
  // Public State
  // ======================================

  readonly references =
    this._references.asReadonly();

  readonly loading =
    this._loading.asReadonly();

  readonly error =
    this._error.asReadonly();

  readonly companyId =
    this._companyId.asReadonly();

  // ======================================
  // Computed State
  // ======================================

  readonly loaded =
    computed(() =>
      this._references() !== null
    );

  readonly departments =
    computed(() =>
      this._references()?.departments ?? []
    );

  readonly positions =
    computed(() =>
      this._references()?.positions ?? []
    );

  readonly priorityLevels =
    computed(() =>
      this._references()?.priorityLevels ?? []
    );

  readonly jobRequestTypes =
    computed(() =>
      this._references()?.jobRequestTypes ?? []
    );

  // ======================================
  // Begin Loading
  // ======================================

  beginLoading(
    companyId: number
  ): void {

    this._companyId.set(companyId);
    this._references.set(null);
    this._error.set(null);
    this._loading.set(true);

  }

  // ======================================
  // Set References
  // ======================================

  setReferences(
    references: JobRequestReferences
  ): void {

    this._references.set(references);
    this._error.set(null);

  }

  // ======================================
  // Set Loading
  // ======================================

  setLoading(
    loading: boolean
  ): void {

    this._loading.set(loading);

  }

  // ======================================
  // Set Error
  // ======================================

  setError(
    error: string | null
  ): void {

    this._error.set(error);

  }

  // ======================================
  // Clear State
  // ======================================

  clear(): void {

    if (this._loading()) {
      return;
    }

    this._references.set(null);
    this._loading.set(false);
    this._error.set(null);
    this._companyId.set(null);

  }
}
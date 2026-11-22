
import {
  Injectable,
  computed,
  signal,
} from '@angular/core';

// ========================================
// Models
// ========================================

import type {
  PersonMatchResolution,
} from '../../domain/models/person-match-resolution/person-match-resolution.model';

// ========================================
// Person Resolution State Service
// ========================================

@Injectable()
export class PersonResolutionStateService {

  // ========================================
  // Person Match Resolution State
  // ========================================

  private readonly _personMatchResolution =
    signal<PersonMatchResolution | null>(null);

  readonly personMatchResolution =
    this._personMatchResolution.asReadonly();

  // ========================================
  // Resolution Loading State
  // ========================================

  private readonly _isResolutionLoading =
    signal(false);

  readonly isResolutionLoading =
    this._isResolutionLoading.asReadonly();

  // ========================================
  // Resolution Error State
  // ========================================

  private readonly _resolutionError =
    signal<string | null>(null);

  readonly resolutionError =
    this._resolutionError.asReadonly();

  // ========================================
  // Resolution Request Version
  // ========================================

  private _resolutionRequestVersion = 0;

  // ========================================
  // Computed Resolution State
  // ========================================

  readonly hasPersonMatchResolution = computed(
    () => this._personMatchResolution() !== null
  );

  readonly resolutionEmploymentStatus = computed(
    () =>
      this._personMatchResolution()
        ?.employmentStatus ?? null
  );

  readonly resolutionIsBlocklisted = computed(
    () =>
      this._personMatchResolution()
        ?.isBlocklisted ?? false
  );

  readonly resolutionAllowedActions = computed(
    () => [
      ...(
        this._personMatchResolution()
          ?.allowedActions ?? []
      ),
    ]
  );

  // ========================================
  // Computed Request State
  // ========================================

  readonly hasResolutionError = computed(
    () => this._resolutionError() !== null
  );

  readonly isResolutionReady = computed(
    () =>
      this._personMatchResolution() !== null &&
      !this._isResolutionLoading() &&
      this._resolutionError() === null
  );

  // ========================================
  // Begin Resolution Request
  // ========================================

  beginResolutionRequest(): number {

    // ======================================
    // Generate Request Version
    // ======================================

    const requestVersion =
      ++this._resolutionRequestVersion;

    // ======================================
    // Clear Previous Resolution
    // ======================================

    this._personMatchResolution.set(null);

    this._resolutionError.set(null);

    this._isResolutionLoading.set(true);

    return requestVersion;
  }

  // ========================================
  // Check Resolution Request Version
  // ========================================

  isCurrentResolutionRequest(
    requestVersion: number
  ): boolean {

    return (
      requestVersion ===
      this._resolutionRequestVersion
    );
  }

  // ========================================
  // Finish Resolution Request
  // ========================================

  finishResolutionRequest(
    requestVersion: number
  ): void {

    // ======================================
    // Reject Outdated Requests
    // ======================================

    if (
      !this.isCurrentResolutionRequest(
        requestVersion
      )
    ) {
      return;
    }

    this._isResolutionLoading.set(false);
  }

  // ========================================
  // Store Person Match Resolution
  // ========================================

  setPersonMatchResolution(
    resolution: PersonMatchResolution,
    requestVersion?: number
  ): void {

    // ======================================
    // Reject Outdated Requests
    // ======================================

    if (
      requestVersion !== undefined &&
      !this.isCurrentResolutionRequest(
        requestVersion
      )
    ) {
      throw new Error(
        'Resolution request is no longer current.'
      );
    }

    // ======================================
    // Validate Resolution Identity
    // ======================================

    if (
      !resolution.screeningId?.trim() ||
      !resolution.personGuid?.trim()
    ) {
      throw new Error(
        'Resolution screening ID and Person GUID are required.'
      );
    }

    // ======================================
    // Store Resolution
    // ======================================

    this._personMatchResolution.set({
      ...resolution,
      allowedActions: [
        ...resolution.allowedActions,
      ],
    });

    this._resolutionError.set(null);
  }

  // ========================================
  // Set Resolution Loading
  // ========================================

  setResolutionLoading(
    loading: boolean
  ): void {

    this._isResolutionLoading.set(
      loading
    );
  }

  // ========================================
  // Set Resolution Error
  // ========================================

  setResolutionError(
    message: string | null,
    requestVersion?: number
  ): void {

    // ======================================
    // Reject Outdated Requests
    // ======================================

    if (
      requestVersion !== undefined &&
      !this.isCurrentResolutionRequest(
        requestVersion
      )
    ) {
      return;
    }

    this._resolutionError.set(message);
  }

  // ========================================
  // Invalidate Resolution Request
  // ========================================

  invalidateResolutionRequest(): void {

    // ======================================
    // Invalidate Pending Requests
    // ======================================

    ++this._resolutionRequestVersion;

    // ======================================
    // Clear Resolution State
    // ======================================

    this._personMatchResolution.set(null);

    this._isResolutionLoading.set(false);

    this._resolutionError.set(null);
  }

  // ========================================
  // Clear Person Match Resolution
  // ========================================

  clearPersonMatchResolution(): void {

    this.invalidateResolutionRequest();
  }

  // ========================================
  // Reset Person Resolution State
  // ========================================

  reset(): void {

    this.invalidateResolutionRequest();
  }
}

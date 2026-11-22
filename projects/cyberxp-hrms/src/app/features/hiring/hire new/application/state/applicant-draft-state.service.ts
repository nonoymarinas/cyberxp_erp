
import {
  Injectable,
  signal,
  computed,
} from '@angular/core';

// ========================================
// Models
// ========================================

import type {
  PersonalInfo,
} from '../../domain/models/personal-info/personal-info.model';

// ========================================
// Applicant Draft State Service
// ========================================

@Injectable()
export class ApplicantDraftStateService {

  // ========================================
  // Personal Information Draft
  // ========================================

  private readonly _personalDraft =
    signal<PersonalInfo | null>(null);

  readonly personalDraft =
    this._personalDraft.asReadonly();

  // ========================================
  // Identity Version
  // ========================================

  private readonly _identityVersion =
    signal(0);

  readonly identityVersion =
    this._identityVersion.asReadonly();

  // ========================================
  // Computed Draft State
  // ========================================

  readonly hasPersonalDraft = computed(
    () => this._personalDraft() !== null
  );

  readonly applicantFullName = computed(() => {

    const person =
      this._personalDraft();

    if (!person) {
      return '';
    }

    return [
      person.firstName,
      person.middleName,
      person.lastName,
    ]
      .map(value => value?.trim())
      .filter(Boolean)
      .join(' ');
  });

  // ========================================
  // Set Personal Draft
  // ========================================

  setPersonalDraft(
    draft: PersonalInfo | null
  ): boolean {

    const previous =
      this._personalDraft();

    // ======================================
    // Detect Identity Changes
    // ======================================

    const identityChanged =
      previous?.firstName?.trim() !==
        draft?.firstName?.trim() ||
      (previous?.middleName?.trim() || null) !==
        (draft?.middleName?.trim() || null) ||
      previous?.lastName?.trim() !==
        draft?.lastName?.trim() ||
      previous?.dateOfBirth !==
        draft?.dateOfBirth;

    // ======================================
    // Update Draft
    // ======================================

    this._personalDraft.set(
      draft
        ? { ...draft }
        : null
    );

    // ======================================
    // Update Identity Version
    // ======================================

    if (identityChanged) {
      this._identityVersion.update(
        version => version + 1
      );
    }

    return identityChanged;
  }

  // ========================================
  // Clear Personal Draft
  // ========================================

  clearPersonalDraft(): void {

    this.setPersonalDraft(null);
  }

  // ========================================
  // Reset Applicant Draft State
  // ========================================

  reset(): void {

    this._personalDraft.set(null);

    this._identityVersion.set(0);
  }
}

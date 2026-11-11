import { Injectable, signal, computed } from '@angular/core';

// ========================================
// Models
// ========================================

import { NewEmployeeStep } from '../models/new-employee/new-employee-step.model';

import { PersonalInfo } from '../models/personal-info/personal-info.model';

import { PersonMatch } from '../models/personal-info/person-match.model';

import { PersonMatchResponse } from '../models/personal-info/person-match-response.model';

// ========================================
// State Service
// ========================================

@Injectable()
export class NewEmployeeStateService {
  // ========================================
  // Valid Steps
  // ========================================

  private readonly _validSteps = signal<Set<NewEmployeeStep>>(new Set());

  readonly validSteps = this._validSteps.asReadonly();

  // ========================================
  // Verified Steps
  // ========================================

  private readonly _verifiedSteps = signal<Set<NewEmployeeStep>>(new Set());

  readonly verifiedSteps = this._verifiedSteps.asReadonly();

  // ========================================
  // Personal Information Draft
  // ========================================

  private readonly _personalDraft = signal<PersonalInfo | null>(null);

  readonly personalDraft = this._personalDraft.asReadonly();

  // ========================================
  // Person Match Response
  // ========================================

  private readonly _personMatchResponse = signal<PersonMatchResponse | null>(null);

  readonly personMatchResponse = this._personMatchResponse.asReadonly();

  readonly personMatches = computed(() => this._personMatchResponse()?.matches ?? []);

  readonly personMatchStatus = computed(() => this._personMatchResponse()?.status ?? null);

  readonly hasPossibleMatch = computed(
    () => this._personMatchResponse()?.hasPossibleMatch ?? false,
  );

  readonly hasBlocklistMatch = computed(
    () => this._personMatchResponse()?.hasBlocklistMatch ?? false,
  );

  // ========================================
  // Screening Loading State
  // ========================================

  private readonly _isPersonMatchChecking = signal(false);

  readonly isPersonMatchChecking = this._isPersonMatchChecking.asReadonly();

  setPersonMatchChecking(checking: boolean): void {
    this._isPersonMatchChecking.set(checking);
  }

  // ========================================
  // Set Person Match Response
  // ========================================

  setPersonMatchResponse(response: PersonMatchResponse): void {
    this._personMatchResponse.set(response);
  }

  // ========================================
  // Get Person Match by GUID
  // ========================================

  getPersonMatchByGuid(personGuid: string): PersonMatch | null {
    return this.personMatches().find((person) => person.personGuid === personGuid) ?? null;
  }

  // ========================================
  // Clear Person Match
  // ========================================

  clearPersonMatch(): void {
    this._personMatchResponse.set(null);
    this.setVerified('personal-info', false);
  }

  // ========================================
  // Set Step Validity
  // ========================================

  setValid(step: NewEmployeeStep, valid: boolean): void {
    this._validSteps.update((current) => {
      const updated = new Set(current);

      if (valid) {
        updated.add(step);
      } else {
        updated.delete(step);
      }

      return updated;
    });

    if (!valid) {
      this.setVerified(step, false);

      if (step === 'personal-info') {
        this.clearPersonMatch();
      }
    }
  }

  // ========================================
  // Check Step Validity
  // ========================================

  isValid(step: NewEmployeeStep): boolean {
    return this._validSteps().has(step);
  }

  // ========================================
  // Set Step Verification
  // ========================================

  setVerified(step: NewEmployeeStep, verified: boolean): void {
    if (verified && !this.isValid(step)) {
      return;
    }

    this._verifiedSteps.update((current) => {
      const updated = new Set(current);

      if (verified) {
        updated.add(step);
      } else {
        updated.delete(step);
      }

      return updated;
    });
  }

  // ========================================
  // Check Step Verification
  // ========================================

  isVerified(step: NewEmployeeStep): boolean {
    return this._verifiedSteps().has(step);
  }

  // ========================================
  // Set Personal Draft
  // ========================================

  setPersonalDraft(data: PersonalInfo): void {
    const previous = this._personalDraft();

    const identifyingDataChanged =
      previous !== null &&
      (previous.firstName !== data.firstName ||
        previous.middleName !== data.middleName ||
        previous.lastName !== data.lastName ||
        previous.suffixId !== data.suffixId ||
        previous.dateOfBirth !== data.dateOfBirth);

    this._personalDraft.set({ ...data });

    if (identifyingDataChanged) {
      this.clearPersonMatch();
    }
  }

  // ========================================
  // Clear Personal Draft
  // ========================================

  clearPersonalDraft(): void {
    this._personalDraft.set(null);
    this.setValid('personal-info', false);
    this.clearPersonMatch();
  }

  // ========================================
  // Reset New Employee Workflow
  // ========================================

  reset(): void {
    this._validSteps.set(new Set());
    this._verifiedSteps.set(new Set());
    this._personalDraft.set(null);
    this._personMatchResponse.set(null);
    this._isPersonMatchChecking.set(false);
  }
}


import {
  Component,
  computed,
  inject,
} from '@angular/core';

import {
  Router,
} from '@angular/router';

// ========================================
// UI Components
// ========================================

import {
  CxpButton,
} from 'cyberxp-ui';

import {
  PersonMatchListItemComponent,
} from '../person-match-list-item/person-match-list-item';

// ========================================
// Models
// ========================================

import {
  PersonMatch,
} from '../../../../domain/models/shared/person-match/person-match.model';

// ========================================
// State
// ========================================

import {
  NewEmployeeStateService,
} from '../../../../application/state/new-employee-state.service';

// ========================================
// Component
// ========================================

@Component({
  selector: 'cxp-person-match-list',
  standalone: true,

  imports: [
    PersonMatchListItemComponent,
    CxpButton,
  ],

  templateUrl: './person-match-list.html',
  styleUrl: './person-match-list.css',
})
export class PersonMatchListComponent {

  // ========================================
  // Dependencies
  // ========================================

  private readonly router =
    inject(Router);

  readonly newEmployeeState =
    inject(NewEmployeeStateService);

  // ========================================
  // Person Match State
  // ========================================

  readonly matches =
    this.newEmployeeState.personMatches;

  readonly totalMatches =
    this.newEmployeeState.totalMatches;

  readonly hasPossibleMatch =
    this.newEmployeeState.hasPossibleMatch;

  readonly hasPersonMatchResponse =
    this.newEmployeeState.hasPersonMatchResponse;

  readonly isChecking =
    this.newEmployeeState.isPersonMatchChecking;

  readonly errorMessage =
    this.newEmployeeState.personMatchError;

  // ========================================
  // Decision State
  // ========================================

  readonly screeningId =
    this.newEmployeeState.screeningId;

  readonly decisions =
    this.newEmployeeState.personMatchDecisions;

  readonly isDecisionSubmitting =
    this.newEmployeeState.isDecisionSubmitting;

  readonly decisionError =
    this.newEmployeeState.decisionError;

  // ========================================
  // Pending Candidates
  // ========================================

  readonly pendingMatches = computed(() => {

    const screeningId = this.screeningId();

    if (!screeningId) {
      return this.matches();
    }

    return this.matches().filter(
      person =>
        !this.decisions().some(
          decision =>
            decision.screeningId === screeningId &&
            decision.personGuid === person.personGuid
        )
    );
  });

  // ========================================
  // Reviewed Candidates
  // ========================================

  readonly reviewedMatches = computed(() => {

    const screeningId = this.screeningId();

    if (!screeningId) {
      return [];
    }

    return this.matches().filter(
      person =>
        this.decisions().some(
          decision =>
            decision.screeningId === screeningId &&
            decision.personGuid === person.personGuid
        )
    );
  });

  // ========================================
  // Review Counts
  // ========================================

  readonly totalPending = computed(
    () => this.pendingMatches().length
  );

  readonly totalReviewed = computed(
    () => this.reviewedMatches().length
  );

  // ========================================
  // Get Candidate Decision
  // ========================================

  getDecisionCode(
    personGuid: string
  ): string | null {

    const screeningId = this.screeningId();

    if (!screeningId) {
      return null;
    }

    return this.newEmployeeState
      .getPersonMatchDecision(
        screeningId,
        personGuid
      )?.decisionCode ?? null;
  }

  // ========================================
  // Get Candidate Review Label
  // ========================================

  getReviewLabel(
    personGuid: string
  ): string {

    const decisionCode =
      this.getDecisionCode(personGuid);

    switch (decisionCode) {

      case 'SAME_PERSON':
        return 'Same Person Confirmed';

      case 'DIFFERENT_PERSON':
        return 'Different Person';

      case 'ESCALATE':
        return 'Escalated for Review';

      default:
        return 'Pending Review';
    }
  }

  // ========================================
  // Select Person for Comparison
  // ========================================

  compare(person: PersonMatch): void {

    // ======================================
    // Prevent Navigation During Submission
    // ======================================

    if (
      this.isChecking() ||
      this.isDecisionSubmitting()
    ) {
      return;
    }

    // ======================================
    // Verify Selected Match
    // ======================================

    const existingMatch =
      this.newEmployeeState.getPersonMatchByGuid(
        person.personGuid
      );

    if (!existingMatch) {
      return;
    }

    // ======================================
    // Store Selected Person
    // ======================================

    this.newEmployeeState.selectPersonMatch(
      existingMatch.personGuid
    );

    // ======================================
    // Navigate to Comparison
    // ======================================

    void this.router.navigate([
      '/app',
      'new-employee',
      'screening',
      'compare',
      existingMatch.personGuid,
    ]);
  }

  // ========================================
  // Back to Personal Information
  // ========================================

  back(): void {

    if (
      this.isChecking() ||
      this.isDecisionSubmitting()
    ) {
      return;
    }

    void this.router.navigate([
      '/app',
      'new-employee',
      'personal-info',
    ]);
  }
}

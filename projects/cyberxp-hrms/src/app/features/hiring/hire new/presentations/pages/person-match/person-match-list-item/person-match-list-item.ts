
import {
  Component,
  ChangeDetectionStrategy,
  computed,
  input,
  output,
} from '@angular/core';

// ========================================
// Models
// ========================================

import {
  PersonMatch,
} from '../../../../domain/models/shared/person-match/person-match.model';

// ========================================
// UI Components
// ========================================

import {
  CxpClassificationBadge,
} from 'cyberxp-ui';

import type {
  CxpClassificationLevel,
} from 'cyberxp-ui';

// ========================================
// Component
// ========================================

@Component({
  selector: 'cxp-person-match-list-item',
  standalone: true,

  imports: [
    CxpClassificationBadge,
  ],

  templateUrl: './person-match-list-item.html',
  styleUrl: './person-match-list-item.css',

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonMatchListItemComponent {

  // ========================================
  // Person Input
  // ========================================

  readonly person =
    input.required<PersonMatch>();

  // ========================================
  // Decision Input
  // ========================================

  readonly decisionCode =
    input<string | null>(null);

  // ========================================
  // Selection Output
  // ========================================

  readonly selected =
    output<PersonMatch>();

  // ========================================
  // Full Name
  // ========================================

  readonly fullName = computed(() => {

    const person = this.person();

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
  // Person Initials
  // ========================================

  readonly initials = computed(() => {

    const person = this.person();

    const firstInitial =
      person.firstName?.trim().charAt(0) ?? '';

    const lastInitial =
      person.lastName?.trim().charAt(0) ?? '';

    return (
      firstInitial + lastInitial
    ).toUpperCase();
  });

  // ========================================
  // Match Score
  // ========================================

  readonly matchScore = computed(
    () => this.person().personMatchScore
  );

  // ========================================
  // Match Level
  // ========================================

  readonly matchLevel = computed(
    () => this.person().personMatchLevel
  );

  // ========================================
  // Match Level Label
  // ========================================

  readonly matchLevelLabel = computed(() => {

    const level =
      this.matchLevel().trim().toUpperCase();

    switch (level) {

      case 'HIGH':
        return 'High Match';

      case 'MEDIUM':
        return 'Medium Match';

      case 'LOW':
        return 'Low Match';

      case 'NEUTRAL':
        return 'Neutral';

      default:
        return level || 'Unknown Level';
    }
  });

  // ========================================
  // Badge Classification
  // ========================================

  readonly badgeClassification =
    computed<CxpClassificationLevel | null>(() => {

      const level =
        this.matchLevel().trim().toLowerCase();

      switch (level) {

        case 'high':
          return 'high';

        case 'medium':
          return 'medium';

        case 'low':
          return 'low';

        case 'neutral':
          return 'neutral';

        default:
          return null;
      }
    });

  // ========================================
  // Match Method
  // ========================================

  readonly matchMethod = computed(
    () => this.person().personMatchMethod
  );

  // ========================================
  // Decision State
  // ========================================

  readonly hasDecision = computed(
    () => this.decisionCode() !== null
  );

  readonly isPendingReview = computed(
    () => !this.hasDecision()
  );

  readonly isReviewed = computed(
    () => this.hasDecision()
  );

  // ========================================
  // Decision Label
  // ========================================

  readonly decisionLabel = computed(() => {

    const code =
      this.decisionCode()?.trim().toUpperCase();

    switch (code) {

      case 'SAME_PERSON':
        return 'Same Person Confirmed';

      case 'DIFFERENT_PERSON':
        return 'Different Person';

      case 'ESCALATE':
        return 'Escalated for Review';

      default:
        return 'Pending Review';
    }
  });

  // ========================================
  // Select Person
  // ========================================

  selectPerson(): void {

    const person = this.person();

    if (!person.personGuid?.trim()) {
      return;
    }

    this.selected.emit(person);
  }
}

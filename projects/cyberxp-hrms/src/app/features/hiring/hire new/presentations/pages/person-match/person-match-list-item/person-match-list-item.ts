
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

import {
  ReferenceItem,
} from '../../../../../../../shared/models/reference-item.model';

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
  // Classification References Input
  // ========================================

  readonly classifications =
    input<readonly ReferenceItem<number>[]>([]);

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
    () => this.person().matchScore
  );

  // ========================================
  // Classification ID
  // ========================================

  readonly matchClassificationId = computed(
    () => this.person().matchClassificationId
  );

  // ========================================
  // Resolve Classification Reference
  // ========================================

  readonly matchClassification = computed(() => {

    const classificationId =
      this.matchClassificationId();

    return this.classifications().find(
      item => item.id === classificationId
    ) ?? null;
  });

  // ========================================
  // Classification Name
  // ========================================

  readonly matchClassificationName = computed(
    () =>
      this.matchClassification()?.name ??
      'Classification unavailable'
  );

  // ========================================
  // Classification Code
  // ========================================

  readonly matchClassificationCode = computed(
    () =>
      this.matchClassification()?.code ?? null
  );

  // ========================================
  // Badge Classification
  // ========================================

  readonly badgeClassification =
    computed<CxpClassificationLevel | null>(() => {

      const code =
        this.matchClassificationCode()
          ?.trim()
          .toLowerCase();

      switch (code) {

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
  // Match Type
  // ========================================

  readonly matchType = computed(
    () => this.person().matchType
  );

  // ========================================
  // Select Person
  // ========================================

  selectPerson(): void {

    const person = this.person();

    if (!person.personGuid) {
      return;
    }

    this.selected.emit(person);
  }
}

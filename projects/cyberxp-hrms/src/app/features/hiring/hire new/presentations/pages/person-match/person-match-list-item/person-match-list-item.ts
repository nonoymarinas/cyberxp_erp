import { Component, ChangeDetectionStrategy, computed, input, output } from '@angular/core';

// ========================================
// Models
// ========================================

import { PersonMatch } from '../../../../models/personal-info/person-match.model';

// ========================================
// UI Components
// ========================================

import { CxpClassificationBadge } from 'cyberxp-ui';

// ========================================
// Component
// ========================================

@Component({
  selector: 'cxp-person-match-list-item',
  standalone: true,

  imports: [CxpClassificationBadge],

  templateUrl: './person-match-list-item.html',
  styleUrl: './person-match-list-item.css',

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonMatchListItemComponent {
  // ========================================
  // Person Input
  // ========================================

  readonly person = input.required<PersonMatch>();

  // ========================================
  // Selection Output
  // ========================================

  readonly selected = output<PersonMatch>();

  // ========================================
  // Full Name
  // ========================================

  readonly fullName = computed(() => {
    const person = this.person();

    return [person.firstName, person.middleName, person.lastName]
      .map((value) => value?.trim())
      .filter(Boolean)
      .join(' ');
  });

  // ========================================
  // Person Initials
  // ========================================

  readonly initials = computed(() => {
    const person = this.person();

    const firstInitial = person.firstName?.trim().charAt(0) ?? '';

    const lastInitial = person.lastName?.trim().charAt(0) ?? '';

    return (firstInitial + lastInitial).toUpperCase();
  });

  // ========================================
  // Match Score
  // ========================================

  readonly matchScore = computed(() => {
    return this.person().matchScore;
  });

  // ========================================
  // Match Classification
  // ========================================

  readonly matchClassification = computed(() => {
    return this.person().matchClassification;
  });

  // ========================================
  // Match Type
  // ========================================

  readonly matchType = computed(() => {
    return this.person().matchType;
  });

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

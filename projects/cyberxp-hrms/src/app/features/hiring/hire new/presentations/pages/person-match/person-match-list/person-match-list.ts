import { Component, inject, computed } from '@angular/core';

import { Router } from '@angular/router';

// ========================================
// UI Components
// ========================================

import { CxpButton } from 'cyberxp-ui';

import { PersonMatchListItemComponent } from '../person-match-list-item/person-match-list-item';

// ========================================
// Models
// ========================================

import { PersonMatch } from '../../../../models/personal-info/person-match.model';

// ========================================
// State
// ========================================

import { NewEmployeeStateService } from '../../../../state/new-employee-state.service';

// ========================================
// Component
// ========================================

@Component({
  selector: 'cxp-person-match-list',
  standalone: true,

  imports: [PersonMatchListItemComponent, CxpButton],

  templateUrl: './person-match-list.html',
  styleUrl: './person-match-list.css',
})
export class PersonMatchListComponent {
  // ========================================
  // Dependencies
  // ========================================

  private readonly router = inject(Router);

  private readonly newEmployeeState = inject(NewEmployeeStateService);

  // ========================================
  // Person Match State
  // ========================================

  readonly matches = this.newEmployeeState.personMatches;

  readonly matchStatus = this.newEmployeeState.personMatchStatus;

  readonly hasPossibleMatch = this.newEmployeeState.hasPossibleMatch;

  readonly hasBlocklistMatch = this.newEmployeeState.hasBlocklistMatch;

  // ========================================
  // Match Summary
  // ========================================

  readonly totalMatches = computed(() => this.matches().length);

  readonly hasMatches = computed(() => this.totalMatches() > 0);

  // ========================================
  // Select Person for Comparison
  // ========================================

  compare(person: PersonMatch): void {
    // ======================================
    // Verify Selected Match
    // ======================================

    const existingMatch = this.newEmployeeState.getPersonMatchByGuid(person.personGuid);

    if (!existingMatch) {
      return;
    }

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
    void this.router.navigate(['/app', 'new-employee', 'personal-info']);
  }
}

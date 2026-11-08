
import {
  Component,
  inject,
} from '@angular/core';

import {
  Router,
} from '@angular/router';

import {
  PersonMatchListItemComponent,
} from '../person-match-list-item/person-match-list-item';

import {
  PersonMatch,
} from '../../../../models/personal-info/personal-match.model';

import {
  CxpButton,
} from 'cyberxp-ui';

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


  // ========================================
  // Temporary UI Data
  // ========================================

  readonly matches: PersonMatch[] = [

    {
      personGuid: 'mock-person-001',
      personNumber: 'PER000123',
      firstName: 'Juan',
      middleName: 'Santos',
      lastName: 'Dela Cruz',
      dateOfBirth: '1990-05-15',
      matchScore: 96,
      matchType: 'High Similarity',
      matchClassification: 'high',
    },

    {
      personGuid: 'mock-person-002',
      personNumber: 'PER000287',
      firstName: 'Juan',
      middleName: '',
      lastName: 'Dela Cruz',
      dateOfBirth: '1990-05-15',
      matchScore: 88,
      matchType: 'Possible Duplicate',
      matchClassification: 'high',
    },

    {
      personGuid: 'mock-person-003',
      personNumber: 'PER000415',
      firstName: 'Juan',
      middleName: 'S',
      lastName: 'Cruz',
      dateOfBirth: '1991-05-15',
      matchScore: 74,
      matchType: 'Review Required',
      matchClassification: 'medium',
    },
  ];


  // ========================================
  // Select Person for Comparison
  // ========================================

  compare(
    person: PersonMatch,
  ): void {

    this.router.navigate([
      '/app',
      'new-employee',
      'screening',
      'compare',
      person.personGuid,
    ]);
  }


  // ========================================
  // Back to Personal Information
  // ========================================

  back(): void {

    this.router.navigate([
      '/app',
      'new-employee',
      'personal-info',
    ]);
  }
}

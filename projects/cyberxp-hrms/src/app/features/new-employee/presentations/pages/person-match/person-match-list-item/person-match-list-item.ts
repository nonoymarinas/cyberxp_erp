
import {
  Component,
  computed,
  input,
  output,
} from '@angular/core';

import {
  PersonMatch,
} from '../../../../models/personal-info/personal-match.model';

import {
  CxpClassificationBadge,
} from 'cyberxp-ui';


@Component({
  selector: 'cxp-person-match-list-item',
  standalone: true,

  imports: [
    CxpClassificationBadge,
  ],

  templateUrl: './person-match-list-item.html',
  styleUrl: './person-match-list-item.css',
})
export class PersonMatchListItemComponent {

  // ========================================
  // Person Input
  // ========================================

  readonly person =
    input.required<PersonMatch>();


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
      .filter(Boolean)
      .join(' ');
  });


  // ========================================
  // Person Initials
  // ========================================

  readonly initials = computed(() => {

    const person = this.person();

    return (
      (person.firstName?.charAt(0) ?? '') +
      (person.lastName?.charAt(0) ?? '')
    ).toUpperCase();
  });


  // ========================================
  // Select Person
  // ========================================

  selectPerson(): void {

    this.selected.emit(
      this.person()
    );
  }
}

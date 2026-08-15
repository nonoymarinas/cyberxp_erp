import { Component } from '@angular/core';
import { CxpButton, CxpDisplayField, CxpIconAddressNav, CxpInputText, CxpContactList, CxpIconLockNav, CxpIconChevronApp, CxpInputSelect } from 'cyberxp-ui';

export interface EmployeeContact {
  mobileNo: string;
  landlineNo: string;
  emailAddress: string;
}

@Component({
  selector: 'contacts',
  standalone: true,
  imports: [
    CxpButton,
    CxpDisplayField,
    CxpIconAddressNav,
    CxpInputText,
    CxpContactList,
    CxpIconLockNav,
    CxpIconChevronApp,
    CxpInputSelect
],
  templateUrl: './contacts.html',
  styleUrl: './contacts.css',
})
export class ContactsComponent {
  isEditing = false;

  contact: EmployeeContact = {
    mobileNo: '0917 123 4567',
    landlineNo: '(034) 471 1234',
    emailAddress: 'employee@example.com',
  };

  private originalContact: EmployeeContact = {
    ...this.contact,
  };

  startEdit(): void {
    this.originalContact = {
      ...this.contact,
    };

    this.isEditing = true;
  }

  cancelEdit(): void {
    this.contact = {
      ...this.originalContact,
    };

    this.isEditing = false;
  }

  saveContact(): void {
    this.originalContact = {
      ...this.contact,
    };

    this.isEditing = false;

    console.log('Saved contact details:', this.contact);
  }
}
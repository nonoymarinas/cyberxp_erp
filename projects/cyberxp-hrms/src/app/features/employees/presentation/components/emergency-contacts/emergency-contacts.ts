import { Component } from '@angular/core';
import {
  CxpButton,
  CxpDisplayField,
  CxpIconAddressNav,
  CxpInputText,
} from 'cyberxp-ui';

export interface EmployeeEmergencyContact {
  contactPerson: string;
  contactNumber: string;
  completeAddress: string;
  relationship: string;
}

@Component({
  selector: 'emergency-contacts',
  standalone: true,
  imports: [
    CxpButton,
    CxpDisplayField,
    CxpIconAddressNav,
    CxpInputText,
  ],
  templateUrl: './emergency-contacts.html',
  styleUrl: './emergency-contacts.css',
})
export class EmergencyContacts {
  isEditing = false;

  emergencyContact: EmployeeEmergencyContact = {
    contactPerson: 'Juan Dela Cruz',
    contactNumber: '0917 123 4567',
    completeAddress: '123 Sample Street, Kabankalan City, Negros Occidental',
    relationship: 'Brother',
  };

  private originalEmergencyContact: EmployeeEmergencyContact = {
    ...this.emergencyContact,
  };

  startEdit(): void {
    this.originalEmergencyContact = {
      ...this.emergencyContact,
    };

    this.isEditing = true;
  }

  cancelEdit(): void {
    this.emergencyContact = {
      ...this.originalEmergencyContact,
    };

    this.isEditing = false;
  }

  saveEmergencyContact(): void {
    this.originalEmergencyContact = {
      ...this.emergencyContact,
    };

    this.isEditing = false;

    console.log('Saved emergency contact:', this.emergencyContact);
  }
}
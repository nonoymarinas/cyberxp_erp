import {
  ChangeDetectorRef,
  Component,
  Injector,
  OnInit,
  effect,
  inject,
} from '@angular/core';

import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import {
  CxpButton,
  CxpContactList,
  CxpDisplayField,
  CxpIconAddressNav,
  CxpIconChevronApp,
  CxpIconLockNav,
  CxpInputSelect,
  CxpInputText,
} from 'cyberxp-ui';

import type {
  CxpSelectOption,
  CxpSelectPrimitive,
} from 'cyberxp-ui';

import {
  EmployeeState,
} from '../../../state/employee-state.service';

import {
  ContactRefService,
} from '../../../business/services/contact-ref.service';

import {
  ContactService,
} from '../../../business/services/contact.service';

import {
  EmployeeContact,
  SaveContactRequest,
} from '../../../models/domain/contact.model';

@Component({
  selector: 'employee-contacts',
  standalone: true,

  imports: [
    ReactiveFormsModule,

    CxpButton,
    CxpContactList,
    CxpDisplayField,

    CxpIconAddressNav,
    CxpIconChevronApp,
    CxpIconLockNav,

    CxpInputSelect,
    CxpInputText,
  ],

  templateUrl:
    './contacts.html',

  styleUrl:
    './contacts.css',
})
export class ContactsComponent
  implements OnInit {

  // ========================================
  // Services
  // ========================================

  private readonly contactRefService =
    inject(ContactRefService);

  private readonly contactService =
    inject(ContactService);

  private readonly cdr =
    inject(ChangeDetectorRef);

  private readonly injector =
    inject(Injector);

  constructor(
    public readonly employeeState:
      EmployeeState,
  ) {}

  // ========================================
  // Employee State
  // ========================================

  get employeeGuid():
    string | null {
    return (
      this.employeeState
        .employeeData()
        ?.personalInfo
        .employeeGuid ??
      null
    );
  }

  get hasEmployeeGuid():
    boolean {
    return (
      this.employeeGuid !==
      null
    );
  }

  // ========================================
  // Loaded Employee
  // ========================================

  private loadedEmployeeGuid:
    string | null = null;

  // ========================================
  // Contact State
  // ========================================

  contacts:
    EmployeeContact[] = [];

  selectedContact:
    EmployeeContact | null =
      null;

  showContactList =
    true;

  isEditing =
    false;

  isLoadingReferences =
    false;

  isLoadingContacts =
    false;

  isSaving =
    false;

  isDeleting =
    false;

  errorMessage =
    '';

  successMessage =
    '';

  // ========================================
  // Helpers
  // ========================================

  get hasContacts():
    boolean {
    return (
      this.contacts.length >
      0
    );
  }

  get isLoading():
    boolean {
    return (
      this.isLoadingReferences ||
      this.isLoadingContacts
    );
  }

  get contactToggleLabel():
    string {
    return this.showContactList
      ? 'Hide contacts'
      : 'Show contacts';
  }

  // ========================================
  // Select Options
  // ========================================

  contactTypeOptions:
    CxpSelectOption[] = [];

  contactScopeOptions:
    CxpSelectOption[] = [];

  // ========================================
  // Form
  // ========================================

  readonly contactForm =
    new FormGroup({
      contactTypeId:
        new FormControl<
          string | null
        >(
          {
            value: null,
            disabled: false,
          },
          {
            validators: [
              Validators.required,
            ],
          },
        ),

      contactScopeId:
        new FormControl<
          string | null
        >(
          {
            value: null,
            disabled: false,
          },
          {
            validators: [
              Validators.required,
            ],
          },
        ),

      value:
        new FormControl<
          string | null
        >(
          {
            value: null,
            disabled: false,
          },
          {
            validators: [
              Validators.required,
            ],
          },
        ),

      isPrimary:
        new FormControl<boolean>(
          {
            value: false,
            disabled: false,
          },
          {
            nonNullable: true,
          },
        ),
    });

  // ========================================
  // Init
  // ========================================

  ngOnInit(): void {
    this.contactForm.disable({
      emitEvent: false,
    });

    effect(
      () => {
        const employeeGuid =
          this.employeeGuid;

        this.handleEmployeeGuidChange(
          employeeGuid,
        );
      },
      {
        injector:
          this.injector,
      },
    );
  }

  // ========================================
  // Employee Change
  // ========================================

  private handleEmployeeGuidChange(
    employeeGuid:
      string | null,
  ): void {
    if (!employeeGuid) {
      this.loadedEmployeeGuid =
        null;

      this.resetContactFeature();

      return;
    }

    if (
      this.loadedEmployeeGuid ===
      employeeGuid
    ) {
      return;
    }

    this.loadedEmployeeGuid =
      employeeGuid;

    this.contacts =
      [];

    this.selectedContact =
      null;

    this.showContactList =
      true;

    this.isEditing =
      false;

    this.errorMessage =
      '';

    this.successMessage =
      '';

    this.resetForm();

    this.contactForm.disable({
      emitEvent: false,
    });

    this.loadContactReferences();

    this.loadContacts(
      employeeGuid,
    );
  }

  // ========================================
  // Load References
  // ========================================

  private loadContactReferences():
    void {
    this.isLoadingReferences =
      true;

    this.contactRefService
      .getReferenceOptions()
      .subscribe({
        next: (options) => {
          this.contactTypeOptions =
            options
              .contactTypeOptions;

          this.contactScopeOptions =
            options
              .contactScopeOptions;

          this.isLoadingReferences =
            false;

          this.cdr.detectChanges();
        },

        error: (
          error: unknown,
        ) => {
          console.error(
            'Failed to load contact references:',
            error,
          );

          this.contactTypeOptions =
            [];

          this.contactScopeOptions =
            [];

          this.isLoadingReferences =
            false;

          this.errorMessage =
            'Unable to load contact reference data.';

          this.cdr.detectChanges();
        },
      });
  }

  // ========================================
  // Load Contacts
  // ========================================

  private loadContacts(
    employeeGuid: string,
  ): void {
    this.isLoadingContacts =
      true;

    this.contactService
      .getContacts(employeeGuid)
      .subscribe({
        next: (
          contacts:
            EmployeeContact[],
        ) => {
          this.contacts =
            contacts;

          this.isLoadingContacts =
            false;

          this.selectedContact =
            null;

          this.isEditing =
            false;

          this.showContactList =
            true;

          this.contactForm.disable({
            emitEvent: false,
          });

          this.cdr.detectChanges();
        },

        error: (
          error: unknown,
        ) => {
          console.error(
            'Failed to load contacts:',
            error,
          );

          this.contacts =
            [];

          this.isLoadingContacts =
            false;

          this.errorMessage =
            'Unable to load employee contacts.';

          this.cdr.detectChanges();
        },
      });
  }

  // ========================================
  // Toggle Contact List
  // ========================================

  toggleContactList():
    void {
    if (
      !this.hasEmployeeGuid
    ) {
      return;
    }

    if (
      !this.hasContacts
    ) {
      return;
    }

    this.showContactList =
      !this.showContactList;

    if (
      this.showContactList
    ) {
      this.selectedContact =
        null;

      this.isEditing =
        false;

      this.resetForm();

      this.contactForm.disable({
        emitEvent: false,
      });

      this.errorMessage =
        '';

      this.successMessage =
        '';
    }
  }

  // ========================================
  // Add Contact
  // ========================================

  addContact():
    void {
    if (
      !this.hasEmployeeGuid
    ) {
      this.errorMessage =
        'Save personal information first.';

      return;
    }

    if (
      this.isLoadingReferences
    ) {
      return;
    }

    if (
      this.contactTypeOptions
        .length === 0 ||
      this.contactScopeOptions
        .length === 0
    ) {
      this.errorMessage =
        'Contact reference data is not available.';

      return;
    }

    this.selectedContact =
      null;

    this.showContactList =
      false;

    this.isEditing =
      true;

    this.errorMessage =
      '';

    this.successMessage =
      '';

    this.resetForm();

    this.contactForm.enable({
      emitEvent: false,
    });

    this.cdr.detectChanges();
  }

  // ========================================
  // Select Contact
  // ========================================

  selectContact(
    contact:
      EmployeeContact,
  ): void {
    this.selectedContact =
      contact;

    this.showContactList =
      false;

    this.isEditing =
      false;

    this.errorMessage =
      '';

    this.successMessage =
      '';

    this.populateContact(
      contact,
    );

    this.contactForm.disable({
      emitEvent: false,
    });

    this.cdr.detectChanges();
  }

  // ========================================
  // Edit Contact
  // ========================================

  editContact(
    contact:
      EmployeeContact,
  ): void {
    if (
      !contact.contactId
    ) {
      this.errorMessage =
        'Contact ID is not available.';

      return;
    }

    this.selectedContact =
      contact;

    this.showContactList =
      false;

    this.isEditing =
      true;

    this.errorMessage =
      '';

    this.successMessage =
      '';

    this.populateContact(
      contact,
    );

    this.contactForm.enable({
      emitEvent: false,
    });

    this.cdr.detectChanges();
  }

  // ========================================
  // Populate Contact
  // ========================================

  private populateContact(
    contact:
      EmployeeContact,
  ): void {
    this.contactForm.patchValue(
      {
        contactTypeId:
          contact
            .contactTypeId,

        contactScopeId:
          contact
            .contactScopeId,

        value:
          contact.value,

        isPrimary:
          contact.isPrimary ??
          false,
      },
      {
        emitEvent: false,
      },
    );

    this.contactForm
      .markAsPristine();

    this.contactForm
      .markAsUntouched();
  }

  // ========================================
  // Cancel
  // ========================================

  cancelEdit():
    void {
    this.errorMessage =
      '';

    this.successMessage =
      '';

    // Existing contact
    if (
      this.selectedContact
    ) {
      this.populateContact(
        this.selectedContact,
      );

      this.isEditing =
        false;

      this.contactForm.disable({
        emitEvent: false,
      });

      this.cdr.detectChanges();

      return;
    }

    // New contact
    this.resetForm();

    this.isEditing =
      false;

    this.selectedContact =
      null;

    this.showContactList =
      this.hasContacts;

    this.contactForm.disable({
      emitEvent: false,
    });

    this.cdr.detectChanges();
  }

  // ========================================
  // Save Contact
  // ========================================

  saveContact():
    void {
    const employeeGuid =
      this.employeeGuid;

    if (!employeeGuid) {
      this.errorMessage =
        'Save personal information first.';

      return;
    }

    this.contactForm
      .markAllAsTouched();

    if (
      this.contactForm.invalid
    ) {
      this.errorMessage =
        'Please fill in all required contact fields.';

      return;
    }

    const formValue =
      this.contactForm
        .getRawValue();

    const contactId =
      this.selectedContact
        ?.contactId ??
      null;

    const isCreating =
      contactId === null;

    const request:
      SaveContactRequest = {
        employeeGuid,

        contactId,

        contactTypeId:
          formValue
            .contactTypeId,

        contactScopeId:
          formValue
            .contactScopeId,

        value:
          formValue.value,

        isPrimary:
          formValue.isPrimary,
      };

    this.isSaving =
      true;

    this.errorMessage =
      '';

    this.successMessage =
      '';

    this.contactService
      .saveContact(request)
      .subscribe({
        next: (
          contacts:
            EmployeeContact[],
        ) => {
          this.contacts =
            contacts;

          this.isSaving =
            false;

          this.isEditing =
            false;

          this.selectedContact =
            null;

          this.showContactList =
            true;

          this.successMessage =
            isCreating
              ? 'Contact saved successfully.'
              : 'Contact updated successfully.';

          this.resetForm();

          this.contactForm.disable({
            emitEvent: false,
          });

          this.cdr.detectChanges();
        },

        error: (
          error: unknown,
        ) => {
          console.error(
            'Failed to save contact:',
            error,
          );

          this.isSaving =
            false;

          this.errorMessage =
            isCreating
              ? 'Unable to save contact.'
              : 'Unable to update contact.';

          this.cdr.detectChanges();
        },
      });
  }

  // ========================================
  // Delete Contact
  // ========================================

  deleteContact(
    contact?:
      EmployeeContact,
  ): void {
    const employeeGuid =
      this.employeeGuid;

    const contactToDelete =
      contact ??
      this.selectedContact;

    const contactId =
      contactToDelete
        ?.contactId ??
      null;

    if (
      !employeeGuid ||
      !contactId
    ) {
      return;
    }

    this.isDeleting =
      true;

    this.errorMessage =
      '';

    this.successMessage =
      '';

    this.contactService
      .deleteContact(
        employeeGuid,
        contactId,
      )
      .subscribe({
        next: (
          contacts:
            EmployeeContact[],
        ) => {
          this.contacts =
            contacts;

          this.isDeleting =
            false;

          this.isEditing =
            false;

          this.selectedContact =
            null;

          this.showContactList =
            contacts.length > 0;

          this.resetForm();

          this.contactForm.disable({
            emitEvent: false,
          });

          this.successMessage =
            'Contact deleted successfully.';

          this.cdr.detectChanges();
        },

        error: (
          error: unknown,
        ) => {
          console.error(
            'Failed to delete contact:',
            error,
          );

          this.isDeleting =
            false;

          this.errorMessage =
            'Unable to delete contact.';

          this.cdr.detectChanges();
        },
      });
  }

  // ========================================
  // Reset Form
  // ========================================

  private resetForm():
    void {
    this.contactForm.reset(
      {
        contactTypeId:
          null,

        contactScopeId:
          null,

        value:
          null,

        isPrimary:
          false,
      },
      {
        emitEvent: false,
      },
    );

    this.contactForm
      .markAsPristine();

    this.contactForm
      .markAsUntouched();
  }

  // ========================================
  // Reset Feature
  // ========================================

  private resetContactFeature():
    void {
    this.contacts =
      [];

    this.selectedContact =
      null;

    this.showContactList =
      false;

    this.isEditing =
      false;

    this.isLoadingContacts =
      false;

    this.isSaving =
      false;

    this.isDeleting =
      false;

    this.errorMessage =
      '';

    this.successMessage =
      '';

    this.resetForm();

    this.contactForm.disable({
      emitEvent: false,
    });

    this.cdr.detectChanges();
  }

  // ========================================
  // Reference Label
  // ========================================

  getReferenceLabel(
    options:
      CxpSelectOption[],

    selectedValue:
      CxpSelectPrimitive |
      null,
  ): string {
    if (
      selectedValue ===
        null ||
      selectedValue ===
        undefined
    ) {
      return '—';
    }

    const option =
      options.find(
        (item) =>
          String(
            item.value,
          ) ===
          String(
            selectedValue,
          ),
      );

    return (
      option?.label ??
      '—'
    );
  }

  // ========================================
  // Contact Type Label
  // ========================================

  getContactTypeLabel(
    contact:
      EmployeeContact,
  ): string {
    return this.getReferenceLabel(
      this.contactTypeOptions,
      contact.contactTypeId,
    );
  }

  // ========================================
  // Contact Scope Label
  // ========================================

  getContactScopeLabel(
    contact:
      EmployeeContact,
  ): string {
    return this.getReferenceLabel(
      this.contactScopeOptions,
      contact.contactScopeId,
    );
  }
}
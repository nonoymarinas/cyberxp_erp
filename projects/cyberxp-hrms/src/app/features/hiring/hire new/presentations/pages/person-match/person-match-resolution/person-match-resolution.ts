
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  computed,
  inject,
} from '@angular/core';

import {
  ActivatedRoute,
  Router,
} from '@angular/router';

import {
  takeUntilDestroyed,
} from '@angular/core/rxjs-interop';

import {
  CxpButton,
  CxpClassificationBadge,
} from 'cyberxp-ui';

// ========================================
// Models
// ========================================

import type {
  PersonResolutionAction,
} from '../../../../domain/models/shared/person-match-resolution/person-match-resolution-type-ref.model';

// ========================================
// Resolution Service
// ========================================

import {
  PersonMatchResolutionService,
} from '../../../../application/services/person-match-resolution.service';

// ========================================
// Wizard State
// ========================================

import {
  NewEmployeeStateService,
} from '../../../../application/state/new-employee-state.service';

// ========================================
// Person Match Resolution Component
// ========================================

@Component({
  selector: 'cxp-person-match-resolution',
  standalone: true,

  imports: [
    CxpButton,
    CxpClassificationBadge,
  ],

  templateUrl: './person-match-resolution.html',
  styleUrl: './person-match-resolution.css',

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonMatchResolutionComponent {

  // ========================================
  // Dependencies
  // ========================================

  private readonly route =
    inject(ActivatedRoute);

  private readonly router =
    inject(Router);

  private readonly destroyRef =
    inject(DestroyRef);

  private readonly resolutionService =
    inject(PersonMatchResolutionService);

  private readonly wizardState =
    inject(NewEmployeeStateService);

  // ========================================
  // Shared Resolution State
  // ========================================

  readonly resolution =
    this.wizardState.personMatchResolution;

  readonly isLoading =
    this.wizardState.isResolutionLoading;

  readonly errorMessage = computed(
    () => this.wizardState.resolutionError() ?? ''
  );

  // ========================================
  // Screening State
  // ========================================

  readonly screeningId =
    this.wizardState.screeningId;

  readonly screeningStatusCode =
    this.wizardState.screeningStatusCode;

  // ========================================
  // Confirmed Decision State
  // ========================================

  readonly hasConfirmedDecision = computed(() => {

    const screeningId =
      this.screeningId();

    const personGuid =
      this.route.snapshot.paramMap.get('personGuid');

    if (!screeningId || !personGuid) {
      return false;
    }

    // Establish reactive dependency.
    this.wizardState.personMatchDecisions();

    const decision =
      this.wizardState.getPersonMatchDecision(
        screeningId,
        personGuid
      );

    return decision?.decisionCode === 'SAME_PERSON';
  });

  // ========================================
  // Computed Resolution State
  // ========================================

  readonly isBlocklisted = computed(
    () => this.resolution()?.isBlocklisted ?? false
  );

  readonly canRehire = computed(
    () => this.hasAction('REHIRE')
  );

  readonly canReactivate = computed(
    () => this.hasAction('REACTIVATE')
  );

  readonly canHireExisting = computed(
    () => this.hasAction('HIRE_EXISTING')
  );

  readonly canViewEmployee = computed(
    () => this.hasAction('VIEW_EMPLOYEE')
  );

  readonly canReviewBlocklist = computed(
    () => this.hasAction('BLOCKLIST_REVIEW')
  );

  readonly hasAvailableActions = computed(
    () =>
      this.canRehire() ||
      this.canReactivate() ||
      this.canHireExisting() ||
      this.canViewEmployee() ||
      this.canReviewBlocklist()
  );

  // ========================================
  // Constructor
  // ========================================

  constructor() {
    this.loadResolution();
  }

  // ========================================
  // Load Person Resolution
  // ========================================

  loadResolution(): void {

    const personGuid =
      this.route.snapshot.paramMap.get('personGuid');

    const screeningId =
      this.screeningId();

    // ======================================
    // Validate Screening Session
    // ======================================

    if (!personGuid || !screeningId) {

      this.wizardState.clearPersonMatchResolution();

      this.wizardState.setResolutionError(
        'A valid screening session and person are required.'
      );

      return;
    }

    // ======================================
    // Validate Selected Person
    // ======================================

    const person =
      this.wizardState.getPersonMatchByGuid(
        personGuid
      );

    if (!person) {

      this.wizardState.clearPersonMatchResolution();

      this.wizardState.setResolutionError(
        'The selected person does not belong to the current screening.'
      );

      return;
    }

    // ======================================
    // Validate Saved Decision
    // ======================================

    const decision =
      this.wizardState.getPersonMatchDecision(
        screeningId,
        personGuid
      );

    if (
      !decision ||
      decision.decisionCode !== 'SAME_PERSON'
    ) {

      this.wizardState.clearPersonMatchResolution();

      this.wizardState.setResolutionError(
        'A saved Same Person decision is required before resolution.'
      );

      return;
    }

    // ======================================
    // Load Resolution Through Service
    // ======================================

    this.resolutionService
      .getResolution({
        screeningId,
        personGuid,
      })
      .pipe(
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({

        // ====================================
        // Resolution Loaded
        // ====================================

        next: () => {

          // Resolution is already stored
          // in NewEmployeeStateService.
        },

        // ====================================
        // Load Failed
        // ====================================

        error: () => {

          // Error is already stored
          // in NewEmployeeStateService.
        },
      });
  }

  // ========================================
  // Action Authorization
  // ========================================

  private hasAction(
    action: PersonResolutionAction
  ): boolean {

    const person =
      this.resolution();

    if (
      !person ||
      !this.hasConfirmedDecision() ||
      this.isLoading()
    ) {
      return false;
    }

    // ======================================
    // Blocklist Restrictions
    // ======================================

    if (
      person.isBlocklisted &&
      (
        action === 'REHIRE' ||
        action === 'REACTIVATE' ||
        action === 'HIRE_EXISTING'
      )
    ) {
      return false;
    }

    // ======================================
    // Active Employee Restrictions
    // ======================================

    if (
      person.employmentStatus === 'ACTIVE' &&
      (
        action === 'REHIRE' ||
        action === 'HIRE_EXISTING'
      )
    ) {
      return false;
    }

    // ======================================
    // Backend-Provided Allowed Actions
    // ======================================

    return person.allowedActions.includes(
      action
    );
  }

  // ========================================
  // Rehire
  // ========================================

  rehire(): void {

    const person =
      this.resolution();

    if (!person || !this.canRehire()) {
      return;
    }

    void this.router.navigate([
      '/app',
      'employees',
      'rehire',
      person.personGuid,
    ]);
  }

  // ========================================
  // Reactivate
  // ========================================

  reactivate(): void {

    const person =
      this.resolution();

    if (!person || !this.canReactivate()) {
      return;
    }

    void this.router.navigate([
      '/app',
      'employees',
      'reactivate',
      person.personGuid,
    ]);
  }

  // ========================================
  // Hire Existing Person
  // ========================================

  hireExisting(): void {

    const person =
      this.resolution();

    if (!person || !this.canHireExisting()) {
      return;
    }

    void this.router.navigate([
      '/app',
      'employees',
      'hire-existing',
      person.personGuid,
    ]);
  }

  // ========================================
  // View Employee
  // ========================================

  viewEmployee(): void {

    const person =
      this.resolution();

    if (!person || !this.canViewEmployee()) {
      return;
    }

    void this.router.navigate([
      '/app',
      'employees',
      'person',
      person.personGuid,
    ]);
  }

  // ========================================
  // Review Blocklist
  // ========================================

  reviewBlocklist(): void {

    const person =
      this.resolution();

    if (!person || !this.canReviewBlocklist()) {
      return;
    }

    void this.router.navigate([
      '/app',
      'employees',
      'blocklist-review',
      person.personGuid,
    ]);
  }

  // ========================================
  // Back to New Employee
  // ========================================

  backToNewEmployee(): void {

    void this.router.navigate([
      '/app',
      'new-employee',
      'personal-info',
    ]);
  }

  // ========================================
  // Back to Match List
  // ========================================

  backToMatches(): void {

    void this.router.navigate([
      '/app',
      'new-employee',
      'screening',
    ]);
  }
}

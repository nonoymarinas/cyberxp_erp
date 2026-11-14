
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  computed,
  inject,
  signal,
} from '@angular/core';

import {
  ActivatedRoute,
  Router,
} from '@angular/router';

import { finalize } from 'rxjs';

import {
  takeUntilDestroyed,
} from '@angular/core/rxjs-interop';

import {
  CxpButton,
  CxpClassificationBadge,
} from 'cyberxp-ui';

import {
  PersonMatchResolution,
  PersonResolutionAction,
} from '../../../../models/personal-info/person-match-resolution.model';

import {
  PersonMatchService,
} from '../../../../business/services/person-match.services';

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

  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  private readonly personMatchService =
    inject(PersonMatchService);

  // ========================================
  // State
  // ========================================

  readonly resolution =
    signal<PersonMatchResolution | null>(null);

  readonly isLoading = signal(false);

  readonly errorMessage = signal('');

  // ========================================
  // Computed State
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

    if (!personGuid) {
      this.resolution.set(null);
      this.errorMessage.set('Person GUID is missing.');
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');
    this.resolution.set(null);

    this.personMatchService
      .getResolution(personGuid)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.isLoading.set(false))
      )
      .subscribe({
        next: (result) => {
          this.resolution.set(result);
        },

        error: (error: unknown) => {
          this.errorMessage.set(
            error instanceof Error
              ? error.message
              : 'Unable to load person resolution.'
          );
        },
      });
  }

  // ========================================
  // Action Authorization
  // ========================================

  private hasAction(
    action: PersonResolutionAction
  ): boolean {

    const person = this.resolution();

    if (!person) {
      return false;
    }

    // Blocklisted persons cannot be
    // rehired, reactivated, or hired.

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

    // Active employees cannot be rehired
    // or hired again as existing persons.

    if (
      person.employmentStatus === 'ACTIVE' &&
      (
        action === 'REHIRE' ||
        action === 'HIRE_EXISTING'
      )
    ) {
      return false;
    }

    // Backend-provided allowed actions.

    return person.allowedActions.includes(action);
  }

  // ========================================
  // Rehire
  // ========================================

  rehire(): void {

    const person = this.resolution();

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

    const person = this.resolution();

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

    const person = this.resolution();

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

    const person = this.resolution();

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

    const person = this.resolution();

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

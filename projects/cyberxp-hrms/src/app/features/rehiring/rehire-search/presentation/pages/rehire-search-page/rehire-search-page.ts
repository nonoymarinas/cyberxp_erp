
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  computed,
  inject,
  signal,
} from '@angular/core';

import {
  Router,
} from '@angular/router';

import {
  takeUntilDestroyed,
} from '@angular/core/rxjs-interop';

// ========================================
// CyberXP UI Components
// ========================================

import {
  CxpButton,
  CxpInputSearch,
} from 'cyberxp-ui';

// ========================================
// Application Service
// ========================================

import {
  RehireSearchService,
} from '../../../application/services/rehire-search.service';

// ========================================
// Application State
// ========================================

import {
  RehireSearchStateService,
} from '../../../application/states/rehire-search-state.service';

// ========================================
// Shared Reference State
// ========================================

import {
  NewEmployeeRefStateService,
} from '../../../../../../core/application/states/new-employee-ref-state.service';

// ========================================
// Domain Models
// ========================================

import type {
  RehireSearchEmployee,
} from '../../../domain/models/rehire-search-result.model';

/* ========================================
   Rehire Search Page
   ======================================== */

@Component({
  selector: 'cxp-rehire-search-page',

  standalone: true,

  imports: [
    CxpButton,
    CxpInputSearch,
  ],

  providers: [
    RehireSearchStateService,
    RehireSearchService,
  ],

  templateUrl: './rehire-search-page.html',
  styleUrl: './rehire-search-page.css',

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RehireSearchPage {

  // ======================================
  // Dependencies
  // ======================================

  private readonly router = inject(Router);

  private readonly destroyRef = inject(
    DestroyRef
  );

  private readonly searchService = inject(
    RehireSearchService
  );

  private readonly searchState = inject(
    RehireSearchStateService
  );

  private readonly refState = inject(
    NewEmployeeRefStateService
  );

  // ======================================
  // Search State
  // ======================================

  readonly searchTerm =
    this.searchState.keyword;

  readonly submittedKeyword =
    signal<string | null>(null);

  readonly hasSearched =
    this.searchState.hasSearched;

  readonly loading =
    this.searchState.isLoading;

  readonly error =
    this.searchState.errorMessage;

  // ======================================
  // Search Results
  // ======================================

  readonly searchResults =
    this.searchState.employees;

  readonly searchResultCount = computed(
    () => this.searchResults().length
  );

  readonly totalRecords =
    this.searchState.totalRecords;

  readonly hasResults =
    this.searchState.hasResults;

  // ======================================
  // Pagination
  // ======================================

  readonly pageNumber =
    this.searchState.pageNumber;

  readonly pageSize =
    this.searchState.pageSize;

  readonly totalPages =
    this.searchState.totalPages;

  readonly canPreviousPage = computed(
    () =>
      this.pageNumber() > 1 &&
      !this.loading()
  );

  readonly canNextPage = computed(
    () =>
      this.pageNumber() < this.totalPages() &&
      !this.loading()
  );

  // ======================================
  // Employment Status References
  // ======================================

  readonly employmentStatuses =
    this.refState.employmentStatuses;

  // ======================================
  // Computed Search State
  // ======================================

  readonly canSearch = computed(() => {

    return (
      this.searchTerm().trim().length > 0 &&
      !this.loading()
    );
  });

  // ======================================
  // Search Input Change
  // ======================================

  onSearchChange(value: string): void {

    this.searchState.setKeyword(value);
  }

  // ======================================
  // Execute Employee Search
  // ======================================

  searchEmployees(): void {

    if (!this.canSearch()) {
      return;
    }

    this.submittedKeyword.set(
      this.searchTerm().trim()
    );

    this.executeSearch(true);
  }

  // ======================================
  // Execute Search Request
  // ======================================

  private executeSearch(
    firstPage: boolean
  ): void {

    const search$ = firstPage
      ? this.searchService.searchFirstPage()
      : this.searchService.search();

    search$
      .pipe(
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: () => {
          // Results are updated by
          // RehireSearchService.
        },
        error: () => {
          // Error is stored in
          // RehireSearchStateService.
        },
      });
  }

  // ======================================
  // Clear Search
  // ======================================

  clearSearch(): void {

    if (this.loading()) {
      return;
    }

    this.searchService.clear();

    this.submittedKeyword.set(null);
  }

  // ======================================
  // Previous Page
  // ======================================

  previousPage(): void {

    if (!this.canPreviousPage()) {
      return;
    }

    this.searchState.setPageNumber(
      this.pageNumber() - 1
    );

    this.executeSearch(false);
  }

  // ======================================
  // Next Page
  // ======================================

  nextPage(): void {

    if (!this.canNextPage()) {
      return;
    }

    this.searchState.setPageNumber(
      this.pageNumber() + 1
    );

    this.executeSearch(false);
  }

  // ======================================
  // Change Page Size
  // ======================================

  onPageSizeChange(value: number): void {

    if (this.loading()) {
      return;
    }

    const hadSearched =
      this.hasSearched();

    this.searchState.setPageSize(value);

    if (
      hadSearched &&
      this.searchTerm().trim()
    ) {
      this.executeSearch(true);
    }
  }

  // ======================================
  // Employee Full Name
  // ======================================

  getFullName(
    employee: RehireSearchEmployee
  ): string {

    return employee.fullName;
  }

  // ======================================
  // Employment Status Label
  // ======================================

  getEmploymentStatusLabel(
    status: string
  ): string {

    const reference =
      this.employmentStatuses().find(
        item => item.code === status
      );

    return reference?.name ?? status;
  }

  // ======================================
  // Select Employee
  // ======================================

  selectEmployee(
    employee: RehireSearchEmployee
  ): void {

    const personGuid =
      employee.personGuid?.trim();

    if (!personGuid) {

      console.error(
        'Cannot select employee: personGuid is missing.'
      );

      return;
    }

    // Selection does not approve rehire.
    // Eligibility must be verified by
    // the Rehire Service.

    void this.router.navigate([
      '/app',
      'rehire',
      personGuid,
    ]);
  }
}

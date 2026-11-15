
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';

import {
  Router,
} from '@angular/router';

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
  RehireSearchState,
} from '../../../application/state/rehire-search.state';

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
    RehireSearchState,
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

  private readonly searchService =
    inject(RehireSearchService);

  // ======================================
  // Search State
  // ======================================

  readonly searchTerm =
    this.searchService.keyword;

  readonly submittedKeyword =
    signal<string | null>(null);

  readonly hasSearched =
    this.searchService.hasSearched;

  readonly loading =
    this.searchService.loading;

  readonly error =
    this.searchService.error;

  // ======================================
  // Search Results
  // ======================================

  readonly searchResults =
    this.searchService.employees;

  readonly searchResultCount =
    computed(() => this.searchResults().length);

  readonly totalRecords =
    this.searchService.totalRecords;

  readonly hasResults =
    this.searchService.hasResults;

  // ======================================
  // Pagination
  // ======================================

  readonly pageNumber =
    this.searchService.pageNumber;

  readonly pageSize =
    this.searchService.pageSize;

  readonly totalPages =
    this.searchService.totalPages;

  readonly canPreviousPage =
    this.searchService.canPreviousPage;

  readonly canNextPage =
    this.searchService.canNextPage;

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

    // Typing does not execute a search.

    this.searchService.setKeyword(value);
  }

  // ======================================
  // Execute Employee Search
  // ======================================

  searchEmployees(): void {

    if (!this.canSearch()) {
      return;
    }

    // ====================================
    // Record Submitted Keyword
    // ====================================

    this.submittedKeyword.set(
      this.searchTerm().trim()
    );

    // ====================================
    // Execute Search Through Service
    // ====================================

    this.searchService.searchFirstPage();
  }

  // ======================================
  // Clear Search
  // ======================================

  clearSearch(): void {

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

    this.searchService.previousPage();
  }

  // ======================================
  // Next Page
  // ======================================

  nextPage(): void {

    if (!this.canNextPage()) {
      return;
    }

    this.searchService.nextPage();
  }

  // ======================================
  // Change Page Size
  // ======================================

  onPageSizeChange(value: number): void {

    const hadSearched = this.hasSearched();

    this.searchService.setPageSize(value);

    if (
      hadSearched &&
      this.searchTerm().trim()
    ) {
      this.searchService.searchFirstPage();
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

    switch (status) {

      case 'ACTIVE':
        return 'Active';

      case 'RESIGNED':
        return 'Resigned';

      case 'TERMINATED':
        return 'Terminated';

      case 'RETIRED':
        return 'Retired';

      case 'END_OF_CONTRACT':
        return 'End of Contract';

      default:
        return status;
    }
  }

  
  
  // ======================================
  // Select Employee
  // ======================================

  selectEmployee(
    employee: RehireSearchEmployee
  ): void {

    // ====================================
    // Validate Person GUID
    // ====================================

    const personGuid =
      employee.personGuid?.trim();

    if (!personGuid) {
      console.error(
        'Cannot select employee: personGuid is missing.'
      );
      return;
    }

    // ====================================
    // Navigate To Rehire Wizard
    // ====================================

    // Selection does not approve rehire.
    // Eligibility will be verified by
    // the Rehire Service.

    void this.router.navigate([
      '/app',
      'rehire',
      personGuid,
    ]);
  }


}

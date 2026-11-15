
import {
  DestroyRef,
  Injectable,
  inject,
} from '@angular/core';

import {
  Subscription,
} from 'rxjs';

import type {
  RehireSearchRequest,
} from '../../domain/models/rehire-search-request.model';

import type {
  RehireSearchEmployee,
} from '../../domain/models/rehire-search-result.model';

// ========================================
// Application State
// ========================================

import {
  RehireSearchState,
} from '../state/rehire-search.state';

// ========================================
// Infrastructure Data Access
// ========================================

import {
  RehireSearchDataAccess,
} from '../../infrastructure/data-access/rehire-search.data-access';

/* ========================================
   Rehire Search Service
   ======================================== */

@Injectable()
export class RehireSearchService {

  private readonly dataAccess =
    inject(RehireSearchDataAccess);

  private readonly state =
    inject(RehireSearchState);

  private readonly destroyRef =
    inject(DestroyRef);

  // ======================================
  // Active Search Subscription
  // ======================================

  private activeSearch: Subscription | null = null;

  private searchVersion = 0;

  // ======================================
  // Public Readonly State
  // ======================================

  readonly request = this.state.request;
  readonly result = this.state.result;

  readonly loading = this.state.loading;
  readonly error = this.state.error;
  readonly hasSearched = this.state.hasSearched;

  readonly employees = this.state.employees;
  readonly totalRecords = this.state.totalRecords;
  readonly hasResults = this.state.hasResults;

  readonly keyword = this.state.keyword;
  readonly employmentStatus =
    this.state.employmentStatus;

  readonly pageNumber = this.state.pageNumber;
  readonly pageSize = this.state.pageSize;
  readonly totalPages = this.state.totalPages;

  readonly canPreviousPage =
    this.state.canPreviousPage;

  readonly canNextPage =
    this.state.canNextPage;

  // ======================================
  // Constructor
  // ======================================

  constructor() {
    this.destroyRef.onDestroy(() => {
      this.cancelActiveSearch();
    });
  }

  // ======================================
  // Update Search Keyword
  // ======================================

  setKeyword(keyword: string): void {
    this.cancelActiveSearch();
    this.state.stopLoading();
    this.state.setKeyword(keyword);
  }

  // ======================================
  // Update Employment Status
  // ======================================

  setEmploymentStatus(
    employmentStatus: string | null
  ): void {
    this.cancelActiveSearch();
    this.state.stopLoading();
    this.state.setEmploymentStatus(
      employmentStatus
    );
  }

  // ======================================
  // Update Page Size
  // ======================================

  setPageSize(pageSize: number): void {
    this.cancelActiveSearch();
    this.state.stopLoading();
    this.state.setPageSize(pageSize);
  }

  // ======================================
  // Execute Search
  // ======================================

  search(): void {

    // ====================================
    // Cancel Previous Request
    // ====================================

    this.cancelActiveSearch();

    const version = ++this.searchVersion;

    // ====================================
    // Build Request Snapshot
    // ====================================

    const request: RehireSearchRequest = {
      ...this.state.request(),
      keyword: this.state.keyword().trim(),
    };

    // ====================================
    // Start Loading
    // ====================================

    this.state.startSearch();

    // ====================================
    // Validate Keyword
    // ====================================

    if (!request.keyword) {
      this.state.setError(
        'Search keyword is required.'
      );
      return;
    }

    // ====================================
    // Execute Data Access
    // ====================================

    this.activeSearch = this.dataAccess
      .search(request)
      .subscribe({
        next: result => {

          // Ignore Outdated Responses
          if (version !== this.searchVersion) {
            return;
          }

          this.state.setResult(result);
        },

        error: error => {

          if (version !== this.searchVersion) {
            return;
          }

          const message =
            error instanceof Error
              ? error.message
              : 'Unable to search former employees.';

          this.state.setError(message);
        },
      });
  }

  // ======================================
  // Search First Page
  // ======================================

  searchFirstPage(): void {
    this.state.setPageNumber(1);
    this.search();
  }

  // ======================================
  // Next Page
  // ======================================

  nextPage(): void {

    if (!this.state.canNextPage()) {
      return;
    }

    this.state.setPageNumber(
      this.state.pageNumber() + 1
    );

    this.search();
  }

  // ======================================
  // Previous Page
  // ======================================

  previousPage(): void {

    if (!this.state.canPreviousPage()) {
      return;
    }

    this.state.setPageNumber(
      this.state.pageNumber() - 1
    );

    this.search();
  }

  // ======================================
  // Clear Search
  // ======================================

  clear(): void {
    this.cancelActiveSearch();
    this.state.reset();
  }

  // ======================================
  // Find Employee
  // ======================================

  findEmployee(
    personGuid: string
  ): RehireSearchEmployee | undefined {

    return this.state.findEmployee(personGuid);
  }

  // ======================================
  // Cancel Active Search
  // ======================================

  private cancelActiveSearch(): void {

    // Invalidate any previous response.
    this.searchVersion++;

    this.activeSearch?.unsubscribe();
    this.activeSearch = null;
  }
}

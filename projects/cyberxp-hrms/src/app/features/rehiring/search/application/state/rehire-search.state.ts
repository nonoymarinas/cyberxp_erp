
import {
  Injectable,
  computed,
  signal,
} from '@angular/core';

import type {
  RehireSearchRequest,
} from '../../domain/models/rehire-search-request.model';

import type {
  RehireSearchEmployee,
  RehireSearchResult,
} from '../../domain/models/rehire-search-result.model';

/* ========================================
   Default Search Request
   ======================================== */

const DEFAULT_REQUEST: RehireSearchRequest = {
  keyword: '',
  employmentStatus: null,
  pageNumber: 1,
  pageSize: 10,
};

/* ========================================
   Rehire Search State
   ======================================== */

@Injectable()
export class RehireSearchState {

  // ======================================
  // Private Writable Signals
  // ======================================

  private readonly _request =
    signal<RehireSearchRequest>({
      ...DEFAULT_REQUEST,
    });

  private readonly _result =
    signal<RehireSearchResult | null>(null);

  private readonly _loading =
    signal(false);

  private readonly _error =
    signal<string | null>(null);

  private readonly _hasSearched =
    signal(false);

  // ======================================
  // Public Readonly Signals
  // ======================================

  readonly request = this._request.asReadonly();

  readonly result = this._result.asReadonly();

  readonly loading = this._loading.asReadonly();

  readonly error = this._error.asReadonly();

  readonly hasSearched =
    this._hasSearched.asReadonly();

  // ======================================
  // Computed Search Results
  // ======================================

  readonly employees = computed<
    RehireSearchEmployee[]
  >(() => {
    return this._result()?.data?.employees ?? [];
  });

  readonly totalRecords = computed(() => {
    return this._result()?.data?.totalRecords ?? 0;
  });

  readonly hasResults = computed(() => {
    return this.employees().length > 0;
  });

  // ======================================
  // Computed Search Criteria
  // ======================================

  readonly keyword = computed(() => {
    return this._request().keyword;
  });

  readonly employmentStatus = computed(() => {
    return this._request().employmentStatus;
  });

  readonly pageNumber = computed(() => {
    return this._request().pageNumber;
  });

  readonly pageSize = computed(() => {
    return this._request().pageSize;
  });

  // ======================================
  // Computed Pagination
  // ======================================

  readonly totalPages = computed(() => {
    return Math.ceil(
      this.totalRecords() / this.pageSize()
    );
  });

  readonly canPreviousPage = computed(() => {
    return (
      this._hasSearched() &&
      !this._loading() &&
      this.pageNumber() > 1
    );
  });

  readonly canNextPage = computed(() => {
    return (
      this._hasSearched() &&
      !this._loading() &&
      this.pageNumber() < this.totalPages()
    );
  });

  // ======================================
  // Update Keyword
  // ======================================

  setKeyword(keyword: string): void {
    this._request.update(current => ({
      ...current,
      keyword,
      pageNumber: 1,
    }));
  }

  // ======================================
  // Update Employment Status
  // ======================================

  setEmploymentStatus(
    employmentStatus: string | null
  ): void {
    this._request.update(current => ({
      ...current,
      employmentStatus,
      pageNumber: 1,
    }));
  }

  // ======================================
  // Update Page Number
  // ======================================

  setPageNumber(pageNumber: number): void {

    if (
      !Number.isInteger(pageNumber) ||
      pageNumber < 1
    ) {
      return;
    }

    this._request.update(current => ({
      ...current,
      pageNumber,
    }));
  }

  // ======================================
  // Update Page Size
  // ======================================

  setPageSize(pageSize: number): void {

    if (
      !Number.isInteger(pageSize) ||
      pageSize < 1 ||
      pageSize > 100
    ) {
      return;
    }

    this._request.update(current => ({
      ...current,
      pageSize,
      pageNumber: 1,
    }));
  }

  // ======================================
  // Begin Search
  // ======================================

  startSearch(): void {
    this._loading.set(true);
    this._error.set(null);
    this._result.set(null);
    this._hasSearched.set(false);
  }

  // ======================================
  // Search Success
  // ======================================

  setResult(result: RehireSearchResult): void {
    this._result.set(result);
    this._error.set(null);
    this._hasSearched.set(true);
    this._loading.set(false);
  }

  // ======================================
  // Search Failure
  // ======================================

  setError(message: string): void {
    this._error.set(message);
    this._result.set(null);
    this._hasSearched.set(true);
    this._loading.set(false);
  }

  // ======================================
  // Stop Loading
  // ======================================

  stopLoading(): void {
    this._loading.set(false);
  }

  // ======================================
  // Reset Search
  // ======================================

  reset(): void {
    this._request.set({
      ...DEFAULT_REQUEST,
    });

    this._result.set(null);
    this._loading.set(false);
    this._error.set(null);
    this._hasSearched.set(false);
  }

  // ======================================
  // Find Employee In Current Results
  // ======================================

  findEmployee(
    personGuid: string
  ): RehireSearchEmployee | undefined {

    return this.employees().find(
      employee =>
        employee.personGuid === personGuid
    );
  }
}

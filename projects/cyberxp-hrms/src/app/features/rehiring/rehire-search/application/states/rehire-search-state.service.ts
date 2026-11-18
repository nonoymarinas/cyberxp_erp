
import {
  Injectable,
  computed,
  signal,
} from '@angular/core';

import type {
  RehireSearchEmployee,
} from '../../domain/models/rehire-search-result.model';

import type {
  RehireSearchRequest,
} from '../../domain/models/rehire-search-request.model';

/* ========================================
   Rehire Search State Service
   ======================================== */

@Injectable()
export class RehireSearchStateService {

  // ======================================
  // Search Criteria
  // ======================================

  private readonly _keyword =
    signal<string>('');

  readonly keyword =
    this._keyword.asReadonly();

  private readonly _employmentStatus =
    signal<string | null>(null);

  readonly employmentStatus =
    this._employmentStatus.asReadonly();

  // ======================================
  // Search Results
  // ======================================

  private readonly _employees =
    signal<RehireSearchEmployee[]>([]);

  readonly employees =
    this._employees.asReadonly();

  private readonly _totalRecords =
    signal<number>(0);

  readonly totalRecords =
    this._totalRecords.asReadonly();

  // ======================================
  // Pagination
  // ======================================

  private readonly _pageNumber =
    signal<number>(1);

  readonly pageNumber =
    this._pageNumber.asReadonly();

  private readonly _pageSize =
    signal<number>(20);

  readonly pageSize =
    this._pageSize.asReadonly();

  readonly totalPages = computed(() => {

    return Math.ceil(
      this._totalRecords() / this._pageSize()
    );
  });

  // ======================================
  // Loading State
  // ======================================

  private readonly _isLoading =
    signal<boolean>(false);

  readonly isLoading =
    this._isLoading.asReadonly();

  // ======================================
  // Error State
  // ======================================

  private readonly _errorMessage =
    signal<string | null>(null);

  readonly errorMessage =
    this._errorMessage.asReadonly();

  // ======================================
  // Search Status
  // ======================================

  private readonly _hasSearched =
    signal<boolean>(false);

  readonly hasSearched =
    this._hasSearched.asReadonly();

  readonly hasResults = computed(
    () => this._employees().length > 0
  );

  // ======================================
  // Set Keyword
  // ======================================

  setKeyword(
    keyword: string
  ): void {

    this._keyword.set(keyword);
  }

  // ======================================
  // Set Employment Status
  // ======================================

  setEmploymentStatus(
    status: string | null
  ): void {

    this._employmentStatus.set(
      status?.trim() || null
    );
  }

  // ======================================
  // Set Page Number
  // ======================================

  setPageNumber(
    pageNumber: number
  ): void {

    this._pageNumber.set(
      Math.max(1, Math.trunc(pageNumber))
    );
  }

  // ======================================
  // Set Page Size
  // ======================================

  setPageSize(
    pageSize: number
  ): void {

    this._pageSize.set(
      Math.min(
        100,
        Math.max(1, Math.trunc(pageSize))
      )
    );

    this._pageNumber.set(1);
  }

  // ======================================
  // Build Search Request
  // ======================================

  buildRequest(): RehireSearchRequest {

    return {
      keyword: this._keyword().trim(),
      employmentStatus: this._employmentStatus(),
      pageNumber: this._pageNumber(),
      pageSize: this._pageSize(),
    };
  }

  // ======================================
  // Set Search Results
  // ======================================

  setResults(
    employees: RehireSearchEmployee[],
    totalRecords: number
  ): void {

    this._employees.set(employees);

    this._totalRecords.set(totalRecords);

    this._hasSearched.set(true);

    this._errorMessage.set(null);
  }

  // ======================================
  // Set Loading
  // ======================================

  setLoading(
    loading: boolean
  ): void {

    this._isLoading.set(loading);
  }

  // ======================================
  // Set Error
  // ======================================

  setError(
    message: string | null
  ): void {

    this._errorMessage.set(message);
  }

  // ======================================
  // Clear Results
  // ======================================

  clearResults(): void {

    this._employees.set([]);

    this._totalRecords.set(0);

    this._hasSearched.set(false);

    this._errorMessage.set(null);
  }

  // ======================================
  // Reset State
  // ======================================

  reset(): void {

    this._keyword.set('');

    this._employmentStatus.set(null);

    this._employees.set([]);

    this._totalRecords.set(0);

    this._pageNumber.set(1);

    this._pageSize.set(20);

    this._isLoading.set(false);

    this._errorMessage.set(null);

    this._hasSearched.set(false);
  }
}

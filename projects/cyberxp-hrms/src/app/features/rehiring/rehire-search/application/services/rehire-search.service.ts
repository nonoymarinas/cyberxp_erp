
import {
  Injectable,
  inject,
} from '@angular/core';

import {
  Observable,
  defer,
  finalize,
  map,
  throwError,
} from 'rxjs';

import {
  RehireSearchDataAccess,
} from '../../infrastructure/data-access/rehire-search.data-access';

import {
  RehireSearchStateService,
} from '../states/rehire-search-state.service';

import type {
  RehireSearchResult,
} from '../../domain/models/rehire-search-result.model';

/* ========================================
   Rehire Search Service
   ======================================== */

@Injectable()
export class RehireSearchService {

  // ======================================
  // Dependencies
  // ======================================

  private readonly dataAccess = inject(
    RehireSearchDataAccess
  );

  private readonly state = inject(
    RehireSearchStateService
  );

  // ======================================
  // Search Employees
  // ======================================

  search(): Observable<RehireSearchResult> {

    return defer(() => {

      // ==================================
      // Prevent Concurrent Searches
      // ==================================

      if (this.state.isLoading()) {

        return throwError(() =>
          new Error(
            'A rehire search is already in progress.'
          )
        );
      }

      // ==================================
      // Build Request
      // ==================================

      const request =
        this.state.buildRequest();

      // ==================================
      // Validate Search Criteria
      // ==================================

      if (!request.keyword) {

        this.state.clearResults();

        this.state.setError(
          'Enter a search keyword.'
        );

        return throwError(() =>
          new Error(
            'Enter a search keyword.'
          )
        );
      }

      // ==================================
      // Begin Search
      // ==================================

      this.state.setLoading(true);

      this.state.setError(null);

      // Prevent old results from being
      // displayed as the current search.

      this.state.clearResults();

      // ==================================
      // Execute Search
      // ==================================

      return this.dataAccess.search(request).pipe(

        map(response => {

          // =================================
          // Update Search Results
          // =================================

          this.state.setResults(
            response.data.employees,
            response.data.totalRecords
          );

          return response;
        }),

        // ==================================
        // Handle Errors
        // ==================================

        // Errors propagate to the caller.
        // The UI can display the error from
        // the state service.

        finalize(() => {

          this.state.setLoading(false);
        })
      );
    });
  }

  // ======================================
  // Search First Page
  // ======================================

  searchFirstPage(): Observable<RehireSearchResult> {

    this.state.setPageNumber(1);

    return this.search();
  }

  // ======================================
  // Search Specific Page
  // ======================================

  searchPage(
    pageNumber: number
  ): Observable<RehireSearchResult> {

    this.state.setPageNumber(pageNumber);

    return this.search();
  }

  // ======================================
  // Clear Search
  // ======================================

  clear(): void {

    if (this.state.isLoading()) {
      return;
    }

    this.state.reset();
  }
}

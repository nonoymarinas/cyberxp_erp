
/* ========================================
   Rehire Search Request Model
   ======================================== */

export interface RehireSearchRequest {

  // ======================================
  // Search Criteria
  // ======================================

  keyword: string;

  // ======================================
  // Optional Filters
  // ======================================

  // Employment status code selected from
  // NewEmployeeRefStateService.employmentStatuses

  employmentStatus?: string | null;

  // ======================================
  // Pagination
  // ======================================

  pageNumber: number;
  pageSize: number;
}


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

  employmentStatus?: string | null;

  // ======================================
  // Pagination
  // ======================================

  pageNumber: number;
  pageSize: number;
}

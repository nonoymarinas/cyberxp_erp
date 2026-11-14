// ========================================
// Person Match Search Request
// ========================================

export interface PersonMatchSearchRequest {
  firstName: string;
  middleName: string | null;
  lastName: string;
  dateOfBirth: string; // YYYY-MM-DD
}

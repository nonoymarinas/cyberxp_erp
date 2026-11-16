
/* ========================================
   Person Match Result
   ======================================== */

export interface PersonMatch {
 personGuid: string;
  personNumber: string;

  firstName: string;
  middleName: string | null;
  lastName: string;

  dateOfBirth: string;

  matchScore: number;
  matchType: string;
  imageUrl?: string;

  // Database classification reference ID
  matchClassificationId: number;
}

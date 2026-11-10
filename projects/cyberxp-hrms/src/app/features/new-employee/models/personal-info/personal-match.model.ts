export type PersonMatchStatus = 'CLEAR' | 'REVIEW' | 'HOLD';

export type PersonMatchClassification = 'high' | 'medium' | 'low' | 'neutral';

export interface PersonMatch {
  personGuid: string;
  personNumber: string;

  firstName: string;
  middleName: string;
  lastName: string;

  dateOfBirth: string;

  matchScore: number;
  matchType: string;
  imageUrl?: string;

  matchClassification: PersonMatchClassification;
}

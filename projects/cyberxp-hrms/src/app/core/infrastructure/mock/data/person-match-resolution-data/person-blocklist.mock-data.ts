
// ========================================
// Person Blocklist Mock Data
// ========================================

// ========================================
// Person Blocklist Record
// ========================================

export interface MockPersonBlocklistRecord {

  blocklistGuid: string;

  personGuid: string;

  isActive: boolean;

  reason: string;

  createdBy: string;

  createdAt: string;

  releasedBy: string | null;

  releasedAt: string | null;

  releaseReason: string | null;

  updatedAt: string;

}

// ========================================
// Person Blocklist Mock Database
// ========================================

export const PERSON_BLOCKLIST_MOCK_DATA:
  MockPersonBlocklistRecord[] = [];


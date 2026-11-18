
import {
  ReferenceItem,
} from '../../../../../shared/models/reference-item.model';

// ========================================
// Person Match Level Mock Model
// ========================================

export interface MockPersonMatchLevelReference
  extends ReferenceItem<number> {

  minScore: number;
  maxScore: number;
  isActive: boolean;
}

// ========================================
// Person Match Level Mock Data
// ========================================

// Score range convention:
// minScore: inclusive
// maxScore: exclusive, except 100

export const PERSON_MATCH_LEVEL_MOCK_DATA:
  MockPersonMatchLevelReference[] = [

  // ======================================
  // HIGH
  // ======================================

  {
    id: 1,
    code: 'HIGH',
    name: 'High Match',
    minScore: 90,
    maxScore: 100,
    isActive: true,
    disabled: false,
  },

  // ======================================
  // MEDIUM
  // ======================================

  {
    id: 2,
    code: 'MEDIUM',
    name: 'Medium Match',
    minScore: 70,
    maxScore: 90,
    isActive: true,
    disabled: false,
  },

  // ======================================
  // LOW
  // ======================================

  {
    id: 3,
    code: 'LOW',
    name: 'Low Match',
    minScore: 40,
    maxScore: 70,
    isActive: true,
    disabled: false,
  },

  // ======================================
  // NEUTRAL
  // ======================================

  {
    id: 4,
    code: 'NEUTRAL',
    name: 'Neutral',
    minScore: 0,
    maxScore: 40,
    isActive: true,
    disabled: false,
  },
];

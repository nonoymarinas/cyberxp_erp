
import {
  ReferenceItem,
} from '../../../../shared/models/reference-item.model';

// ========================================
// Person Match Classification Mock Model
// ========================================

export interface MockPersonMatchClassificationReference
  extends ReferenceItem<number> {

  minScore: number;
  maxScore: number;
  isActive: boolean;
}

// ========================================
// Person Match Classification Mock Data
// ========================================

export const PERSON_MATCH_CLASSIFICATION_MOCK_DATA:
  MockPersonMatchClassificationReference[] = [

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
    maxScore: 89,
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
    maxScore: 69,
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
    maxScore: 39,
    isActive: true,
    disabled: false,
  },
];

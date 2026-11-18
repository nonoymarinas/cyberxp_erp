
import {
  ReferenceItemDto,
} from '../../../../../shared/models/reference-item.dto.model';

// ========================================
// Person Match Decision Type Reference
// Mock Data
// ========================================

export const PERSON_MATCH_DECISION_TYPE_MOCK_DATA:
  ReferenceItemDto[] = [

  // ======================================
  // SAME PERSON
  // ======================================

  {
    publicId: 'b7f3e2a1-6c94-4d82-9e15-2a8c0f73d6b4',
    code: 'SAME_PERSON',
    referenceName: 'Same Person',
  },

  // ======================================
  // DIFFERENT PERSON
  // ======================================

  {
    publicId: 'e2a9c714-8b35-4f60-a91d-7c3e5b208f46',
    code: 'DIFFERENT_PERSON',
    referenceName: 'Different Person',
  },

  // ======================================
  // ESCALATE FOR REVIEW
  // ======================================

  {
    publicId: 'c5d81f29-3e74-4a96-b2f0-9d6e1a73c845',
    code: 'ESCALATE',
    referenceName: 'Escalate for Review',
  },

];

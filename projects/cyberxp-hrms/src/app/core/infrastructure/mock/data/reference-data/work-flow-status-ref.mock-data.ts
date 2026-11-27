
import {
  ReferenceItemDto,
} from '../../../../../shared/models/reference-item.dto.model';

// ========================================
// Workflow Status Reference Mock Data
// ========================================

export const WORK_FLOW_STATUS_MOCK_DATA:
  ReferenceItemDto[] = [

  // ======================================
  // CLEAR
  // ======================================

  {
    guid: 'a4c8e219-7b35-4f60-9d12-6e8a3b71c504',
    code: 'CLEAR',
    name: 'Clear',
  },

  // ======================================
  // REVIEW
  // ======================================

  {
    guid: 'd9f2b613-5c84-4a70-b126-8e3d9c45f207',
    code: 'REVIEW',
    name: 'Review Required',
  },

  // ======================================
  // HOLD
  // ======================================

  {
    guid: 'f3a7c821-9d46-4e50-a832-2b6d1f94c705',
    code: 'HOLD',
    name: 'On Hold',
  },

];

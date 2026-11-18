
import {
  ReferenceItemDto,
} from '../../../../../shared/models/reference-item.dto.model';

import {
  WORK_FLOW_STATUS_MOCK_DATA,
} from '../../data/reference-data/work-flow-status-ref.mock-data';

// ========================================
// Get All Workflow Statuses
// ========================================

export function getMockWorkFlowStatuses():
  ReferenceItemDto[] {

  return WORK_FLOW_STATUS_MOCK_DATA
    .map(item => ({ ...item }));
}

// ========================================
// Find Workflow Status By Public ID
// ========================================

export function findMockWorkFlowStatusById(
  publicId: string
): ReferenceItemDto | undefined {

  const item = WORK_FLOW_STATUS_MOCK_DATA.find(
    item => item.publicId === publicId
  );

  return item ? { ...item } : undefined;
}

// ========================================
// Find Workflow Status By Code
// ========================================

export function findMockWorkFlowStatusByCode(
  code: string
): ReferenceItemDto | undefined {

  const normalizedCode = code.trim().toUpperCase();

  const item = WORK_FLOW_STATUS_MOCK_DATA.find(
    item =>
      item.code?.toUpperCase() === normalizedCode
  );

  return item ? { ...item } : undefined;
}

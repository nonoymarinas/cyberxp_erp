// ========================================
// Domain Models
// ========================================

import type {
  DepartmentReference,
} from '../../../domain/models/references/department-reference.model';

import type {
  PositionReference,
} from '../../../domain/models/references/position-reference.model';

import type {
  PriorityLevelReference,
} from '../../../domain/models/references/priority-level-reference.model';

import type {
  JobRequestTypeReference,
} from '../../../domain/models/references/job-request-type-reference.model';

import type {
  JobRequestReferences,
} from '../../../domain/models/references/job-request-references.model';

// ========================================
// DTO Models
// ========================================

import type {
  DepartmentReferenceDto,
} from '../../dtos/references/department-reference.dto.model';

import type {
  PositionReferenceDto,
} from '../../dtos/references/position-reference.dto.model';

import type {
  PriorityLevelReferenceDto,
} from '../../dtos/references/priority-level-reference.dto.model';

import type {
  JobRequestTypeReferenceDto,
} from '../../dtos/references/job-request-type-reference.dto.model';

import type {
  JobRequestReferencesDto,
} from '../../dtos/references/job-request-references.dto.model';

// ========================================
// Job Request Reference Mapper
// ========================================

export class JobRequestReferenceMapper {

  // ======================================
  // Map Job Request References
  // ======================================

  static map(
    dto: JobRequestReferencesDto
  ): JobRequestReferences {

    return {

      positions:
        dto.positions.map(
          item => this.mapPosition(item)
        ),

      departments:
        dto.departments.map(
          item => this.mapDepartment(item)
        ),

      priorityLevels:
        dto.priorityLevels.map(
          item => this.mapPriorityLevel(item)
        ),

      jobRequestTypes:
        dto.jobRequestTypes.map(
          item => this.mapJobRequestType(item)
        ),

    };
  }

  // ======================================
  // Map Department Reference
  // ======================================

  private static mapDepartment(
    dto: DepartmentReferenceDto
  ): DepartmentReference {

    return {
      id: dto.id,
      guid: dto.guid,
      code: dto.code,
      name: dto.name,

      parentUnitId:
        dto.parentUnitId,
    };
  }

  // ======================================
  // Map Position Reference
  // ======================================

  private static mapPosition(
    dto: PositionReferenceDto
  ): PositionReference {

    return {
      id: dto.id,
      guid: dto.guid,
      code: dto.code,
      name: dto.name,

      organizationUnitId:
        dto.organizationUnitId,

      authorizedHeadcount:
        dto.authorizedHeadcount,
    };
  }

  // ======================================
  // Map Priority Level Reference
  // ======================================

  private static mapPriorityLevel(
    dto: PriorityLevelReferenceDto
  ): PriorityLevelReference {

    return {
      id: dto.id,
      guid: dto.guid,
      code: dto.code,
      name: dto.name,
    };
  }

  // ======================================
  // Map Job Request Type Reference
  // ======================================

  private static mapJobRequestType(
    dto: JobRequestTypeReferenceDto
  ): JobRequestTypeReference {

    return {
      id: dto.id,
      guid: dto.guid,
      code: dto.code,
      name: dto.name,
    };
  }
}
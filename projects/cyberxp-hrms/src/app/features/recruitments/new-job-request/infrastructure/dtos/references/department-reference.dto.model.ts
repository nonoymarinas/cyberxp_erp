import { ReferenceBaseDto } from '../../../../../../shared/models/reference-base.dto.model';

export interface DepartmentReferenceDto extends ReferenceBaseDto {
  parentUnitId: number | null;
}




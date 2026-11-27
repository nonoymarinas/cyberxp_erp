import { ReferenceBaseDto } from '../../../../../../shared/models/reference-base.dto.model';

export interface PositionReferenceDto extends ReferenceBaseDto {
  organizationUnitId: number | null;
  authorizedHeadcount: number | null;
}

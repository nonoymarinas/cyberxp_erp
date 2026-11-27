import { ReferenceBase } from '../../../../../../shared/models/reference-base.model';

export interface PositionReference extends ReferenceBase {
  organizationUnitId: number | null;
  authorizedHeadcount: number | null;
}




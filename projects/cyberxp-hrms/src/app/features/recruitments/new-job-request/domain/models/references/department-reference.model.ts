import { ReferenceBase } from '../../../../../../shared/models/reference-base.model';

export interface DepartmentReference extends ReferenceBase {
  parentUnitId: number | null;
}




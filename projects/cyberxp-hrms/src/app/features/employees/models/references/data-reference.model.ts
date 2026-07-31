import { ReferenceItem } from '../../../../shared/models/reference-item.model';

export interface ReferenceData {
  suffixes: ReferenceItem[];
  genders: ReferenceItem[];
  civilStatuses: ReferenceItem[];
}

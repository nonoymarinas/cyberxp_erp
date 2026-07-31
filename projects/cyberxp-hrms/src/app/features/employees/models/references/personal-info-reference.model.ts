import { ReferenceItem } from '../../../../shared/models/reference-item.model';

export interface PersonalInfoReference {
  genders: ReferenceItem[];
  suffixes: ReferenceItem[];
  civilStatuses: ReferenceItem[];
}
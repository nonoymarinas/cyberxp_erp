import { ReferenceItem } from '../../../../shared/models/reference-item.model';

export interface PersonalInfoReference {
  genders: ReferenceItem<string>[];
  suffixes: ReferenceItem<string>[];
  civilStatuses: ReferenceItem<string>[];
}
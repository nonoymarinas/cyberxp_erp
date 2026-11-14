import { ReferenceItem } from '../../../../../shared/models/reference-item.model';
import { ApiResponse } from '../../../../../shared/models/api-response.model';

export interface PersonalInfoRefs {
  genders: ReferenceItem<string>[];
  suffixes: ReferenceItem<string>[];
  civilStatuses: ReferenceItem<string>[];
}

export type PersonalInfoRefsResponse = ApiResponse<PersonalInfoRefs>;
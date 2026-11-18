import {
  ApiResponse,
} from '../../../../../../../shared/models/api-response.model'; 

import{PersonEmploymentStatus,PersonResolutionAction} from './person-match-resolution-type-ref.model';

export interface PersonMatchResolution {
  screeningId: string;
  personGuid: string;
  personNumber: string;
  fullName: string;
  employmentStatus: PersonEmploymentStatus;
  isBlocklisted: boolean;
  allowedActions: PersonResolutionAction[];
}
 export type PersonMatchResolutionApiResponse = ApiResponse<PersonMatchResolution>;
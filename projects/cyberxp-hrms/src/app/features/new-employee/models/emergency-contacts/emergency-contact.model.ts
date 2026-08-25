import { ApiResponse } from '../../../../shared/models/api-response.model';
import { Contact,SaveContactRequest } from '../contacts/contact.model';
import { Address as Address } from '../address/address.model';

export interface EmergencyContactPerson {
  firstName:string,
  middleName:string|null,
  lastName:string|null,
  relationship:string|null
  contacts:Contact[] | null
  addresses:Address[]|null
}
export type EmergencyContactPersonResponse = ApiResponse<EmergencyContactPerson[]>;


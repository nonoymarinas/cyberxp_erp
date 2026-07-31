import { CreatePersonalInfo } from "./create-personal-info.model";

export interface PersonalInfo extends CreatePersonalInfo {
  id: string | null;
  employeeNumber:string | null;
}
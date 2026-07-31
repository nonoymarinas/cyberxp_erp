export interface CreatePersonalInfo {
  id: string | null;
  employeeNumber:string | null;
  firstName:string;
  middleName: string | null;
  lastName:string;
  civilStatusId:string | null;
  genderId:string | null;
  dateOfBirth:string;
  suffixId:string | null;
  imageUrl:string | null;
}
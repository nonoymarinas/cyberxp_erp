export interface Employee {
  id: number;

  employeeNo: string;

  firstName: string;
  middleName: string;
  lastName: string;

  suffixId: number | null;
  genderId: number | null;
  civilStatusId: number | null;

  birthDate: string | null;
}
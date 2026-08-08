import {
  SavePersonalInfoRequest,
  SavePersonalInfoResponse,
} from '../../models/domain/personal-info.model';

let personalInfoDatabase: SavePersonalInfoResponse['data'] | null = null;

export function savePersonalInfoMock(
  request: SavePersonalInfoRequest
): SavePersonalInfoResponse {

  personalInfoDatabase = {
    employeeId: request.employeeId ?? 'EMP000001',
    employeeGuid: request.employeeGuid ?? crypto.randomUUID(),

    firstName: request.firstName,
    middleName: request.middleName,
    lastName: request.lastName,

    suffixId: request.suffixId,
    dateOfBirth: request.dateOfBirth ?? '',
    genderId: request.genderId,
    civilStatusId: request.civilStatusId,
    imageUrl: request.imageUrl
  };

  return {
    success: true,
    message: 'Personal information saved successfully.',
    errorCode: null,
    data: personalInfoDatabase
  };
}

/* -----------------------------------------
 * Get
 * ----------------------------------------- */
export function getPersonalInfoMock(employeeGuid: string) {
  if (
    personalInfoDatabase &&
    personalInfoDatabase.employeeGuid === employeeGuid
  ) {
    return personalInfoDatabase;
  }

  return null;
}
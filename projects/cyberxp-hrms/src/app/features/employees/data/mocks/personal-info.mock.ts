import {
  SavePersonalInfoRequest,
  SavePersonalInfoResponse,
} from '../../models/domain/personal-info.model';

export function savePersonalInfoMock(
  request: SavePersonalInfoRequest
): SavePersonalInfoResponse {
  return {
    success: true,
    message: 'Personal information saved successfully.',
    errorCode: null,

    data: {
      employeeId: request.employeeId ?? 'EMP000001',
      employeeGuid: request.employeeGuid ?? crypto.randomUUID(),

      firstName: request.firstName,
      middleName: request.middleName,
      lastName: request.lastName,

      suffixId: request.suffixId,
      dateOfBirth: request.dateOfBirth ?? '',
      genderId: request.genderId,
      civilStatusId: request.civilStatusId,
      imageUrl:request.imageUrl
    },
  };
}
import { ReferenceData } from '../models/reference-data';

export const EMPLOYEE_REFERENCE_MOCK: ReferenceData = {

  suffixes: [
    {
      id: 1,
      code: 'NONE',
      label: ''
    },
    {
      id: 2,
      code: 'JR',
      label: 'Jr.'
    },
    {
      id: 3,
      code: 'SR',
      label: 'Sr.'
    },
    {
      id: 4,
      code: 'II',
      label: 'II'
    },
    {
      id: 5,
      code: 'III',
      label: 'III'
    },
    {
      id: 6,
      code: 'IV',
      label: 'IV'
    }
  ],

  genders: [
    {
      id: 1,
      code: 'MALE',
      label: 'Male'
    },
    {
      id: 2,
      code: 'FEMALE',
      label: 'Female'
    }
  ],

  civilStatuses: [
    {
      id: 1,
      code: 'SINGLE',
      label: 'Single'
    },
    {
      id: 2,
      code: 'MARRIED',
      label: 'Married'
    },
    {
      id: 3,
      code: 'SEPARATED',
      label: 'Separated'
    },
    {
      id: 4,
      code: 'WIDOWED',
      label: 'Widowed'
    }
  ]

};
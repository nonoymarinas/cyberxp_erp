
import {
  PERSON_MOCK_DATA,
  MockPersonRecord,
} from '../../data/shared/person.mock-data';

// ========================================
// Normalize Text
// ========================================

function normalize(
  value?: string | null
): string {
  return (value ?? '')
    .normalize('NFKC')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ');
}

// ========================================
// Get All Persons
// ========================================

export function getMockPersons(): MockPersonRecord[] {

  return PERSON_MOCK_DATA.map(
    person => ({ ...person })
  );
}

// ========================================
// Find Person By GUID
// ========================================

export function findMockPersonByGuid(
  personGuid: string
): MockPersonRecord | undefined {

  const person = PERSON_MOCK_DATA.find(
    item => item.personGuid === personGuid
  );

  return person
    ? { ...person }
    : undefined;
}

// ========================================
// Find Person By Number
// ========================================

export function findMockPersonByNumber(
  personNumber: string
): MockPersonRecord | undefined {

  const normalizedNumber = normalize(personNumber);

  const person = PERSON_MOCK_DATA.find(
    item =>
      normalize(item.personNumber) ===
      normalizedNumber
  );

  return person
    ? { ...person }
    : undefined;
}

// ========================================
// Find Persons By Name
// ========================================

export function findMockPersonsByName(
  firstName: string,
  lastName: string
): MockPersonRecord[] {

  const normalizedFirstName = normalize(firstName);
  const normalizedLastName = normalize(lastName);

  return PERSON_MOCK_DATA
    .filter(
      person =>
        normalize(person.firstName) === normalizedFirstName &&
        normalize(person.lastName) === normalizedLastName
    )
    .map(person => ({ ...person }));
}

// ========================================
// Find Persons By Date Of Birth
// ========================================

export function findMockPersonsByDateOfBirth(
  dateOfBirth: string
): MockPersonRecord[] {

  return PERSON_MOCK_DATA
    .filter(
      person =>
        person.dateOfBirth === dateOfBirth
    )
    .map(person => ({ ...person }));
}

// ========================================
// Find Persons By Full Name
// ========================================

export function findMockPersonsByFullName(
  firstName: string,
  middleName: string | null,
  lastName: string
): MockPersonRecord[] {

  const normalizedFirstName = normalize(firstName);
  const normalizedMiddleName = normalize(middleName);
  const normalizedLastName = normalize(lastName);

  return PERSON_MOCK_DATA
    .filter(
      person =>
        normalize(person.firstName) === normalizedFirstName &&
        normalize(person.middleName) === normalizedMiddleName &&
        normalize(person.lastName) === normalizedLastName
    )
    .map(person => ({ ...person }));
}


/* ========================================
   General Person Mock Model
   ======================================== */

export interface MockPersonRecord {
  personGuid: string;
  personNumber: string;

  firstName: string;
  middleName: string;
  lastName: string;

  dateOfBirth: string;
  imageUrl: string | null;
}

/* ========================================
   General Person Mock Data
   ======================================== */

export const PERSON_MOCK_DATA: MockPersonRecord[] = [

  // ========================================
  // Person 001 — Existing Matching Record
  // ========================================

  {
    personGuid: 'mock-person-001',
    personNumber: 'PER000123',
    firstName: 'Juan',
    middleName: 'Santos',
    lastName: 'Dela Cruz',
    dateOfBirth: '1990-05-15',
    imageUrl: '/assets/images/mock/person-001.jpg',
  },

  // ========================================
  // Person 002 — Existing Matching Record
  // ========================================

  {
    personGuid: 'mock-person-002',
    personNumber: 'PER000287',
    firstName: 'Juan',
    middleName: '',
    lastName: 'Dela Cruz',
    dateOfBirth: '1990-05-15',
    imageUrl: '/assets/images/mock/person-002.jpg',
  },

  // ========================================
  // Person 003 — Existing Matching Record
  // ========================================

  {
    personGuid: 'mock-person-003',
    personNumber: 'PER000415',
    firstName: 'Juan',
    middleName: 'S',
    lastName: 'Cruz',
    dateOfBirth: '1991-05-15',
    imageUrl: '/assets/images/mock/person-003.jpg',
  },

  // ========================================
  // Person 004
  // ========================================

  {
    personGuid: 'mock-person-004',
    personNumber: 'PER000416',
    firstName: 'Maria',
    middleName: 'Reyes',
    lastName: 'Santos',
    dateOfBirth: '1992-08-21',
    imageUrl: null,
  },

  // ========================================
  // Person 005
  // ========================================

  {
    personGuid: 'mock-person-005',
    personNumber: 'PER000417',
    firstName: 'Pedro',
    middleName: 'Garcia',
    lastName: 'Reyes',
    dateOfBirth: '1987-02-10',
    imageUrl: null,
  },

  // ========================================
  // Person 006
  // ========================================

  {
    personGuid: 'mock-person-006',
    personNumber: 'PER000418',
    firstName: 'Ana',
    middleName: 'Lopez',
    lastName: 'Garcia',
    dateOfBirth: '1993-07-12',
    imageUrl: null,
  },

  // ========================================
  // Person 007
  // ========================================

  {
    personGuid: 'mock-person-007',
    personNumber: 'PER000419',
    firstName: 'Carlos',
    middleName: 'Ramos',
    lastName: 'Mendoza',
    dateOfBirth: '1989-11-04',
    imageUrl: null,
  },

  // ========================================
  // Person 008
  // ========================================

  {
    personGuid: 'mock-person-008',
    personNumber: 'PER000420',
    firstName: 'Elena',
    middleName: 'Cruz',
    lastName: 'Fernandez',
    dateOfBirth: '1965-03-18',
    imageUrl: null,
  },

  // ========================================
  // Person 009
  // ========================================

  {
    personGuid: 'mock-person-009',
    personNumber: 'PER000421',
    firstName: 'Roberto',
    middleName: 'Diaz',
    lastName: 'Villanueva',
    dateOfBirth: '1985-06-24',
    imageUrl: null,
  },

  // ========================================
  // Person 010
  // ========================================

  {
    personGuid: 'mock-person-010',
    personNumber: 'PER000422',
    firstName: 'Angela',
    middleName: 'Torres',
    lastName: 'Navarro',
    dateOfBirth: '1995-09-30',
    imageUrl: null,
  },

  // ========================================
  // Person 011
  // ========================================

  {
    personGuid: 'mock-person-011',
    personNumber: 'PER000423',
    firstName: 'Michael',
    middleName: 'Flores',
    lastName: 'Bautista',
    dateOfBirth: '1991-01-17',
    imageUrl: null,
  },

  // ========================================
  // Person 012
  // ========================================

  {
    personGuid: 'mock-person-012',
    personNumber: 'PER000424',
    firstName: 'Christine',
    middleName: 'Aquino',
    lastName: 'Rivera',
    dateOfBirth: '1994-04-08',
    imageUrl: null,
  },

  // ========================================
  // Person 013
  // ========================================

  {
    personGuid: 'mock-person-013',
    personNumber: 'PER000425',
    firstName: 'Joseph',
    middleName: 'Castillo',
    lastName: 'Domingo',
    dateOfBirth: '1988-12-05',
    imageUrl: null,
  },

  // ========================================
  // Person 014
  // ========================================

  {
    personGuid: 'mock-person-014',
    personNumber: 'PER000426',
    firstName: 'Patricia',
    middleName: 'Morales',
    lastName: 'Salazar',
    dateOfBirth: '1996-02-14',
    imageUrl: null,
  },

  // ========================================
  // Person 015
  // ========================================

  {
    personGuid: 'mock-person-015',
    personNumber: 'PER000427',
    firstName: 'Daniel',
    middleName: 'Mercado',
    lastName: 'Ramos',
    dateOfBirth: '1990-10-22',
    imageUrl: null,
  },

  // ========================================
  // Person 016
  // ========================================

  {
    personGuid: 'mock-person-016',
    personNumber: 'PER000428',
    firstName: 'Sofia',
    middleName: 'Mendoza',
    lastName: 'Cruz',
    dateOfBirth: '1997-05-19',
    imageUrl: null,
  },

  // ========================================
  // Person 017
  // ========================================

  {
    personGuid: 'mock-person-017',
    personNumber: 'PER000429',
    firstName: 'Antonio',
    middleName: 'Gomez',
    lastName: 'Reyes',
    dateOfBirth: '1983-08-11',
    imageUrl: null,
  },

  // ========================================
  // Person 018
  // ========================================

  {
    personGuid: 'mock-person-018',
    personNumber: 'PER000430',
    firstName: 'Isabella',
    middleName: 'Lim',
    lastName: 'Tan',
    dateOfBirth: '1998-07-26',
    imageUrl: null,
  },

  // ========================================
  // Person 019
  // ========================================

  {
    personGuid: 'mock-person-019',
    personNumber: 'PER000431',
    firstName: 'Francis',
    middleName: 'Dizon',
    lastName: 'Pascual',
    dateOfBirth: '1986-03-09',
    imageUrl: null,
  },

  // ========================================
  // Person 020
  // ========================================

  {
    personGuid: 'mock-person-020',
    personNumber: 'PER000432',
    firstName: 'Gabriela',
    middleName: 'Ortiz',
    lastName: 'Valdez',
    dateOfBirth: '1999-11-16',
    imageUrl: null,
  },
];


import {
  PERSON_MATCH_CLASSIFICATION_MOCK_DATA,
  MockPersonMatchClassificationReference,
} from '../data/person-match-classification.mock-data';

// ========================================
// Get All Classifications
// ========================================

export function getMockPersonMatchClassifications():
  MockPersonMatchClassificationReference[] {

  return PERSON_MATCH_CLASSIFICATION_MOCK_DATA
    .filter(item => item.isActive && !item.disabled)
    .map(item => ({ ...item }));
}

// ========================================
// Find Classification By ID
// ========================================

export function findMockPersonMatchClassificationById(
  id: number
): MockPersonMatchClassificationReference | undefined {

  const classification =
    PERSON_MATCH_CLASSIFICATION_MOCK_DATA.find(
      item =>
        item.id === id &&
        item.isActive &&
        !item.disabled
    );

  return classification
    ? { ...classification }
    : undefined;
}

// ========================================
// Find Classification By Code
// ========================================

export function findMockPersonMatchClassificationByCode(
  code: string
): MockPersonMatchClassificationReference | undefined {

  const normalizedCode =
    code.trim().toUpperCase();

  const classification =
    PERSON_MATCH_CLASSIFICATION_MOCK_DATA.find(
      item =>
        item.code?.toUpperCase() === normalizedCode &&
        item.isActive &&
        !item.disabled
    );

  return classification
    ? { ...classification }
    : undefined;
}

// ========================================
// Find Classification By Score
// ========================================

export function findMockPersonMatchClassificationByScore(
  score: number
): MockPersonMatchClassificationReference | undefined {

  // ======================================
  // Validate Score
  // ======================================

  if (
    !Number.isFinite(score) ||
    score < 0 ||
    score > 100
  ) {
    return undefined;
  }

  // ======================================
  // Find Matching Classifications
  // ======================================

  const matches =
    PERSON_MATCH_CLASSIFICATION_MOCK_DATA.filter(
      item =>
        item.isActive &&
        !item.disabled &&
        score >= item.minScore &&
        score <= item.maxScore
    );

  // ======================================
  // Reject Overlapping Ranges
  // ======================================

  if (matches.length > 1) {
    throw new Error(
      `Overlapping match classification ranges for score ${score}.`
    );
  }

  // ======================================
  // Return Classification
  // ======================================

  const classification = matches[0];

  return classification
    ? { ...classification }
    : undefined;
}

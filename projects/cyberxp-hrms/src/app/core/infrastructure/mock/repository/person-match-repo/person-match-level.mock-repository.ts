
import {
  PERSON_MATCH_LEVEL_MOCK_DATA,
  MockPersonMatchLevelReference,
} from '../../data/person-match-data/person-match-level.mock-data';

// ========================================
// Get All Match Levels
// ========================================

export function getMockPersonMatchLevels():
  MockPersonMatchLevelReference[] {

  return PERSON_MATCH_LEVEL_MOCK_DATA
    .filter(
      item =>
        item.isActive &&
        !item.disabled
    )
    .map(item => ({ ...item }));
}

// ========================================
// Find Match Level By ID
// ========================================

export function findMockPersonMatchLevelById(
  id: number
): MockPersonMatchLevelReference | undefined {

  const matchLevel =
    PERSON_MATCH_LEVEL_MOCK_DATA.find(
      item =>
        item.id === id &&
        item.isActive &&
        !item.disabled
    );

  return matchLevel
    ? { ...matchLevel }
    : undefined;
}

// ========================================
// Find Match Level By Code
// ========================================

export function findMockPersonMatchLevelByCode(
  code: string
): MockPersonMatchLevelReference | undefined {

  const normalizedCode =
    code.trim().toUpperCase();

  if (!normalizedCode) {
    return undefined;
  }

  const matchLevel =
    PERSON_MATCH_LEVEL_MOCK_DATA.find(
      item =>
        item.code?.toUpperCase() === normalizedCode &&
        item.isActive &&
        !item.disabled
    );

  return matchLevel
    ? { ...matchLevel }
    : undefined;
}

// ========================================
// Find Match Level By Score
// ========================================

export function findMockPersonMatchLevelByScore(
  score: number
): MockPersonMatchLevelReference | undefined {

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
  // Find Matching Levels
  // ======================================

  const matches =
    PERSON_MATCH_LEVEL_MOCK_DATA.filter(
      item =>
        item.isActive &&
        !item.disabled &&
        score >= item.minScore &&
        (
          score < item.maxScore ||
          (
            item.maxScore === 100 &&
            score === 100
          )
        )
    );

  // ======================================
  // Reject Overlapping Ranges
  // ======================================

  if (matches.length > 1) {
    throw new Error(
      `Overlapping person match level ranges for score ${score}.`
    );
  }

  // ======================================
  // Return Match Level
  // ======================================

  const matchLevel = matches[0];

  return matchLevel
    ? { ...matchLevel }
    : undefined;
}

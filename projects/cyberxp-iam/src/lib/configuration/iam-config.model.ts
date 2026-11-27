export interface IamConfig {
  readonly apiBaseUrl: string;
  readonly loginUrl: string;
  readonly launchpadUrl: string;
}export interface IamConfig {
  // ========================================
  // API Configuration
  // ========================================

  readonly apiBaseUrl: string;

  // ========================================
  // Centralized Authentication
  // ========================================

  readonly loginUrl: string;

  readonly launchpadUrl: string;

  // ========================================
  // Browser CSRF Configuration
  // ========================================

  readonly csrfHeaderName: string;

  readonly csrfHeaderValue: string;
}

export interface PersonMatchResolutionRequest {

  // Screening session containing the
  // confirmed Same Person decision.
  screeningId: string;

  // Existing person confirmed by HR.
  personGuid: string;

}

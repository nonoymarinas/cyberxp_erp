export interface UserSession {
  userId: string;
  username: string;
  displayName: string;
  accessToken?: string;
  refreshToken?: string;
}
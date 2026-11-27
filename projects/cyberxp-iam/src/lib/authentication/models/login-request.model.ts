export interface LoginRequest {
  readonly email: string;

  readonly password: string;

  readonly clientInstanceId: string;
}
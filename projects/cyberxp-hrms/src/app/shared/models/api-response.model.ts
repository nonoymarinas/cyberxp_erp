export interface ApiResponse<T> {
  success: boolean;
  message: string | null;
  errorCode: string | null;
  data: T;
}

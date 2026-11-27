export interface ApiResponse<T> {
  readonly success: boolean;

  readonly message: string | null;

  readonly errorCode: string | null;

  readonly errors:
    Readonly<Record<string, readonly string[]>> | null;

  readonly traceId: string | null;

  readonly data: T | null;
}
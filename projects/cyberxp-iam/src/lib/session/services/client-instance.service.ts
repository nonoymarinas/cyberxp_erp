import {
  Injectable,
} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ClientInstanceService {

  // ========================================
  // Storage Configuration
  // ========================================

  private readonly storageKey =
    'cyberxp.client-instance-id';

  private readonly uuidPattern =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

  private readonly emptyUuid =
    '00000000-0000-0000-0000-000000000000';

  // ========================================
  // Get Browser Instance Identifier
  // ========================================

  getClientInstanceId(): string {

    if (
      typeof window === 'undefined' ||
      !window.crypto?.randomUUID
    ) {
      throw new Error(
        'A secure browser context is required.'
      );
    }

    const existingId =
      window.localStorage.getItem(
        this.storageKey
      );

    if (
      existingId &&
      this.isValidUuid(existingId)
    ) {
      return existingId.toLowerCase();
    }

    // ====================================
    // Generate New Browser Identifier
    // ====================================

    const clientInstanceId =
      window.crypto.randomUUID();

    window.localStorage.setItem(
      this.storageKey,
      clientInstanceId
    );

    return clientInstanceId;
  }

  // ========================================
  // Validate UUID
  // ========================================

  private isValidUuid(
    value: string
  ): boolean {

    return (
      this.uuidPattern.test(value) &&
      value !== this.emptyUuid
    );
  }
}
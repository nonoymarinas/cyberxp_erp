// import { Injectable, computed, signal } from '@angular/core';

// import { UserSession } from './session.model';

// @Injectable({
//   providedIn: 'root',
// })
// export class SessionService {
//   private readonly sessionState =
//     signal<UserSession | null>(null);

//   readonly session = this.sessionState.asReadonly();

//   readonly isLoggedIn = computed(
//     () => this.sessionState() !== null,
//   );

//   readonly userId = computed(
//     () => this.sessionState()?.userId ?? null,
//   );

//   readonly username = computed(
//     () => this.sessionState()?.username ?? null,
//   );

//   readonly displayName = computed(
//     () => this.sessionState()?.displayName ?? null,
//   );

//   /**
//    * Temporary mock.
//    * Later this will be replaced by the Accounts module.
//    */
//   initializeMockSession(): void {
//     this.sessionState.set({
//       userId: 'USR-0002',
//       username: 'hr.officer',
//       displayName: 'Juan Dela Cruz',
//     });
//   }

//   setSession(session: UserSession): void {
//     this.sessionState.set(session);
//   }

//   clearSession(): void {
//     this.sessionState.set(null);
//   }

//   getCurrentUserId(): string {
//     const userId = this.userId();

//     if (!userId) {
//       throw new Error('No active session.');
//     }

//     return userId;
//   }
// }
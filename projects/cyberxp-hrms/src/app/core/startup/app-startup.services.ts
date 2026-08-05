
// import { Injectable, inject } from '@angular/core';
// import { Observable, map } from 'rxjs';

// import { AccountSessionService } from '../session/account-session.service';
// import { AuthorizationService } from '../authorization/services/authorization.service';

// @Injectable({
//   providedIn: 'root',
// })
// export class AppStartupService {
//   private readonly accountSessionService =
//     inject(AccountSessionService);

//   private readonly authorizationService =
//     inject(AuthorizationService);

//   initialize(): Observable<void> {
//     const userId =
//       this.accountSessionService.getCurrentUserId();

//     return this.authorizationService
//       .loadUserAccess(userId)
//       .pipe(map(() => void 0));
//   }
// }
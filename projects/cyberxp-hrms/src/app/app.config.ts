import {
  ApplicationConfig,
  importProvidersFrom,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { provideRouter } from '@angular/router';
import { firstValueFrom } from 'rxjs';

import { UserAccessService } from './core/authorization/services/user-access.services';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),

    provideRouter(routes),

    importProvidersFrom(
      ReactiveFormsModule.withConfig({
        callSetDisabledState: 'always',
      }),
    ),

    provideAppInitializer(() => {
      const userAccessService = inject(UserAccessService);

      const userId = 'EMP00000001';

      return firstValueFrom(
        userAccessService.getUserAccess(userId)
      );
    }),
  ],
};

// import {
//   EnvironmentProviders,
//   inject,
//   makeEnvironmentProviders,
//   provideAppInitializer,
// } from '@angular/core';

// import { AppStartupService } from './app-startup.service';

// export function provideStartupInitializer(): EnvironmentProviders {
//   return makeEnvironmentProviders([
//     provideAppInitializer(() => {
//       const appStartupService =
//         inject(AppStartupService);

//       return appStartupService.initialize();
//     }),
//   ]);
// }
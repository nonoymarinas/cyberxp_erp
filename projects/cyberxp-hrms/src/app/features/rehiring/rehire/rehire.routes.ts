
import { Routes } from '@angular/router';

import { RehirePageComponent } from
  './presentation/pages/rehire-page/rehire-page';

export const REHIRE_ROUTES: Routes = [
  {
    path: '',
    component: RehirePageComponent,
  },
  {
    path: 'history',
    loadComponent: () =>
      import(
        './presentation/pages/rehire-history-page/rehire-history-page'
      ).then(m => m.RehireHistoryComponent),
  },
  {
    path: ':personGuid',
    component: RehirePageComponent,
  },
];

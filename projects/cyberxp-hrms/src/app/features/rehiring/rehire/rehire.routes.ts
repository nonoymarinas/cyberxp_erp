
import { Routes } from '@angular/router';

import {
  RehirePageComponent,
} from './presentation/pages/rehire-page/rehire-page';

// ========================================
// Rehire Routes
// ========================================

export const REHIRE_ROUTES: Routes = [
  {
    path: ':personGuid',
    component: RehirePageComponent,
  },
];

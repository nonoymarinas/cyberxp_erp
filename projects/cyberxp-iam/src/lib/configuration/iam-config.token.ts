import { InjectionToken } from '@angular/core';

import { IamConfig } from './iam-config.model';

export const IAM_CONFIG =
  new InjectionToken<IamConfig>('IAM_CONFIG');
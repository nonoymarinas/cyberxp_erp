
import { Routes } from '@angular/router';

export const RECRUITMENT_ROUTES: Routes = [

  {
    path: 'job-requisitions/new',
    loadComponent: () =>
      import(
        './new-job-request/presentation/pages/new-job-request/new-job-request'
      ).then((m) => m.NewJobRequest),
  },

  {
    path: 'job-requisitions/confirmation',
    loadComponent: () =>
      import(
        './new-job-request/presentation/components/job-request-confirmation/job-request-confirmation'
      ).then((m) => m.JobRequestConfirmation),
  },

];

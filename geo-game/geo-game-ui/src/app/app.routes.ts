import { Routes } from '@angular/router';
import { DefaultLayoutComponent } from './layout/layouts';
import { AuthGuard } from '@shared/guards';

export const routes: Routes = [
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      {
        path: 'start',
        pathMatch: 'full',
        loadChildren: () =>
          import('./modules/start/start.module').then(
            (m) => m.StartModule
          ),
      },
      {
        path: 'account',
        pathMatch: 'prefix',
        loadChildren: () =>
          import('./modules/account/account.module').then(
            (m) => m.AccountModule
          ),
        canActivate: [AuthGuard]
      },
      {
        path: '**',
        redirectTo: 'start',
        pathMatch: 'full',
      },
    ],
  },
];

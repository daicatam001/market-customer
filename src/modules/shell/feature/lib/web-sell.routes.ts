import { Routes } from '@angular/router';
import { AuthGuard, UnauthGuard } from '@auth/util/guard';

export const webSellRoutes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
  {
    path: 'home',
    canActivate: [AuthGuard],
    loadChildren: async () =>
      (await import('@home/feature/shell')).HomeSellModule,
  },
  {
    path: 'auth',
    canActivate: [UnauthGuard],
    loadChildren: async () =>
      (await import('@auth/feature/shell')).AuthSellModule,
  },
  

];

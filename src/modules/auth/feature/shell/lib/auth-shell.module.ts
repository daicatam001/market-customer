import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthStore } from '@auth/data-access';


@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        loadChildren: async () =>
          (await import('@auth/feature/user-infor')).UserInforModule,
      },
      {
        path: 'address',
        loadChildren: async () =>
          (await import('@auth/feature/address-infor')).AddressInforModule,
      },
    ]),
  ],
  exports: [RouterModule],
  declarations: [],
  // providers: [AuthStore],
})
export class AuthSellModule {}

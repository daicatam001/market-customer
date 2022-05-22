import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                loadChildren: async () => (await import('@auth/feature/user-infor')).UserInforModule
            },
            {
                path: 'address',
                loadChildren: async () => (await import('@auth/feature/address-infor')).AddressInforModule
            }
        ])
    ],
    exports: [RouterModule],
    declarations: [],
    providers: [],
})
export class AuthSellModule { }

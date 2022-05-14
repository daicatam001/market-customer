import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressInforComponent } from './address-infor/address-infor.component';
import { SignupComponent } from './signup.component';
import { UserInforComponent } from './user-infor/user-infor.component';

const routes: Routes = [
  {
    path: '',
    component: SignupComponent,
    children: [
      { path: '', redirectTo: '/user-infor', pathMatch: 'full' },
      {
        path: 'user-infor', component: UserInforComponent
      },
      { path: 'address-infor', component: AddressInforComponent }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignupRoutingModule {
}

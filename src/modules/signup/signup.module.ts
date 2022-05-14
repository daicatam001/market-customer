import { NgModule } from '@angular/core';

import { SignupComponent } from './signup.component';
import { UserInforComponent } from './user-infor/user-infor.component';
import { SignupRoutingModule } from './signup-routing.module';
import { AddressInforComponent } from './address-infor/address-infor.component';

@NgModule({
  declarations: [
    SignupComponent,
    UserInforComponent,
    AddressInforComponent
  ],
  imports: [
    SignupRoutingModule
  ],
  providers: [],
})
export class SignupModule { }

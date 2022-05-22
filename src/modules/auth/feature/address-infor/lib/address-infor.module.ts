import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthFormModule } from '@auth/ui/auth-form';
import { AddressInforComponent } from './address-info.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AuthFormModule,
        RouterModule.forChild([
            {
                path: '',
                component: AddressInforComponent
            }
        ])],
    declarations: [AddressInforComponent],
    providers: [],
})
export class AddressInforModule { }

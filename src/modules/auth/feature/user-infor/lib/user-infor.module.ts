import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthFormModule } from '@auth/ui/auth-form';
import { UserInforComponent } from './user-infor.component';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AuthFormModule,
        RouterModule.forChild([
            {
                path: '',
                component: UserInforComponent
            }
        ])
    ],
    exports: [],
    declarations: [UserInforComponent],
    providers: [],
})
export class UserInforModule { }

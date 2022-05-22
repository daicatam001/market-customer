import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserInforComponent } from './user-infor.component';


@NgModule({
    imports: [
        CommonModule,
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

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthFormComponent } from './auth-form.component';


@NgModule({
    imports: [CommonModule],
    exports: [AuthFormComponent],
    declarations: [AuthFormComponent],
    providers: [],
})
export class AuthFormModule { }

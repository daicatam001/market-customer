import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AddressInforComponent } from './address-info.component'

@NgModule({
    imports: [
        CommonModule,
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

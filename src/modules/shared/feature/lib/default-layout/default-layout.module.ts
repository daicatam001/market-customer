import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavigationModule } from '@shared/feature';
import { DefaultlayuoutComponent } from './default-layout.component';


@NgModule({
    imports: [RouterModule,NavigationModule],
    exports: [DefaultlayuoutComponent],
    declarations: [DefaultlayuoutComponent],
    providers: [],
})
export class DefaultlayuoutModule { }

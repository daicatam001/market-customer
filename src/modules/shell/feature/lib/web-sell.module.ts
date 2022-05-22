import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { webSellRoutes } from './web-sell.routes';

@NgModule({
    imports: [RouterModule.forRoot(webSellRoutes)],
    exports: [RouterModule],
    declarations: [], 
    providers: [],
})
export class WebSellModule { }

import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { getAppConfigProvider } from '@shared/data-access/app-config/app-config.token';
import { environment } from 'src/environments/environment';
import { WebSellModule } from '@shell/feature';
import { AppComponent } from './app.component';
import { AddressStore } from '@shared/data-access/store/lib/address.store';
import { ReactiveFormsModule } from '@angular/forms';


// function initializeApp(addressStore:AddressStore){
//  return ()=> addressStore.getAddress()
// }
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    WebSellModule,
  ],
  providers: [
    getAppConfigProvider(environment),
    // {
    //   provide:APP_INITIALIZER,
    //   useFactory: initializeApp,
    //   deps:[AddressStore],
    //   multi:true
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

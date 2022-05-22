import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { getAppConfigProvider } from '@shared/data-access/app-config/app-config.token';
import { environment } from 'src/environments/environment';
import { WebSellModule } from '@shell/feature';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    WebSellModule,
  ],
  providers: [
    getAppConfigProvider(environment)
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

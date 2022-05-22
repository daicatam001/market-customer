import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { getAppConfigProvider } from '@shared/data-access/app-config/app-config.token';
import { environment } from 'src/environments/environment';
import { SignupModule } from "../modules/signup/signup.module";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SignupModule,
  ],
  providers: [
    getAppConfigProvider(environment)
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

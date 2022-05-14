import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupModule } from "../modules/signup/signup.module";
import { environment } from 'src/environments/environment';

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
    { provide: "BASE_SERVER_URL", useValue: environment.serverUrl }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

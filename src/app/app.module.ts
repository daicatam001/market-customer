import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AuthStore } from '@auth/data-access';
import { getAppConfigProvider } from '@shared/data-access/app-config/app-config.token';
import { AddressRes } from '@shared/data-access/models';
import AddressApi from '@shared/data-access/server-api/lib/address.api';
import { AddressStore } from '@shared/data-access/store/lib/address.store';
import { SvgModule } from '@shared/ui';
import { WebSellModule } from '@shell/feature';
import Cookies from 'js-cookie';
import { tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AppComponent } from './app.component';

function initializeApp(
  addressStore: AddressStore,
  addressApi: AddressApi,
  authStore: AuthStore
) {
  return () =>
    addressApi.getAddresses().pipe(
      tap({
        next: (res: AddressRes) => {
          addressStore.updateAddress(res);
          try {
            const user = JSON.parse(Cookies.get('user')!);
            authStore.updateUser({ ...user, sessionId: res.sessionId });
            authStore.regiserAddress(false);
          } catch (e) {
            authStore.updateUser({ sessionId: res.sessionId });
          }
        
        },
      })
    );
}
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    SvgModule,
    WebSellModule,
  ],
  providers: [
    getAppConfigProvider(environment),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AddressStore, AddressApi, AuthStore],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

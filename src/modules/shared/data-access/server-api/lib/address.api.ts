import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { APP_CONFIG } from '@shared/data-access/app-config/app-config.token';
import { AddressRes, AppConfig, RegisterUser, ResponseData } from '@shared/data-access/models';
import { Observable } from 'rxjs';
@Injectable({ providedIn: 'root' })
export default class AddressApi {
  constructor(
    private http: HttpClient,
    @Inject(APP_CONFIG) private appConfig: AppConfig
  ) {}

  getAddresses(): Observable<AddressRes> {
    return this.http.post<AddressRes>(`${this.appConfig.serverUrl}`, {
      action: 'getAddress',
      version: '1.0',
    });
  }
  registerAddress(data: RegisterUser): Observable<ResponseData> {
    return this.http.post<ResponseData>(`${this.appConfig.serverUrl}`, {
      action: 'registerAddress',
      ...data,
    });
  }
}

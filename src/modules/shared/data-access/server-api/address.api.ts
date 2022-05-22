import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { APP_CONFIG } from '@shared/data-access/app-config/app-config.token';
import { AppConfig, Province, ResponseData } from '@shared/data-access/models';
import { Observable } from 'rxjs';
@Injectable({ providedIn: 'root' })
export default class AddressApi {
  constructor(
    private http: HttpClient,
    @Inject(APP_CONFIG) private appConfig: AppConfig
  ) {}

  getAddresses(): Observable<ResponseData<Province[], 'province'>> {
    return this.http.post<ResponseData<Province[], 'province'>>(
      `${this.appConfig.serverUrl}`,
      {
        action: 'getAddress',
        version: '1.0',
      }
    );
  }
}

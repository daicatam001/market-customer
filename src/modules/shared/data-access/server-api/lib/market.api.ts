import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { APP_CONFIG } from '@shared/data-access/app-config/app-config.token';
import {
    AppConfig,
    Market, ResponseData
} from '@shared/data-access/models';
import { Observable } from 'rxjs';
@Injectable({ providedIn: 'root' })
export default class MarketApi {
  constructor(
    private http: HttpClient,
    @Inject(APP_CONFIG) private appConfig: AppConfig
  ) {}

  getMarkets(): Observable<ResponseData<Market[]>> {
    return this.http.post<ResponseData<Market[]>>(`${this.appConfig.serverUrl}`, {
      action: 'getMarket',
    });
  }
}

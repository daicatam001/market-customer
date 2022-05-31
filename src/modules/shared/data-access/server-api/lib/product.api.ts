import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { APP_CONFIG } from '@shared/data-access/app-config/app-config.token';
import {
  AppConfig,
  ProductType,
  ResponseData,
  StoreProduct,
} from '@shared/data-access/models';
import { Observable } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class ProductApi {
  constructor(
    private http: HttpClient,
    @Inject(APP_CONFIG) private appConfig: AppConfig
  ) {}

  getProductTypeInMarket(
    market: string
  ): Observable<ResponseData<ProductType[]>> {
    return this.http.post<ResponseData<ProductType[]>>(
      `${this.appConfig.serverUrl}`,
      {
        action: 'getProductTypeInMarket',
        version: '1.0',
        market,
        productType: 'THUC_PHAM_TUOI',
      }
    );
  }

  getStoreProductInMarket(
    market: string,
    type1: string
  ): Observable<ResponseData<StoreProduct[]>> {
    return this.http.post<ResponseData<StoreProduct[]>>(
      `${this.appConfig.serverUrl}`,
      {
        action: 'getStoreProductInMarket',
        version: '1.0',
        market,
        type1,
      }
    );
  }
}

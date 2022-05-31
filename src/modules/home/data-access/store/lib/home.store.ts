import { state } from '@angular/animations';
import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Market, StoreProduct } from '@shared/data-access/models';
import { ProductType } from '@shared/data-access/models';
import { MarketApi, ProductApi } from '@shared/data-access/server-api';
import { map, switchMap, tap } from 'rxjs';

export interface HomeState {
  markets: Market[];
  productTypes: ProductType[];
  storeProducts: StoreProduct[];
}

@Injectable()
export class HomeStore extends ComponentStore<HomeState> {
  readonly markets$ = this.select((state) => state.markets);
  readonly productTypes$ = this.select((state) => state.productTypes);
  readonly storeProducts$ = this.select((state) => state.storeProducts);

  initData = this.effect(($effect) =>
    $effect.pipe(
      switchMap(() => {
        return this.marketApi.getMarkets().pipe(
          switchMap((resMarket) => {
            const markets = resMarket.data.map((m) => m.id).join(',');
            return this.productApi.getProductTypeInMarket(markets).pipe(
              switchMap((resProductType) => {
                const type = resProductType.data.map((p) => p.id).join(',');
                return this.productApi
                  .getStoreProductInMarket(markets, type)
                  .pipe(
                    tap((resStoreProducts) => {
                      console.log(resMarket, resProductType, resStoreProducts.data);
                      this.patchState({
                        markets: resMarket.data,
                        productTypes: resProductType.data,
                        storeProducts: resStoreProducts.data,
                      });
                    })
                  );
              })
            );
          })
        );
      })
    )
  );

  constructor(private marketApi: MarketApi, private productApi: ProductApi) {
    super({
      markets: [],
      productTypes: [],
      storeProducts: [],
    });
  }
}

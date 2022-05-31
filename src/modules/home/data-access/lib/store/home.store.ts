import { state } from '@angular/animations';
import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Market } from '@shared/data-access/models';
import { ProductType } from '@shared/data-access/models';
import { MarketApi, ProductApi } from '@shared/data-access/server-api';
import { map, switchMap, tap } from 'rxjs';

export interface HomeState {
  markets: Market[];
  productTypes: ProductType[];
}

@Injectable()
export class HomeStore extends ComponentStore<HomeState> {
  readonly markets$ = this.select((state) => state.markets);
  readonly productTypes$ = this.select((state) => state.productTypes);

  initData = this.effect(($effect) =>
    $effect.pipe(
      switchMap(() => {
        return this.marketApi.getMarkets().pipe(
          switchMap((resMarket) => {
            const markets = resMarket.data.map((m) => m.id).join(',');
            return this.productApi.getProductTypeInMarket(markets).pipe(
              tap((resProductType) => {
                console.log(resMarket, resProductType);
                this.patchState({
                  markets: resMarket.data,
                  productTypes: resProductType.data,
                });
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
    });
  }
}

import { state } from '@angular/animations';
import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Market, StoreProduct } from '@shared/data-access/models';
import { ProductType } from '@shared/data-access/models';
import { MarketApi, ProductApi } from '@shared/data-access/server-api';
import { combineLatest, combineLatestWith, map, switchMap, tap } from 'rxjs';

export interface HomeState {
  markets: Market[];
  productTypes: ProductType[];
  storeProducts: StoreProduct[];
  selectedMarketId: number | null;
  selectedProductTypeId: number | null;
}

@Injectable()
export class HomeStore extends ComponentStore<HomeState> {
  readonly markets$ = this.select((state) => state.markets);
  readonly productTypes$ = this.select((state) => state.productTypes);
  readonly selectedMarketId$ = this.select((state) => state.selectedMarketId);
  readonly selectedProductTypeId$ = this.select(
    (state) => state.selectedProductTypeId
  );
  readonly storeProducts$ = this.select((state) => state.storeProducts);
  readonly filteredMarkets$ = this.select(
    this.markets$,
    this.selectedMarketId$,
    (markets, selectedMarketId) =>
      selectedMarketId
        ? selectedMarketId.toString()
        : markets.map((m) => m.id).join(',')
  );

  readonly filteredProductTypes$ = this.select(
    this.productTypes$,
    this.selectedProductTypeId$,
    (productTypes, selectedProductTypeId) =>
      selectedProductTypeId
        ? selectedProductTypeId.toString()
        : productTypes.map((p) => p.id).join(',')
  );

  // readonly storeProducts$ = this.select(this.markets$, this.productTypes$,this.selectedMarketId$,this.selectedProductTypeId$,
  //   ([marke]));

  getMarkets = this.effect(($effect) =>
    $effect.pipe(
      switchMap(() => {
        return this.marketApi.getMarkets().pipe(
          tap((resMarket) => {
            this.patchState({
              markets: resMarket.data,
            });
          })
        );
      })
    )
  );
  getProductTypes = this.effect(($effect) =>
    $effect.pipe(
      switchMap(() => this.filteredMarkets$),
      switchMap((filteredMarkets) => {
        return this.productApi.getProductTypeInMarket(filteredMarkets).pipe(
          tap((resProductType) => {
            this.patchState({
              productTypes: resProductType.data,
            });
          })
        );
      })
    )
  );

  getStoreProducts = this.effect(($effect) =>
    $effect.pipe(
      switchMap(() =>
        combineLatest([this.filteredMarkets$, this.filteredProductTypes$])
      ),
      switchMap(([filteredMarkets, filteredProductTypes]) => {
        return this.productApi
          .getStoreProductInMarket(filteredMarkets, filteredProductTypes)
          .pipe(
            tap({
              next: (resStoreProducts) =>
                this.patchState({
                  storeProducts: resStoreProducts.data,
                }),
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
      selectedMarketId: null,
      selectedProductTypeId: null,
    });
  }
}

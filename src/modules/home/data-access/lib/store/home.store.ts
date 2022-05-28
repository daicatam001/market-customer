import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Market } from '@shared/data-access/models';
import MarketApi from '@shared/data-access/server-api/lib/market.api';
import { switchMap, tap } from 'rxjs';

export interface HomeState {
  markets: Market[];
}

@Injectable()
export class HomeStore extends ComponentStore<HomeState> {
  readonly markets$ = this.select((state) => state.markets);

  initData = this.effect(($effect) =>
    $effect.pipe(
      switchMap(() => {
        return this.marketApi.getMarkets().pipe(
          tap((res) => {
            this.patchState({
              markets: res.data,
            });
          })
        );
      })
    )
  );

  constructor(private marketApi: MarketApi) {
    super({
      markets: [],
    });
  }
}

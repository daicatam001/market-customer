import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ComponentStore } from '@ngrx/component-store';
import {
  DistrictEntry,
  RegisterUser,
  WardEntry,
} from '@shared/data-access/models';
import AddressApi from '@shared/data-access/server-api/lib/address.api';
import { AddressStore } from '@shared/data-access/store';
import {
  catchError,
  combineLatest,
  combineLatestWith,
  EMPTY,
  map,
  switchMap,
  tap,
} from 'rxjs';

export interface AuthState {
  user: Omit<RegisterUser, 'sessionId'>;
}

@Injectable()
export class AuthStore extends ComponentStore<AuthState> {
  constructor(
    private addressStore: AddressStore,
    private addressApi: AddressApi,
    private router: Router
  ) {
    super({
      user: {
        name: '',
        phoneNumber: '',
        province: null,
        district: null,
        wardId: null,
        address: '',
      },
    });
    // super(<AuthState>{})
    this.addressStore.getAddress();
  }
  readonly user$ = this.select((state) => state.user);
  readonly province$ = this.select(this.user$, (state) => state.province);
  readonly district$ = this.select(this.user$, (state) => state.district);
  readonly isValidUserInfo$ = this.select(
    this.user$,
    (state) => state.name.trim() && state.phoneNumber.trim()
  );
  readonly isValidAddressInfo$ = this.select(
    this.user$,
    (state) =>
      state.province && state.district && state.wardId && state.address.trim()
  );

  readonly provinces$ = this.addressStore.provinces$;
  readonly districtsByProv$ = this.addressStore.districts$.pipe(
    combineLatestWith(this.province$),
    map(([districts, province]: [DistrictEntry[], number | null]) =>
      districts.filter((d) => d.provinceId === province)
    )
  );

  readonly wardsByDis$ = this.addressStore.wards$.pipe(
    combineLatestWith(this.district$),
    map(([districts, district]: [WardEntry[], number | null]) =>
      districts.filter((d) => d.districtId === district)
    )
  );

  readonly vm$ = this.select(
    this.provinces$,
    this.districtsByProv$,
    this.wardsByDis$,
    this.isValidUserInfo$,
    this.isValidAddressInfo$,
    this.user$,
    (
      provinces,
      districtsByProv,
      wardsByDis,
      isValidUserInfo,
      isValidAddressInfo,
      user
    ) => ({
      provinces,
      districtsByProv,
      wardsByDis,
      isValidUserInfo,
      isValidAddressInfo,
      user,
    })
  );

  updateUser = this.updater((state, userData: Partial<RegisterUser>) => ({
    ...state,
    user: { ...state.user, ...userData },
  }));

  regiserUser = this.effect(($effect) =>
    $effect.pipe(
      switchMap(() =>
        combineLatest([this.addressStore.sessionId$, this.user$]).pipe(
          switchMap(([sessionId, user]) =>
            this.addressApi
              .registerAddress({
                sessionId,
                ...user,
              })
              .pipe(
                tap({
                  next: () => this.router.navigate(['home']),
                  error: (e) => console.log(e),
                }),
                catchError(() => EMPTY)
              )
          )
        )
      )
    )
  );
}

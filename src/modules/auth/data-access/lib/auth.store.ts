import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import {
  DistrictEntry,
  RegisterUser,
  WardEntry,
} from '@shared/data-access/models';
import { AddressStore } from '@shared/data-access/store/address.store';
import { combineLatestWith, map, Observable, tap } from 'rxjs';

export interface AuthState {
  user: RegisterUser;
}

@Injectable()
export class AuthStore extends ComponentStore<AuthState> {
  constructor(private addressStore: AddressStore) {
    super({
      user: {
        name: '',
        phoneNumber: '',
        province: null,
        district: null,
        wardId: null,
      },
    });
  }
  readonly user$ = this.select((state) => state.user);
  readonly province$ = this.select(this.user$, (state) => state.province);
  readonly district$ = this.select(this.user$, (state) => state.district);

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

  updateUser = this.updater((state, userData: Partial<RegisterUser>) => ({
    ...state,
    user: { ...state.user, ...userData },
  }));

  updateUserEffect = this.effect(
    ($userData: Observable<Partial<RegisterUser>>) =>
      $userData.pipe(tap((userData) => this.updateUser(userData)))
  );
}

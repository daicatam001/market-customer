import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ComponentStore } from '@ngrx/component-store';
import {
  RegisterUser
} from '@shared/data-access/models';
import AddressApi from '@shared/data-access/server-api/lib/address.api';
import { AddressStore } from '@shared/data-access/store';
import Cookies from 'js-cookie';
import {
  catchError,
  combineLatestWith,
  EMPTY, Observable,
  switchMap,
  tap
} from 'rxjs';

export interface AuthState {
  user: RegisterUser;
}

@Injectable({ providedIn: 'root' })
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
        sessionId: null,
      },
    });
  }
  readonly user$ = this.select((state) => state.user);
  readonly isAuth$ = this.select(this.user$, (state) => {
    return (Object.keys(state) as (keyof RegisterUser)[]).every(
      (key) => !!state[key]
    );
  });
  readonly isValidUserInfo$ = this.select(
    this.user$,
    (state) => state.name.trim() && state.phoneNumber.trim()
  );

  readonly provinces$ = this.addressStore.provinces$;
  readonly district$ = this.addressStore.districts$;
  readonly wards$ = this.addressStore.wards$;

  updateUser = this.updater((state, userData: Partial<RegisterUser>) => ({
    ...state,
    user: { ...state.user, ...userData },
  }));

  regiserAddress = this.effect((isRedirect$: Observable<boolean>) =>
    isRedirect$.pipe(
      combineLatestWith(this.user$),
      switchMap(([isRedirect, user]) =>
        this.addressApi.registerAddress(user).pipe(
          tap({
            next: () => {
              Cookies.set('user', JSON.stringify(user), { expires: 7 });
              console.log(isRedirect)
              if (isRedirect) {
                this.router.navigate(['home']);
              }
            },
            error: (e) => console.log(e),
          }),
          catchError(() => EMPTY)
        )
      )
    )
  );
}

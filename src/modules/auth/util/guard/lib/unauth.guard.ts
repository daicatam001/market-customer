import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthStore } from '@auth/data-access';
import { map, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UnauthGuard implements CanActivate {
  constructor(private authStore: AuthStore, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.authStore.isAuth$.pipe(
      map((isAuth) => !isAuth),
      tap((isUnauth) => {
        !isUnauth && this.router.navigate(['home']);
      })
    );
  }
}

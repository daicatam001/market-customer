import { Injectable, Provider } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { AuthStore } from '@auth/data-access';
import { RegisterUser } from '@shared/data-access/models';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authStore: AuthStore) {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return this.authStore.user$.pipe(
      take(1),
      switchMap((user: RegisterUser) => {
        console.log(user)
        if (!user) {
          return next.handle(req);
        }
        const body = { ...(req.body || {}) as Object, sessionId: user.sessionId };
        const authReq = req.clone({
          body,
        });
        return next.handle(authReq);
      })
    );
  }
}

export const authInterceptorProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true,
};

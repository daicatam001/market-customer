import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { APP_CONFIG } from '@shared/data-access/app-config/app-config.token';
import { AddressRes, AppConfig, RegisterUser } from '@shared/data-access/models';
import { Observable } from 'rxjs';
@Injectable({ providedIn: 'root' })
export default class RegisterApi {
  constructor(
    private http: HttpClient,
    @Inject(APP_CONFIG) private appConfig: AppConfig
  ) {}

  
}

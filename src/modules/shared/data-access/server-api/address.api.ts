import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from "@angular/core";
import { APP_CONFIG } from "@shared/data-access/app-config/app-config.token";
import { AppConfig } from "@shared/data-access/models";
@Injectable({ providedIn: 'root' })
export default class AddressApi {
    constructor(private http: HttpClient, @Inject(APP_CONFIG) private appConfig: AppConfig) {
    }

    getAddresses() {
        return this.http.post(`${this.appConfig.serverUrl}`, {
            "action": "getAddress",
            "version": "1.0"
        })
    }
}
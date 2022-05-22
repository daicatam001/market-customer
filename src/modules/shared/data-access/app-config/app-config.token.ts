
import { InjectionToken, ValueProvider } from '@angular/core';
import { AppConfig } from '@shared/data-access/models';


export const APP_CONFIG = new InjectionToken<AppConfig>('app-config');

export const getAppConfigProvider = (value: AppConfig): ValueProvider => ({
    provide: APP_CONFIG,
    useValue: value
});

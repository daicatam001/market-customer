import { Routes } from "@angular/router";

export const webSellRoutes: Routes = [
    {
        path: '',
        redirectTo: 'auth',
        pathMatch: 'full'
    },
    
    {
        path: 'home',
        loadChildren: async () => (await import('@home/feature/shell')).HomeSellModule
    },
    {
        path: 'auth',
        loadChildren: async () => (await import('@auth/feature/shell')).AuthSellModule
    }
]
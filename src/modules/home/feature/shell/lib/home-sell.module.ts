import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeStore } from '@home/data-access/store';
import { DefaultlayuoutComponent, DefaultlayuoutModule } from '@shared/feature/default-layout';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: DefaultlayuoutComponent,
        loadChildren: async () =>
          (await import('@home/feature/layout')).HomeLayoutModule,
      },
    ]),
  ],
  exports: [RouterModule, DefaultlayuoutModule],
  declarations: [],
  providers: [HomeStore],
})
export class HomeSellModule {}

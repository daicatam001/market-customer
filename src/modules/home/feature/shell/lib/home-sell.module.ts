import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DefaultlayuoutComponent, DefaultlayuoutModule } from '@shared/feature';

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
  providers: [],
})
export class HomeSellModule {}

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        loadChildren: async () =>
          (await import('@home/feature/layout')).HomeLayoutModule,
      },
    ]),
  ],
  exports: [RouterModule],
  declarations: [],
  providers: [],
})
export class HomeSellModule {}

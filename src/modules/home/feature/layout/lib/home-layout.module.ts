import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeLayoutComponent } from 'src/modules/home/feature/layout/lib/home-layout.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: HomeLayoutComponent }]),
  ],
  exports: [RouterModule],
  declarations: [HomeLayoutComponent],
  providers: [],
})
export class HomeLayoutModule {}

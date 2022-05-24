import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SearchBarModule } from '@home/feature/search-bar';
import { HomeLayoutComponent } from './home-layout.component';

@NgModule({
  imports: [
    CommonModule,
    SearchBarModule,
    RouterModule.forChild([{ path: '', component: HomeLayoutComponent }]),
  ],
  exports: [RouterModule],
  declarations: [HomeLayoutComponent],
  providers: [],
})
export class HomeLayoutModule {}

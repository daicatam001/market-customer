import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DishListModule } from '@home/feature/dish-list';
import { FoodListModule } from '@home/feature/food-list';
import { MarketListModule } from '@home/feature/market-list';
import { SearchBarModule } from '@home/feature/search-bar';
import { BannerModule } from '@shared/ui';
import { HomeLayoutComponent } from './home-layout.component';

@NgModule({
  imports: [
    CommonModule,
    SearchBarModule,
    BannerModule,
    MarketListModule,
    FoodListModule,
    DishListModule,
    RouterModule.forChild([{ path: '', component: HomeLayoutComponent }]),
  ],
  exports: [RouterModule],
  declarations: [HomeLayoutComponent],
  providers: [],
})
export class HomeLayoutModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FoodItemModule } from '@home/feature/food-item';
import { FoodListComponent } from './food-list.component';

@NgModule({
  imports: [CommonModule, FoodItemModule],
  exports: [FoodListComponent],
  declarations: [FoodListComponent],
  providers: [],
})
export class FoodListModule {}

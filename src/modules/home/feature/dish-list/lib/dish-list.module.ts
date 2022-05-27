import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DishCardModule } from '@home/feature/dish-card';
import { DishListComponent } from './dish-list.component';
@NgModule({
  imports: [CommonModule, DishCardModule],
  exports: [DishListComponent],
  declarations: [DishListComponent],
  providers: [],
})
export class DishListModule {}

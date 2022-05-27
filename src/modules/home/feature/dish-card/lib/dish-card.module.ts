import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DishCardComponent } from './dish-card.component';

@NgModule({
  imports: [CommonModule],
  exports: [DishCardComponent],
  declarations: [DishCardComponent],
  providers: [],
})
export class DishCardModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FoodItemComponent } from './food-item.component';

@NgModule({
    imports: [CommonModule],
    exports: [FoodItemComponent],
    declarations: [FoodItemComponent],
    providers: [],
})
export class FoodItemModule { }

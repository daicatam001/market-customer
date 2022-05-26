import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'food-list',
  template: `
    <div class="p-4 mt-4 border-y border-slate-100 bg-white">
      <div class="grid grid-cols-5 gap-4">
        <food-item name="Thịt" type="meat"></food-item>
        <food-item name="Cá" type="fish"></food-item>
        <food-item name="Rau" type="vegetable"></food-item>
        <food-item name="Hoa quả" type="fruit"></food-item>
        <food-item name="Đồ khô" type="dry-food"></food-item>
      </div>
    </div>
  `,

})
export class FoodListComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dish-list',
  template: `
    <div>
      <div class="grid grid-cols-4 gap-4 mt-4 text-xs border-b border-slate-100 ">
        <div class="text-center py-3 border-b-2 border-primary-1 text-primary-1">Gần tôi</div>
        <div class="text-center py-3">Bán chạy</div>
        <div class="text-center py-3">Đánh giá</div>
        <div class="text-center py-3">Xem gần đây</div>
      </div>
    </div>
  `,
})
export class DishListComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}

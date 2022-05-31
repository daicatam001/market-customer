import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { DishCardModule } from '@home/feature/dish-card';

@Component({
  selector: 'dish-list',
  template: `
    <div>
      <div
        class="grid grid-cols-4 gap-4 mt-4 text-xs border-b border-slate-100 "
      >
        <div
          class="text-center py-3 border-b-2 border-primary-1 text-primary-1"
        >
          Gần tôi
        </div>
        <div class="text-center py-3">Bán chạy</div>
        <div class="text-center py-3">Đánh giá</div>
        <div class="text-center py-3">Xem gần đây</div>
      </div>
      <div class="mt-2 bg-slate-50">
        <div>
          <dish-card
            image="/assets/images/thit-ba-chi.jpg"
            title="Thịt ba chỉ"
            price="30.000/kg"
            store="Cửa hàng bà Hoa, chọ Bóp"
            distance="1.0 km"
            delivery="10 phút"
          ></dish-card>
        </div>
        <div>
          <dish-card
            title="Thịt thăn"
            image="/assets/images/thit-than-lon.jpg"
            price="30.000/kg"
            store="Cửa hàng bà Hồng, chọ Bóp"
            distance="1.0 km"
            delivery="10 phút"
          ></dish-card>
        </div>
      </div>
    </div>
  `,
})
export class DishListComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}


@NgModule({
  imports: [CommonModule, DishCardModule],
  exports: [DishListComponent],
  declarations: [DishListComponent],
  providers: [],
})
export class DishListModule {}

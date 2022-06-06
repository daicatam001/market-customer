import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  NgModule,
  OnInit,
} from '@angular/core';
import { HomeStore } from '@home/data-access/store';
import { ProductCardModule } from '@home/ui/product-card';

@Component({
  selector: 'product-list',
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
        <div *ngFor="let sp of storeProducts$ | async">
          <product-card
            [product]="sp.product"
            [price]="sp.price"
            [priceUnit]="sp.priceUnit"
            [distance]="sp.distance"
            [spendTime]="sp.spendTime"
          ></product-card>
        </div>
        <!-- <div>
          <product-card
            title="Thịt thăn"
            image="/assets/images/thit-than-lon.jpg"
            price="30.000/kg"
            store="Cửa hàng bà Hồng, chọ Bóp"
            distance="1.0 km"
            delivery="10 phút"
          ></product-card>
        </div> -->
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent implements OnInit {
  readonly storeProducts$ = this.homeStore.storeProducts$;
  constructor(private homeStore: HomeStore) {}

  ngOnInit() {}
}

@NgModule({
  imports: [CommonModule, ProductCardModule],
  exports: [ProductListComponent],
  declarations: [ProductListComponent],
  providers: [],
})
export class ProductListModule {}

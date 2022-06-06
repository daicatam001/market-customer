import { CommonModule } from '@angular/common';
import { Component, Input, NgModule, OnInit } from '@angular/core';
import { Product } from '@shared/data-access/models';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'product-card',
  template: `
    <div class="flex gap-8 p-4 bg-white border-b">
      <div
        class="w-[100px] flex-shrink-0 bg-contain bg-center bg-no-repeat"
        [ngStyle]="{ 'background-image': 'url(' + env.host + product.imageSmall + ')' }"
      ></div>
      <div class="flex-grow">
        <div class="flex gap-4 justify-between mb-3">
          <h2 class="font-semibold text-sm">{{ product.name }}</h2>
          <p class="font-medium text-sm text-primary-1">
            {{ price | number }} {{ product.unit?.toLowerCase() }}
          </p>
        </div>
        <p
          class="text-slate-400 flex gap-1 items-center text-xs whitespace-nowrap mb-1"
        >
          <svg width="13" height="13">
            <use xlink:href="#ico-map-marker"></use>
          </svg>
          <span>{{ +(distance/1000).toFixed(2) }} km</span>
          <span class="mx-1">|</span>
          <svg width="13" height="13">
            <use xlink:href="#ico-clock"></use>
          </svg>
          <span>{{ spendTime }} min</span>
        </p>
        <!-- <p class="text-xs text-slate-700" role="button">
          {{ store }}
        </p> -->
      </div>
    </div>
  `,
})
export class ProductCardComponent implements OnInit {
  @Input() price: number;
  @Input() distance: number;
  @Input() spendTime:number
  @Input() priceUnit: number;
  @Input() product: Product;
  env = environment;
  constructor() {}

  ngOnInit() {}
}

@NgModule({
  imports: [CommonModule],
  exports: [ProductCardComponent],
  declarations: [ProductCardComponent],
  providers: [],
})
export class ProductCardModule {}

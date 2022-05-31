import { CommonModule } from '@angular/common';
import { Component, Input, NgModule, OnInit } from '@angular/core';

@Component({
  selector: 'product-card',
  template: `
    <div class="flex gap-8 p-4 bg-white border-b">
      <div
        class="w-[100px] flex-shrink-0 bg-contain bg-center"
        [ngStyle]="{ 'background-image': 'url(' + image + ')' }"
      ></div>
      <div class="flex-grow">
        <div class="flex gap-4 justify-between mb-3">
          <h2 class="font-semibold text-sm">{{ title }}</h2>
          <p class="font-medium text-sm text-primary-1">
            {{ price }}
          </p>
        </div>
        <p
          class="text-slate-400 flex gap-1 items-center text-xs whitespace-nowrap mb-1"
        >
          <svg width="13" height="13">
            <use xlink:href="#ico-map-marker"></use>
          </svg>
          <span>{{ delivery }}</span>
          <span class="mx-1">|</span>
          <svg width="13" height="13">
            <use xlink:href="#ico-clock"></use>
          </svg>
          <span>{{ delivery }}</span>
        </p>
        <p class="text-xs text-slate-700" role="button">
          {{ store }}
        </p>
      </div>
    </div>
  `,
})
export class ProductCardComponent implements OnInit {
  @Input() image: string;
  @Input() title: string;
  @Input() price: string;
  @Input() store: string;
  @Input() distance: string;
  @Input() delivery: string;

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

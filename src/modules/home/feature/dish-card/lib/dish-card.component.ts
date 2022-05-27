import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'dish-card',
  template: `
    <div class="flex gap-8 p-4 bg-white border-b">
      <div
        class="w-[100px] flex-shrink-0 bg-contain bg-center"
        [ngStyle]="{ 'background-image': 'url(' + image + ')' }"
      ></div>
      <div class="space-y-1 flex-grow">
        <h2 class="font-semibold">{{ title }}</h2>

        <p class="font-medium text-sm text-primary-1">
          {{ price }}
        </p>
        <p
          class="text-slate-400 flex gap-1 items-center text-sm whitespace-nowrap"
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
        <p class="text-sm text-slate-700" role="button">
          {{ store }}
        </p>
      </div>
    </div>
  `,
})
export class DishCardComponent implements OnInit {
  @Input() image: string;
  @Input() title: string;
  @Input() price: string;
  @Input() store: string;
  @Input() distance: string;
  @Input() delivery: string;

  constructor() {}

  ngOnInit() {}
}

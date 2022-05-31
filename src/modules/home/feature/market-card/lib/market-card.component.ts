import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'market-card',
  template: `
    <div>
      <div
        class="mx-auto bg-primary-2/10 w-10 h-10 rounded-full flex items-center justify-center"
      >
        <img *ngIf="!!image; textLogo" [src]="'http://viet5g.com' + image" />
        <template #textLogo>
          <span class="text-primary-1 text-xl font-bold">{{
            name | firstChar: 'chợ'
          }}</span>
        </template>
      </div>
      <div
        class="mx-auto mt-2 text-xs text-center font-medium max-w-[100px] whitespace-normal"
      >
        {{ name }}
      </div>
    </div>
  `,
})
export class MarketCardComponent implements OnInit {
  @Input() image: string | null;
  @Input() name: string;
  env = environment;
  constructor() {}

  ngOnInit() {}
}

import { CommonModule } from '@angular/common';
import { Component, Input, NgModule, OnInit } from '@angular/core';
import { FirstCharModule } from '@shared/data-access/pipes';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'market-item',
  template: `
    <div>
      <div
        class="mx-auto bg-primary-2/10 w-10 h-10 rounded-full flex items-center justify-center"
      >
        <img *ngIf="!!image; textLogo" [src]="env.host + image" />
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
export class MarketItemComponent implements OnInit {
  @Input() image: string | null;
  @Input() name: string;
  env = environment;
  constructor() {}

  ngOnInit() {}
}

@NgModule({
  imports: [CommonModule, FirstCharModule],
  exports: [MarketItemComponent],
  declarations: [MarketItemComponent],
  providers: [],
})
export class MarketItemModule {}

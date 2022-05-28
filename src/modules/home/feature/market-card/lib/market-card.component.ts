import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'market-card',
  template: `
    <div>
      <div
        class="mx-auto bg-primary-2/10 w-10 h-10 rounded-full flex items-center justify-center"
      >
        <span class="text-primary-1 text-xl font-bold">{{ name | firstChar  }}</span>
      </div>
      <div class="mx-auto mt-2 text-xs text-center font-medium max-w-[100px] whitespace-normal">{{ name }}</div>
    </div>
  `,
})
export class MarketCardComponent implements OnInit {
  @Input() name: string;
  @Input() logo: string;
  constructor() {}

  ngOnInit() {}
}

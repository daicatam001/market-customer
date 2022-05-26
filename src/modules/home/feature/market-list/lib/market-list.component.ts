import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'market-list',
  template: `
    <div class="p-4 bg-white border-y border-slate-100">
      <h2 class="text-primary-2 font-semibold text-lg">Danh sách chợ</h2>
      <div class="grid grid-cols-3 mt-4 gap-6">
        <market-card name="Chợ Định Công" logo="Đ"></market-card>
        <market-card name="Chợ Hà Đông" logo="H"></market-card>
        <market-card name="Winmart" logo="W"></market-card>
        <market-card name="Co.op mart" logo="C"></market-card>
        <market-card name="Chợ Kim Giang" logo="K"></market-card>
        <market-card name="Top Market" logo="T"></market-card>
      </div>
    </div>
  `,
})
export class MarketListComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
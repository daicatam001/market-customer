import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'home-layout',
  template: `
    <div class="max-w-[700px] mx-auto space-y-6 bg-slate-50 pb-10">
      <search-bar></search-bar>
      <div class="px-4">
        <banner image="/assets/images/banner-1.jpg"></banner>
      </div>
      <div>
        <market-list></market-list>
      </div>
      <div>
        <food-list></food-list>
      </div>
    </div>
  `,
})
export class HomeLayoutComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}

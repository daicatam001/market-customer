import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'home-layout',
  template: `
    <div class="space-y-6 bg-slate-50 pb-10">
      <search-bar></search-bar>
      <div class="px-4">
        <banner image="/assets/images/banner-1.jpg"></banner>
      </div>
      <div>
        <market-list></market-list>
      </div>
      <div class="mt-4 border-y border-slate-100 bg-white">
        <food-list></food-list>
        <dish-list></dish-list>
      </div>
    </div>
  `,
})
export class HomeLayoutComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}

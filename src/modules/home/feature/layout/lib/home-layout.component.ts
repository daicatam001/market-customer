import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeStore } from '@home/data-access/store';
import { MarketListModule } from '@home/feature/market-list';
import { ProductListModule } from '@home/feature/product-list';
import { ProductTypeListModule } from '@home/feature/product-type-list';
import { SearchBarModule } from '@home/feature/search-bar';
import { BannerModule } from '@shared/ui/banner';

@Component({
  selector: 'home-layout',
  template: `
    <div class="space-y-6 bg-slate-50 pb-10">
      <!-- <search-bar></search-bar> -->
      <div class="px-4">
        <banner image="/assets/images/banner-1.jpg"></banner>
      </div>
      <div>
        <market-list></market-list>
      </div>
      <div class="mt-4 border-y border-slate-100 bg-white">
        <product-type-list></product-type-list>
        <product-list></product-list>
      </div>
    </div>
  `,
})
export class HomeLayoutComponent implements OnInit {
  constructor(private homeStore: HomeStore) {}

  ngOnInit() {
    this.homeStore.initData()
  }
}


@NgModule({
  imports: [
    CommonModule,
    // SearchBarModule,
    BannerModule,
    MarketListModule,
    ProductTypeListModule,
    ProductListModule,
    RouterModule.forChild([{ path: '', component: HomeLayoutComponent }]),
  ],
  exports: [RouterModule],
  declarations: [HomeLayoutComponent],
  providers: [],
})
export class HomeLayoutModule {}

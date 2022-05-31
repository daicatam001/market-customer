import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';

@Component({
  selector: 'navigation',
  template: `
    <div class="fixed bottom-0 left-0 h-[60px] w-full">
      <div
        class="max-w-[700px] mx-auto h-full bg-slate-50 border-t grid gap-4 grid-cols-[80px_80px_80px_80px] justify-center"
      >
        <div
          role="button"
          *ngFor="let item of menu"
          [ngClass]="[item.active ? 'text-primary-1 border-t-2 border-primary-1' : 'text-slate-600']"
          class="flex flex-col gap-1 justify-center items-center"
        >
          <svg width="16" height="16">
            <use [attr.xlink:href]="'#' + item.icon" />
          </svg>
          <div class="text-xs font-medium">{{ item.title }}</div>
        </div>
      </div>
    </div>
  `,
})
export class NavigationComponent implements OnInit {
  menu = [
    { title: 'Home', icon: 'ico-home', active: true },
    { title: 'Giỏ hàng', icon: 'ico-cart' },
    { title: 'Đơn hàng', icon: 'ico-file' },
    { title: 'Tôi', icon: 'ico-user' },
  ];

  constructor() {}

  ngOnInit() {}
}

@NgModule({
  imports: [CommonModule],
  exports: [NavigationComponent],
  declarations: [NavigationComponent],
  providers: [],
})
export class NavigationModule {}

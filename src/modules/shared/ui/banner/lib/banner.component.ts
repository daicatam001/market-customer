import { CommonModule } from '@angular/common';
import { Component, Input, NgModule, OnInit } from '@angular/core';

@Component({
  selector: 'banner',
  template: ` <img [src]="image" class="rounded shadow" /> `,
})
export class BannerComponent implements OnInit {
  @Input() image: string;
  constructor() {}

  ngOnInit() {}
}

@NgModule({
  imports: [CommonModule],
  exports: [BannerComponent],
  declarations: [BannerComponent],
  providers: [],
})
export class BannerModule {}

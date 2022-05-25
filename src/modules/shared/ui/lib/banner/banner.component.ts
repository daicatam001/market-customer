import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'banner',
  template: ` <img [src]="image" class="rounded shadow" /> `,
})
export class BannerComponent implements OnInit {
  @Input() image: string;
  constructor() {}

  ngOnInit() {}
}

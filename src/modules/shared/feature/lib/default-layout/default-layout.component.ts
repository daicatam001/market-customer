import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'default-layout',
  template: `
    <div class="max-w-[700px] mx-auto">
      <router-outlet></router-outlet>
      <navigation></navigation>
    </div>
  `,
})
export class DefaultlayuoutComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}

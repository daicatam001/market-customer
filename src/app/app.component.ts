import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: ` <the-svg></the-svg>
    <router-outlet></router-outlet>`,
})
export class AppComponent {
  title = 'market-customer';
}

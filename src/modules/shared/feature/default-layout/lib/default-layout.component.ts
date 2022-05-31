import { Component, NgModule, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavigationModule } from '@shared/feature/navigation/lib/navigation.component';

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

@NgModule({
  imports: [RouterModule, NavigationModule],
  exports: [DefaultlayuoutComponent],
  declarations: [DefaultlayuoutComponent],
  providers: [],
})
export class DefaultlayuoutModule {}

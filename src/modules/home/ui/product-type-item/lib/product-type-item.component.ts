import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgModule,
  OnInit,
} from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'product-type-item',
  template: `
    <div>
      <div
        class="mx-auto w-12 h-12 bg-cover bg-center"
        [style]="'background-image:url(' + env.host + image + ')'"
      ></div>
      <div
        class="mx-auto mt-2 text-xs text-center font-medium max-w-[100px] whitespace-normal"
      >
        {{ name }}
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductTypeItemComponent implements OnInit {
  @Input() name: string;
  @Input() image: string;
  env = environment;
  constructor() {}

  ngOnInit() {}
}


@NgModule({
  imports: [CommonModule],
  exports: [ProductTypeItemComponent],
  declarations: [ProductTypeItemComponent],
  providers: [],
})
export class ProductTypeItemModule {}

import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'food-item',
  template: `
    <div>
      <div
        class="mx-auto w-12 h-12 bg-[length:200px]"
        [ngClass]="'type-' + type"
        style="background-image:url('/assets/images/food-type.jpg')"
      ></div>
      <div
        class="mx-auto mt-2 text-xs text-center font-medium max-w-[100px] whitespace-normal"
      >
        {{ name }}
      </div>
    </div>
  `,
  styles: [
    `
      .type-meat {
        background-position: -4px 148px;
      }
      .type-fish {
        background-position: 148px 148px;
      }
      .type-vegetable {
        background-position: 52px 52px;
      }
      .type-fruit {
        background-position: -4px 100px;
      }
      .type-dry-food {
        background-position: -52px 52px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoodItemComponent implements OnInit {
  @Input() name: string;
  @Input() type: string;
  constructor() {}

  ngOnInit() {}
}

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
        class="mx-auto w-12 h-12 bg-cover bg-center"
        [style]="'background-image:url(http://viet5g.com' + image + ')'"
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
export class FoodItemComponent implements OnInit {
  @Input() name: string;
  @Input() image: string;
  constructor() {}

  ngOnInit() {}
}

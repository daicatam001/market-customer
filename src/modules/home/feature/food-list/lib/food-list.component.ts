import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { HomeStore } from '@home/data-access';

@Component({
  selector: 'food-list',
  template: `
    <div class="p-4  grid grid-cols-5 gap-4">
      <food-item *ngFor="let pt of productTypes$ | async" [name]="pt.name" [image]="pt.image"></food-item>
      <!--
      <food-item name="Cá" type="fish"></food-item>
      <food-item name="Rau" type="vegetable"></food-item>
      <food-item name="Hoa quả" type="fruit"></food-item>
      <food-item name="Đồ khô" type="dry-food"></food-item>
      -->
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoodListComponent implements OnInit {
  readonly productTypes$ = this.homeStore.productTypes$;

  constructor(private homeStore: HomeStore) {}

  ngOnInit() {}
}

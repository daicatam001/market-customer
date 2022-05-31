import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule, OnInit } from '@angular/core';
import { HomeStore } from '@home/data-access/store';
import { ProductTypeItemModule } from '@home/ui/product-type-item';

@Component({
  selector: 'product-type-list',
  template: `
    <div class="p-4  grid grid-cols-5 gap-4">
      <product-type-item *ngFor="let pt of productTypes$ | async" [name]="pt.name" [image]="pt.image"></product-type-item>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductTypeListComponent implements OnInit {
  readonly productTypes$ = this.homeStore.productTypes$;

  constructor(private homeStore: HomeStore) {}

  ngOnInit() {}
}

@NgModule({
  imports: [CommonModule, ProductTypeItemModule],
  exports: [ProductTypeListComponent],
  declarations: [ProductTypeListComponent],
  providers: [],
})
export class ProductTypeListModule {}


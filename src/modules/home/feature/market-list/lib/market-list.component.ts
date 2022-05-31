import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule, OnInit } from '@angular/core';
import { HomeStore } from '@home/data-access';
import { MarketItemModule } from '@home/ui/market-item';

@Component({
  selector: 'market-list',
  template: `
    <div class="p-4 bg-white border-y border-slate-100">
      <h2 class="text-primary-2 font-semibold text-lg">Danh sách chợ</h2>
      <div class="grid grid-cols-3 mt-4 gap-6">
        <market-item *ngFor="let m of markets$ | async" [name]="m.name" [image]="m.image"></market-item>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarketListComponent implements OnInit {
  readonly markets$ = this.homeStore.markets$;

  constructor(private homeStore: HomeStore) {}

  ngOnInit() {}
}


@NgModule({
  imports: [CommonModule, MarketItemModule],
  exports: [MarketListComponent],
  declarations: [MarketListComponent],
  providers: [],
})
export class MarketListModule {}

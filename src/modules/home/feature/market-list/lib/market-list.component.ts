import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { HomeStore } from '@home/data-access';

@Component({
  selector: 'market-list',
  template: `
    <div class="p-4 bg-white border-y border-slate-100">
      <h2 class="text-primary-2 font-semibold text-lg">Danh sách chợ</h2>
      <div class="grid grid-cols-3 mt-4 gap-6">
        <market-card *ngFor="let m of markets$ | async" [name]="m.name" [image]="m.image"></market-card>
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

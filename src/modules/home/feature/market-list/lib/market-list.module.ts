import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MarketCardModule } from '@home/feature/market-card';
import { MarketListComponent } from '@home/feature/market-list/lib/market-list.component';

@NgModule({
  imports: [CommonModule, MarketCardModule],
  exports: [MarketListComponent],
  declarations: [MarketListComponent],
  providers: [],
})
export class MarketListModule {}

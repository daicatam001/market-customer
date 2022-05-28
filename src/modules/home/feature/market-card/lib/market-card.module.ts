import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MarketCardComponent } from '@home/feature/market-card/lib/market-card.component';
import { FirstCharModule } from '@shared/data-access/pipes';

@NgModule({
  imports: [CommonModule, FirstCharModule],
  exports: [MarketCardComponent],
  declarations: [MarketCardComponent],
  providers: [],
})
export class MarketCardModule {}

import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  NgModule,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'search-bar',
  template: `
    <div class="py-3 px-4 relative border-b bg-white">
      <svg
        width="16"
        height="16"
        class="text-slate-400 absolute top-1/2 -translate-y-1/2 left-8"
      >
        <use xlink:href="#ico-search" />
      </svg>
      <input
        class="px-6 py-1.5 bg-slate-100 rounded-full border-0 outline-none w-full indent-4"
        placeholder="Tìm kiểu cửa hàng, món ăn..."
      />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBarComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}

@NgModule({
  imports: [CommonModule],
  exports: [SearchBarComponent],
  declarations: [SearchBarComponent],
  providers: [],
})
export class SearchBarModule {}

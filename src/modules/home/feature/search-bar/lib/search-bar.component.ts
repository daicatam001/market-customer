import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'search-bar',
  template: `
    <div class="px-4 py-3">
      <input class="px-6 py-1.5 bg-slate-100 rounded-full border-0 outline-none w-full " />
    </div>
  `,
})
export class SearchBarComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}

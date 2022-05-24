import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'home-layout',
    template: `
        <div class="max-w-[700px] mx-auto">
            <search-bar></search-bar>
        </div>
    `
})

export class HomeLayoutComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}
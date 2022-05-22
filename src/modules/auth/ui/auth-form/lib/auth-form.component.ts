import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'auth-form',
  template: `
    <div class="flex md:items-center justify-center min-h-[100vh]">
      <div
        class="max-w-full w-[900px] grid grid-cols-2 md:border shadow rounded mx-auto"
      >
        <ng-content></ng-content>
        <div
          class="hidden md:block col-span-1 bg-gradient-to-r from-primary-2 to-primary-1 p-10"
        >
          <div class=" text-white">
            <div class="text-2xl font-bold mb-6">
              Ad labore consequat pariatur
            </div>
            <p>
              Sunt irure irure eu amet non amet laboris non ullamco laboris
              elit. Mollit exercitation voluptate dolor cillum do eiusmod magna
              dolore.
            </p>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class AuthFormComponent {
  constructor() {}

}

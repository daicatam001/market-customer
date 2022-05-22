import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'user-info',
  template: `
    <div class="flex md:items-center justify-center min-h-[100vh]">
      <div
        class="max-w-full w-[900px] grid grid-cols-2 md:border shadow rounded mx-auto"
      >
        <div class="py-8 px-4 md:px-8 md:col-span-1 col-span-2">
          <div class="text-center mb-6">
            <img
              src="/assets/images/Viet5g_Logo_Sologan_Small.jpg"
              class="w-[150px] md:w-[100px] mx-auto"
            />
            <div class="text-gray-700 mt-2">
              Vui lòng nhập thông tin để tiếp tục
            </div>
          </div>
          <div class="space-y-3 mb-8">
            <div class="space-y-2">
              <label class="form-label font-medium">Họ tên</label>
              <input class="form-control" placeholder="Nhập họ tên" />
            </div>
            <div class="space-y-2">
              <label class="form-label font-medium">Số điện thoại</label>
              <input class="form-control" placeholder="Nhập số điện thoại" />
            </div>
          </div>
          <div class="space-y-4">
            <button
              class="form-button bg-gradient-to-r from-primary-2/20 to-primary-1/20"
              (click)="onSubmit()"
            >
              Tiếp tục
            </button>
            <button
              class="form-button bg-white text-black border border-gray-300 shadow-none"
            >
              Bỏ qua
            </button>
          </div>
        </div>
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
export class UserInforComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  onSubmit(){

  }
}

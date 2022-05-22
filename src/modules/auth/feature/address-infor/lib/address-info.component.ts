import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'address-info',
  template: `
    <div class="flex md:items-center justify-center min-h-[100vh]">
      <div
        class="max-w-full w-[900px] grid grid-cols-2 md:border shadow rounded mx-auto"
      >
        <div class="py-8 px-4 md:px-8 md:col-span-1 col-span-2">
          <div class="mb-4">
            <div class="text-2xl font-bold">Thông tin địa chỉ</div>
            <div class="text-gray-600 mt-1">Vui lòng nhập địa chỉ của bạn</div>
          </div>
          <div class="space-y-3 mb-8">
            <div class="space-y-2">
              <label class="form-label font-medium">Tỉnh / Thành phố</label>
              <select
                class="form-control form-select placeholder:text-gray-400"
              ></select>
            </div>
            <div class="space-y-2">
              <label class="form-label font-medium">Quận / Huyện</label>
              <select class="form-control form-select"></select>
            </div>
            <div class="space-y-2">
              <label class="form-label font-medium">Phường / Xã</label>
              <select class="form-control form-select"></select>
            </div>
            <div class="space-y-2">
              <label class="form-label font-medium">Địa chỉ</label>
              <textarea
                class="form-control form-textarea"
                placeholder="Nhập địa chỉ chính xác"
              ></textarea>
            </div>
          </div>
          <div class="space-y-4">
            <button
              class="form-button bg-gradient-to-r from-primary-2 to-primary-1"
            >
              Tiếp tục
            </button>
            <button
              class="form-button bg-white text-black border border-gray-300 shadow-none"
              (click)="onBack()"
            >
              Quay lại
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
export class AddressInforComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  onBack(){
      
  }
}

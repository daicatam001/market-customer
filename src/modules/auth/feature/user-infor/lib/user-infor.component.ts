import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthStore } from '@auth/data-access';
import { take, tap } from 'rxjs';

@Component({
  selector: 'user-info',
  template: `
    <auth-form *ngIf="vm$ | async as vm">
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
        <form [formGroup]="form" (ngSubmit)="onSubmit()">
          <div class="space-y-3 mb-8">
            <div class="space-y-2">
              <label class="form-label font-medium">Họ tên</label>
              <input
                class="form-control"
                placeholder="Nhập họ tên"
                formControlName="name"
              />
            </div>
            <div class="space-y-2">
              <label class="form-label font-medium">Số điện thoại</label>
              <input
                class="form-control"
                placeholder="Nhập số điện thoại"
                formControlName="phoneNumber"
              />
            </div>
          </div>
          <div class="space-y-4">
            <button
              [disabled]="!vm.isValidUserInfo"
              class="form-button bg-gradient-to-r from-primary-2/20 to-primary-1/20"
              [ngClass]="{ 'bg-opacity-20': !vm.isValidUserInfo }"
            >
              Tiếp tục
            </button>
            <button
              type="button"
              class="form-button bg-white text-black border border-gray-300 shadow-none"
            >
              Bỏ qua
            </button>
          </div>
        </form>
      </div>
    </auth-form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserInforComponent implements OnInit {
  form: FormGroup;

  readonly vm$ = this.authStore.vm$;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authStore: AuthStore
  ) {
    this.initForm();
  }

  ngOnInit() {}

  initForm() {
    this.form = this.fb.group({
      name: [''],
      phoneNumber: [],
    });
    this.authStore.user$
      .pipe(take(1))
      .subscribe((value) => this.form.patchValue(value));
    this.form.valueChanges
      .pipe(tap((value) => this.authStore.updateUser(value)))
      .subscribe();
  }

  onSubmit() {
    console.log(this.form.getRawValue());
    this.router.navigate(['auth', 'address']);
  }
}

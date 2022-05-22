import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthStore } from '@auth/data-access';
import { tap } from 'rxjs';

@Component({
  selector: 'address-info',
  template: `
    <auth-form>
      <div class="py-8 px-4 md:px-8 md:col-span-1 col-span-2">
        <div class="mb-4">
          <div class="text-2xl font-bold">Thông tin địa chỉ</div>
          <div class="text-gray-600 mt-1">Vui lòng nhập địa chỉ của bạn</div>
        </div>
        <form [formGroup]="form" (ngSubmit)="onSubmit()">
          <div class="space-y-3 mb-8">
            <div class="space-y-2">
              <label class="form-label font-medium">Tỉnh / Thành phố</label>
              <select
                class="form-control form-select placeholder:text-gray-400"
                formControlName="province"
              >
                <option *ngFor="let p of provinces$ | async" [ngValue]="p.id">
                  {{ p.name }}
                </option>
              </select>
            </div>
            <div class="space-y-2">
              <label class="form-label font-medium">Quận / Huyện</label>
              <select
                class="form-control form-select"
                formControlName="district"
              >
                <option
                  *ngFor="let p of districtsByProv$ | async"
                  [ngValue]="p.id"
                >
                  {{ p.name }}
                </option>
              </select>
            </div>
            <div class="space-y-2">
              <label class="form-label font-medium">Phường / Xã</label>
              <select class="form-control form-select" formControlName="ward">
                <option *ngFor="let p of wardsByDis$ | async" [ngValue]="p.id">
                  {{ p.name }}
                </option>
              </select>
            </div>
            <div class="space-y-2">
              <label class="form-label font-medium">Địa chỉ</label>
              <textarea
                class="form-control form-textarea"
                placeholder="Nhập địa chỉ chính xác"
              ></textarea>
            </div>
          </div>
        </form>
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
    </auth-form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddressInforComponent implements OnInit {
  readonly provinces$ = this.authStore.provinces$;
  readonly districtsByProv$ = this.authStore.districtsByProv$;
  readonly wardsByDis$ = this.authStore.wardsByDis$;
  form: FormGroup;

  constructor(
    private authStore: AuthStore,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.initForm();
  }

  ngOnInit() {}

  private initForm() {
    this.form = this.fb.group({
      province: [null],
      district: [null],
      ward: [null],
      address: '',
    });
    this.form.valueChanges
      .pipe(tap((value) => this.authStore.updateUser(value)))
      .subscribe();
    this.province.valueChanges
      .pipe(tap(() => this.district.setValue(null)))
      .subscribe();
    this.district.valueChanges
      .pipe(tap(() => this.ward.setValue(null)))
      .subscribe();
  }

  onSubmit() {}

  onBack() {
    this.router.navigate(['auth']);
  }

  get province(): FormControl {
    return this.form.get('province') as FormControl;
  }

  get district(): FormControl {
    return this.form.get('district') as FormControl;
  }
  get ward(): FormControl {
    return this.form.get('ward') as FormControl;
  }
}

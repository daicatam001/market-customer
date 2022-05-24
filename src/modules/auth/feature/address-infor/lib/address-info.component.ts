import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthStore } from '@auth/data-access';
import { DistrictEntry, WardEntry } from '@shared/data-access/models';
import { combineLatestWith, map, Observable, take, tap } from 'rxjs';

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
                class="form-control form-select"
                [ngClass]="{ 'text-gray-400': !province.value }"
                formControlName="province"
                required
              >
                <option [ngValue]="null" disabled selected hidden>
                  Chọn tỉnh / thành phố
                </option>
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
                [ngClass]="{ 'text-gray-400': !district.value }"
                required
              >
                <option [ngValue]="null" disabled selected hidden>
                  Chọn quận / huyện
                </option>
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
              <select
                class="form-control form-select"
                [ngClass]="{ 'text-gray-400': !wardId.value }"
                formControlName="wardId"
                required
              >
                <option [ngValue]="null" disabled selected hidden>
                  Chọn phường / xã
                </option>
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
                formControlName="address"
              ></textarea>
            </div>
          </div>

          <div class="space-y-4">
            <button
              [disabled]="form.invalid"
              class="form-button bg-gradient-to-r from-primary-2/20 to-primary-1/20"
              [ngClass]="{ 'bg-opacity-20': form.invalid }"
            >
              Tiếp tục
            </button>
            <button
              type="button"
              class="form-button bg-white text-black border border-gray-300 shadow-none"
              (click)="onBack()"
            >
              Quay lại
            </button>
          </div>
        </form>
      </div>
    </auth-form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddressInforComponent implements OnInit {
  form: FormGroup;
  districtsByProv$: Observable<DistrictEntry[]>;
  wardsByDis$: Observable<WardEntry[]>;
  readonly provinces$ = this.authStore.provinces$;
  readonly user$ = this.authStore.user$;
  constructor(
    private authStore: AuthStore,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.authStore.isValidUserInfo$
      .pipe(
        take(1),
        tap((isValid) => {
          !isValid && router.navigate(['auth']);
        })
      )
      .subscribe();
    this.initForm();
  }

  ngOnInit() {}

  private initForm() {
    this.form = this.fb.group({
      province: [null, [Validators.required]],
      district: [null, [Validators.required]],
      wardId: [null, [Validators.required]],
      address: ['', [Validators.required]],
    });
    this.districtsByProv$ = this.province.valueChanges.pipe(
      tap(() => this.district.setValue(null)),
      combineLatestWith(this.authStore.district$),
      tap((res) => console.log(res)),
      map(([province, districts]: [number | null, DistrictEntry[]]) =>
        districts.filter((d) => d.provinceId === province)
      )
    );
    this.wardsByDis$ = this.district.valueChanges.pipe(
      tap(() => this.wardId.setValue(null)),
      combineLatestWith(this.authStore.wards$),
      map(([district, wards]: [number | null, WardEntry[]]) =>
        wards.filter((w) => w.districtId === district)
      )
    );
    this.authStore.user$
      .pipe(
        take(1),
        tap((value) => this.form.patchValue(value))
      )
      .subscribe();
  }

  onSubmit() {
    this.authStore.updateUser(this.form.getRawValue());
    this.authStore.regiserAddress(true);
  }

  onBack() {
    this.router.navigate(['auth']);
  }

  get province(): FormControl {
    return this.form.get('province') as FormControl;
  }

  get district(): FormControl {
    return this.form.get('district') as FormControl;
  }
  get wardId(): FormControl {
    return this.form.get('wardId') as FormControl;
  }
}

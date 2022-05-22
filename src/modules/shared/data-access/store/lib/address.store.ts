import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import {
  Address,
  AddressRes,
  DistrictEntry,
  EntryData,
  WardEntry,
} from '@shared/data-access/models';
import AddressApi from '@shared/data-access/server-api/lib/address.api';
import { switchMap, tap } from 'rxjs';

export interface ResourcesState {
  provinceEntry: EntryData<Address>;
  districtEntry: EntryData<DistrictEntry>;
  wardEntry: EntryData<WardEntry>;
  sessionId: string | null;
}

@Injectable({ providedIn: 'root' })
export class AddressStore extends ComponentStore<ResourcesState> {
  constructor(private addressApi: AddressApi) {
    super({
      provinceEntry: {},
      districtEntry: {},
      wardEntry: {},
      sessionId: null,
    });
  }
  readonly sessionId$ = this.select((state) => state.sessionId);
  readonly provinceEntry$ = this.select((state) => state.provinceEntry);
  readonly districtEntry$ = this.select((state) => state.districtEntry);
  readonly wardEntry$ = this.select((state) => state.wardEntry);

  readonly provinces$ = this.select(this.provinceEntry$, (entry) =>
    Object.values(entry)
  );
  readonly districts$ = this.select(this.districtEntry$, (entry) =>
    Object.values(entry)
  );

  readonly wards$ = this.select(this.wardEntry$, (entry) =>
    Object.values(entry)
  );

  readonly getAddress = this.effect(($effect) =>
    $effect.pipe(
      switchMap(() =>
        this.addressApi.getAddresses().pipe(
          tap((res: AddressRes) => {
            const provinceEntry: EntryData<Address> = {},
              districtEntry: EntryData<DistrictEntry> = {},
              wardEntry: EntryData<WardEntry> = {};
            res.province.forEach((p) => {
              provinceEntry[p.id] = { id: p.id, name: p.name };
              if (p.district) {
                p.district.forEach((d) => {
                  districtEntry[d.id] = {
                    id: d.id,
                    name: d.name,
                    provinceId: p.id,
                  };
                  if (d.ward) {
                    d.ward.forEach((w) => {
                      wardEntry[w.id] = {
                        id: w.id,
                        name: w.name,
                        districtId: d.id,
                      };
                    });
                  }
                });
              }
            });
            this.setState({
              provinceEntry,
              districtEntry,
              wardEntry,
              sessionId: res.sessionId,
            });
          })
        )
      )
    )
  );
}

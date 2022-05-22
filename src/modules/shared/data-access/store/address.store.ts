import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { switchMap, tap } from "rxjs";
import { Province, EntryData, District, Ward } from "@shared/data-access/models";
import AddressApi from "@shared/data-access/server-api/address.api";

export interface ResourcesState {
    provinceEntry: EntryData<Province>
    districtEntry: EntryData<District>
    wardEntry: EntryData<Ward>
}


@Injectable({ providedIn: 'root' })
export class AddressStore extends ComponentStore<ResourcesState> {

    constructor(private addressApi: AddressApi) {
        super({
            provinceEntry: {},
            districtEntry: {},
            wardEntry: {},
        });
    }

    readonly getResources = this.effect($effect =>
        $effect.pipe(switchMap(() =>
            this.addressApi.getAddresses().pipe(tap(res => {
                console.log(res)
            })
            )
        ))
    )
}
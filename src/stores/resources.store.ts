import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { switchMap, tap } from "rxjs";
import { EntryData } from "src/core/models/common";
import { District, Province, Ward } from "src/core/models/resources";
import ResourcesService from "src/services/resources.service";

export interface ResourcesState {
    provinceEntry: EntryData<Province>
    districtEntry: EntryData<District>
    wardEntry: EntryData<Ward>
}


@Injectable({ providedIn: 'root' })
export class ResourcesStore extends ComponentStore<ResourcesState> {

    constructor(private resroucesService: ResourcesService) {
        super({
            provinceEntry: {},
            districtEntry: {},
            wardEntry: {},
        });
    }

    readonly getResources = this.effect($effect =>
        $effect.pipe(switchMap(() =>
            this.resroucesService.getAddresses().pipe(tap(res => {
                console.log(res)
            })
            )
        ))
    )
}
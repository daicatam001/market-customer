export interface Address {
  id: number;
  name: string;
}
export type Province = Address & {
  district: District[];
};

export type District = Address & {
  ward: Address[];
};

export type DistrictEntry = Address & {
  provinceId: number;
};

export type WardEntry = Address & {
  districtId: number;
};

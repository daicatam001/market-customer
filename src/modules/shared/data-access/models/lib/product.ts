export interface ProductType {
  id: number;
  type1: string;
  type2: string;
  type3: string;
  name: string;
  value: string;
  image: string;
}
export interface StoreProduct {
  id: number;
  price: number;
  priceUnit: number;
  latitude: number;
  longitude: number;
  distance: number;
  storeId: number;
  product: Product;
}

export interface Product {
  id: number;
  name: string;
  note: string | null;
  weight: string | null;
  unit: string | null;
  imageBig: string | null;
  imageSmall: string | null;
  type1: string | null;
  type2: string | null;
  type3: string | null;
  type4: string | null;
  type5: string | null;
  storeProductId: number;
}

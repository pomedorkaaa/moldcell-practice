import type { CatalogProduct } from "./catalog";

export interface CartItem {
  product: CatalogProduct;
  quantity: number;
}

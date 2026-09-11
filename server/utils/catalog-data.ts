import seed from "../data/catalog.seed.json";
import { CatalogProduct } from "#shared/types/catalog";

export const catalogProducts: CatalogProduct[] = seed.products.map(
  (product) => ({
    ...product,
    brand: seed.brands.find((brand) => brand.id === product.brandId) ?? null,
    category:
      seed.categories.find((category) => category.id === product.categoryId) ??
      null,
  }),
);

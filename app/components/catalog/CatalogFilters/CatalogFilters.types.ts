import type { LocationQuery } from "vue-router";

import type { Brand, Category, CatalogPriceRange } from "#shared/types/catalog";

export interface CatalogFilterPatch {
  category?: string[];
  brand?: string[];
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
}

export interface CatalogFiltersProps {
  categories: Category[];
  brands: Brand[];
  priceRange: CatalogPriceRange;
  query: LocationQuery;
}

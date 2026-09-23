import { getCatalogPriceRange } from "#imports";

export default defineEventHandler(() => {
  return getCatalogPriceRange();
});

import { getCatalogPriceRange } from "../../utils/catalog-data";

export default defineEventHandler(() => {
  return getCatalogPriceRange();
});

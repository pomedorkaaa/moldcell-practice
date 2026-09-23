import { getCatalogBrands } from "../utils/catalog-data";

export default defineEventHandler(() => {
  return getCatalogBrands();
});

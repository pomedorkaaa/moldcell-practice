// import seed from "../data/catalog.seed.json";
import { getCatalogCategories } from "../utils/catalog-data";

export default defineEventHandler(() => {
  // return seed.categories;
  return getCatalogCategories();
});

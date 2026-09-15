import { catalogProducts } from "../utils/catalog-data";

export default defineEventHandler(() => {
  return catalogProducts;
});

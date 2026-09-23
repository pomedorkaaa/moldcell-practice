// import seed from "../data/catalog.seed.json";

// export default defineEventHandler(() => {
//   return seed.products;
// });

import { getValidatedQuery } from "h3";

import { catalogQuerySchema } from "../schemas/catalog-query";
import { getCatalogProducts } from "../utils/catalog-data";

export default defineEventHandler(async (event) => {
  const query = await getValidatedQuery(event, (value) =>
    catalogQuerySchema.parse(value),
  );

  return getCatalogProducts(query);
});

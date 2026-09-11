import { catalogProducts } from "~~/server/utils/catalog-data";

export default defineEventHandler((event) => {
  const slug = getRouterParam(event, "slug");

  // console.log("slug info");
  // console.log(slug);

  const product = catalogProducts.find((product) => {
    return product.slug === slug;
  });

  return product;
});

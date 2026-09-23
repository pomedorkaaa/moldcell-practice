import { getCatalogProductBySlug } from "~~/server/utils/catalog-data";

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, "slug");

  // console.log("slug info");
  // console.log(slug);

  // const product = catalogProducts.find((product) => {
  //   return product.slug === slug;
  // });

  if (!slug) {
    throw new Error("product slug is reuired");
  }
  const product = await getCatalogProductBySlug(slug);

  return product;
});

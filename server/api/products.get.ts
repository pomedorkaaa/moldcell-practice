import seed from "../data/catalog.seed.json";

export default defineEventHandler(() => {
  return seed.products;
});

import { desc, eq } from "drizzle-orm";

import type { CatalogProduct } from "~~/shared/types/catalog";

import { db } from "../../db/client";
import { brands, categories, favorites, products } from "../../db/schema";
import { getCustomer } from "../../utils/customer";

export default defineEventHandler(async (event) => {
  const customer = await getCustomer(event);
  const ownerCondition =
    customer.type === "user"
      ? eq(favorites.userId, customer.userId)
      : eq(favorites.guestId, customer.guestId);

  const rows = await db
    .select({ product: products, brand: brands, category: categories })
    .from(favorites)
    .innerJoin(products, eq(favorites.productId, products.id))
    .innerJoin(brands, eq(products.brandId, brands.id))
    .innerJoin(categories, eq(products.categoryId, categories.id))
    .where(ownerCondition)
    .orderBy(desc(favorites.createdAt));

  return rows.map(
    (row): CatalogProduct => ({
      ...row.product,
      createdAt: row.product.createdAt.toISOString(),
      brand: row.brand,
      category: row.category,
    }),
  );
});

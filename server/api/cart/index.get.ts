import { desc, eq } from "drizzle-orm";

import type { CartItem } from "~~/shared/types/cart";

import { db } from "../../db/client";
import { brands, cart, categories, products } from "../../db/schema";
import { getCustomer } from "../../utils/customer";

export default defineEventHandler(async (event) => {
  const customer = await getCustomer(event);
  const ownerCondition =
    customer.type === "user"
      ? eq(cart.userId, customer.userId)
      : eq(cart.guestId, customer.guestId);

  const rows = await db
    .select({
      product: products,
      brand: brands,
      category: categories,
      quantity: cart.quantity,
    })
    .from(cart)
    .innerJoin(products, eq(cart.productId, products.id))
    .innerJoin(brands, eq(products.brandId, brands.id))
    .innerJoin(categories, eq(products.categoryId, categories.id))
    .where(ownerCondition)
    .orderBy(desc(cart.createdAt));

  return rows.map(
    (row): CartItem => ({
      product: {
        ...row.product,
        brand: row.brand,
        category: row.category,
        createdAt: row.product.createdAt.toISOString(),
      },
      quantity: row.quantity,
    }),
  );
});

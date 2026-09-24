import { eq } from "drizzle-orm";
import { getRouterParam } from "h3";

import { db } from "../../db/client";
import { favorites, products } from "../../db/schema";
import { getCustomer } from "../../utils/customer";

export default defineEventHandler(async (event) => {
  const productId = Number(getRouterParam(event, "productId"));

  const [product] = await db
    .select({
      id: products.id,
    })
    .from(products)
    .where(eq(products.id, productId))
    .limit(1);

  if (!product) {
    throw createError({
      statusCode: 404,
      statusMessage: "Product not found",
    });
  }

  const customer = await getCustomer(event);

  await db
    .insert(favorites)
    .values({
      userId: customer.type === "user" ? customer.userId : null,
      guestId: customer.type === "guest" ? customer.guestId : null,
      productId,
    })
    .onConflictDoNothing();

  return {
    success: true,
  };
});

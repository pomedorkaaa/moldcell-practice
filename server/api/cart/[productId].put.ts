import { and, eq } from "drizzle-orm";
import { getRouterParam, readValidatedBody } from "h3";

import { db } from "../../db/client";
import { cart, products } from "../../db/schema";
import { getCustomer } from "../../utils/customer";
import { setCartQuantitySchema } from "../../schemas/setCartQuantity";

export default defineEventHandler(async (event) => {
  const productId = Number(getRouterParam(event, "productId"));
  const { quantity } = await readValidatedBody(event, (value) =>
    setCartQuantitySchema.parse(value),
  );

  const customer = await getCustomer(event);
  const ownerCondition =
    customer.type === "user"
      ? eq(cart.userId, customer.userId)
      : eq(cart.guestId, customer.guestId);

  const [product] = await db
    .select({ stock: products.stock })
    .from(products)
    .where(eq(products.id, productId))
    .limit(1);

  if (!product) {
    throw createError({
      statusCode: 404,
      statusMessage: "Product not found",
    });
  }

  const [updatedItem] = await db
    .update(cart)
    .set({
      quantity: Math.min(quantity, product.stock),
    })
    .where(and(ownerCondition, eq(cart.productId, productId)))
    .returning({ id: cart.id });

  if (!updatedItem) {
    throw createError({
      statusCode: 404,
      statusMessage: "Product not found in cart",
    });
  }

  return { success: true };
});

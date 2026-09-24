import { getRouterParam, readValidatedBody } from "h3"
import { db } from "~~/server/db/client";
import { products, cart } from "~~/server/db/schema";
import { eq } from "drizzle-orm";
import { getCustomer } from "~~/server/utils/customer";
import { addToCartSchema } from "~~/server/schemas/addToCart";


export default defineEventHandler(async (event) => {
  const productId = Number(getRouterParam(event, "productId"));
  const { quantity } = await readValidatedBody(event, (value) => {
    return addToCartSchema.parse(value);
  });

  const [product] = await db
    .select({ 
      id: products.id, 
      stock: products.stock,
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

  await db.insert(cart).values({
    userId: customer.type === "user" ? customer.userId : null,
    guestId: customer.type === "guest" ? customer.guestId : null,
    productId,
    quantity: Math.min(quantity, product.stock),
  }).onConflictDoNothing();

  return {
    success: true
  }
})
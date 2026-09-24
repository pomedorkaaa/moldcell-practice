import { getRouterParam, readValidatedBody } from "h3"
import { db } from "~~/server/db/client";
import { products, cart } from "~~/server/db/schema";
import { eq, and } from "drizzle-orm";
import { getCustomer } from "~~/server/utils/customer";
import { cartDeltaSchema } from "~~/server/schemas/сartDelta";


export default defineEventHandler(async (event) => {
  const productId = Number(getRouterParam(event, "productId"));
  const { delta } = await readValidatedBody(event, (value) =>{
    return cartDeltaSchema.parse(value);
  })

  const customer = await getCustomer(event);
  const ownerCondition =
    customer.type === "user"
      ? eq(cart.userId, customer.userId)
      : eq(cart.guestId, customer.guestId);

  const [product] = await db
    .select({ 
      id: products.id,
      quantity: cart.quantity,
      stock: products.stock
    })
    .from(products)
    .innerJoin(cart, eq(cart.productId, products.id))
    .where(and(ownerCondition, eq(products.id, productId)))
    .limit(1);

  if (!product) {
    throw createError({
      statusCode: 404,
      statusMessage: "Product not found in cart",
    });
  }

  const newQuantity = product.quantity + delta;

  await db.update(cart)
  .set({
    quantity: Math.max(1, Math.min(product.stock, newQuantity)),
  })
  .where(
    and(ownerCondition, 
      eq(cart.productId, productId))
    );

  return {
    success: true
  }
})
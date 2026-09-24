import { and, eq } from "drizzle-orm";
import { getRouterParam } from "h3";

import { db } from "../../db/client";
import { cart } from "../../db/schema";
import { getCustomer } from "../../utils/customer";

export default defineEventHandler(async (event) => {
  const productId = Number(getRouterParam(event, "productId"));

  const customer = await getCustomer(event);
  const ownerCondition =
    customer.type === "user"
      ? eq(cart.userId, customer.userId)
      : eq(cart.guestId, customer.guestId);

  await db
    .delete(cart)
    .where(and(ownerCondition, eq(cart.productId, productId)));

  return { success: true };
});

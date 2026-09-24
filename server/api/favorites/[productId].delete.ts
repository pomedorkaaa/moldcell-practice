import { and, eq } from "drizzle-orm";
import { getRouterParam } from "h3";

import { db } from "../../db/client";
import { favorites } from "../../db/schema";
import { getCustomer } from "../../utils/customer";

export default defineEventHandler(async (event) => {
  const productId = Number(getRouterParam(event, "productId"));

  const customer = await getCustomer(event);
  const ownerCondition =
    customer.type === "user"
      ? eq(favorites.userId, customer.userId)
      : eq(favorites.guestId, customer.guestId);

  await db
    .delete(favorites)
    .where(and(ownerCondition, eq(favorites.productId, productId)));

  return { success: true };
});

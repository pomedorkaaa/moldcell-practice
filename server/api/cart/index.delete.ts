import { eq } from "drizzle-orm";

import { db } from "../../db/client";
import { cart } from "../../db/schema";
import { getCustomer } from "../../utils/customer";

export default defineEventHandler(async (event) => {
  const customer = await getCustomer(event);
  const ownerCondition =
    customer.type === "user"
      ? eq(cart.userId, customer.userId)
      : eq(cart.guestId, customer.guestId);

  await db.delete(cart).where(ownerCondition);
  return { success: true };
});

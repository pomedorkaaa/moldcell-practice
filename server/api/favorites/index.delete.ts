import { eq } from "drizzle-orm";

import { db } from "../../db/client";
import { favorites } from "../../db/schema";
import { getCustomer } from "../../utils/customer";

export default defineEventHandler(async (event) => {
  const customer = await getCustomer(event);
  const ownerCondition =
    customer.type === "user"
      ? eq(favorites.userId, customer.userId)
      : eq(favorites.guestId, customer.guestId);

  await db.delete(favorites).where(ownerCondition);
  return { success: true };
});

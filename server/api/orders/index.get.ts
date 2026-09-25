import { desc, eq } from "drizzle-orm";

import type { OrderSummary } from "#shared/types/order";

import { db } from "../../db/client";
import { orders } from "../../db/schema";

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event);

  const rows = await db
    .select({
      id: orders.id,
      status: orders.status,
      total: orders.total,
      createdAt: orders.createdAt,
    })
    .from(orders)
    .where(eq(orders.userId, session.user.id))
    .orderBy(desc(orders.createdAt));

  return rows.map(
    (order): OrderSummary => ({
      ...order,
      createdAt: order.createdAt.toISOString(),
    }),
  );
});
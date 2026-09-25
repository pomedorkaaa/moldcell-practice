import { and, asc, eq } from "drizzle-orm";
import { getRouterParam } from "h3";

import type { OrderDetails } from "#shared/types/order";

import { db } from "../../db/client";
import { orderItems, orders, products } from "../../db/schema";

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event);

  const orderId = Number(getRouterParam(event, "id"));

  if (!Number.isInteger(orderId) || orderId <= 0) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid order id",
    });
  }

  const [order] = await db
    .select({
      id: orders.id,
      status: orders.status,
      total: orders.total,
      createdAt: orders.createdAt,
      firstName: orders.firstName,
      lastName: orders.lastName,
      email: orders.email,
      phone: orders.phone,
      city: orders.city,
      address: orders.address,
    })
    .from(orders)
    .where(and(eq(orders.id, orderId), eq(orders.userId, session.user.id)))
    .limit(1);

  if (!order) {
    throw createError({
      statusCode: 404,
      statusMessage: "Order not found",
    });
  }

  const rows = await db
    .select({
      id: orderItems.id,
      productId: orderItems.productId,
      productName: orderItems.productName,
      unitPrice: orderItems.unitPrice,
      quantity: orderItems.quantity,
      images: products.images,
    })
    .from(orderItems)
    .leftJoin(products, eq(orderItems.productId, products.id))
    .where(eq(orderItems.orderId, order.id))
    .orderBy(asc(orderItems.id));

  const items = rows.map((item) => {
    return {
      id: item.id,
      productId: item.productId,
      productName: item.productName,
      unitPrice: item.unitPrice,
      quantity: item.quantity,
      image: item.images?.[0] ?? null,
    };
  });

  const result: OrderDetails = {
    ...order,
    createdAt: order.createdAt.toISOString(),
    items,
  };

  return result;
});
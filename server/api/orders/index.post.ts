import { and, eq, gte, sql } from "drizzle-orm";
import { readValidatedBody } from "h3";

import { db } from "../../db/client";
import { cart, orderItems, orders, products } from "../../db/schema";

import { checkoutSchema } from "../../schemas/checkout";
import { getCustomer } from "../../utils/customer";

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, (value) => {
    return checkoutSchema.parse(value);
  });

  const customer = await getCustomer(event);

  const ownerCondition =
    customer.type === "user"
      ? eq(cart.userId, customer.userId)
      : eq(cart.guestId, customer.guestId);

  return db.transaction(async (tx) => {
    const items = await tx
      .select({
        product: products,
        quantity: cart.quantity,
      })
      .from(cart)
      .innerJoin(products, eq(cart.productId, products.id))
      .where(ownerCondition);

    if (items.length === 0) {
      throw createError({
        statusCode: 400,
        statusMessage: "Cart is empty",
      });
    }

    const total = items.reduce((sum, item) => {
      return sum + item.product.price * item.quantity;
    }, 0);

    const [order] = await tx
      .insert(orders)
      .values({
        userId: customer.type === "user" ? customer.userId : null,
        guestId: customer.type === "guest" ? customer.guestId : null,

        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        phone: body.phone,

        city: body.city,
        address: body.address,

        status: "placed",
        total,
      })
      .returning({
        id: orders.id,
        status: orders.status,
        total: orders.total,
        createdAt: orders.createdAt,
      });

    if (!order) {
      throw createError({
        statusCode: 500,
        statusMessage: "Could not create order",
      });
    }

    await tx.insert(orderItems).values(
      items.map((item) => ({
        orderId: order.id,
        productId: item.product.id,
        productName: item.product.name,
        unitPrice: item.product.price,
        quantity: item.quantity,
      })),
    );

    for (const item of items) {
      const [updatedProduct] = await tx
        .update(products)
        .set({
          stock: sql`${products.stock} - ${item.quantity}`,
        })
        .where(
          and(
            eq(products.id, item.product.id),
            gte(products.stock, item.quantity),
          ),
        )
        .returning({
          id: products.id,
        });

      if (!updatedProduct) {
        throw createError({
          statusCode: 409,
          statusMessage: `${item.product.name} is no longer available in the requested quantity`,
        });
      }
    }

    await tx.delete(cart).where(ownerCondition);

    return {
      id: order.id,
      status: order.status,
      total: order.total,
      createdAt: order.createdAt.toISOString(),
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      phone: body.phone,
      city: body.city,
      address: body.address,

      items: items.map((item) => ({
        productId: item.product.id,
        productName: item.product.name,
        image: item.product.images[0] ?? "",
        unitPrice: item.product.price,
        quantity: item.quantity,
      })),
    };
  });
});
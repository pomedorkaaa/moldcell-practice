import { sql } from "drizzle-orm";

import {
  check,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
});

export const brands = pgTable("brands", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
});

export const products = pgTable(
  "products",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    slug: text("slug").notNull().unique(),
    brandId: integer("brand_id")
      .notNull()
      .references(() => brands.id),
    categoryId: integer("category_id")
      .notNull()
      .references(() => categories.id),
    price: integer("price").notNull(),
    oldPrice: integer("old_price"),
    stock: integer("stock").notNull().default(0),
    description: text("description").notNull(),
    images: text("images").array().notNull(),
    createdAt: timestamp("created_at",     {
      mode: "date",
    })
      .notNull()
      .defaultNow(),
  },
  (table) => [check("products_stock_non_negative", sql`${table.stock} >= 0`)],
);

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  email: text("email").notNull(),
  lastName: text("last_name").notNull(),
  passwordHash: text("password_hash").notNull(),
  createdAt: timestamp("created_at", {
    mode: "date",
  })
    .notNull()
    .defaultNow(),
});
 
export const favorites = pgTable(
  "favorites",
  {
    id: serial("id").primaryKey(),
    userId: integer("user_id").references(() => users.id, {
      onDelete: "cascade",
    }),
    guestId: text("guest_id"),
    productId: integer("product_id")
      .notNull()
      .references(() => products.id, {
        onDelete: "cascade",
      }),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (table) => [
    uniqueIndex("favorites_user_product_unique").on(
      table.userId,
      table.productId,
    ),
    uniqueIndex("favorites_guest_product_unique").on(
      table.guestId,
      table.productId,
    ),
    check(
      "favorites_owner_check",
      sql`num_nonnulls(${table.userId}, ${table.guestId}) = 1`,
    ),
  ],
);

export const cart = pgTable(
  "cart",
  {
    id: serial("id").primaryKey(),
    userId: integer("user_id").references(() => users.id, {
      onDelete: "cascade",
    }),
    guestId: text("guest_id"),
    productId: integer("product_id")
      .notNull()
      .references(() => products.id, {
        onDelete: "cascade",
      }),
    quantity: integer("quantity").notNull().default(1),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (table) => [
    uniqueIndex("cart_user_product_unique").on(table.userId, table.productId),
    uniqueIndex("cart_guest_product_unique").on(table.guestId, table.productId),
    check(
      "cart_owner_check",
      sql`num_nonnulls(${table.userId}, ${table.guestId}) = 1`,
    ),
  ],
);

export const orders = pgTable(
  "orders",
  {
    id: serial("id").primaryKey(),
    userId: integer("user_id").references(() => users.id),
    guestId: text("guest_id"),
    firstName: text("first_name").notNull(),
    lastName: text("last_name").notNull(),
    email: text("email").notNull(),
    phone: text("phone").notNull(),
    city: text("city").notNull(),
    address: text("address").notNull(),
    status: text("status").notNull().default("placed"),
    total: integer("total").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (table) => [
    check(
      "orders_owner_check",
      sql`num_nonnulls(${table.userId}, ${table.guestId}) = 1`,
    ),
  ],
);

export const orderItems = pgTable(
  "order_items",
  {
    id: serial("id").primaryKey(),
    orderId: integer("order_id")
      .notNull()
      .references(() => orders.id, {
        onDelete: "cascade",
      }),
    productId: integer("product_id").references(() => products.id, {
      onDelete: "set null",
    }),
    productName: text("product_name").notNull(),
    unitPrice: integer("unit_price").notNull(),
    quantity: integer("quantity").notNull(),
  },
  (table) => [check("order_items_quantity_check", sql`${table.quantity} > 0`)],
);


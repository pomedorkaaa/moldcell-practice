import "dotenv/config";

import { sql } from "drizzle-orm";

import seed from "../server/data/catalog.seed.json";

import { db, pool } from "../server/db/client";
import { brands, categories, products } from "../server/db/schema";

async function seedDatabase() {
  try {
    await db.transaction(async (tx) => {
      await tx.insert(categories).values(seed.categories).onConflictDoNothing({
        target: categories.id,
      });

      await tx.insert(brands).values(seed.brands).onConflictDoNothing({
        target: brands.id,
      });

      const productRows = seed.products.map((product) => ({
        ...product,
        createdAt: new Date(product.createdAt),
      }));

      await tx.insert(products).values(productRows).onConflictDoNothing({
        target: products.id,
      });
    });

    await db.execute(sql`
      SELECT setval(
        pg_get_serial_sequence('categories', 'id'),
        (SELECT MAX(id) FROM categories)
      )  
    `);

    await db.execute(sql`
      SELECT setval(
        pg_get_serial_sequence('brands', 'id'),
        (SELECT MAX(id) FROM brands)
      )  
    `);

    await db.execute(sql`
      SELECT setval(
        pg_get_serial_sequence('products', 'id'),
        (SELECT MAX(id) FROM products)
      )  
    `);

    console.log("Catalog seed completeddddd");
  } catch (error: unknown) {
    console.error("Could not seed catalog", error);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
}

// seedDatabase().catch((error: unknown) => {
//   console.error("Could not seed catalog", error);
//   process.exitCode = 1;
// });
seedDatabase();

/* 
 import seed from "../data/catalog.seed.json";
import type { CatalogProduct } from "#shared/types/catalog";

export const catalogProducts: CatalogProduct[] = seed.products.map(
  (product) => ({
    ...product,
    brand: seed.brands.find((brand) => brand.id === product.brandId) ?? null,
    category:
      seed.categories.find((category) => category.id === product.categoryId) ??
      null,
  }),
); 
*/

import { and, asc, desc, eq, gte, lte, type SQL } from "drizzle-orm";
import type { CatalogQuery } from "../schemas/catalog-query";
import type { CatalogProduct } from "#shared/types/catalog";

import { db } from "../db/client";
import { brands, categories, products } from "../db/schema";

interface CatalogRow {
  product: typeof products.$inferSelect;
  brand: typeof brands.$inferSelect;
  category: typeof categories.$inferSelect;
}

function createCatalogQuery() {
  return db
    .select({
      product: products,
      brand: brands,
      category: categories,
    })
    .from(products)
    .innerJoin(brands, eq(products.brandId, brands.id))
    .innerJoin(categories, eq(products.categoryId, categories.id));
}

function getCatalogOrder(sort: CatalogQuery["sort"]): SQL[] {
  switch (sort) {
    case "price-asc":
      return [asc(products.price), asc(products.id)];
    case "price-desc":
      return [desc(products.price), asc(products.id)];
    case "newest":
      return [desc(products.createdAt), asc(products.id)];
    default:
      return [asc(products.id)];
  }
}

function toCatalogProduct(row: CatalogRow): CatalogProduct {
  return {
    ...row.product,
    createdAt: row.product.createdAt.toISOString(),
    brand: row.brand,
    category: row.category,
  };
}

export async function getCatalogProducts(
  { category, brand, minPrice, maxPrice, sort }: CatalogQuery = {
    sort: "default",
  },
): Promise<CatalogProduct[]> {
  const rows = await createCatalogQuery()
    .where(
      and(
        category ? eq(categories.slug, category) : undefined,
        brand ? eq(brands.slug, brand) : undefined,
        minPrice !== undefined ? gte(products.price, minPrice) : undefined,
        maxPrice !== undefined ? gte(products.price, maxPrice) : undefined,
      ),
    )
    .orderBy(...getCatalogOrder(sort));
  return rows.map(toCatalogProduct);
}

export async function getCatalogProductBySlug(
  slug: string,
): Promise<CatalogProduct | null> {
  const [row] = await createCatalogQuery()
    .where(eq(products.slug, slug))
    .limit(1);

  return row ? toCatalogProduct(row) : null;
}

export async function getCatalogCategories() {
  return db.select().from(categories).orderBy(asc(categories.id));
}

export async function getCatalogBrands() {
  return db.select().from(brands).orderBy(asc(brands.id));
}

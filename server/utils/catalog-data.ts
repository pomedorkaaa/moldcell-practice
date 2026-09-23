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

import {
  and,
  asc,
  desc,
  eq,
  gte,
  lte,
  gt,
  inArray,
  min,
  max,
  type SQL,
  ilike,
  or,
} from "drizzle-orm";
import type { CatalogQuery } from "../schemas/catalog-query";
import type { CatalogProduct, CatalogPriceRange } from "#shared/types/catalog";

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

function getCatalogOrder({
  sort,
  category = [],
  brand = [],
}: CatalogQuery): SQL[] {
  const stockOrder = desc(gt(products.stock, 0));
  switch (sort) {
    case "price-asc":
      return [stockOrder, asc(products.price), asc(products.id)];
    case "price-desc":
      return [stockOrder, desc(products.price), asc(products.id)];
    case "newest":
      return [stockOrder, desc(products.createdAt), asc(products.id)];
    default:
      return [
        stockOrder,
        ...category.map((slug) => desc(eq(categories.slug, slug))),
        ...brand.map((slug) => desc(eq(brands.slug, slug))),
        asc(products.id),
      ];
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
  // { category, brand, minPrice, maxPrice, sort }: CatalogQuery = {
  query: CatalogQuery = {
    sort: "default",
  },
): Promise<CatalogProduct[]> {
  const { category, brand, minPrice, maxPrice, search } = query;
  const rows = await createCatalogQuery()
    .where(
      and(
        category?.length ? inArray(categories.slug, category) : undefined,
        brand?.length ? inArray(brands.slug, brand) : undefined,
        minPrice !== undefined ? gte(products.price, minPrice) : undefined,
        maxPrice !== undefined ? lte(products.price, maxPrice) : undefined,
        search
          ? or(
              ilike(products.name, `%${search}%`),
              ilike(brands.name, `%${search}%`),
              ilike(categories.name, `%${search}%`),
            )
          : undefined,
      ),
    )
    .orderBy(...getCatalogOrder(query));
  return rows.map(toCatalogProduct);
}

export async function getCatalogPriceRange(): Promise<CatalogPriceRange> {
  const [range] = await db
    .select({
      min: min(products.price),
      max: max(products.price),
    })
    .from(products);
  return {
    min: range?.min ?? 0,
    max: range?.max ?? 0,
  };
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

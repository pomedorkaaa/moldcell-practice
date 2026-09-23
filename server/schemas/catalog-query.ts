import { z } from "zod";

export const catalogSortValues = [
  "default",
  "price-asc",
  "price-desc",
  "newest",
] as const;

const slug = z.string().trim().min(1);

const selectedSlug = z
  .union([slug, z.array(slug)])
  .transform((value) => (Array.isArray(value) ? value : [value]))
  .optional();

export const catalogQuerySchema = z
  .object({
    // category: z.string().trim().min(1).optional(),
    // brand: z.string().trim().min(1).optional(),
    category: selectedSlug,
    brand: selectedSlug,
    minPrice: z.coerce.number().int().nonnegative().optional(),
    maxPrice: z.coerce.number().int().nonnegative().optional(),
    sort: z.enum(catalogSortValues).default("default"),
    search: z.string().trim().min(1).max(100).optional(),
  })
  .refine(
    ({ minPrice, maxPrice }) => {
      if (minPrice === undefined || maxPrice === undefined) {
        return true;
      }

      return minPrice <= maxPrice;
    },
    {
      message: "maxPrice must be greater than or equal to minPrice",
      path: ["maxPrice"],
    },
  );

export type CatalogQuery = z.infer<typeof catalogQuerySchema>;

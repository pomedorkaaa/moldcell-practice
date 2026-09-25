import { z } from "zod";

export const addToCartSchema = z.object({
  quantity: z.number().int().min(1).default(1),
});

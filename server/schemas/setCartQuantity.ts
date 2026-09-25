import { z } from "zod";

export const setCartQuantitySchema = z.object({
  quantity: z.number().int().min(1),
});


import { z } from "zod";

export const setCartQuantitySchema = z.object({
  quantity: z.number().int().min(1),
});

export type SetCartQuantityInput = z.infer<typeof setCartQuantitySchema>;

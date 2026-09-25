import { z } from "zod";

export const cartDeltaSchema = z.object({
  delta: z.number().int().refine((value) => value !== 0),
});
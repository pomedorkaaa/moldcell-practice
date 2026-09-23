import { z } from "zod";

import { loginSchema } from "./login";

export const registerSchema = z.object({
  ...loginSchema.shape,
  firstName: z.string().trim().min(1).max(50),
  lastName: z.string().trim().min(1).max(50),
});

export type RegisterInput = z.infer<typeof registerSchema>;

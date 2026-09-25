import { z } from "zod";

export const checkoutSchema = z.object({
  firstName: z.string().trim().min(1).max(50),
  lastName: z.string().trim().min(1).max(50),
  email: z.email(),
  phone: z.string().trim().min(6).max(30),
  city: z.string().trim().min(1).max(100),
  address: z.string().trim().min(1).max(200),
});
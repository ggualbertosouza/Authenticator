import { z } from "zod";

export const authFormSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  rememberMe: z.boolean().optional(),
});

export type authForm = z.infer<typeof authFormSchema>;

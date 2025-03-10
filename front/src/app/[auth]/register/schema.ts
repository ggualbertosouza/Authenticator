import { z } from "zod";

export const registerFormSchema = z
  .object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não concidem",
    path: ["confirmPassword"],
  });

export type registerForm = z.infer<typeof registerFormSchema>;

import { z } from "zod";

// Login schema
export const loginSchema = z.object({
  email: z
    .string()
    .email({ message: "Email inválido" })
    .min(1, { message: "Email é obrigatório" }),
  password: z
    .string()
    .min(6, { message: "Senha deve ter pelo menos 6 caracteres" }),
});

export type LoginFormData = z.infer<typeof loginSchema>;

// Register schema
export const registerSchema = z
  .object({
    username: z
      .string()
      .min(3, { message: "Nome de usuário deve ter pelo menos 3 caracteres" }),
    email: z
      .string()
      .email({ message: "Email inválido" })
      .min(1, { message: "Email é obrigatório" }),
    password: z
      .string()
      .min(6, { message: "Senha deve ter pelo menos 6 caracteres" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Confirmação de senha obrigatória" }),
  })
  .refine((data: any) => data.password === data.confirmPassword, {
    message: "Senhas não coincidem",
    path: ["confirmPassword"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;

// Course schema
export const courseSchema = z.object({
  title: z.string().min(1, { message: "Título é obrigatório" }),
  description: z
    .string()
    .min(10, { message: "Descrição deve ter pelo menos 10 caracteres" }),
  price: z.number().min(0, { message: "Preço deve ser maior que zero" }),
});

export type CourseFormData = z.infer<typeof courseSchema>;

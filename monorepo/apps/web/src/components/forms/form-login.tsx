"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/Button/Button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card/Card";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { loginAndSetSession } from "@/actions/login";
import { useAuthStore } from "@/stores/authStore";
import { initializeAuthFromAPI } from "@/lib/auth-utils";

const schema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});

type FormData = z.infer<typeof schema>;

export default function FormLogin() {
  const router = useRouter();
  const { setAuth } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    const res = await loginAndSetSession(data.email, data.password);
    if (res?.error) {
      toast.error(res.errorUserMessage ?? "Falha no login");
      return;
    }

    // Set token in Zustand store if available
    if (res?.data?.access_token) {
      const { setToken } = useAuthStore.getState();
      setToken(res.data.access_token);
    }

    // Initialize user data in Zustand store after successful login
    await initializeAuthFromAPI();

    toast.success("Login realizado com sucesso!");
    // Let middleware handle the redirect based on user role
    window.location.href = "/dashboard";
  };

  return (
    <Card variant="elevated">
      <CardHeader>
        <CardTitle>Entrar na sua conta</CardTitle>
        <p
          style={{
            fontSize: "var(--text-sm)",
            color: "var(--text-secondary)",
            margin: "var(--space-2) 0 0 0",
          }}
        >
          Entre com seus dados para acessar o app
        </p>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-5)",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-2)",
            }}
          >
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              {...register("email")}
            />
            {errors.email && (
              <p
                style={{
                  fontSize: "var(--text-sm)",
                  color: "var(--color-error)",
                  display: "flex",
                  alignItems: "center",
                  gap: "var(--space-1)",
                }}
              >
                <span>⚠</span>
                {errors.email.message}
              </p>
            )}
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-2)",
            }}
          >
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              {...register("password")}
            />
            {errors.password && (
              <p
                style={{
                  fontSize: "var(--text-sm)",
                  color: "var(--color-error)",
                  display: "flex",
                  alignItems: "center",
                  gap: "var(--space-1)",
                }}
              >
                <span>⚠</span>
                {errors.password.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            variant="primary"
            size="large"
            fullWidth
            loading={isSubmitting}
          >
            {isSubmitting ? "Entrando..." : "Entrar"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

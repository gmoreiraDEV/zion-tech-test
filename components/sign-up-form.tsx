"use client";

import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { HeaderZion } from "./header-zion";

export function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    if (password !== repeatPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const { data: dataSignUp, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/feed`,
        },
      });
      let errorUser;
      if (dataSignUp) {
        const { error } = await supabase
          .from("User")
          .insert({ email, authUserId: dataSignUp?.user?.id });
        errorUser = error;
      }

      if (error || errorUser) throw error;

      router.push("/auth/cadastro-sucesso");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col gap-6 rounded-[53px] color-white max-w-[564px] md:w-3/5",
        className
      )}
      {...props}
    >
      <Card className="bg-brand-foreground w-full md:p-[40px]">
        <CardHeader className="max-w-[400px] m-auto">
          <CardTitle>
            <HeaderZion />
          </CardTitle>
        </CardHeader>
        <CardDescription className="w-full text-center my-7 md:my-14">
          <p className="text-white text-2xl md:text-4xl font-semibold">
            Cadastro
          </p>
          <p className="text-brand-gray text-xs md:text-sm text-center m-auto">
            Já possui uma conta?{" "}
            <Link
              href="/"
              className="text-brand-primary font-bold underline decoration-1"
            >
              Faça o login aqui
            </Link>
          </p>
        </CardDescription>
        <CardContent>
          <form onSubmit={handleSignUp}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2 relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="seuEmail@email.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Label
                  htmlFor="email"
                  className={cn(
                    "absolute left-3 -top-2.5 bg-brand-foreground text-white text-xs font-medium px-2 py-1 rounded"
                  )}
                >
                  Email
                </Label>
              </div>
              <div className="grid gap-2 relative">
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Label
                  className={cn(
                    "absolute left-3 -top-2.5 bg-brand-foreground text-white text-xs font-medium px-2 py-1 rounded"
                  )}
                  htmlFor="password"
                >
                  Password
                </Label>
              </div>
              <div className="grid gap-2 relative">
                <Input
                  id="repeat-password"
                  type="password"
                  required
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                />
                <Label
                  className={cn(
                    "absolute left-3 -top-2.5 bg-brand-foreground text-white text-xs font-medium px-2 py-1 rounded"
                  )}
                  htmlFor="repeat-password"
                >
                  Repeat Password
                </Label>
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <Button
                type="submit"
                className="w-full bg-brand-primary text-white rounded-full hover:bg-brand-secondary"
                disabled={isLoading}
              >
                {isLoading ? "Criando sua conta..." : "Cadastrar"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
import { HeaderZion } from "@/components/header-zion";
import { Skeleton } from "@/components/ui/skeleton";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      router.push("/feed");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
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
      {isLoading ? (
        <Card className="bg-brand-foreground w-full md:p-[40px] flex flex-col gap-6">
          <div className="max-w-[400px] m-auto w-full">
            <Skeleton className="h-[32px] md:h-[48px] w-[180px] mx-auto rounded-xl" />
          </div>
          <div className="flex flex-col items-center justify-center gap-4 my-7 md:my-14">
            <Skeleton className="h-6 w-[60%] rounded-md" />
            <Skeleton className="h-4 w-[40%] rounded-md" />
          </div>
          <div className="flex flex-col gap-6">
            <Skeleton className="h-12 rounded-xl w-full" />
            <Skeleton className="h-12 rounded-xl w-full" />
            <Skeleton className="h-12 rounded-full w-full" />
          </div>
        </Card>
      ) : (
        <Card className="bg-brand-foreground w-full md:p-[40px]">
          <CardHeader className="max-w-[400px] m-auto">
            <CardTitle>
              <HeaderZion />
            </CardTitle>
          </CardHeader>
          <CardDescription className="w-full text-center my-7 md:my-14">
            <p className="text-white text-2xl md:text-4xl font-semibold">
              Acesse sua conta
            </p>
            <p className="text-brand-gray text-xs md:text-sm text-center m-auto">
              Não tem acesso a plataforma?
              <Link
                href="/auth/cadastro"
                className="text-brand-primary font-bold underline decoration-1"
              >
                Clique aqui
              </Link>
            </p>
          </CardDescription>
          <CardContent>
            <form onSubmit={handleLogin}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2 relative">
                  <Input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
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
                    placeholder="Senha"
                  />
                  <Label
                    htmlFor="password"
                    className={cn(
                      "absolute left-3 -top-2.5 bg-brand-foreground text-white text-xs font-medium px-2 py-1 rounded"
                    )}
                  >
                    Senha
                  </Label>
                </div>
                {error && <p className="text-sm text-red-500">{error}</p>}
                <Button
                  type="submit"
                  className="w-full bg-brand-primary text-white rounded-full hover:bg-brand-secondary"
                  disabled={isLoading}
                >
                  {isLoading ? "Entrando..." : "Entrar"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

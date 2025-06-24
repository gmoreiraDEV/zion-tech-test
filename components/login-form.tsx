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
import ZionLogo from "./zion-logo";

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
      // Update this route to redirect to an authenticated route. The user already has an active session.
      router.push("/protected");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6 p-['82px'] rounded-['53px'] bg-brand-background color-white" , className)} {...props}>
      <Card className="bg-brand-foreground">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center space-between gap-2 w-full">
            <ZionLogo />
            <div className="flex flex-col">
              <p className="">Comunidade</p>
              <p className="text-[32px] bg-clip-text bg-gradient-to-r from-[#A0E0DE] to-[#DAFDB8]">Zion Global</p>
            </div>
          </CardTitle>
          <CardDescription>
            <p className="text-white">Acesse sua conta</p>
            <p className="text-brand-gray">Não tem acesso a plataforma? <Link href='/'>Clique aqui</Link></p>
          </CardDescription>
        </CardHeader>
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
                  maxLength={14}
                  className=" bg-brand-foreground border-slate-600 text-white text-lg placeholder:text-slate-400 rounded-[8px] p-6"
                />
                <Label
                  htmlFor="cpf"
                  className={cn("absolute left-3 -top-2.5 bg-brand-foreground text-white text-xs font-medium px-2 py-1 rounded")}
                >
                  CPF
                </Label>
            
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="/auth/forgot-password"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <Button type="submit" className="w-full bg-brand-primary text-white rounded-full" disabled={isLoading}>
                {isLoading ? "Entrando..." : "Entrar"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

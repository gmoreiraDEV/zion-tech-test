"use client";
import Link from "next/link";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { cn } from "@/lib/utils";
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
import { login } from "@/app/(auth)/actions";

import { HeaderZion } from "./header-zion";

interface ILogin {
  email: string,
  password: string
}

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>()

  const onSubmit: SubmitHandler<ILogin> = async(data: {email:string, password: string}) => {
    const formData = new FormData()
    formData.append('name', data.email)
    formData.append('email', data.password)

    await login(formData);
    setIsLoading(true);
    if (errors) console.log('error', errors.root)
    setIsLoading(false);
  }

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
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2 relative">
                <Input
                  id="email"
                  type="email"
                   {...register("email", { required: true })}
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
                {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
              <div className="grid gap-2 relative">
                <Input
                  id="password"
                  type="password"
                  {...register("password", { required: true })}
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
                 {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
                 {errors.root && <p className="text-sm text-red-500">{errors.root.message}</p>}
             
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
    </div>
  );
}

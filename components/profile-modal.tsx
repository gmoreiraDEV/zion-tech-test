"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { updateUserProfile } from "@/data-access-layer/users.dal";
import { Textarea } from "./ui/textarea";
import { useForm } from "react-hook-form";
import { Label } from "@radix-ui/react-label";

interface UpdateProfileInput {
  name?: string;
  bio?: string;
}

export function ProfileModal({
  userId,
  closeModal,
}: {
  userId: string;
  closeModal: boolean;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateProfileInput>();

  async function handleSaveProfile(payload: UpdateProfileInput) {
    setLoading(true);
    if (!payload) return;

    const payloadFormatted = {
      id: userId,
      name: payload.name ?? "",
      bio: payload.bio ?? "",
    };
    const { error } = await updateUserProfile(payloadFormatted);

    setLoading(false);

    if (!error) {
      router.refresh();
    }
  }

  return (
    <Dialog open={closeModal}>
      <DialogContent className="bg-brand-foreground flex flex-col">
        <DialogTitle className="text-lg text-left font-bold">
          Complete seu perfil
        </DialogTitle>
        <form
          onSubmit={handleSubmit(handleSaveProfile)}
          className="flex flex-col gap-4"
        >
          <div className="grid gap-2 relative">
            <Input {...register("name")} className="rounded-md" />
            <Label
              htmlFor="name"
              className="absolute left-3 -top-2.5 bg-brand-foreground text-white text-xs font-medium px-2 py-1 rounded"
            >
              Nome
            </Label>
          </div>
          <div className="grid gap-2 relative">
            <Textarea {...register("bio")} className="rounded-md" />
            <Label
              className="absolute left-3 -top-2.5 bg-brand-foreground text-white text-xs font-medium px-2 py-1 rounded"
              htmlFor="bio"
            >
              Sua história aqui
            </Label>
          </div>
          {errors.name && (
            <span className="text-sm text-red-400">Ops, algo deu errado!</span>
          )}
          {errors.bio && (
            <span className="text-sm text-red-400">Ops, algo deu errado!</span>
          )}
          <Button
            className="bg-brand-primary rounded-full text-white text-sm font-bold border hover:bg-brand-foreground hover:border-brand-primary"
            type="submit"
            disabled={loading}
          >
            Atualizar
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

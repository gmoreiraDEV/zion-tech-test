"use client";

import { SubmitHandler, useForm } from "react-hook-form";

import { createPost } from "@/data-access-layer/posts.dal";
import { getUserId } from "@/data-access-layer/users.dal";
import { PictureIcon } from "@/components/picture-icon";
import { Button } from "@/components/ui/button";

type CreatePostInput = {
  description: string;
};

export function CreatePostForm({ userId }: { userId: string }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatePostInput>();

  const onSubmit: SubmitHandler<CreatePostInput> = async (data) => {
    const dataUserId = await getUserId(userId);
    console.log(dataUserId);
    await createPost({
      ...data,
      createdAt: new Date(),
      ownerId: dataUserId.id,
    });
  };

  return (
    <form
      className="w-full flex flex-col gap-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <textarea
        id="postText"
        {...register("description", { required: true })}
        placeholder="Compartilhe o que está pensando..."
        className="w-full p-4 bg-transparent border border-white/20 rounded-lg focus:border-white focus-within:outline-none"
      />
      <div className="w-full flex items-center justify-between">
        <Button className="bg-brand-green-muted rounded-full text-white text-sm font-bold flex justify-center items-center gap-2 h-10">
          <PictureIcon />
          <p>Image/Video</p>
        </Button>
        <Button
          className="bg-brand-primary rounded-full text-white text-sm font-bold"
          type="submit"
        >
          Publicar
        </Button>
      </div>
      {errors.description && (
        <span className="text-sm text-red-400">Ops, algo deu errado!</span>
      )}
    </form>
  );
}

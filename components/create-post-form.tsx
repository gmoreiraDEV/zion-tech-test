"use client";
import { SubmitHandler, useForm } from "react-hook-form";

import { createPost } from "@/data-access/postsDAL";
import { PictureIcon } from "@/components/picture-icon";
import { Button } from "./ui/button";

type CreatePostInput = {
  postText: string;
};

export default function CreatePostForm({ userId }: { userId: string }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatePostInput>();

  const onSubmit: SubmitHandler<CreatePostInput> = async (data) => {
    await createPost({
      description: data.postText,
      ownerId: userId,
    });
  };
  return (
    <form
      className="w-full flex flex-col gap-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <textarea
        id="postText"
        {...register("postText", { required: true })}
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
      {errors.postText && (
        <span className="text-sm text-red-400">Ops, algo deu errado!</span>
      )}
    </form>
  );
}

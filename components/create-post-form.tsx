"use client";

import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";

import { createPost } from "@/data-access-layer/posts.dal";
import { getUserProfile } from "@/data-access-layer/users.dal";
import { PictureIcon } from "@/components/picture-icon";
import { Button } from "@/components/ui/button";
import { UploadArea } from "./file-drop-zone";
import { Textarea } from "./ui/textarea";

type CreatePostInput = {
  description: string;
};

export function CreatePostForm() {
  const [isDownload, setIsDownload] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreatePostInput>({
    mode: "onSubmit",
    shouldUnregister: false,
  });
  const queryClient = useQueryClient();

  const onSubmit: SubmitHandler<CreatePostInput> = async (data) => {
    const dataUser = await getUserProfile();

    await createPost({
      ...data,
      ownerId: dataUser.id,
      images: uploadedImages,
    });

    queryClient.invalidateQueries({ queryKey: ["posts"] });

    reset();
    setUploadedImages([]);
    setIsDownload(false);
  };

  return (
    <form
      className="w-full flex flex-col gap-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Textarea
        id="postText"
        {...register("description", { required: true })}
        placeholder="Compartilhe o que está pensando..."
        className="w-full p-4 bg-transparent border border-white/20 rounded-lg focus:border-white focus-within:outline-none"
      />
      {isDownload && <UploadArea onUploadComplete={setUploadedImages} />}
      <div className="w-full flex items-center justify-between">
        <Button
          type="button"
          className="bg-brand-green-muted rounded-full text-white text-sm font-bold flex justify-center items-center gap-2 h-10 hover:bg-brand-background"
          onClick={(e) => {
            e.preventDefault();
            setIsDownload((oldState) => !oldState);
          }}
        >
          <PictureIcon />
          <p>Image/Video</p>
        </Button>
        <Button
          className="bg-brand-primary rounded-full text-white text-sm font-bold border hover:bg-brand-foreground hover:border-brand-primary"
          type="submit"
        >
          Publicar
        </Button>
      </div>
      {errors.description && (
        <span className="text-sm text-red-400">
          Ops, algo deu errado com a descrição. Por favor tente novamente!
        </span>
      )}
    </form>
  );
}

import { useState } from "react";
import { useForm } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EmojiIcon } from "@/components/emoji-icon";
import { AddPhotoIcon } from "@/components/add-photo-icon";
import { SendIcon } from "@/components/send-icon";
import { useAddComment } from "@/hooks/useComment";

export default function CommentInput({ postId }: { postId: string }) {
  const { register, handleSubmit, reset, watch } = useForm<{
    description: string;
  }>();

  const [isHovered, setIsHovered] = useState(false);
  const watchDescription = watch("description");
  const { mutate, isPending } = useAddComment(postId);

  async function onSubmit(data: { description: string }) {
    mutate({ description: data.description });
    reset();
  }
  return (
    <div
      className="flex items-center bg-brand-background-400 border border-white/20 rounded-md w-full max-w-md gap-2 px-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center justify-between w-full"
      >
        <Input
          className="flex-1 border-0 bg-transparent text-brand-text p-0 placeholder:text-brand-text focus-visible:ring-0 focus-visible:ring-offset-0"
          placeholder="Deixe um comentario"
          {...register("description", { required: true })}
        />
        {isHovered && (
          <>
            <AddPhotoIcon className="w-6 h-6 text-slate-400 cursor-pointer hover:text-white" />
            <EmojiIcon className="w-6 h-6 text-slate-400" />
          </>
        )}
        {watchDescription && watchDescription.trim().length > 0 && (
          <Button
            type="submit"
            disabled={isPending}
            className="bg-brand-primary w-4 h-4 text-white transition-colors hover:bg-brand-secondary group p-3 rounded-full translate-x-2"
          >
            <SendIcon />
          </Button>
        )}
      </form>
    </div>
  );
}

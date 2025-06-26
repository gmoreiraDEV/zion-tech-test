import { Input } from "./ui/input";
import { EmojiIcon } from "./emoji-icon";
import { AddPhotoIcon } from "./add-photo-icon";

export default function CommentInput() {
  return (
    <div className="flex items-center bg-brand-background-400 border border-white/20 rounded-md w-full max-w-md gap-2 px-4">
      <Input
        className="flex-1 border-0 bg-transparent text-brand-text p-0 placeholder:text-brand-text focus-visible:ring-0 focus-visible:ring-offset-0"
        placeholder="Deixe um comentario"
      />
      <AddPhotoIcon className="w-6 h-6 text-slate-400 cursor-pointer hover:text-white" />
      <EmojiIcon className="w-6 h-6 text-slate-400" />
    </div>
  );
}

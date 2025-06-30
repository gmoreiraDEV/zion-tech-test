import { createClient } from "@/lib/supabase/client";
import { IComment } from "@/lib/types";

const supabase = createClient();

export async function createComment({
  postId,
  userId,
  description,
}: {
  postId: string;
  userId: string;
  description: string;
}): Promise<IComment[]> {
  const { data, error } = await supabase
    .from("Comment")
    .insert([
      {
        postId,
        userId,
        description,
      },
    ])
    .select();

  if (error) throw new Error(error.message);
  return data!;
}

import { createClient } from "@/lib/supabase/client";
import { IPost } from "@/lib/types";

const supabase = createClient();

export const getAllPosts = async () => {
  const { data, error } = await supabase
    .from("Post")
    .select("*, comment_postId_fkey(count)")
    .order("createdAt", { ascending: false });

  if (error) throw new Error(error.message);
  return data;
};

export const getPostById = async (id: string) => {
  const { data, error } = await supabase.from("Post").select().eq("id", id);

  if (error) return error;
  return data;
};

export const createPost = async (dataPost: Omit<IPost, "id">) => {
  const { data, error } = await supabase.from("Post").insert(dataPost);
  if (error) return error;
  return data;
};

export const deletePost = async (id: string) => {
  const { data, error } = await supabase.from("Post").delete().eq("id", id);

  if (error) return error;
  return data;
};

export async function incrementLikes(postId: string) {
  const { error } = await supabase.rpc("increment_post_likes", {
    post_id: postId,
  });

  if (error) throw new Error(error.message);
  return true;
}

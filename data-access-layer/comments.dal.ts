import { createClient } from "@/lib/supabase/client";

export async function createComment({
  postId,
  description,
}: {
  postId: string;
  description: string;
}) {
  const supabase = createClient();

  const { data: userData } = await supabase.auth.getUser();
  if (!userData?.user) throw new Error("Usuário não autenticado");

  const { data, error } = await supabase.from("Comment").insert({
    description,
    postId,
  });

  if (error) throw new Error(error.message);

  return data;
}

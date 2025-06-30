import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";

export function usePostsWithCommentCount() {
  const supabase = createClient();

  return useQuery({
    queryKey: ["posts-with-comments"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("post_with_comments_count")
        .select("*")
        .order("createdAt", { ascending: false });

      if (error) throw new Error(error.message);
      return data;
    },
  });
}

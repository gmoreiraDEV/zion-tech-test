import { useQuery } from "@tanstack/react-query";
import { IPost } from "@/lib/types";
import { getAllPosts } from "@/data-access-layer/posts.dal";

export function usePostsWithCommentCount() {
  return useQuery<IPost[], Error>({
    queryKey: ["posts"],
    queryFn: getAllPosts,
  });
}

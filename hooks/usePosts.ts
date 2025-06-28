import { getAllPosts } from "@/data-access-layer/posts.dal";
import { IPost } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

export function usePosts() {
  return useQuery<IPost[], Error>({
    queryKey: ["posts"],
    queryFn: getAllPosts,
  });
}

import { useQuery } from "@tanstack/react-query";
import { IPost } from "@/lib/types";
import { getAllPosts } from "@/data-access-layer/posts.dal";

const LIMIT = 5;

export function usePostsWithCommentCont() {
  return useQuery<IPost[], Error>({
    queryKey: ["posts"],
    queryFn: ({ pageParam }) => getAllPosts(pageParam as number, LIMIT),
  });
}

import { getAllPosts } from "@/data-access-layer/posts.dal";
import { IPost } from "@/lib/types";
import { useInfiniteQuery } from "@tanstack/react-query";

const LIMIT = 5;

export function usePosts() {
  return useInfiniteQuery<IPost[], Error>({
    initialPageParam: 0,
    queryKey: ["posts"],
    queryFn: async ({ pageParam }) => getAllPosts(pageParam as number, LIMIT),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < LIMIT) return undefined;
      return allPages.length;
    },
  });
}

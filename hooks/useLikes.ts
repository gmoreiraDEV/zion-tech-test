import { useMutation, useQueryClient } from "@tanstack/react-query";
import { incrementLikes } from "@/data-access-layer/posts.dal";

export function useLikePost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (postId: string) => incrementLikes(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
}

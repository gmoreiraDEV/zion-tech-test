import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createComment } from "@/data-access-layer/comments.dal";

export function useAddComment(postId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: { userId: string; description: string }) =>
      createComment({ postId, ...payload }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
}

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createComment } from "@/data-access-layer/comments.dal";

export function useAddComment(postId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ description }: { description: string }) => {
      return await createComment({ postId, description });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
}

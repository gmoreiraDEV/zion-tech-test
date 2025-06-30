import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createComment,
  getCommentsByPostId,
} from "@/data-access-layer/comments.dal";

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

export function useComments(postId: string) {
  return useQuery({
    queryKey: ["comments", postId],
    queryFn: () => getCommentsByPostId(postId),
    enabled: !!postId,
  });
}

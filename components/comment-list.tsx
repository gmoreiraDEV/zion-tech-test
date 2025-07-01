import { CommentCard } from "@/components/comment-card";
import { useComments } from "@/hooks/useComment";
import { CommentsListSkeleton } from "@/components/comments-list-skeleton";

export function CommentsList({ postId }: { postId: string }) {
  const { data: comments, isLoading, isError } = useComments(postId);

  if (isLoading) return <CommentsListSkeleton />
  
  if (isError)
    return (
      <p className="text-sm text-red-500 p-4">Erro ao carregar comentários.</p>
    );
  if (!comments || comments.length === 0)
    return (
      <p className="text-sm text-muted-foreground p-4">Nenhum comentário ainda.</p>
    );

  return (
    <div className="flex flex-col space-y-4 mt-4 p-4 w-[90%] m-auto">
      {comments.map((comment) => {
        return (
          <CommentCard
            key={comment.id}
            name={comment.raw_user_meta_data?.full_name}
            avatarUrl={comment.raw_user_meta_data?.avatar_url}
            comment={comment.description}
            date={comment.createdAt}
          />
        );
      })}
    </div>
  );
}

import { CommentCard } from "@/components/comment-card";
import { useComments } from "@/hooks/useComment";

export function CommentsList({ postId }: { postId: string }) {
  const { data: comments, isLoading, isError } = useComments(postId);

  if (isLoading)
    return (
      <p className="text-sm text-muted-foreground">Carregando comentários...</p>
    );
  if (isError)
    return (
      <p className="text-sm text-red-500">Erro ao carregar comentários.</p>
    );
  if (!comments || comments.length === 0)
    return (
      <p className="text-sm text-muted-foreground">Nenhum comentário ainda.</p>
    );

  return (
    <div className="flex flex-col space-y-4 mt-4">
      {comments.map((comment) => {
        const userName = comment?.Profile[0]?.User[0].name || "Usuário";

        const avatarUrl = comment?.Profile[0]?.picture
          ? comment.Profile[0].picture
          : `https://eu.ui-avatars.com/api/?name=${encodeURIComponent(
              userName
            )}&size=250`;

        return (
          <CommentCard
            key={comment.id}
            name={userName}
            avatarUrl={avatarUrl}
            comment={comment.description}
            date={comment.createdAt}
          />
        );
      })}
    </div>
  );
}

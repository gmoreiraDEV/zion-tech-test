"use client";
import { usePosts } from "@/hooks/usePosts";
import { FeedCard } from "@/components/feed-card";
import { FeedCardSkeleton } from "@/components/feed-card-skeleton";
import { Button } from "@/components/ui/button";

export default function PostsFeed() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = usePosts();

  if (isLoading) return <FeedCardSkeleton />;
  if (error) return <p>Erro ao carregar: {error.message}</p>;

  const posts = data?.pages.flat() || [];

  return (
    <>
      {posts && (
        <div className="bg-brand-foreground w-full flex flex-col rounded-lg">
          {posts.map((post) => {
            return <FeedCard key={post.id} post={post} />;
          })}
        </div>
      )}
      {hasNextPage && (
        <Button
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
          className="bg-transparent border-2 border-brand-primary text-brand-text rounded-full w-auto max-w-[213px] m-auto mb-5"
        >
          {isFetchingNextPage ? "Carregando..." : "Ver mais postagens"}
        </Button>
      )}
    </>
  );
}

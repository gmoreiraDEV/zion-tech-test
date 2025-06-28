"use client";
import { usePosts } from "@/hooks/usePosts";
import { FeedCard } from "@/components/feed-card";

export default function PostsFeed() {
  const { data: posts, isLoading, error } = usePosts();

  if (isLoading) return <p>Carregando posts...</p>;
  if (error) return <p>Erro ao carregar: {error.message}</p>;
  return (
    <>
      {posts && posts.length > 0 && (
        <div className="bg-brand-foreground w-full flex flex-col rounded-lg">
          {posts.map((post) => {
            return <FeedCard key={post.id} post={post} />;
          })}
        </div>
      )}
    </>
  );
}

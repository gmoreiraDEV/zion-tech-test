import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { CreatePostForm } from "@/components/create-post-form";
import { FeedCard } from "@/components/feed-card";
import { IPost } from "@/lib/types";

export default async function Feed() {
  const supabase = await createClient();

  const posts: IPost[] = [];

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/");
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <div className="bg-brand-foreground w-full p-6 flex flex-col rounded-lg">
        <CreatePostForm userId={data.user.id} />
      </div>
      {posts && posts.length > 0 && (
        <div className="bg-brand-foreground w-full flex flex-col rounded-lg">
          {posts.map((post) => {
            return <FeedCard key={post.id} post={post} user={data.user} />;
          })}
        </div>
      )}
      <Button className="bg-transparent border-2 border-brand-primary text-brand-text rounded-full w-auto max-w-[213px] m-auto mb-5">
        Ver mais postagens
      </Button>
    </div>
  );
}

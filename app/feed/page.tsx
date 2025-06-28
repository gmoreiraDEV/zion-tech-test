import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { CreatePostForm } from "@/components/create-post-form";
import PostsFeed from "@/components/posts-feed";

export default async function Feed() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/");
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <div className="bg-brand-foreground w-full p-6 flex flex-col rounded-lg">
        <CreatePostForm userId={data.user.id} />
      </div>
      <PostsFeed />
      <Button className="bg-transparent border-2 border-brand-primary text-brand-text rounded-full w-auto max-w-[213px] m-auto mb-5">
        Ver mais postagens
      </Button>
    </div>
  );
}

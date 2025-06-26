import { redirect } from "next/navigation";

import FeedCard from "@/components/feed-card";
import { Button } from "@/components/ui/button";
import { getAllPosts } from "@/data-access/postsDAL";
import { getAuthUser } from "@/data-access/usersDAL";
import CreatePostForm from "@/components/create-post-form";

export default async function Feed() {
  const { user, error } = await getAuthUser();

  if (!user || error) {
    redirect("/");
  }

  const userData = {
    id: user?.id,
    email: user?.email,
    name: user?.user_metadata?.name ?? user?.email,
  };
  const posts = await getAllPosts();

  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <div className="bg-brand-foreground w-full p-6 flex flex-col rounded-lg">
        <CreatePostForm userId={user.id} />
      </div>
      {posts && posts.length > 0 && (
        <div className="bg-brand-foreground w-full flex flex-col rounded-lg">
          {posts.map((post) => {
            return <FeedCard key={post.id} post={post} user={userData} />;
          })}
        </div>
      )}
      <Button className="bg-transparent border-2 border-brand-primary text-brand-text rounded-full w-auto max-w-[213px] m-auto mb-5">
        Ver mais postagens
      </Button>
    </div>
  );
}

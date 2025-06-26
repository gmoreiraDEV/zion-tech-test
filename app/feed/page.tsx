import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import FeedCard from "@/components/feed-card";
import { Button } from "@/components/ui/button";
import { PictureIcon } from "@/components/picture-icon";
import { IUser } from "@/utils/types";
import { getAllPosts } from "@/data-access/postsDAL";

export default async function Feed() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/");
  }

  const posts = await getAllPosts();

  console.log("POSTS", posts);

  const user: Partial<IUser> = {
    id: data.user.id,
    email: data.user.email!,
    name: data.user.email!,
  };

  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <div className="bg-brand-foreground w-full p-6 flex flex-col rounded-lg">
        <form className="w-full flex flex-col gap-6">
          <textarea
            name="postText"
            id="postText"
            placeholder="Compartilhe o que está pensando..."
            className="w-full p-4 bg-transparent border border-white/20 rounded-lg focus:border-white focus-within:outline-none"
          />
          <div className="w-full flex items-center justify-between">
            <Button className="bg-brand-green-muted rounded-full text-white text-sm font-bold flex justify-center items-center gap-2 h-10">
              <PictureIcon />
              <p>Image/Video</p>
            </Button>
            <Button
              className="bg-brand-primary rounded-full text-white text-sm font-bold"
              type="submit"
            >
              Publicar
            </Button>
          </div>
        </form>
      </div>
      <div className="bg-brand-foreground w-full flex flex-col rounded-lg">
        {posts.map((post) => {
          const postData = {
            owner: {
              firstName: post.owner.firstName,
              lastName: post.owner.lastName,
            },
            updated: `${new Date().toISOString}`,
            description: post.description,
            likes: post.likes,
            comments: [],
          };
          return <FeedCard key={post.id} user={user} post={postData} />;
        })}
      </div>
      <Button className="bg-transparent border-2 border-brand-primary text-brand-text rounded-full w-auto max-w-[213px] m-auto mb-5">
        Ver mais postagens
      </Button>
    </div>
  );
}

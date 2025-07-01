/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import Image from "next/image";

import moment from "moment";
import "moment/locale/pt-br";
moment.locale("pt-br");

import { IPost } from "@/lib/types";
import { Card, CardDescription } from "@/components/ui/card";
import { HeartIcon } from "@/components/heart-icon";
import { CommentIcon } from "@/components/comment-icon";
import CommentInput from "@/components/comment-input";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { useLikePost } from "@/hooks/useLikes";
import { CommentsList } from "./comment-list";
import { getUserMetadata } from "@/lib/userMetadata";
import { Skeleton } from "./ui/skeleton";

export function FeedCard({ post }: { post: IPost }) {
  const [user, setUser] = useState<any>(null);
  const [showComments, setShowComments] = useState(false);
  const supabase = createClient();
  const { mutate: likePost, isPending: liking } = useLikePost();

  useEffect(() => {
    async function fetchUser() {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data?.user) {
        console.error("Erro ao obter usuário:", error);
        return;
      }

      setUser(getUserMetadata(data.user));
    }

    fetchUser();
  }, [supabase.auth]);

  if (!user) {
    return <Skeleton className="p-6 text-sm text-white/60" />
  }

  return (
    <Card className="gap-2">
      <div className="flex justify-start items-center gap-4 p-6">
        <Image
          className="h-8 w-8 rounded-full"
          alt="profile picture"
          width={32}
          height={32}
          src={
            user?.profile?.picture
              ? user.profile.picture
              : `https://eu.ui-avatars.com/api/?name=${encodeURIComponent(
                  user?.name || "User"
                )}&size=250`
          }
        />
        <div className="flex flex-col justify-start items-start">
          <p className="text-base font-bold">{user?.name || "Usuário"}</p>
          <p className="text-xs">
            {moment(post.createdAt).startOf("day").fromNow()}
          </p>
        </div>
      </div>
      <CardDescription className="mt-3 flex flex-col items-center justify-center p-0">
        {post.images &&
          post.images.map((image) => (
            <Image
              key={image}
              className="min-h-60 h-64 w-full"
              alt="profile picture"
              width={32}
              height={32}
              style={{ objectFit: "cover" }}
              sizes="100%"
              quality={100}
              src={image}
            />
          ))}
        <div className="flex justify-start items-center w-full p-6 gap-8">
          <Button
            onClick={() => likePost(post.id)}
            disabled={liking}
            className="inline-flex gap-2 justify-center bg-transparent items-center group hover:bg-transparent shadow-none"
          >
            <HeartIcon className="!w-6 !h-6" />
            <p className="text-sm text-[#94AEBA]">{post.likes && post.likes}</p>
          </Button>
          <Button 
          onClick={() => setShowComments(old => !old)}
          className="inline-flex gap-2 justify-center bg-transparent items-center group hover:bg-transparent shadow-none">
            <CommentIcon className="!w-6 !h-6" />
             <p className="text-sm text-[#94AEBA]">{post.comments_count && post.comments_count}</p>
          </Button>
        </div>

        <p className="text-brand-text p-6 pt-0">{post.description}</p>
      </CardDescription>
      <div className="mt-2 pt-0 pb-4 px-6">
        <div className="flex justify-start items-center gap-2">
          <Image
            className="h-10 w-10 rounded-full"
            alt="profile picture"
            width={40}
            height={40}
            src={
              user?.profile?.picture
                ? user.profile.picture
                : `https://eu.ui-avatars.com/api/?name=${encodeURIComponent(
                    user?.name || "User"
                  )}&size=250`
            }
          />
          <CommentInput postId={post.id} userId={user.id} />
        </div>
      </div>
      {showComments && <CommentsList postId={post.id} /> }
    </Card>
  );
}

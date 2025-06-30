"use client";

import { ProfileModal } from "@/components/profile-modal";
import { CreatePostForm } from "@/components/create-post-form";
import PostsFeed from "@/components/posts-feed";
import { Button } from "@/components/ui/button";

export function FeedWrapper({
  showProfileModal,
}: {
  userId: string;
  showProfileModal: boolean;
}) {
  return (
    <>
      {showProfileModal && (
        <ProfileModal closeModal={showProfileModal} />
      )}
      <div className="flex-1 w-full flex flex-col gap-12">
        <div className="bg-brand-foreground w-full p-6 flex flex-col rounded-lg">
          <CreatePostForm />
        </div>
        <PostsFeed />
        <Button className="bg-transparent border-2 border-brand-primary text-brand-text rounded-full w-auto max-w-[213px] m-auto mb-5">
          Ver mais postagens
        </Button>
      </div>
    </>
  );
}

"use client";

import { ProfileModal } from "@/components/profile-modal";
import { CreatePostForm } from "@/components/create-post-form";
import PostsFeed from "@/components/posts-feed";

export function FeedWrapper({
  showProfileModal,
}: {
  userId: string;
  showProfileModal: boolean;
}) {
  return (
    <>
      {showProfileModal && <ProfileModal closeModal={showProfileModal} />}
      <div className="flex-1 w-full flex flex-col gap-12">
        <div className="bg-brand-foreground w-full p-6 flex flex-col rounded-lg">
          <CreatePostForm />
        </div>
        <PostsFeed />
      </div>
    </>
  );
}

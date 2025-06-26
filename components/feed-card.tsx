import Image from "next/image";
import { Card, CardDescription } from "./ui/card";
import { HeartIcon } from "./heart-icon";
import { CommentIcon } from "./comment-icon";
import CommentInput from "./comment-input";
import { IFeedCard } from "@/types";
import moment from "moment";

export default function FeedCard(data: IFeedCard) {
  return (
    <Card className="gap-2">
      <div className="flex justify-start items-center gap-4 p-6">
        <Image
          className="h-8 w-8 rounded-full"
          alt="profile picture"
          width={32}
          height={32}
          src={
            data.post.owner.name
              ? data.post.owner.picture
              : `https://eu.ui-avatars.com/api/?name=${data.post.owner.name}&size=250`
          }
        />
        <div className="flex flex-col justify-start items-start">
          <p className="text-base font-bold">{data.post.owner?.name}</p>
          <p className="text-xs">
            {moment(data.post.createdAt).startOf("day").fromNow()}
          </p>
        </div>
      </div>
      <CardDescription className="mt-3 flex flex-col items-center justify-center p-0">
        {data.post.images &&
          data.post.images.map((image) => (
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
          <p className="inline-flex gap-2 items-center">
            <HeartIcon />
            {data.post.likes && data.post.likes}
          </p>
          <p className="inline-flex gap-2 items-center">
            <CommentIcon />
            {data.post.comments && data.post.comments.length}
          </p>
        </div>

        <p className="text-brand-text p-6 pt-0">{data.post.description}</p>
      </CardDescription>
      <div className="mt-2 pt-0 pb-4 px-6">
        <form className="flex justify-between items-center gap-2">
          <Image
            className="h-10 w-10 rounded-full"
            alt="profile picture"
            width={40}
            height={40}
            src={
              data.user?.profile?.picture
                ? data.user.profile.picture
                : `https://eu.ui-avatars.com/api/?name=${data.user?.name}&size=250`
            }
          />
          <CommentInput />
        </form>
      </div>
    </Card>
  );
}
